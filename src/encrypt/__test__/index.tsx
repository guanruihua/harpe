// encrypt
import React from 'react'
import './index.less'
import * as _ from '..'
import { ObjectType } from 'abandonjs'
import { getData } from './run'

export default function () {
  const [state, setState] = React.useState<ObjectType[]>([])

  const init = async () => {
    setState(await getData())
  }

  React.useEffect(() => {
    init()
  }, [])

  return (
    <div className="encrypt-demo">
      <h2>encrypt</h2>
      <div className="data-table">
        {state.map((item, i) => {
          return (
            <React.Fragment key={i}>
              <div>{item.dataToEncrypt}</div>
              <div>{item.encryptedText}</div>
              <div>{item.decryptedText}</div>
            </React.Fragment>
          )
        })}
      </div>
      <h3>other</h3>
      <div>
        <div>uuid: {_.uuid()}</div>
        <div>base64: {_.toBase64('ee23')}</div>
        <div>base64toString: {_.base64ToString('ZWUyMw==')}</div>
      </div>
    </div>
  )
}
