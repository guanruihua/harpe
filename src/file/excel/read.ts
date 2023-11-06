import { utils, read } from 'xlsx'

/**
 * @description 读取 xlsx 文件
 * @param {*} file
 * @returns
 * @eg:
  const data = await readXlsxFile(file)
 */
export function readXlsxFile(file: File) {
  const reader = new FileReader()
  return new Promise((resolve, reject) => {
    try {
      reader.readAsBinaryString(file)
      reader.onload = (e: any) => {
        const binaryData = e.target.result
        const data = read(binaryData, { type: 'binary', cellDates: true })
        resolve(data)
      }
    } catch (error) {
      reject(error)
    }
  })
}


function to26(number) {
  let result = ''
  while (number > 0) {
    const remainder = (number - 1) % 26 // 获取当前位的余数
    result = String.fromCharCode(65 + remainder) + result // 将余数转换为对应的字母，并拼接到结果字符串的前面
    number = Math.floor((number - 1) / 26) // 更新 number 为下一位的值
  }
  return result
}

export const parseXlsxData = (data: any, props: any = {}) => {
  const result: any[] = []
  const { header, toTimeStamp = true } = props
  const { SheetNames, Sheets } = data

  const parseSheet = (record: any, header: any): any => {
    const range = utils.decode_range(record['!ref'])
    const mergedCells = record['!merges'] || []

    // 下标是 0 开始
    const isEffect = item => {
      const range_s_c = range.s.c
      const range_s_r = range.s.r
      const range_e_c = range.e.c
      const range_e_r = range.e.r

      const m_s_c = item.s.c
      const m_s_r = item.s.r
      const m_e_c = item.e.c
      const m_e_r = item.e.r

      return range_s_c <= m_s_c &&
        range_s_r <= m_s_r &&
        range_e_c >= m_e_c &&
        range_e_r >= m_e_r
    }

    const getValueByXY = (x, y) => {
      const value = record[to26(x + 1) + (y + 1)]
      return value
    }

    const getRangeFirstValue = item => {
      const m_s_c = item.s.c
      const m_s_r = item.s.r

      const value = getValueByXY(m_s_c, m_s_r)
      return value
    }

    const fillRangeValue = item => {
      const m_s_c = item.s.c
      const m_s_r = item.s.r
      const m_e_c = item.e.c
      const m_e_r = item.e.r
      const val = getRangeFirstValue(item)
      try {
        if (m_s_c === m_e_c) {
          for (let i = m_s_r; i <= m_e_r; i++) {
            record[to26(m_s_c + 1) + (i + 1)] = val
          }
        }
        if (m_s_r === m_e_r) {
          for (let i = m_s_c; i <= m_e_c; i++) {
            record[to26(i + 1) + (m_s_r + 1)] = val
          }
        }
      } catch (error) {
        console.error(error)
      }
    }

    mergedCells.forEach(item => {
      if (isEffect(item)) {
        fillRangeValue(item)
      }
    })

    const result: any[] = utils.sheet_to_json(record, { header })

    // 时间处理
    if (toTimeStamp && Array.isArray(result)) {
      return result.map(item => {
        if (typeof item === 'object') {
          for (const key in item) {
            const value = item[key]
            if (value instanceof Date) {
              item[key] = value.getTime()
            }
          }
        }
        return item
      })
    }

    return result
  }

  if (Array.isArray(SheetNames)) {
    if (SheetNames.length === 1) {
      return parseSheet(Sheets[SheetNames[0]], header)
    }
    SheetNames.forEach(name => {
      result.push(
        parseSheet(Sheets[name], header)
      )
    })
  }
  return result
}

