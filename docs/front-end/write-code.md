## 手写深拷贝（支持循环引用和防爆栈）
::: details 参考答案
- WeakMap 优势：不会阻止垃圾回收，适合做临时映射表
- 性能权衡：递归实现代码更简洁，但迭代实现更安全
- 未处理类型：未包含 Buffer、ArrayBuffer 等特殊类型的处理
- 函数克隆：通常函数不需要深拷贝，如有需求需特殊处理
::: code-group
```js [递归]
function deepClone(obj, hash = new WeakMap(), stack = []) {
    // 基本类型直接返回
    if (obj === null || typeof obj !== 'object') {
        return obj;
    }

    // 检查循环引用
    if (hash.has(obj)) {
        return hash.get(obj);
    }

    // 防止递归爆栈
    if (stack.length > 100) { // 设置递归深度阈值
        throw new Error('Recursion too deep');
    }
    stack.push(obj);

    // 处理特殊对象类型
    let cloneTarget;
    if (obj instanceof Date) {
        cloneTarget = new Date(obj);
    } else if (obj instanceof RegExp) {
        cloneTarget = new RegExp(obj);
    } else if (obj instanceof Map) {
        cloneTarget = new Map();
        obj.forEach((value, key) => {
            cloneTarget.set(deepClone(key, hash, stack), deepClone(value, hash, stack));
        });
    } else if (obj instanceof Set) {
        cloneTarget = new Set();
        obj.forEach(value => {
            cloneTarget.add(deepClone(value, hash, stack));
        });
    } else {
        // 初始化克隆对象
        cloneTarget = Array.isArray(obj) ? [] : Object.create(Object.getPrototypeOf(obj));
        
        // 记录已克隆对象
        hash.set(obj, cloneTarget);
        
        // 克隆Symbol属性
        const symbolKeys = Object.getOwnPropertySymbols(obj);
        const allKeys = [...Object.keys(obj), ...symbolKeys];
        
        // 递归克隆所有属性
        for (const key of allKeys) {
            cloneTarget[key] = deepClone(obj[key], hash, stack);
        }
    }

    stack.pop();
    return cloneTarget;
}
```
```js [迭代]
function deepCloneIterative(obj) {
    const stack = [];
    const hash = new WeakMap();
    
    // 初始克隆
    const cloneTarget = Array.isArray(obj) ? [] : {};
    stack.push({ source: obj, target: cloneTarget });
    hash.set(obj, cloneTarget);

    while (stack.length) {
        const { source, target } = stack.pop();
        
        // 处理所有属性
        for (const key in source) {
            if (source.hasOwnProperty(key)) {
                const value = source[key];
                
                if (value !== null && typeof value === 'object') {
                    if (hash.has(value)) {
                        target[key] = hash.get(value);
                    } else {
                        const newTarget = Array.isArray(value) ? [] : {};
                        target[key] = newTarget;
                        hash.set(value, newTarget);
                        stack.push({ source: value, target: newTarget });
                    }
                } else {
                    target[key] = value;
                }
            }
        }
    }
    
    return cloneTarget;
}
```
:::

## 手写 getType 函数
::: details 参考答案
- 某些特殊对象（如 DOM 元素）可能需要额外处理
- 在跨 iframe 环境中，相同类型的对象可能返回不同的构造函数
- 对于极高性能敏感场景，可以缓存结果或使用更简单的实现
```js
function getType(value) {
  // 获取到 "[object Type]"，其中 Type 是 Null、Undefined、Array、Function、Error、Boolean、Number、String、Date、RegExp 等。
  const type = Object.prototype.toString.call(value).slice(8, -1).toLowerCase()
  return type
}
```
:::

## 手写 class 继承
在某网页中，有三种菜单：button menu，select menu，modal menu。

他们的共同特点：

- 都有 `title icon` 属性
- 都有 `isDisabled 方法`（可直接返回 false）
- 都有 `exec 方法`，执行菜单的逻辑
他们的不同点：

- button menu，执行 exec 时打印 'hello'
- select menu，执行 exec 时返回一个数组 ['item1', 'item2', 'item3']
- modal menu，执行 exec 时返回一个 DOM Element `<div>modal</div>`

请用 ES6 语法写出这三种菜单的 class
::: details 参考答案
```js
class BaseMenu {
  constructor(title, icon) {
    this.title = title
    this.icon = icon
  }
  isDisabled() {
    return false
  }
}

class ButtonMenu extends BaseMenu {
  constructor(title, icon) {
    super(title, icon)
  }
  exec() {
    console.log('hello')
  }
}

class SelectMenu extends BaseMenu {
  constructor(title, icon) {
    super(title, icon)
  }
  exec() {
    return ['item1', 'item2', 'item3']
  }
}

class ModalMenu extends BaseMenu {
  constructor(title, icon) {
    super(title, icon)
  }
  exec() {
    const div = document.createElement('div')
    div.innerText = 'modal'
    return div
  }
}
```
:::


## 手写防抖 (Debounce)

::: details 参考答案
应用场景
- 窗口大小调整：resize 事件
- 输入框搜索：输入停止后再触发搜索
- 按钮防重复点击：防止用户快速重复点击
- 滚动事件：滚动停止后执行操作
```js
function debounce(func, wait, immediate = false) {
  let timeout;
  
  return function(...args) {
    const context = this;
    
    const later = () => {
      timeout = null;
      if (!immediate) {
        func.apply(context, args);
      }
    };
    
    const callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    
    if (callNow) {
      func.apply(context, args);
    }
  };
}
```
:::

## 手写节流 (Throttle)
::: details 参考答案
应用场景
- 滚动事件：无限滚动加载
- 鼠标移动：鼠标位置追踪
- 游戏循环：控制帧率
- 高频点击：防止按钮重复提交
```js
function throttle(func, delay) {
  let lastTime = 0;
  let timeout = null;
  
  return function(...args) {
    const context = this;
    const now = Date.now();
    const remaining = delay - (now - lastTime);
    
    clearTimeout(timeout);
    
    if (remaining <= 0) {
      func.apply(context, args);
      lastTime = now;
    } else {
      timeout = setTimeout(() => {
        func.apply(context, args);
        lastTime = Date.now();
      }, remaining);
    }
  };
}
```
:::

## 手写 bind

## 手写 call 和 apply

## 手写 EventBus 自定义事件

## 手写数组拍平 Array Flatten

## 手写解析 URL 参数为 JS 对象

## 手写数组去重
::: details 参考答案
::: code-group
```js [Set 数据结构]
// 代码简洁、性能优秀、保持元素原始顺序；无法区分对象引用
const unique = arr => [...new Set(arr)];
```
```js [深比较去重]
// 处理对象内容相同情况；性能关键：使用对象键值或 Map 方案
function deepUnique(arr) {
  const seen = new Map();
  return arr.filter(item => {
    const key = typeof item + JSON.stringify(item);
    return seen.has(key) ? false : seen.set(key, true);
  });
}

// 示例
const arr = [{a: 1}, {a: 1}, {b: 2}];
console.log(deepUnique(arr)); // [{a: 1}, {b: 2}]
```
:::

## 手写红绿灯

## 手写 Promise
::: details 参考答案
```js
class MyPromise {
  // 构造方法
  constructor(executor) {
    // 初始化值
    this.initValue()
    // 初始化this指向
    this.initBind()
    // 执行传进来的函数
    executor(this.resolve, this.reject)
  }

  initBind() {
    // 初始化this
    this.resolve = this.resolve.bind(this)
    this.reject = this.reject.bind(this)
  }

  initValue() {
    // 初始化值
    this.PromiseResult = null // 终值
    this.PromiseState = 'pending' // 状态
  }

  resolve(value) {
    // 如果执行resolve，状态变为fulfilled
    this.PromiseState = 'fulfilled'
    // 终值为传进来的值
    this.PromiseResult = value
  }

  reject(reason) {
    // 如果执行reject，状态变为rejected
    this.PromiseState = 'rejected'
    // 终值为传进来的reason
    this.PromiseResult = reason
  }
}
```
[看了就会，手写Promise原理，最通俗易懂的版本！！！](https://juejin.cn/post/6994594642280857630)
:::

## 手写一个 LazyMan 实现 sleep 机制

## 手写 curry 函数，实现函数柯里化

::: details 参考答案
柯里化（Currying）是一种将多参数函数转换为一系列单参数函数的技术。
::: code-group

```js [基础版]
function curry(fn) {
  return function curried(...args) {
    if (args.length >= fn.length) {
      return fn.apply(this, args);
    } else {
      return function(...args2) {
        return curried.apply(this, args.concat(args2));
      };
    }
  };
}

// 使用示例
function sum(a, b, c) {
  return a + b + c;
}

const curriedSum = curry(sum);
console.log(curriedSum(1)(2)(3)); // 6
console.log(curriedSum(1, 2)(3)); // 6
console.log(curriedSum(1)(2, 3)); // 6
```

```js [占位符版]
function curryWithPlaceholder(fn) {
  return function curried(...args) {
    // 检查参数是否足够且不包含占位符
    const complete = args.length >= fn.length && 
      !args.slice(0, fn.length).includes(curryWithPlaceholder.placeholder);
    
    if (complete) {
      return fn.apply(this, args);
    } else {
      return function(...args2) {
        // 替换占位符
        const combinedArgs = args.map(arg => 
          arg === curryWithPlaceholder.placeholder && args2.length ? args2.shift() : arg
        ).concat(args2);
        
        return curried.apply(this, combinedArgs);
      };
    }
  };
}

curryWithPlaceholder.placeholder = Symbol();

// 使用示例
const _ = curryWithPlaceholder.placeholder;
const curriedSum2 = curryWithPlaceholder(sum);
console.log(curriedSum2(1, _, 3)(2)); // 6
console.log(curriedSum2(_, 2)(1)(3)); // 6
```

```js [无限参数]
function infiniteCurry(fn) {
  return function curried(...args) {
    return function(...args2) {
      const combined = [...args, ...args2];
      return args2.length === 0 
        ? fn(...combined) 
        : curried(...combined);
    };
  };
}

// 使用示例
const add = infiniteCurry((...nums) => nums.reduce((a, b) => a + b, 0));
console.log(add(1)(2)(3)(4)()); // 10
console.log(add(1, 2)(3, 4)()); // 10
```

```js [自动柯里化装饰器]
function autoCurry(fn, arity = fn.length) {
  return function curried(...args) {
    if (args.length >= arity) return fn(...args);
    return (...args2) => curried(...args, ...args2);
  };
}

// 使用示例
const curriedMax = autoCurry(Math.max, 2);
console.log(curriedMax(10)(20)); // 20
```

```js [性能优化版]
function optimizedCurry(fn) {
  const arity = fn.length;

  return (function nextCurried(prevArgs) {
    return function(...nextArgs) {
      const args = prevArgs.concat(nextArgs);
      return args.length >= arity
        ? fn(...args)
        : nextCurried(args);
    };
  })([]);
}
```
:::

- 使用场景
```js
// 1. 参数复用
const log = curry(console.log);
const logError = log('ERROR:');
logError('Something went wrong!');

// 2. 函数组合
const map = curry((fn, arr) => arr.map(fn));
const doubleAll = map(x => x * 2);
doubleAll([1, 2, 3]); // [2, 4, 6]

// 3. 延迟执行
const fetchData = curry((url, params) => fetch(url, params));
const getUser = fetchData('/api/user');
```

## 手写 compose 函数
::: details 参考答案
compose 是函数式编程中的核心概念，用于将多个函数组合成一个函数。
::: code-group

```js [基础版（从右到左执行）]
function compose(...fns) {
  return function(arg) {
    return fns.reduceRight((result, fn) => fn(result), arg);
  };
}

// 使用示例
const add5 = x => x + 5;
const multiply3 = x => x * 3;
const subtract2 = x => x - 2;

const composedFn = compose(subtract2, multiply3, add5);
console.log(composedFn(10)); // (10 + 5) => 15 * 3 => 45 - 2 => 43
```

```js [支持异步函数]
function asyncCompose(...fns) {
  return async function(arg) {
    return fns.reduceRight(
      async (result, fn) => fn(await result), 
      arg
    );
  };
}

// 使用示例
const asyncAdd = async x => x + 1;
const asyncDouble = async x => x * 2;

const asyncComposed = asyncCompose(asyncDouble, asyncAdd);
asyncComposed(3).then(console.log); // 8 (3 + 1 = 4, then 4 * 2 = 8)
```

```js [基础版pipe（从左到右执行）]
function pipe(...fns) {
  return function(arg) {
    return fns.reduce((result, fn) => fn(result), arg);
  };
}

// 使用示例
const pipedFn = pipe(add5, multiply3, subtract2);
console.log(pipedFn(10)); // 43 (与上面compose结果相同，但执行顺序不同)
```

```js [支持多参数]
function multiArgCompose(...fns) {
  return function(...args) {
    const lastFn = fns.pop();
    return fns.reduceRight(
      (result, fn) => fn(result), 
      lastFn(...args)
    );
  };
}

// 使用示例
const join = (a, b) => `${a} ${b}`;
const toUpper = str => str.toUpperCase();

const processName = multiArgCompose(toUpper, join);
console.log(processName('hello', 'world')); // "HELLO WORLD"
```

```js [增强版（支持初始多参数和异步）]
function enhancedCompose(...fns) {
  return fns.reduce((a, b) => {
    return (...args) => a(b(...args));
  });
}

// 使用示例
const greet = (name, punctuation) => `Hello ${name}${punctuation}`;
const exclaim = str => `${str}!`;
const toLower = str => str.toLowerCase();

const composedGreet = enhancedCompose(toLower, exclaim, greet);
console.log(composedGreet('World', '...')); // "hello world...!"
```

:::

## 手写一个 LRU 缓存
::: details 参考答案
LRU 缓存是一种常见的缓存淘汰策略，当缓存达到容量限制时，会优先移除最近最少使用的项目。
::: code-group

```js [性能优化版]
// O(1)时间复杂度
class LRUCache {
  constructor(capacity) {
    this.capacity = capacity;
    this.cache = new Map(); // 存储键值对
    this.accessOrder = new Map(); // 维护访问顺序
    this.counter = 0; // 用于生成访问序号
  }

  get(key) {
    if (this.cache.has(key)) {
      // 更新访问序号
      this.accessOrder.set(key, ++this.counter);
      return this.cache.get(key);
    }
    return -1;
  }

  put(key, value) {
    if (this.cache.size >= this.capacity && !this.cache.has(key)) {
      // 找到访问序号最小的键
      let lruKey;
      let min = Infinity;
      for (const [key, count] of this.accessOrder) {
        if (count < min) {
          min = count;
          lruKey = key;
        }
      }
      this.cache.delete(lruKey);
      this.accessOrder.delete(lruKey);
    }
    
    this.cache.set(key, value);
    this.accessOrder.set(key, ++this.counter);
  }
}
```

```js [最佳性能]
// 使用双向链表的优化实现
class LRUCache {
  constructor(capacity) {
    this.capacity = capacity;
    this.cache = new Map();
    this.head = {}; // 虚拟头节点
    this.tail = {}; // 虚拟尾节点
    this.head.next = this.tail;
    this.tail.prev = this.head;
  }

  _moveToFront(node) {
    // 从链表中移除节点
    node.prev.next = node.next;
    node.next.prev = node.prev;
    
    // 将节点添加到链表头部
    node.next = this.head.next;
    node.prev = this.head;
    this.head.next.prev = node;
    this.head.next = node;
  }

  get(key) {
    if (this.cache.has(key)) {
      const node = this.cache.get(key);
      this._moveToFront(node);
      return node.value;
    }
    return -1;
  }

  put(key, value) {
    if (this.cache.has(key)) {
      const node = this.cache.get(key);
      node.value = value;
      this._moveToFront(node);
    } else {
      if (this.cache.size >= this.capacity) {
        // 移除尾节点
        const lruNode = this.tail.prev;
        this.cache.delete(lruNode.key);
        lruNode.prev.next = this.tail;
        this.tail.prev = lruNode.prev;
      }
      
      // 创建新节点并添加到头部
      const newNode = { key, value };
      this.cache.set(key, newNode);
      newNode.next = this.head.next;
      newNode.prev = this.head;
      this.head.next.prev = newNode;
      this.head.next = newNode;
    }
  }
}
```

```js [添加过期时间]
class LRUCacheWithTTL extends LRUCache {
  constructor(capacity, ttl) {
    super(capacity);
    this.ttl = ttl; // 存活时间(毫秒)
    this.timers = new Map();
  }

  get(key) {
    if (this.timers.has(key) && this.timers.get(key) < Date.now()) {
      this.delete(key);
      return -1;
    }
    return super.get(key);
  }

  put(key, value) {
    super.put(key, value);
    if (this.ttl) {
      if (this.timers.has(key)) clearTimeout(this.timers.get(key));
      this.timers.set(key, Date.now() + this.ttl);
    }
  }

  delete(key) {
    super.delete(key);
    if (this.timers.has(key)) {
      clearTimeout(this.timers.get(key));
      this.timers.delete(key);
    }
  }
}
```

```js [统计命中率]
class LRUCacheWithStats extends LRUCache {
  constructor(capacity) {
    super(capacity);
    this.hits = 0;
    this.misses = 0;
  }

  get(key) {
    const result = super.get(key);
    result === -1 ? this.misses++ : this.hits++;
    return result;
  }

  get hitRate() {
    const total = this.hits + this.misses;
    return total > 0 ? (this.hits / total).toFixed(2) : 0;
  }
}
```

:::

## 使用 Vue3 Composable 组合式函数，实现 useCount

::: details 参考答案
- 使用场景
    1. 购物车商品数量选择
    1. 分页控件
    1. 评分组件
    1. 任何需要增减计数的场景
::: code-group

```js [JavaScript]
// useCount.js
import { ref } from 'vue';

export function useCount(initialValue = 0, options = {}) {
  // 计数器值
  const count = ref(initialValue);
  
  // 配置项
  const { min = -Infinity, max = Infinity, step = 1 } = options;

  // 增加计数
  const increment = () => {
    if (count.value < max) {
      count.value += step;
    }
  };

  // 减少计数
  const decrement = () => {
    if (count.value > min) {
      count.value -= step;
    }
  };

  // 重置计数
  const reset = () => {
    count.value = initialValue;
  };

  // 设置特定值
  const set = (value) => {
    if (value >= min && value <= max) {
      count.value = value;
    }
  };

  return {
    count,
    increment,
    decrement,
    reset,
    set,
  };
}
```

```js [TypeScript]
// useCount.ts
import { ref, computed } from 'vue';

interface UseCountOptions {
  min?: number;
  max?: number;
  step?: number;
}

interface UseCountReturn {
  count: Ref<number>;
  canIncrement: ComputedRef<boolean>;
  canDecrement: ComputedRef<boolean>;
  increment: () => boolean;
  decrement: () => boolean;
  reset: () => boolean;
  set: (value: number) => boolean;
}

export function useCount(
  initialValue: number = 0,
  options: UseCountOptions = {}
): UseCountReturn {
  const count = ref(initialValue);
  
  const { min = -Infinity, max = Infinity, step = 1 } = options;

  const canIncrement = computed(() => count.value < max);
  const canDecrement = computed(() => count.value > min);

  const updateCount = (newValue: number): boolean => {
    if (newValue >= min && newValue <= max) {
      count.value = newValue;
      return true;
    }
    return false;
  };

  const increment = () => updateCount(count.value + step);
  const decrement = () => updateCount(count.value - step);
  const reset = () => updateCount(initialValue);
  const set = (value: number) => updateCount(value);

  return {
    count,
    canIncrement,
    canDecrement,
    increment,
    decrement,
    reset,
    set,
  };
}
```

:::

## 使用 Vue3 Composable 组合式函数，实现 useRequest
::: details 参考答案
useRequest 组合式函数实现，用于处理异步请求，包含请求状态管理、错误处理和自动取消等功能
::: code-group

```ts [基础版]
// useRequest.ts
import { ref, onUnmounted } from 'vue';
import axios, { AxiosRequestConfig, AxiosResponse, AxiosError, CancelTokenSource } from 'axios';

interface UseRequestOptions<T> {
  manual?: boolean; // 是否手动触发
  initialData?: T; // 初始数据
  onSuccess?: (data: T) => void; // 成功回调
  onError?: (error: AxiosError) => void; // 失败回调
}

interface UseRequestReturn<T> {
  data: Ref<T | null>;
  error: Ref<AxiosError | null>;
  loading: Ref<boolean>;
  run: (config?: AxiosRequestConfig) => Promise<void>;
  cancel: () => void;
}

export function useRequest<T = any>(
  config: AxiosRequestConfig,
  options: UseRequestOptions<T> = {}
): UseRequestReturn<T> {
  const { manual = false, initialData = null, onSuccess, onError } = options;
  
  const data = ref<T | null>(initialData);
  const error = ref<AxiosError | null>(null);
  const loading = ref(false);
  let cancelTokenSource: CancelTokenSource | null = null;

  const run = async (overrideConfig?: AxiosRequestConfig) => {
    // 取消之前的请求
    if (cancelTokenSource) {
      cancelTokenSource.cancel('Request canceled due to new request');
    }
    
    cancelTokenSource = axios.CancelToken.source();
    loading.value = true;
    error.value = null;

    try {
      const finalConfig = {
        ...config,
        ...overrideConfig,
        cancelToken: cancelTokenSource.token
      };
      
      const response: AxiosResponse<T> = await axios(finalConfig);
      data.value = response.data;
      onSuccess?.(response.data);
    } catch (err) {
      if (!axios.isCancel(err)) {
        error.value = err as AxiosError;
        onError?.(err as AxiosError);
      }
    } finally {
      loading.value = false;
    }
  };

  const cancel = () => {
    if (cancelTokenSource) {
      cancelTokenSource.cancel('Request canceled by user');
      cancelTokenSource = null;
      loading.value = false;
    }
  };

  // 自动执行（除非设置为手动模式）
  if (!manual) {
    run();
  }

  // 组件卸载时取消请求
  onUnmounted(() => {
    cancel();
  });

  return {
    data,
    error,
    loading,
    run,
    cancel
  };
}
```

```ts [进阶实现（带缓存和依赖请求）]
import { ref, computed, watch, onUnmounted } from 'vue';
import axios, { AxiosRequestConfig, AxiosResponse, AxiosError, CancelTokenSource } from 'axios';

interface UseRequestOptions<T> {
  manual?: boolean;
  initialData?: T;
  onSuccess?: (data: T) => void;
  onError?: (error: AxiosError) => void;
  cacheKey?: string; // 缓存键
  staleTime?: number; // 缓存过期时间(ms)
  ready?: Ref<boolean>; // 依赖状态
}

interface UseRequestReturn<T> {
  data: Ref<T | null>;
  error: Ref<AxiosError | null>;
  loading: Ref<boolean>;
  run: (config?: AxiosRequestConfig) => Promise<void>;
  cancel: () => void;
  mutate: (newData: T) => void; // 手动修改数据
}

const cache = new Map<string, { data: any; timestamp: number }>();

export function useRequest<T = any>(
  config: AxiosRequestConfig | (() => AxiosRequestConfig),
  options: UseRequestOptions<T> = {}
): UseRequestReturn<T> {
  const { 
    manual = false, 
    initialData = null, 
    onSuccess, 
    onError,
    cacheKey,
    staleTime = 0,
    ready = ref(true)
  } = options;
  
  const data = ref<T | null>(initialData);
  const error = ref<AxiosError | null>(null);
  const loading = ref(false);
  let cancelTokenSource: CancelTokenSource | null = null;

  const getConfig = () => typeof config === 'function' ? config() : config;

  const run = async (overrideConfig?: AxiosRequestConfig) => {
    if (!ready.value) return;
    
    // 检查缓存
    if (cacheKey && cache.has(cacheKey)) {
      const cached = cache.get(cacheKey)!;
      if (!staleTime || Date.now() - cached.timestamp <= staleTime) {
        data.value = cached.data;
        return;
      }
    }
    
    // 取消之前的请求
    if (cancelTokenSource) {
      cancelTokenSource.cancel('Request canceled due to new request');
    }
    
    cancelTokenSource = axios.CancelToken.source();
    loading.value = true;
    error.value = null;

    try {
      const finalConfig = {
        ...getConfig(),
        ...overrideConfig,
        cancelToken: cancelTokenSource.token
      };
      
      const response: AxiosResponse<T> = await axios(finalConfig);
      data.value = response.data;
      
      // 设置缓存
      if (cacheKey) {
        cache.set(cacheKey, {
          data: response.data,
          timestamp: Date.now()
        });
      }
      
      onSuccess?.(response.data);
    } catch (err) {
      if (!axios.isCancel(err)) {
        error.value = err as AxiosError;
        onError?.(err as AxiosError);
      }
    } finally {
      loading.value = false;
    }
  };

  const cancel = () => {
    if (cancelTokenSource) {
      cancelTokenSource.cancel('Request canceled by user');
      cancelTokenSource = null;
      loading.value = false;
    }
  };

  const mutate = (newData: T) => {
    data.value = newData;
    if (cacheKey) {
      cache.set(cacheKey, {
        data: newData,
        timestamp: Date.now()
      });
    }
  };

  // 自动执行（除非设置为手动模式）
  if (!manual) {
    watch(ready, (isReady) => {
      if (isReady) {
        run();
      }
    }, { immediate: true });
  }

  // 组件卸载时取消请求
  onUnmounted(() => {
    cancel();
  });

  return {
    data,
    error,
    loading,
    run,
    cancel,
    mutate
  };
}
```

:::

- 使用场景
1. 普通数据请求：
```js
const { data, loading } = useRequest({
  url: '/api/users',
  method: 'GET'
});
```
2. 带参数的手动请求：
```js
const { run: fetchUser } = useRequest(
  { url: '/api/user', method: 'GET' },
  { manual: true }
);

// 点击按钮时触发
const handleClick = () => fetchUser({ params: { id: 1 } });
```
4. 依赖请求：
```js
const { data } = useRequest(
  { url: '/api/products', method: 'GET' },
  { cacheKey: 'products', staleTime: 60000 } // 缓存1分钟
);
```
1. 普通数据请求：
```js
const userId = ref<number | null>(null);
const { data: user } = useRequest(
  () => ({ url: `/api/user/${userId.value}`, method: 'GET' }),
  { ready: computed(() => userId.value !== null) }
);
```

## 使用 React Hook 实现 useCount
::: details 参考答案
```js
import { useState, useCallback } from 'react';

interface UseCountOptions {
  initialValue?: number;
  min?: number;
  max?: number;
  step?: number;
}

interface UseCountReturn {
  count: number;
  increment: () => void;
  decrement: () => void;
  reset: () => void;
  setCount: (value: number) => void;
  canIncrement: boolean;
  canDecrement: boolean;
}

export function useCount(options: UseCountOptions = {}): UseCountReturn {
  const {
    initialValue = 0,
    min = -Infinity,
    max = Infinity,
    step = 1
  } = options;

  const [count, setCount] = useState(initialValue);

  const canIncrement = count < max;
  const canDecrement = count > min;

  const increment = useCallback(() => {
    setCount(prev => Math.min(prev + step, max));
  }, [max, step]);

  const decrement = useCallback(() => {
    setCount(prev => Math.max(prev - step, min));
  }, [min, step]);

  const reset = useCallback(() => {
    setCount(initialValue);
  }, [initialValue]);

  const set = useCallback((value: number) => {
    setCount(Math.max(min, Math.min(value, max)));
  }, [min, max]);

  return {
    count,
    increment,
    decrement,
    reset,
    setCount: set,
    canIncrement,
    canDecrement,
  };
}
```
:::

## 使用 React Hook 实现 useRequest
::: details 参考答案
const { loading, data, error } = useRequest(url) // 可只考虑 get 请求
```js
import { useState, useEffect } from 'react'

function useRequest(url) {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      setError(null)

      try {
        const response = await fetch(url)
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }
        const result = await response.json()
        setData(result)
      } catch (e) {
        setError(e)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [url])

  return { data, loading, error }
}

export default useRequest
```
:::

## 手写 VNode 对象，表示如下 DOM 节点
```html
<div class="container">
  <img src="x1.png" />
  <p>hello</p>
</div>
```

::: details 参考答案
- 为什么需要 VNode？
    1. 性能优化：比对虚拟 DOM 比直接操作真实 DOM 高效
    2. 跨平台：可以渲染到不同平台（Web、Native 等）
    3. 声明式编程：更直观地描述 UI 结构
    4. 批处理更新：合并多次 DOM 操作
```js
const vnode = {
  type: 'div',
  props: {
    class: 'container'
  },
  children: [
    {
      type: 'img',
      props: {
        src: 'x1.png'
      },
      children: null // 自闭合标签没有子节点
    },
    {
      type: 'p',
      props: {},
      children: 'hello' // 文本节点可以直接用字符串表示
    }
  ]
};
```
:::