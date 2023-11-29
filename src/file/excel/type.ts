import { type ObjectType } from 'abandonjs'
import type { AOA2SheetOpts, JSON2SheetOpts } from 'xlsx'

export interface XlsxCol {
  /**
   * @description 列宽度
   */
  wch?: number
}

export interface SheetCfg {
  /**
   * @description sheet 名称
   */
  sheetName?: string
  config?: AOA2SheetOpts | JSON2SheetOpts
  cols?: XlsxCol[]
  order?: string[]
  header?: ObjectType,
  dataSource?: ObjectType[]
}

export interface WriteXlsxFileProps {
  /**
   * 文件名称
   * @default 'temp.csv
   */
  fileName?: string
  /**
 * @description sheet 名称
 */
  sheetName?: string
  /**
   * @description 若指定sheet, 以sheet为准, 若sheet为对象, 这为其默认值
   */
  dataSource?: ObjectType[]
  /**
   * @description 列配置
   */
  cols?: XlsxCol[]
  /**
   * @description 列排序
   */
  order?: string[]
  /**
   * @description 表头
   */
  header?: ObjectType
  config?: AOA2SheetOpts | JSON2SheetOpts
  /**
   * @description 重名项 继承父级
   */
  sheet?: SheetCfg | SheetCfg[]
}