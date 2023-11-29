import React from "react"
import { getUrlParams } from '..'
import * as _ from '..'

export function WatchHref() {
  React.useEffect(() => {
    const url = 'http://localhost:9528/a/b?ref=34343343&b=3#/dashboard'
    // const url = 'http://localhost:9528/a/b?ref=34343343'
    console.log(
      getUrlParams(url),
      _.toUrlParams({ a: 1, b: 2 }),
      _.addUrlParams('http://localhost:9528/a/b?ref=34343343&b=3', { a: 1, b: 2 }),
    )
    _.listenLinkEvent()
  }, [])
  return (<div>
    <h2>watchHref</h2>
    <a href='http://www.bing.com'>to bing(default)</a><br /><br />
    <a href='http://www.bing.com' target='_blank'>to bing(_blank)</a><br /><br />
    <button onClick={() => {
      window.open('http://www.bing.com')
    }}>open bind</button><br /><br />
  </div>)
}
