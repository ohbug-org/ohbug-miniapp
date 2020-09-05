import path from 'path'
import resolve from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import ts from 'rollup-plugin-typescript2'
import { terser } from 'rollup-plugin-terser'
import replace from '@rollup/plugin-replace'

require('dotenv').config()

const name = 'ohbug-miniapp'
const packageFormats = ['esm', 'cjs']
const configs = {
  esm: {
    format: `es`,
  },
  cjs: {
    format: `cjs`,
  },
}
const tsPlugin = ts({
  check: process.env.NODE_ENV === 'production',
  tsconfig: path.resolve(__dirname, 'tsconfig.json'),
})
const extensions = ['.js', '.ts']
const commonjsOptions = {
  ignoreGlobal: true,
  include: /node_modules/,
}
const pkg = require(path.resolve(`./package.json`))

function createConfig(isProduction = false) {
  const input = path.resolve(__dirname, 'src/index.ts')

  const output = packageFormats.map((format) => {
    const target = {
      file: path.resolve(
        `dist/${name}.${format}${isProduction ? '.prod' : ''}.js`
      ),
      format: configs[format].format,
    }
    return target
  })

  const plugins = [
    replace({
      __VERSION__: pkg.version,
    }),
    commonjs(commonjsOptions),
    tsPlugin,
    resolve({ extensions }),
  ]
  if (isProduction) {
    plugins.push(terser())
  }

  return {
    input,
    output,
    plugins,
  }
}

const NODE_ENV = process.env.NODE_ENV

const packageConfigs = [createConfig()]
if (NODE_ENV === 'production') packageConfigs.push(createConfig(true))

export default packageConfigs
