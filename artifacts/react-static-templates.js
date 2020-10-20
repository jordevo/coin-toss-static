

import React from 'react'
import universal, { setHasBabelPlugin } from 'react-universal-component'

setHasBabelPlugin()

const universalOptions = {
  loading: () => null,
  error: props => {
    console.error(props.error);
    return <div>An error occurred loading this page's template. More information is available in the console.</div>;
  },
  ignoreBabelRename: true
}

const t_0 = universal(import('__react_static_root__/src/NotFound'), universalOptions)
      t_0.template = '__react_static_root__/src/NotFound'
      
const t_1 = universal(import('__react_static_root__/src/EmptyCase'), universalOptions)
      t_1.template = '__react_static_root__/src/EmptyCase'
      
const t_2 = universal(import('__react_static_root__/src/CoinDefault'), universalOptions)
      t_2.template = '__react_static_root__/src/CoinDefault'
      
const t_3 = universal(import('__react_static_root__/src/CoinDefaultSeventails'), universalOptions)
      t_3.template = '__react_static_root__/src/CoinDefaultSeventails'
      
const t_4 = universal(import('__react_static_root__/src/CoinTrump'), universalOptions)
      t_4.template = '__react_static_root__/src/CoinTrump'
      
const t_5 = universal(import('__react_static_root__/src/CoinTrumpSeventails'), universalOptions)
      t_5.template = '__react_static_root__/src/CoinTrumpSeventails'
      
const t_6 = universal(import('__react_static_root__/src/CoinShapes'), universalOptions)
      t_6.template = '__react_static_root__/src/CoinShapes'
      
const t_7 = universal(import('__react_static_root__/src/CoinShapesSeventails'), universalOptions)
      t_7.template = '__react_static_root__/src/CoinShapesSeventails'
      

// Template Map
export default {
  '__react_static_root__/src/NotFound': t_0,
'__react_static_root__/src/EmptyCase': t_1,
'__react_static_root__/src/CoinDefault': t_2,
'__react_static_root__/src/CoinDefaultSeventails': t_3,
'__react_static_root__/src/CoinTrump': t_4,
'__react_static_root__/src/CoinTrumpSeventails': t_5,
'__react_static_root__/src/CoinShapes': t_6,
'__react_static_root__/src/CoinShapesSeventails': t_7
}
// Not Found Template
export const notFoundTemplate = "__react_static_root__/src/NotFound"

