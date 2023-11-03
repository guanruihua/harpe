import { utils, writeFileXLSX, read } from 'xlsx'
/**
 数据格式, xlsx data
 {
    SheetNames: ['Sheet1'],
    Sheets: {
      Sheet1: {
        '!ref': 'A1:B6',
        A1: {
          t: 's',
          v: 'Name',
          w: 'Name',
        },
      ...
        B6: {
          t: 'n',
          v: 46,
        },
      },
    },
  }
 */
/**
 * @description 导出 xlsx 文件
 * @param.value {xlsx data}
 * @param.name { xlsx 文件名称}
 * @param {*} props
 * @eg: 	exportXlsxFile({ value: value, name: 'my.csv' })
 */
export function exportXlsxFile(props) {
  const { value, name = 'temp.xlsx', sheetName = 'Data', config, cols } = props
  const ws = utils.json_to_sheet(value, config)
  if (cols) {
    ws['!cols'] = cols
  }
  const wb = utils.book_new()
  utils.book_append_sheet(wb, ws, sheetName)
  writeFileXLSX(wb, name)
}

/**
 * @description 读取 xlsx 文件
 * @use 结合 el-upload 使用
 * @param {*} file
 * @returns
 * @eg:
 const handleChange = async (file) => {
  const data = await readXlsxFile(file)
  console.log(data)
 }
 */
export function readXlsxFile(file) {
  const reader = new FileReader()
  return new Promise((resolve, reject) => {
    try {
      // const { raw, ...rest } = file
      // reader.readAsBinaryString(raw)
      reader.readAsBinaryString(file)
      reader.onload = (e: any) => {
        const binaryData = e.target.result
        console.log({ binaryData })
        const data = read(binaryData, { type: 'binary', cellDates: true })
        // const data = read(binaryData, { type: 'buffer', cellDates: true })
        // const data = read(binaryData, { type: 'binary', cellDates: true, cellText: false })
        // resolve({ ...rest, data })
        resolve(data)
      }
    } catch (error) {
      reject(error)
    }
  })
}

/**
 * @description xlsx 数据转换为 json
 * @param {*} data {xlsx data}
 * @param {*} index {获取sheetNames 对应的数据 index}
 * @returns {Array}
 */
export function sheetToJSON(data, index = 0) {
  try {
    return utils.sheet_to_json(data.Sheets[data.SheetNames[index]])
  } catch (error) {
    return []
  }
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

