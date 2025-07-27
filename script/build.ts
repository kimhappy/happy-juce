#!/usr/bin/env bun

import { join } from 'path'
import   dts    from 'bun-plugin-dts'

await Bun.build({
  entrypoints: [
    join('src', 'index.ts')
  ],
  outdir     : 'dist',
  minify     : true,
  splitting  : false,
  naming     : join('[dir]', '[name].[ext]'),
  external   : [
    'zustand'
  ],
  define     : {
    'process.env.NODE_ENV': JSON.stringify('production')
  },
  plugins    : [
    dts({ output: { noBanner: true } })
  ]
})
