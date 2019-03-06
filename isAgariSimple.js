function isAgari(pai) {
  if (pai.length !== 14) {
    throw new Error('wrong length')
  }
  let pattern = []
  let patternCount = 0

  for (var i = 0; i < 14; i++) {
    if (i === 0) {
      pattern[patternCount] = 1
      continue
    }
    if (pai[i] === pai[i - 1]) {
      // 刻 +1
      pattern[patternCount] += 1
    } else if (pai[i] - 1 === pai[i - 1] && pai[i] < 31) {
      // 顺 下一位 +1
      patternCount += 1
      pattern[patternCount] = 1
    } else {
      // 非顺 用 0 隔开
      patternCount += 1
      pattern[patternCount] = 0
      patternCount += 1
      pattern[patternCount] = 1
    }
  }
  let mentsu = countMentsu()
  // console.log(pattern)
  function check13yao() {
    return pai.reduce((res, current, i) => {
      if (current !== pai[i + 1]) return res + current
      else return res
    }, '')
  }
  if (pattern.indexOf(2) !== -1) {
    // 有头
    if (pattern.join('') === '2222222') {
      // 七对子
      return true
    } else if (mentsu === 4) {
      return true
    } else if (check13yao() === '191119212931323334353637') {
      // 十三幺
      return true
    } else {
      return false
    }
  } else {
    return false
  }
  function countMentsu() {
    let mentsuCount = 0
    for (let i = 0; i < pattern.length; i++) {
      if (pattern[i] === 3) {
        // 刻子
        mentsuCount += 1
      } else if (pattern[i] === 1) {
        if ([pattern[i], pattern[i + 1], pattern[i + 2]].join('') === '111') {
          // 无重叠顺子
          mentsuCount += 1
          i += 2 // 跳过两个
        } else if (
          [pattern[i], pattern[i + 1], pattern[i + 2], pattern[i + 3]].join(
            ''
          ) === '1221'
        ) {
          // 重叠两个的顺子
          mentsuCount += 2
          i += 3 // 跳过2个
        } else if (
          [
            pattern[i],
            pattern[i + 1],
            pattern[i + 2],
            pattern[i + 3],
            pattern[i + 4],
          ].join('') === '11211'
        ) {
          // 重叠一个的顺子
          mentsuCount += 2
          i += 5 // 跳过5个
        }
      } else {
        continue
      }
    }
    return mentsuCount
  }
}

console.log(isAgari([1, 1, 1, 2, 2, 2, 3, 3, 3, 7, 7, 9, 15, 15]))
console.log(isAgari([1, 1, 1, 2, 2, 2, 3, 3, 3, 7, 7, 7, 15, 15]))
console.log(isAgari([1, 2, 2, 3, 3, 4, 5, 5, 5, 7, 7, 7, 15, 15]))
console.log(isAgari([1, 9, 11, 19, 21, 29, 31, 32, 33, 34, 35, 36, 37, 37]))
console.log(isAgari([1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7]))
