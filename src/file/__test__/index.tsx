import React from "react"
import { readXlsxFile, parseXlsxData, readTextFile, writeTextFile, writeXlsxFile, writeJsonFile, readJsonFile } from '..'

export default function () {
  return (<div>
    <div>
      File(txt)
      <input
        type='file'
        onChange={async (e) => {
          console.log(e.target.files)

          if (e.target.files) {
            const file1 = e.target.files[0]
            const val = await readTextFile(file1)
            console.log({ val })
          }

        }} />
      <button onClick={() => {
        writeTextFile('temp content', 'tmp_text.txt')
      }}>download</button>
    </div>
    <div>
      File(excel)
      <input
        type='file'
        onChange={async (e) => {
          console.log(e.target.files)

          if (e.target.files) {
            const file1 = e.target.files[0]
            const val = await readXlsxFile(file1)
            const data = parseXlsxData(val)
            console.log({ data })
          }

        }} />
      <button onClick={() => {
        writeXlsxFile({
          dataSource: [
            { a: 'a1', b: 'b1' },
            { a: 'a2', b: 'b2' },
          ],
          fileName: 'temp.csv',
          header: { a: 'name_a', b: 'name_b' },
          order: ['a', 'b'],
          sheet: [
            {
              // sheetName: 'aaaa',
              dataSource: [
                { a: 'a13', b: 'b1' },
                { a: 'a23', b: 'b2' },
              ],
            },
            {
              // sheetName: 'bbb',
              dataSource: [
                { a: 'a134', b: 'b1' },
                { a: 'a234', b: 'b2' },
              ],
            }
          ]
          // order: ['b', 'a'],
        }
        )
      }}>download</button>
    </div>
    <div>
      File(json)
      <input
        type='file'
        onChange={async (e) => {
          console.log(e.target.files)

          if (e.target.files) {
            const file1 = e.target.files[0]
            const val = await readJsonFile(file1)
            console.log({ val })
          }

        }} />
      <button onClick={() => {
        writeJsonFile({
          dataSource: [
            { a: 'a1', b: 'b1' },
            { a: 'a2', b: 'b2' },
          ],
        }
        )
      }}>download</button>
    </div>
  </div>)
}
