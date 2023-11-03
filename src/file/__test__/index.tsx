import React from "react"
import { readXlsxFile } from '..'
import { isEffectArray } from 'check-it-type'

export default function () {
  return (<div>
    File
    <input
      type='file'
      onChange={async (e) => {
        console.log(e.target.files)

        if(e.target.files){
          const file1 = e.target.files[0]
          const val = await readXlsxFile(file1)
          console.log({ val })
        }

      }} />
  </div>)
}
