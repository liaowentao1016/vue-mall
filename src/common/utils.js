export function debounce(fun, delay) {
  // 封装防抖函数避免refresh执行多次影响性能
  let timer = null
  return function() {
    timer && clearTimeout(timer)
    timer = window.setTimeout(() => {
      fun.apply()
      console.log('---防抖---')
    }, delay)
  }
}
