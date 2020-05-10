// 封装本地存储相关设置的函数
// 获取本地存储
export const getItem = name => {
  const data = window.localStorage.getItem(name)
  try {
    // 尝试把data转成js对象,如果是就不会出错
    return JSON.parse(data)
  } catch {
    // 如果data不是js对象格式字符串,那么就返回data,不做任何改变
    return data
  }
}

// 设置本地存储
export const setItem = (name, value) => {
  if (typeof value === 'object') {
    window.localStorage.setItem(name, JSON.stringify(value))
    return
  }
  window.localStorage.setItem(name, value)
}

// 移除本地存储
export const removeItem = name => {
  window.localStorage.removeItem(name)
}
