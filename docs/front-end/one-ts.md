## TS 优缺点，使用场景
::: details 参考答案
一、优点
1. `静态类型检查`与更强的可靠性，在编译阶段（或开发时）就`捕捉到类型错误`
2. 卓越的代码`智能提示`和开发体验
3. 更好的`可读性与可维护性（文档化）`: 函数签名、接口定义本身就是最好的文档。
4. 渐进式采用与 `JavaScript 的超集`，支持最新的 ECMAScript 特性
5. 更强的面向对象编程能力，如 `public/private/protected 修饰符`、`抽象类`、`接口`等，适合构建大型复杂应用。

二、缺点
1. 学习成本和开发成本
2. 增加了项目复杂度: TS 代码不能直接运行，必须通过`编译器（tsc）`或`构建工具（如 Webpack、Vite）`将其编译为 JS，需要管理 `tsconfig.json` 配置文件
3. 与某些库的集成问题: 需要该库提供类型定义文件（`.d.ts`）
4. 类型定义混乱时，`可读性与可维护性（文档化）`是不好的

三、强烈推荐使用 TypeScript 的场景
1. 大型和复杂的项目
2. 前端框架项目
    - Angular：官方完全使用 TS 构建，是首选语言。
    - React / Vue：与 TS 结合得非常完美，官方提供了良好的支持。
3. 库和框架的开发
4. 需要长期维护的项目
5. 团队协作项目
:::

## TS 基础类型有哪些
::: details 参考答案
1. JavaScript 原有基础类型 (ES6)

2. TypeScript 新增基础类型

| 类型      | 描述                                                                 | 示例                                                                 |
|-----------|----------------------------------------------------------------------|----------------------------------------------------------------------|
| &zwnj;**any**&zwnj;   | 任意类型。关闭类型检查，可以被赋值为任何类型。应谨慎使用             | `let notSure: any = 4; notSure = "maybe a string";`                 |
| &zwnj;**unknown**&zwnj; | 类型安全的 any。表示值可以是任何类型，但在使用前必须进行类型检查     | `let value: unknown; value = 5; if (typeof value === 'number') { let num: number = value; }` |
| &zwnj;**void**&zwnj;  | 无返回值类型。通常用于表示函数没有返回值                             | `function warnUser(): void { console.log("warning"); }`             |
| &zwnj;**never**&zwnj; | 永不类型。表示永远不会发生的值的类型。常用于抛出异常或永不结束的函数 | `function error(message: string): never { throw new Error(message); }` |
| &zwnj;**enum**&zwnj;  | 枚举类型。用于定义命名的常量集合                                     | `enum Color { Red, Green, Blue } let c: Color = Color.Green;`       |
| &zwnj;**tuple**&zwnj; | 元组类型。表示一个已知元素数量和类型的数组，各元素的类型不必相同     | `let x: [string, number]; x = ["hello", 10]; // OK x = [10, "hello"]; // Error` |

3. 其他常见且重要的类型（非基础但必用）

| 类型 | 描述 | 语法示例 | 使用场景 |
| :--- | :--- | :--- | :--- |
| **数组类型**<br>(Array Types) | 表示由特定类型的元素组成的数组。 | `let list: number[] = [1, 2, 3];`<br>`let names: Array<string>;` | 定义一组相同类型的数据集合，如商品列表、用户ID数组等。 |
| **对象类型**<br>(Object Type) | 表示任何非原始类型的值（非`number`, `string`, `boolean`等）。 | `function handleObject(obj: object): void { ... }`<br>`handleObject({ prop: 0 }); // OK`<br>`handleObject(42); // Error` | 当一个函数需要接受一个对象但不关心其具体结构时。 |
| **联合类型**<br>(Union Types) | 表示一个值可以是几种类型之一。使用竖线 `\|` 分隔。 | `let id: string \| number;`<br>`id = "123"; // OK`<br>`id = 123; // OK` | 处理可能具有多种类型的变量，如API返回值、配置项等。 |
| **字面量类型**<br>(Literal Types) | 将值本身作为一个类型。常与联合类型结合使用。 | `let direction: "left" \| "right" \| "up" \| "down";`<br>`direction = "left"; // OK`<br>`direction = "north"; // Error` | 限制变量只能取特定的几个值，实现类似枚举的效果，增强类型安全性。 |
| **类型别名**<br>(Type Aliases) | 为一个类型（可以是任意类型）创建一个新名称。 | `type ID = number \| string;`<br>`type User = { name: string; id: ID; };`<br>`type Callback = (data: string) => void;` | 简化复杂的类型定义，提高代码可读性和可维护性，便于集中修改。 |
| **接口**<br>(Interfaces) | 主要用于**定义对象的形状**，描述对象应具有的属性和方法。 | `interface Person {`<br>`  name: string;`<br>`  age: number;`<br>`  greet(): void;`<br>`}` | 定义契约，确保对象的结构符合预期。常用于定义API响应、组件Props、类公共接口等。 |
| **函数类型**<br>(Function Types) | 定义函数的类型，包括参数类型和返回值类型。 | `type GreetFunction = (name: string) => void;`<br>`interface SearchFunc {`<br>`  (source: string, subString: string): boolean;`<br>`}` | 规范回调函数、事件处理函数、函数参数等的格式，确保函数被正确使用。 |
| **泛型**<br>(Generics) | 创建可重用的组件，该组件可以支持多种类型，而不是单一类型。 | `interface Box<T> { content: T; }`<br>`let numberBox: Box<number> = { content: 42 };`<br>`let stringBox: Box<string> = { content: "hello" };` | 编写灵活、可复用的函数、接口和类，如集合、工具函数、API封装等。 |
| **交叉类型**<br>(Intersection Types) | 将多个类型合并为一个类型，拥有所有类型的特性。使用 `&` 连接。 | `interface A { a: number; }`<br>`interface B { b: string; }`<br>`type C = A & B; // { a: number; b: string; }` | 混合（Mixin）多个对象或接口的特性，常用于组合。 |
| **索引签名**<br>(Index Signatures) | 用于描述那些**通过索引访问**的对象的类型，如 `obj[prop]`。 | `interface StringArray {`<br>`  [index: number]: string;`<br>`}`<br>`let myArray: StringArray;`<br>`myArray[0] = "Bob"; // OK` | 定义字典、哈希映射等具有动态属性名的对象结构。 |
:::

## 数组 Array 和元组 Tuple 的区别是什么
::: details 参考答案
- 数组：表示`同一类型`的、`数量不定`的元素集合。
```js
// 定义一个字符串数组
let fruits: string[] = ['apple', 'banana', 'orange'];
// 或者使用泛型语法
let numbers: Array<number> = [1, 2, 3, 4, 5];

// 元素类型必须相同
fruits.push('mango'); // ✅ 正确：添加的是 string 类型
fruits.push(100);     // ❌ 错误：不能添加 number 类型到 string[]

// 长度不固定，可以自由操作
fruits.pop(); // 删除最后一个元素
fruits.shift(); // 删除第一个元素
console.log(fruits); // 输出：['banana', 'orange'] (长度改变了)
```

- 元组：表示`固定长度`、`特定位置有特定类型`的元素集合。
    ```js
    // 定义一个元组类型：第一个元素是string，第二个是number，第三个是boolean
    let person: [string, number, boolean];
    person = ['Alice', 30, true]; // ✅ 正确：结构完全匹配

    person = [30, 'Alice', true]; // ❌ 错误：顺序不对，类型不匹配
    person = ['Alice', 30];       // ❌ 错误：长度不够，缺少第三个元素

    // 访问元素时，能获得准确的类型推断
    let name: string = person[0]; // ✅ 类型是 string
    let age: number = person[1];  // ✅ 类型是 number
    let isActive: boolean = person[2]; // ✅ 类型是 boolean

    // 越界问题（重要！）
    person.push('extra data'); // ⚠️ **在 TypeScript 中，这是一个已知的“漏洞”**
    // 虽然编译时不会报错（TS允许push），但**绝对不允许访问**越界元素
    // console.log(person[3]); // ❌ 错误：长度为 "3" 的元组类型 "[string, number, boolean]" 在索引 "3" 处没有元素。

    // 一个非常经典的用例：处理 Object.entries()
    const obj = { name: 'Bob', age: 25 };
    const entries: [string, any][] = Object.entries(obj);
    // entries 是一个元组数组，每个元组的结构都是 [string, any]
    ```

    可选元素和剩余元素的元组 (TS 4.0+)
    ```js
    // 带有可选元素的元组：第三个元素是可选的 number
    type HttpStatus = [number, string, number?];
    let response1: HttpStatus = [200, 'OK']; // ✅
    let response2: HttpStatus = [404, 'Not Found', 0.5]; // ✅

    // 带有剩余元素的元组：前两个类型固定，后面是任意数量的 string
    type StringList = [number, boolean, ...string[]];
    let list: StringList = [1, true, 'a', 'b', 'c']; // ✅
    ```
:::

## 枚举 enum 是什么？有什么使用场景？
::: details 参考答案
枚举 是 TypeScript 提供的一种特殊类型，它允许我们定义一个命`名的常量集合`。

1. 数字枚举 (Numeric Enums): 最常见的枚举，成员的值是自增长的数字（`从 0 开始`）。
```js
enum StatusCode {
  Success = 200, // 手动初始化
  BadRequest = 400,
  Unauthorized, // 401 (自动增长)
  NotFound,     // 402
}
console.log(StatusCode.Success); // 200
console.log(StatusCode.Unauthorized); // 401
```

2. 字符串枚举 (String Enums): 每个成员都`必须用字符串字面量初始化`。`没有自增长行为`，但可读性更强。
```js
enum Direction {
  Up = "UP",
  Down = "DOWN",
  Left = "LEFT",
  Right = "RIGHT",
}
console.log(Direction.Up); // "UP"
// 编译后代码更清晰，易于调试
```

3. 异构枚举 (Heterogeneous Enums): `混合了数字和字符串成员`（但不推荐使用，因为通常没有合理的理由这样做）。
```js
enum WeirdEnum {
  No = 0,
  Yes = "YES",
}
```

枚举的使用场景
1. 替代魔法数字/字符串，`提高可读性`。如枚举http状态码的含义
2. 定义一组有限的、相关的选项。如方向有哪些、用户角色有哪些
3. 作为标志位（位运算）：数字枚举可以`与位运算符结合使用`，高效地存储和检查多个布尔状态（标志位）。
```js
enum FilePermissions {
  None = 0,
  Read = 1 << 0,    // 1 (二进制 001)
  Write = 1 << 1,   // 2 (二进制 010)
  Execute = 1 << 2, // 4 (二进制 100)
}

// 为用户分配读写权限
let myPermissions: FilePermissions = FilePermissions.Read | FilePermissions.Write; // 3 (二进制 011)

// 检查是否拥有写权限
const canWrite = (myPermissions & FilePermissions.Write) !== FilePermissions.None; // true
```

4. 与`联合类型和 keyof` 结合，实现更安全的反向映射和遍历
```js
enum LogLevel {
  Error,
  Warn,
  Info,
  Debug,
}

// 类型安全地获取所有键
type LogLevelStrings = keyof typeof LogLevel; // "Error" | "Warn" | "Info" | "Debug"

// 安全地遍历枚举
Object.values(LogLevel)
  .filter(value => typeof value === 'number') // 数字枚举有反向映射，需要过滤
  .forEach(level => {
    console.log(LogLevel[level]); // 输出: 'Error', 'Warn', 'Info', 'Debug'
  });
```

5. `反向映射`：`数字枚举`在编译后会产生一个从值到名的反向映射，`字符串枚举没有`。
```js
enum NumEnum { A }
let nameOfA = NumEnum[0]; // "A"

enum StrEnum { A = 'a' }
let nameOfA2 = StrEnum['a']; // undefined ❌ (字符串枚举没有反向映射)
```
:::

## keyof 和 typeof 有什么区别？
::: details 参考答案
- `typeof`：用于`值`，获取该值的`类型`。它后面跟的是一个 `JavaScript 值或变量`。
```js
// 1. 从值推断类型
const person = { name: 'Alice', age: 30 };
type Person = typeof person;
// 等价于: type Person = { name: string; age: number; }

// 2. 获取基本值的类型
const str = 'hello';
type S = typeof str; // type S = "hello" (这是一个字面量类型)
const num = 42;
type N = typeof num; // type N = 42

// 3. 获取函数的类型
function greet() { return 'Hello!'; }
type GreetFunc = typeof greet; // type GreetFunc = () => string

// 4. 与 `keyof` 联用（常见场景）
const config = { width: 100, height: 200 };
type ConfigKeys = keyof typeof config; // type ConfigKeys = "width" | "height"
// 分解：
// Step 1: typeof config -> { width: number; height: number; } (这是一个类型)
// Step 2: keyof { width: number; height: number; } -> "width" | "height"
```

- `keyof`：用于`类型`，获取该类型的`所有键（属性名）的联合类型`。它后面跟的是一个 `TypeScript 类型`。

```js
// 1. 直接从接口类型获取键
interface Person {
  name: string;
  age: number;
  isActive: boolean;
}
type PersonKeys = keyof Person;
// type PersonKeys = "name" | "age" | "isActive"

// 2. 用于泛型约束，确保安全访问
function getProperty<T, K extends keyof T>(obj: T, key: K): T[K] {
  return obj[key]; // 现在是类型安全的！
}
const person: Person = { name: 'Bob', age: 25, isActive: true };
const name = getProperty(person, 'name'); // string ✅
const invalid = getProperty(person, 'email'); // ❌ 错误：Argument of type '"email"' is not assignable to parameter of type 'keyof Person'.

// 3. 与 `typeof` 联用（从值到类型再到键）
const myObj = { a: 1, b: '2', c: true };
type MyObjKeys = keyof typeof myObj; // type MyObjKeys = "a" | "b" | "c"
// 分解：
// Step 1: typeof myObj -> { a: number; b: string; c: boolean; } (这是一个类型)
// Step 2: keyof { a: number; b: string; c: boolean; } -> "a" | "b" | "c"
```
:::

## any void never unknown 有什么区别
::: details 参考答案
`any`, `void`, `unknown`, 和 `never` 是 TypeScript 中代表“特殊情况”的类型。以下是它们的核心区别对比：

| 类型 | 描述 | 安全性 | 主要使用场景 |
| :--- | :--- |  :--- | :--- |
| **`any`** | **逃避类型检查**。放弃一切约束，回到纯 JS 模式。 | ❌ 最不安全 | 1. 迁移旧 JS 项目<br>2. 处理确实无法确定类型的内容（最后手段） |
| **`unknown`** | **类型安全的 `any`**。表示未知的值，使用前必须进行类型检查。 | ⭐️ 最安全 | 1. 处理外部动态数据（API、用户输入）<br>2. 强制类型检查的容器 |
| **`void`** | **“空”类型**。通常表示函数没有返回值(仅 `undefined/null`)。 | ✅ 安全 | 1. 标注无返回值的函数<br>2. 定义回调函数类型 |
| **`never`** | **“永不”类型**。表示永远不可能发生的值。 | ✅ 安全 | 1. 抛出错误的函数<br>2. 无限循环函数<br>3. 穷尽检查（Exhaustiveness Checking） |

```js
// ************unknown使用前必须进行类型检查************
let uncertain: unknown = 'hello';
uncertain = 42;           // ✅ OK (任何值都可以赋给 unknown)

let num: number = uncertain; // ❌ ERROR: Type 'unknown' is not assignable to type 'number'.

// 必须进行类型检查后才能使用（类型守卫）
if (typeof uncertain === 'string') {
    let str: string = uncertain; // ✅ OK (在这个块内，uncertain 被收窄为 string)
    console.log(str.toUpperCase());
}

if (typeof uncertain === 'number') {
    let num: number = uncertain; // ✅ OK
    console.log(num.toFixed(2));
}

// ************void表示一个函数没有返回任何值************
// 函数没有返回值
function logMessage(message: string): void {
  console.log(message);
  // 隐式返回 undefined
}

// 用于回调函数类型定义
type Callback = () => void;
const cb: Callback = () => { console.log('done'); }; // ✅ OK
const cb2: Callback = () => 123; // ❌ ERROR: Type 'number' is not assignable to type 'void'.

// 一个声明为 void 类型的变量，只能被赋值为 undefined 或 null (在严格模式下只能是 undefined)
let unusable: void = undefined; // ✅ OK

// ************never表示那些永远不可能返回的函数的返回值类型，或者永远不可能存在的值的类型************
// 1. 函数抛出错误
function throwError(message: string): never {
  throw new Error(message);
}

// 2. 函数陷入无限循环
function infiniteLoop(): never {
  while (true) {}
}

// 3. 穷尽检查 (Exhaustiveness Checking)
type Shape = 'circle' | 'square' | 'triangle';

function getArea(shape: Shape): number {
  switch (shape) {
    case 'circle': return 1;
    case 'square': return 2;
    default:
      // 如果某天 Shape 增加了 'hexagon'，但这里没处理，
      // 那么 `shape` 在 default 里就会被收窄为 `never`，从而产生类型错误！
      const _exhaustiveCheck: never = shape;
      return _exhaustiveCheck;
  }
}
```
:::

## TS 访问修饰符 public protected private 有什么作用
::: details 参考答案
TypeScript 中的访问修饰符 (public, protected, private) 是`面向对象编程`（OOP）的核心概念，它们用于`控制类成员（属性和方法）的可见性和可访问性`。

| 修饰符 | 可访问范围 | 描述 | 封装级别 |
| :--- | :--- | :--- | :--- |
| **`public`** | **任何地方** | 默认修饰符。成员可以在类内部、外部、子类中自由访问。 | 最低（最开放） |
| **`protected`** | **类内部及其子类** | 成员可以在定义它的类内部和其子类内部访问，但在类外部不可访问。 | 中等 |
| **`private`** | **仅类内部** | 成员只能在定义它的类内部访问，在类外部和子类中均不可访问。 | 最高（最严格） |

1. public - 公共的（默认）
```js
class Person {
  // 显式声明 public (可以省略，因为它是默认的)
  public name: string;

  // 默认就是 public，等价于上一行
  age: number;

  constructor(name: string, age: number) {
    this.name = name;
    this.age = age;
  }

  public introduce() {
    // 类内部访问：✅ OK
    console.log(`Hello, I'm ${this.name} and I'm ${this.age} years old.`);
  }
}

const person = new Person('Alice', 30);

// 类外部访问公共属性：✅ OK
console.log(person.name); // "Alice"
console.log(person.age);  // 30

// 调用公共方法：✅ OK
person.introduce(); // "Hello, I'm Alice..."
```

2. protected - 受保护的
```js
class Vehicle {
  // 受保护的属性
  protected wheels: number;

  constructor(wheels: number) {
    this.wheels = wheels;
  }

  // 受保护的方法
  protected getWheelInfo(): string {
    return `This vehicle has ${this.wheels} wheels.`;
  }
}

class Car extends Vehicle {
  constructor() {
    super(4); // 调用父类的构造函数
  }

  public describe() {
    // 子类内部访问父类的 protected 成员：✅ OK
    console.log(`I am a car. ${this.getWheelInfo()}`);
    console.log(this.wheels); // 也可以访问属性 ✅ OK
  }
}

const myVehicle = new Vehicle(2);
// 类外部访问 protected 成员：❌ ERROR
// console.log(myVehicle.wheels); // Property 'wheels' is protected and only accessible within class 'Vehicle' and its subclasses.
// myVehicle.getWheelInfo(); // 同样错误

const myCar = new Car();
myCar.describe(); // ✅ OK (在子类内部访问是允许的)
// myCar.getWheelInfo(); // ❌ ERROR (在类外部访问，即使是子类的实例也不行)
```

3. private - 私有的
```js
class BankAccount {
  // 私有属性：账户余额是敏感数据，必须被保护
  private balance: number;
  public readonly accountNumber: string;

  constructor(accountNumber: string, initialBalance: number) {
    this.accountNumber = accountNumber;
    this.balance = initialBalance;
  }

  // 公共方法作为操作私有属性的“安全通道”
  public deposit(amount: number): void {
    if (amount > 0) {
      // 类内部可以访问 private 成员：✅ OK
      this.balance += amount;
    }
  }

  public withdraw(amount: number): boolean {
    if (amount > 0 && amount <= this.balance) {
      this.balance -= amount;
      return true;
    }
    return false;
  }

  // 提供一个公共方法来获取余额，而不是直接暴露属性
  public getBalance(): number {
    return this.balance;
  }
}

class SavingsAccount extends BankAccount {
  constructor(accountNumber: string) {
    super(accountNumber, 0);
  }

  public showBalance() {
    // 子类内部尝试访问父类的 private 成员：❌ ERROR
    // console.log(this.balance); // Property 'balance' is private and only accessible within class 'BankAccount'.
    // 必须使用公共方法
    console.log(this.getBalance()); // ✅ OK
  }
}

const myAccount = new BankAccount('12345', 100);
myAccount.deposit(50); // ✅ OK (通过公共方法操作)
console.log(myAccount.getBalance()); // ✅ OK (通过公共方法读取)
// 直接访问 private 属性：❌ ERROR
// console.log(myAccount.balance); // Property 'balance' is private and only accessible within class 'BankAccount'.
```
:::

## type 和 interface 共同和区别，如何选择
::: details 参考答案

- 核心共同点

它们的主要目的都是为`形状（Shape）定义契约`，并且在`很多情况`下可以`互换使用`。
```js
// 用 interface 定义
interface PersonInterface {
  name: string;
  age: number;
}

// 用 type 定义
type PersonType = {
  name: string;
  age: number;
};

// 以下用法几乎没有区别
function greetWithInterface(person: PersonInterface) { ... }
function greetWithType(person: PersonType) { ... }

const person: PersonInterface = { name: 'Alice', age: 30 }; // ✅
const samePerson: PersonType = { name: 'Alice', age: 30 };  // ✅
```

- 关键区别详解
    1. `声明合并`: Interface 支持，Type 不支持
    ```js
    // Interface - 可以重复声明，会自动合并
    interface User {
        name: string;
    }
    interface User {
        age: number;
    }
    // 最终 User 接口为 { name: string; age: number; }
    const user: User = { name: 'Alice', age: 30 }; // ✅ OK

    // Type - 重复声明会报错
    type UserType = {
        name: string;
    };
    type UserType = { // ❌ ERROR: Duplicate identifier 'UserType'
        age: number;
    };
    ```
    `使用场景`：当你为第三方库或外部环境（如 window 对象）`添加自定义属性`时，声明合并非常有用。

    2. `扩展`: 两者都能扩展，但语法不同。
    ```js
    // Interface 扩展 Interface
    interface Animal {
    name: string;
    }
    interface Bear extends Animal {
    honey: boolean;
    }

    // Type 扩展 Type （使用交叉类型 &）
    type AnimalType = {
    name: string;
    };
    type BearType = AnimalType & {
    honey: boolean;
    };

    // Interface 扩展 Type
    type AnotherAnimal = {
    name: string;
    };
    interface AnotherBear extends AnotherAnimal {
    honey: boolean;
    }

    // Type 扩展 Interface
    interface YetAnotherAnimal {
    name: string;
    }
    type YetAnotherBear = YetAnotherAnimal & {
    honey: boolean;
    };
    ```

    3. 灵活性: Type 可以表达非对象类型，更灵活
    ```js
    // 联合类型 (Union Types) - 只能用 type
    type ID = string | number;
    type Status = 'pending' | 'success' | 'error';

    // 元组类型 (Tuple Types) - 两者都可以，但 type 更简洁
    type Pair = [number, number];
    interface PairInterface {
    0: number;
    1: number;
    length: 2;
    }

    // 映射类型、条件类型等高级类型 - 只能用 type
    type Readonly<T> = { readonly [P in keyof T]: T[P] };
    type Nullable<T> = T | null;
    ```
:::

## 什么是泛型，如何使用它？
::: details 参考答案
- 什么是泛型？

简单来说，泛型就是`类型参数化`。它允许你在定义函数、接口或类的时候，`不预先指定具体的类型`，而是在`使用的时候再指定类型`。通常用 `T、U、V` 等表示

- 泛型要解决的问题

让函数能够处理多种类型，同时还能保持参数和返回值之间的`类型关联`。

- 如何使用泛型？
    1. 泛型函数 - 基本语法： `function name<T>(arg: T): T { ... }`
    ```js
    // T 是类型变量，它是传入类型和返回类型的占位符
    function identity<T>(arg: T): T {
        return arg;
    }

    // 使用方式一：显式指定类型（在尖括号中）
    let output1 = identity<string>("myString"); // output1 的类型是 string
    let output2 = identity<number>(100); // output2 的类型是 number

    // 使用方式二：更常见的是利用类型推断，让编译器自动推断类型
    let output3 = identity("myString"); // TS 推断 T 为 string，output3 是 string
    let output4 = identity(100); // TS 推断 T 为 number，output4 是 number

    const result = identity('hello');
    result.toFixed(); // ❌ 编译时错误！Property 'toFixed' does not exist on type 'string'.
    ```

    2. 使用泛型变量: 在函数体内使用泛型类型 `T` 时，你`不能假设`它是某种特定类型。
    ```js
    function loggingIdentity<T>(arg: T): T {
        // console.log(arg.length); // ❌ 错误！编译器不知道 T 是否有 .length 属性
        return arg;
    }
    ```

    3. 泛型约束: 使用 `extends` 关键字来约束泛型参数必须符合某种形状
    ```js
    // 定义一个接口，要求有 length 属性
    interface Lengthwise {
        length: number;
    }

    // 使用 extends 约束 T 必须满足 Lengthwise 接口
    function loggingIdentity<T extends Lengthwise>(arg: T): T {
        console.log(arg.length); // ✅ 现在可以了，因为 T 肯定有 .length
        return arg;
    }

    loggingIdentity(3); // ❌ 错误！数字没有 .length 属性
    loggingIdentity({ length: 10, value: 3 }); // ✅ 正确
    loggingIdentity("hello"); // ✅ 正确，字符串有 .length
    loggingIdentity([1, 2, 3]); // ✅ 正确，数组有 .length
    ```

    4. 泛型接口: 你可以使用泛型来定义接口，使其更加灵活。
    ```js
    // 定义一个泛型接口
    interface GenericIdentityFn<T> {
        (arg: T): T;
    }

    // 使用泛型接口来定义一个函数
    function identity<T>(arg: T): T {
        return arg;
    }

    // 创建一个特定类型的函数
    let myStringIdentity: GenericIdentityFn<string> = identity; // 现在它专门处理 string
    ```

    5. 泛型类: 类也可以是泛型的。
    ```js
    class GenericNumber<T> {
        zeroValue: T;
        add: (x: T, y: T) => T;

        constructor(zeroValue: T, add: (x: T, y: T) => T) {
            this.zeroValue = zeroValue;
            this.add = add;
        }
    }

    // 创建一个处理 number 的实例
    let myGenericNumber = new GenericNumber<number>(0, (x, y) => x + y);
    console.log(myGenericNumber.add(5, 10)); // 15

    // 创建一个处理 string 的实例
    let stringNumeric = new GenericNumber<string>("", (x, y) => x + y);
    console.log(stringNumeric.add("Hello, ", "World!")); // "Hello, World!"
    ```
    6. 多个类型参数: 泛型可以定义多个类型参数。
    ```js
    // 一个函数，交换元组中的两个值
    function swap<T, U>(tuple: [T, U]): [U, T] {
        return [tuple[1], tuple[0]];
    }

    const result = swap(['hello', 42]); // result 的类型是 [number, string]
    console.log(result); // [42, 'hello']
    ```

- 实战使用场景
    - 操作数组而不失去类型信息：
    ```js
    function getFirstElement<T>(arr: T[]): T | undefined {
        return arr[0];
    }
    const firstNum = getFirstElement([1, 2, 3]); // number | undefined
    const firstStr = getFirstElement(['a', 'b', 'c']); // string | undefined
    ```

    - 封装 API 请求：
    ```js
    interface ApiResponse<T> {
        data: T;
        status: number;
    }
    async function fetchData<T>(url: string): Promise<ApiResponse<T>> {
        const response = await fetch(url);
        return response.json();
    }
    // 使用
    interface User { id: number; name: string; }
    const userResponse = await fetchData<User>('/api/user/1');
    console.log(userResponse.data.name); // data 是 User 类型 ✅
    ```

    - 从对象中安全地获取值（结合 keyof 约束）：
    ```js
    function getProperty<T, K extends keyof T>(obj: T, key: K): T[K] {
        return obj[key]; // 完全类型安全！
    }
    const person = { name: 'Alice', age: 30 };
    const name = getProperty(person, 'name'); // string ✅
    const age = getProperty(person, 'age'); // number ✅
    // getProperty(person, 'email'); // ❌ 错误！'email' 不在 keyof person 中
    ```
:::

## 什么是交叉类型和联合类型

::: details 参考答案
- `交叉类型 A & B`：表示一个值必须 `同时满足 A 类型 和 B 类型` 的所有特征（兼具所有）
    1. 合并对象类型: 可以模拟“`混入`”（mixin）模式
    ```js
    interface BusinessPartner {
        name: string;
        credit: number;
    }

    interface Identity {
        id: string;
        email: string;
    }

    // Employee 必须同时拥有 BusinessPartner 和 Identity 的所有属性
    type Employee = BusinessPartner & Identity;

    const employee1: Employee = {
        name: "Alice",
        credit: 1000,
        id: "emp-123",
        email: "alice@company.com"
    }; // ✅ OK

    const employee2: Employee = {
        name: "Bob",
        credit: 500
    }; // ❌ Error: Missing properties 'id', 'email'
    ```

    2. 合并现有类型和扩展
    ```js
    interface Person {
        name: string;
        age: number;
    }

    // 添加新属性
    type EmployeeWithRole = Person & { employeeId: string; department: string };

    const emp: EmployeeWithRole = {
        name: "Charlie",
        age: 28,
        employeeId: "E-789",
        department: "Engineering"
    };
    ```

    3. 与泛型结合: 在泛型函数中组合类型非常强大。
    ```js
    function merge<T, U>(obj1: T, obj2: U): T & U {
        return { ...obj1, ...obj2 };
    }

    const obj1 = { a: 1 };
    const obj2 = { b: "hello" };
    const mergedObj = merge(obj1, obj2); // mergedObj 的类型是 { a: number } & { b: string }
    console.log(mergedObj.a); // 1
    console.log(mergedObj.b); // "hello"
    ```

- `联合类型 A | B`：表示一个值可以是 `A 类型 或者 B 类型`（满足其一即可）
    1. 基本用法
    ```js
    // 定义一个变量，它可以是 string 或 number
    let id: string | number;
    id = "ABC123"; // ✅ OK
    id = 123;      // ✅ OK
    id = true;     // ❌ Error: Type 'boolean' is not assignable to type 'string | number'.

    // 函数参数也可以是联合类型
    function printId(id: string | number) {
        console.log(`Your ID is: ${id}`);
    }
    printId(101); // ✅ OK
    printId("202"); // ✅ OK
    ```
    2. 类型收窄: 由于 TS 不知道运行时到底是哪个类型，你需要使用`类型守卫`来收窄类型。
    ```js
    function printId(id: string | number) {
        if (typeof id === "string") {
            // 在这个分支内，id 被收窄为 string 类型
            console.log(id.toUpperCase()); // ✅ OK
        } else {
            // 在这个分支内，id 被收窄为 number 类型
            console.log(id.toFixed(2)); // ✅ OK
        }
    }
    ```

    3. 字面量联合类型: 非常有用的模式，限制值只能从一组预定的字面量中选取。
    ```js
    // 方向只能是这四个字符串之一
    type Direction = "up" | "down" | "left" | "right";
    let move: Direction;
    move = "up"; // ✅ OK
    move = "diagonal"; // ❌ Error

    // 状态码
    type Status = "success" | "error" | "loading";
    ```
:::

## 是否用过工具类型
::: details 参考答案
`本质上是内置的泛型类型`

1. 常用内置工具类型
    - `Partial<T>` - 作用：将类型 T 的所有属性`变为可选`。
    ```js
    interface User {
        id: number;
        name: string;
        email: string;
    }

    // 更新用户时，可能只提供部分字段
    function updateUser(id: number, fieldsToUpdate: Partial<User>) {
    // 在数据库中更新用户...
    }

    updateUser(1, { name: "Alice" }); // ✅ OK，只更新 name
    updateUser(2, {}); // ✅ OK，空对象也允许
    ```

    - `Required<T>` - 作用：将类型 T 的所有属性`变为必选`（与 Partial 相反）。
    ```js
    interface Props {
        title?: string;
        count?: number;
    }

    // 在组件内部，我们需要确保这些属性一定有值
    type InternalProps = Required<Props>;
    // 等价于 { title: string; count: number; }

    const defaultProps: InternalProps = {
        title: "Default",
        count: 0
    };
    ```

    - `Readonly<T>` - 作用：将类型 T 的所有属性`变为只读`。
    ```js
    interface Config {
        apiUrl: string;
        timeout: number;
    }

    const appConfig: Readonly<Config> = {
        apiUrl: "https://api.example.com",
        timeout: 5000
    };

    // appConfig.apiUrl = "new-url"; // ❌ Error: Cannot assign to 'apiUrl' because it is a read-only property.
    ```

    - `Pick<T, K>` - 作用：从类型 T 中`挑出一组`属性 K 来构造新类型。
    ```js
    interface User {
        id: number;
        name: string;
        email: string;
        createdAt: Date;
    }

    // 只需要 User 中的 name 和 email 来创建用户简介
    type UserProfile = Pick<User, 'name' | 'email'>;
    // 等价于 { name: string; email: string; }

    const profile: UserProfile = {
        name: "Alice",
        email: "alice@example.com"
    };
    ```

    - `Omit<T, K>` - 作用：从类型 T 中`省略一组`属性 K 来构造新类型（与 Pick 相反）。
    ```js
    interface User {
        id: number;
        name: string;
        email: string;
        password: string; // 敏感信息！
    }

    // 从用户对象中省略密码，再发送给客户端
    type SafeUser = Omit<User, 'password'>;
    // 等价于 { id: number; name: string; email: string; }

    function getUser(): SafeUser {
    // ... 从数据库获取用户
    // return user; // 自动排除了 password
    }
    ```

    - `Record<K, T>` - 作用：构造一个对象类型，其键的类型为 K，值的类型为 T。
    ```js
    // 定义一个对象，键是页面名，值是页面配置
    type PageConfig = Record<'home' | 'about' | 'contact', { title: string; requiresAuth: boolean }>;

    const pages: PageConfig = {
        home: { title: "Home", requiresAuth: false },
        about: { title: "About", requiresAuth: false },
        contact: { title: "Contact", requiresAuth: true }
    };
    ```

    - `ReturnType<T>` - 作用：获取`函数类型 T 的返回值类型`。
    ```js
    function fetchUser() {
        return { name: "Alice", age: 30 };
    }

    // 获取 fetchUser 的返回类型，避免重复定义
    type User = ReturnType<typeof fetchUser>;
    // type User = { name: string; age: number; }

    // 非常有用的场景：获取异步函数的 Promise 返回值
    async function getData() {
        return await fetch('/api/data').then(res => res.json());
    }
    type Data = Awaited<ReturnType<typeof getData>>; // 获取 Promise 解包后的类型
    ```

    - `Parameters<T>` - 作用：获取`函数类型 T 的参数元组类型`。
    ```js
    function createUser(name: string, age: number, isActive: boolean = true) {
    // ...
    }

    // 获取 createUser 的参数类型
    type CreateUserParams = Parameters<typeof createUser>;
    // type CreateUserParams = [name: string, age: number, isActive?: boolean]

    // 实用场景：包装函数，保持参数类型一致
    function logAndCreateUser(...args: Parameters<typeof createUser>) {
        console.log("Creating user with args:", args);
        return createUser(...args); // 参数类型安全地传递
    }
    ```

2. 组合使用工具类型
```js
interface Product {
  id: number;
  name: string;
  price: number;
  description: string;
  inStock: boolean;
  categories: string[];
}

// 场景：创建一个用于更新产品的类型，只需要 id 和可选的部分字段，并且所有字段都是只读的
type UpdateProductDto = Readonly<Pick<Product, 'id'> & Partial<Omit<Product, 'id'>>>;

// 分解步骤：
// 1. Omit<Product, 'id'> -> 去掉 id 后的 Product
// 2. Partial<...> -> 让所有字段可选
// 3. Pick<Product, 'id'> -> 单独拿出 id
// 4. ... & ... -> 合并 id (必选) 和其他字段 (可选)
// 5. Readonly<...> -> 让整个对象只读

const update: UpdateProductDto = {
  id: 123, // 必须提供
  // name: "New Name", // 可选
  // price: 99, // 可选
};
// update.id = 456; // ❌ Error: readonly
```

3. 自定义工具类型
```js
// 定义一个类型，让某些特定属性变为可选，其他保持不变
type Optional<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;

interface Project {
  id: number;
  name: string;
  deadline: Date;
  completed: boolean;
}

// 只让 deadline 和 completed 可选
type UpdateProjectInput = Optional<Project, 'deadline' | 'completed'>;

const updateData: UpdateProjectInput = {
  id: 1,
  name: "New Project",
  // deadline 和 completed 是可选的，可以不提供
};
```
:::

## TS 这些符号 `?` `?.` `??` `!` `_` `&` `|` `#` 分别什么意思

::: details 参考答案
| 符号 | 名称 | 含义与用途 | 示例 |
| :--- | :--- | :--- | :--- | 
| **`?`** | 可选修饰符 | 标记接口属性或函数参数为**可选** | `interface User { name?: string }`<br>`function greet(name?: string)` |
| **`?.`** | 可选链操作符 | **安全地访问**可能为 `null` 或 `undefined` 的对象的深层属性 | `user?.profile?.name` | 
| **`??`** | 空值合并操作符 | 提供**默认值**，仅当左侧为 `null` 或 `undefined` 时生效 | `const name = input ?? 'Default'` | 
| **`!`** | 非空断言操作符 | **告诉编译器**“我确定这个值不为 `null/undefined`” | `element!.focus()`<br>`name!: string` | 
| **`_`** | 数字分隔符<br>忽略占位符 | 提高数字可读性；表示忽略某个参数或变量 | `1_000_000`<br>`catch (_) {}` |
| **`&`** | 交叉类型 | **合并**多个类型，新类型拥有所有类型的特性 | `TypeA & TypeB` | 
| **`\|`** | 联合类型 | 表示值可以是多种类型中的**一种** | `string \| number`<br>`'success' \| 'error'` | 
| **`#`** | 私有字段 | 定义**真正私有**的类字段（ES2022+ 标准） | `class { #secret: string; }` | 
:::

## 什么是抽象类 abstract class
::: details 参考答案
它用于作为其他`类的基类`，`本身不能被直接实例化`。

- 使用 `abstract` 关键字来定义抽象类和抽象方法。
```js
abstract class Department {
  // 普通属性
  protected employees: string[] = [];

  // 构造函数
  constructor(protected readonly name: string) {}

  // 抽象方法：只有声明，没有实现
  abstract describe(this: Department): void;

  // 具体方法：有实现
  addEmployee(employee: string) {
    this.employees.push(employee);
  }

  // 具体方法
  printEmployeeInformation() {
    console.log(this.employees.length);
    console.log(this.employees);
  }
}
```

- 为什么需要抽象类？
    1. 它`强制任何继承它的子类必须实现所有抽象方法`。这提供了一种契约，确保了代码的一致性。

    2. 它将`通用的逻辑放在一个地方`，避免了代码重复。

- 如何使用：继承与实现
```js
// ITDepartment 必须实现抽象类 Department 中的 describe 方法
class ITDepartment extends Department {
  constructor(name: string, public admins: string[]) {
    super(name); // 调用父类的构造函数
  }

  // 实现抽象方法：这是强制要求的
  describe(this: ITDepartment): void {
    console.log(`IT Department: ${this.name}`);
  }

  // 子类还可以有自己的特有方法
  addAdmin(admin: string) {
    this.admins.push(admin);
  }
}

// AccountingDepartment 对 describe 有另一种实现
class AccountingDepartment extends Department {
  constructor(name: string, private reports: string[]) {
    super(name);
  }

  // 实现抽象方法
  describe(this: AccountingDepartment): void {
    console.log(`Accounting Department: ${this.name}`);
  }

  // 自己的特有方法
  addReport(report: string) {
    this.reports.push(report);
  }
}
```
:::

## 如何扩展 window 属性，如何定义第三方模块的类型
::: details 参考答案
- 如何扩展 Window 对象的属性
    1. 使用接口声明合并（最常用、最标准），`🌟推荐使用`，步骤：
    - 在你的项目中的一个 `.d.ts` 类型声明文件（如 global.d.ts 或 window.d.ts）中，或者在任何全局可访问的 .ts 文件中。
    - 声明一个与 Window 同名的接口，并在其中添加你的自定义属性。
    ```js
    // global.d.ts 或 src/types/global.d.ts
    export {}; // 确保文件是模块，有时需要这行

    // 扩展 Window 接口
    declare global {
        interface Window {
            // 添加你的自定义属性及其类型
            MY_APP_VERSION: string;
            _myCustomTracker: (event: string) => void;
            // 例如，一些第三方库会注入像 `gtag` 这样的变量
            gtag: (...args: any[]) => void;
        }
    }
    ```

    2. 使用类型断言（快速但不够优雅）
    ```js
    // 断言整个 window 对象
    (window as any).myUnsafeVar = 'some value';

    // 或者进行更安全的断言（推荐）
    (window as typeof window & { mySafeVar: string }).mySafeVar = 'hello';
    const value = (window as typeof window & { mySafeVar: string }).mySafeVar;

    // 也可以先定义一个扩展后的类型
    type WindowWithCustom = Window & {
        myCustomProperty: number;
    };
    (window as WindowWithCustom).myCustomProperty = 42;
    ```

- 如何定义第三方模块的类型
    1. 为无类型库创建声明文件 - 假设你使用了一个名为 `cool-library` 的库，它没有类型定义。步骤：
    - 在你的项目`根目录或 src 目录`下创建一个类型声明文件，例如 `types/cool-library.d.ts`。
    - 使用 `declare module` 语法来为这个模块定义类型。
    ```js
    // types/cool-library.d.ts

    // 声明一个模块，模块名必须和 import 时的名字匹配
    declare module 'cool-library' {
        // 导出主功能函数的类型
        export function coolFunction(input: string): number;
        
        // 导出一个配置接口
        export interface CoolConfig {
            enabled: boolean;
            count: number;
        }
        
        // 导出一个默认值或类
        export const defaultConfig: CoolConfig;
        
        // 如果有默认导出
        export default coolFunction;
    }
    ```
    **使用：**
    ```js
    import coolFunction, { CoolConfig } from 'cool-library';

    const config: CoolConfig = { enabled: true, count: 5 };
    const result = coolFunction('hello'); // result 是 number 类型
    ```

    2. 修补或覆盖已有类型声明 - 有时库的类型声明不完整或存在错误，你可以通过声明合并来扩展或覆盖它。
    ```js
    // types/some-library.patch.d.ts

    // 导入原始模块的类型
    import * as SomeLib from 'some-library';

    // 声明合并，扩展原始模块
    declare module 'some-library' {
        // 添加一个遗漏的导出
        export function aMissingFunction(options: { key: string }): void;
        
        // 扩展已有的选项接口
        export interface ExistingOptions {
            newOptionalProperty?: boolean; // 添加一个新属性
        }
        
        // 你也可以使用接口合并扩展库中的类或命名空间
        export namespace Utilities {
            export function newUtility(): void;
        }
    }
    ```

    3. 为全局变量（非模块）声明类型 - 有些古老的库是`通过 <script> 标签`引入的，会向全局作用域`（window）`注入一个变量。
    ```js
    // types/legacy-library.d.ts

    // 如果库直接暴露了一个全局变量 `LegacyGlobal`
    declare const LegacyGlobal: {
        doSomethingOld: () => void;
        someConstant: number;
    };

    // 或者，如果它是挂载到 window 上的
    declare global {
        interface Window {
            LegacyGlobal: {
                doSomethingOld: () => void;
                someConstant: number;
            };
        }
    }
    ```

    **重要配置：tsconfig.json**
    ```json
    {
        "compilerOptions": {
            // ... 其他配置
        },
        "include": [
            "src/**/*",
            "types/**/*" // 确保这个目录被包含在内！
        ],
        "files": [
            "types/global.d.ts" // 或者使用 "files"  explicitly 引入特定文件
        ]
    }
    ```
:::

## 是否有过真实的 Typescript 开发经验，讲一下你的使用体验

开放性问题，需要结合你实际开发经验来总结。可以从以下几个方面考虑：
- 在 Vue React 或其他框架使用时遇到的障碍？
- 在打包构建时，有没有遇到 TS 语法问题而打包失败？
- 有没有用很多 any ？如何避免 any 泛滥？
::: details 参考答案
1. 在 Vue 3 (`Composition API + <script setup>`) 中的障碍与解决方案
    - 为 `ref` 定义类型：如果不指定类型，`ref(null)` 会被推断为 `Ref<null>`，无法后续赋值。
    ```js
    import { ref } from 'vue';

    interface User {
        id: number;
        name: string;
    }

    // ✅ 正确：使用泛型覆盖默认的 null 类型
    const user = ref<User | null>(null);
    user.value = { id: 1, name: 'Alice' }; // OK

    // ❌ 错误：如果不指定，类型为 Ref<null>，无法赋值
    // const badRef = ref(null);
    // badRef.value = { id: 1, name: 'Alice' }; // TS Error
    ```

    - 为 `reactive` 定义类型：reactive 会自动解包所有属性，但如何确保初始对象符合接口？
    ```js
    interface FormState {
        username: string;
        password: string;
        rememberMe: boolean;
    }

    // 方法一：声明变量时使用类型注解
    const form: FormState = reactive({
        username: '',
        password: '',
        rememberMe: false,
    });

    // 方法二（Vue 3.3+）：reactive 支持泛型（实验性）
    // const form = reactive<FormState>({ ... });
    ```

    - 为 `defineProps` 和 `defineEmits` 定义类型：
    ```js
    <script setup lang="ts">
    // Props - 使用接口
    interface Props {
        title: string;
        count?: number;
        isActive: boolean;
    }
    const props = defineProps<Props>();

    // Emits - 使用类型字面量
    const emit = defineEmits<{
    (e: 'update:active', value: boolean): void;
    (e: 'submit', payload: { id: number }): void;
    }>();

    const handleClick = () => {
        emit('update:active', !props.isActive); // 类型安全
    };
    </script>
    ```

2.  因TS 语法问题而打包失败
    1. 最常见的问题：`tsconfig.json` 与构建工具配置不匹配
    - 场景：本地 `tsc --noEmit` 编译通过，但 Vite/Webpack 构建失败。
    - 解决方案：

        确保构建工具正确读取 `tsconfig.json`。在 `vite.config.ts` 或 `webpack.config.js` 中显式指定 tsconfig 路径。

        使用 `vue-tsc`：对于 Vue 项目，使用 `vue-tsc --noEmit` 进行类型检查，因为它能更好地处理 .vue 文件。

        统一严格级别：确保 `CI/CD` 流水线中的类型检查命令与本地开发一致。

    2. 依赖库的类型问题：
    - 场景：安装了一个第三方库，但它自带的 `.d.ts 文件有错误`，或者与你的 TS 版本不兼容。

    - 解决方案：

        首选 `skipLibCheck: true`。这是一个非常实用的编译器选项，它会`跳过对 node_modules 中类型声明的检查`，能解决 99% 的第三方库类型报错问题，且通常安全。

        如果问题严重，可以在 `types` 数组中有选择地`排除某些库的全局类型`（较少用）。

        ```json
        {
            "compilerOptions": {
                "skipLibCheck": true // 👍 强烈推荐
                // "types": ["vue", "vite/client"] // 选择性包含全局类型
            }
        }
        ```
:::