import { isArray, type ObjectType } from 'abandonjs'
import { isEffectObject, isEffectArray, isEmpty, isObject } from 'asura-eye'
import { type WorkSheet, utils, writeFileXLSX } from 'xlsx'
import type { WriteXlsxFileProps, SheetCfg } from './type'

function getWorkSheet(props: SheetCfg) {

  const { config, cols, header = {}, order: OriginOrder, dataSource = [] } = props

  const newDataSource: (ObjectType | any)[] = []

  let ws: WorkSheet | undefined = undefined

  const order: undefined | string[] = isEmpty(OriginOrder) ? OriginOrder : Object.keys(header)

  if (isEffectArray(order)) {
    const rs_row = (row: ObjectType) => {
      const newRow: any[] = []

      order.forEach((key: string) => {
        try {
          if (isEmpty(row[key])) {
            newRow.push('')
          } else {
            newRow.push(row[key])
          }
        } catch (error) {
          console.error(error)
        }
      })

      newDataSource.push(newRow)
    }
    if (isEffectObject(header)) {
      rs_row(header)
    }

    dataSource.forEach(rs_row)

    ws = utils.aoa_to_sheet(newDataSource, config)
  } else {
    ws = utils.json_to_sheet(dataSource, config)
  }

  // 配置列宽度等样式
  if (cols) {
    ws['!cols'] = cols
  }

  return ws
}

/**
 * @title writeXlsxFile
 * @description 写入excel(csv)文件中, 导出
 * @param {WriteXlsxFileProps} props 导出配置
 */
export function writeXlsxFile(props: WriteXlsxFileProps) {

  const { fileName = 'temp.csv', dataSource = [], sheet, ...rest } = props

  const wb = utils.book_new()

  if (isEmpty(sheet)) {
    const ws = getWorkSheet(props)
    utils.book_append_sheet(wb, ws, props.sheetName ?? 'Sheet1')
  }

  if (isObject(sheet)) {
    const { sheetName = 'Sheet1', ...sheetRest } = sheet as SheetCfg
    if (isEmpty(sheetRest.dataSource) && isArray(dataSource)) {
      sheetRest.dataSource = dataSource
    }
    const ws = getWorkSheet({ ...rest, ...sheetRest })
    utils.book_append_sheet(wb, ws, sheetName)
  }

  if (isArray(sheet)) {
    sheet.forEach((item: SheetCfg, index: number) => {
      const { sheetName = 'Sheet' + (index + 1), ...sheetRest } = item as SheetCfg
      const ws = getWorkSheet({ ...rest, ...sheetRest })
      utils.book_append_sheet(wb, ws, sheetName)
    })
  }

  writeFileXLSX(wb, fileName)
}