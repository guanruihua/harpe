/**
 * @title callPhone
 * @description 拨打电话
 * @param phone {string} 电话号码
 */
export const callPhone = (phone:`${number}`) => {
  const aElement = document.createElement('a')
  aElement.setAttribute('href', `tel:${phone}`)
  document.body.appendChild(aElement)
  aElement.click()
  document.body.removeChild(aElement)
}