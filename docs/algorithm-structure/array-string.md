## 🔥数组 array
::: details 参考答案
::: code-group

```js [JavaScript]
console.log("Hello, JavaScript!");
```

```python [Python3]
print("Hello, Python!")
```

:::

## 两数之和
- 题目 https://leetcode.cn/problems/two-sum/description/
- 解答 https://leetcode.cn/problems/two-sum/solutions/

方法一：`暴力枚举`
- 时间复杂度：$O(N^2)$
- 空间复杂度：$O(1)$
::: details 参考答案
::: code-group

```js [JavaScript]
/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
var twoSum = function (nums, target) {
    let result = []
    const l = nums.length
    for (let i = 0; i < l; i++) {
        for (let j = i + 1; j < l; j++) {
            if (nums[i] + nums[j] === target) {
                result = [i, j]
            }
        }
    }
    return result
};
```

```python [Python3]
class Solution:
    def twoSum(self, nums: List[int], target: int) -> List[int]:
        n = len(nums)
        for i in range(n):
            for j in range(i + 1, n):
                if nums[i] + nums[j] == target:
                    return [i, j]
        
        return []
```

:::

方法二：`哈希表`
- 时间复杂度：$O(N)$
- 空间复杂度：$O(N)$
::: details 参考答案
::: code-group

```js [JavaScript]
/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
var twoSum = function (nums, target) {
    let result = []
    let hashTable = new Map()
    for (let i = 0; i < nums.length; i++) {
        if (hashTable.has(target - nums[i])) {
            result = [hashTable.get(target - nums[i]), i]
        }
        // hash的键：数组的值、值：数组的下标
        hashTable.set(nums[i], i)
    }
    return result
};
```

```python [Python3]
class Solution:
    def twoSum(self, nums: List[int], target: int) -> List[int]:
        hashtable = dict()
        for i, num in enumerate(nums):
            if target - num in hashtable:
                return [hashtable[target - num], i]
            hashtable[nums[i]] = i
        return []
```

:::


## 买卖股票的最佳时机
- 题目 https://leetcode.cn/problems/best-time-to-buy-and-sell-stock/description/
- 解答 https://leetcode.cn/problems/best-time-to-buy-and-sell-stock/solutions/

方法一：`暴力法【超时】`
- 时间复杂度：$O(N^2)$。循环运行 n(n−1)/2次。
- 空间复杂度：$O(1)$。只使用了常数个变量。
::: details 参考答案
::: code-group

```js [JavaScript]
/**
 * @param {number[]} prices
 * @return {number}
 */
var maxProfit = function (prices) {
    let max = 0
    let l = prices.length
    for (let i = 0; i < l; i++) {
        for (let j = i + 1; j < l; j++) {
            if (prices[j] - prices[i] > max) {
                max = prices[j] - prices[i]
            }
        }
    }
    return max
};
```

```python [Python3]
# 此方法会超时
class Solution:
    def maxProfit(self, prices: List[int]) -> int:
        ans = 0
        for i in range(len(prices)):
            for j in range(i + 1, len(prices)):
                ans = max(ans, prices[j] - prices[i])
        return ans
```

:::

方法二：`一次遍历`
- 时间复杂度：$O(N)$，只需要遍历一次。
- 空间复杂度：$O(1)$。只使用了常数个变量。
::: details 参考答案
::: code-group

```js [JavaScript]
/**
 * @param {number[]} prices
 * @return {number}
 */
var maxProfit = function (prices) {
    let buyPrice = Infinity
    let max = 0
    for (let i = 0; i < prices.length; i++) {
        const price = prices[i]
        if (price < buyPrice) {
            buyPrice = price
        } else if (price - buyPrice > max) {
            max = price - buyPrice
        }
    }
    return max
};
```

```python [Python3]
class Solution:
    def maxProfit(self, prices: List[int]) -> int:
        minprice = int(1e9)
        maxprofit = 0
        for price in prices:
            maxprofit = max(price - minprice, maxprofit)
            minprice = min(price, minprice)
        return maxprofit
```

:::

## 盛水最多的容器
- 题目 https://leetcode.cn/problems/container-with-most-water/description/
- 解答 https://leetcode.cn/problems/container-with-most-water/solutions/

## 除自身以外数组的乘积
- 题目 https://leetcode.cn/problems/product-of-array-except-self/description/
- 解答 https://leetcode.cn/problems/product-of-array-except-self/solutions/


## 🔥字符串 string

## 无重复字符的最长子串
- 题目 https://leetcode.cn/problems/longest-substring-without-repeating-characters/description/
- 解答 https://leetcode.cn/problems/longest-substring-without-repeating-characters/solutions/

## 验证回文串
- 题目 https://leetcode.cn/problems/valid-palindrome/description/
- 解答 https://leetcode.cn/problems/valid-palindrome/solutions/

## 反转字符串中的单词
- 题目 https://leetcode.cn/problems/reverse-words-in-a-string/description/
- 解答 https://leetcode.cn/problems/reverse-words-in-a-string/solutions/

## 最长回文子串
- 题目 https://leetcode.cn/problems/longest-palindromic-substring/description/
- 解答 https://leetcode.cn/problems/longest-palindromic-substring/solutions/