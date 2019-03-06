function isAgari(pai) {
  if (pai.length !== 14) {
    throw new Error('wrong length')
  }
  let pattern = []
  let patternMap = [] // 用于算分时查找信息
  let patternCount = 0

  for (var i = 0; i < 14; i++) {
    if (i === 0) {
      pattern[patternCount] = 1
      patternMap[patternCount] = pai[0]
      continue
    }
    if (pai[i] === pai[i - 1]) {
      // 刻 +1
      pattern[patternCount] += 1
    } else if (pai[i] - 1 === pai[i - 1] && pai[i] < 31) {
      // 顺 下一位 +1
      patternCount += 1
      pattern[patternCount] = 1
      patternMap[patternCount] = pai[i]
    } else {
      // 非顺 用 0 隔开
      patternCount += 1
      pattern[patternCount] = 0
      patternMap[patternCount] = 0
      patternCount += 1
      pattern[patternCount] = 1
      patternMap[patternCount] = pai[i]
    }
  }
  let mentsu = countMentsu()
  // console.log(pattern, patternMap)
  function check13yao() {
    return pai.reduce((res, current, i) => {
      if (current !== pai[i + 1]) return res + current
      else return res
    }, '')
  }
  if (pattern.indexOf(2) !== -1) {
    // 有头
    let head = patternMap[pattern.indexOf(2)]
    if (pattern.join('') === '2222222') {
      // 七对子
      return '七对子'
    } else if (mentsu.mentsuCount === 4) {
      let info = mentsu.mentsuInfo.map(val => {
        if (val.type === '刻子')
          return `${val.type}:${val.pai} ${val.pai} ${val.pai}`
        else {
          return `${val.type}:${val.pai} ${val.pai + 1} ${val.pai + 2}`
        }
      })
      info.unshift('和\n雀头:' + head)
      return info.join('\n')
    } else if (check13yao() === '191119212931323334353637') {
      // 十三幺
      return '国士无双'
    } else {
      return '和不了'
    }
  } else {
    return '和不了'
  }
  function countMentsu() {
    let mentsuCount = 0
    let mentsuInfo = []
    for (let i = 0; i < pattern.length; i++) {
      if (pattern[i] === 3) {
        // 刻子
        mentsuCount += 1
        mentsuInfo.push({
          type: '刻子',
          pai: patternMap[i],
        })
      } else if (pattern[i] === 1) {
        if ([pattern[i], pattern[i + 1], pattern[i + 2]].join('') === '111') {
          // 无重叠顺子
          mentsuCount += 1
          mentsuInfo.push({
            type: '顺子',
            pai: patternMap[i],
          })
          i += 2 // 跳过两个
        } else if (
          [pattern[i], pattern[i + 1], pattern[i + 2], pattern[i + 3]].join(
            ''
          ) === '1221'
        ) {
          // 重叠两个的顺子
          mentsuCount += 2
          mentsuInfo.push({
            type: '顺子',
            pai: patternMap[i],
          })
          mentsuInfo.push({
            type: '顺子',
            pai: patternMap[i + 1],
          })
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
          mentsuInfo.push({
            type: '顺子',
            pai: patternMap[i],
          })
          mentsuInfo.push({
            type: '顺子',
            pai: patternMap[i + 2],
          })
          i += 5 // 跳过5个
        }
      } else {
        continue
      }
    }
    return {
      mentsuInfo,
      mentsuCount,
    }
  }
}

console.log(isAgari([1, 1, 1, 2, 2, 2, 3, 3, 3, 7, 7, 9, 15, 15]))
console.log(isAgari([1, 1, 1, 2, 2, 2, 3, 3, 3, 7, 7, 7, 15, 15]))
console.log(isAgari([1, 2, 2, 3, 3, 4, 5, 5, 5, 7, 7, 7, 15, 15]))
console.log(isAgari([1, 9, 11, 19, 21, 29, 31, 32, 33, 34, 35, 36, 37, 37]))
console.log(isAgari([1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7]))
