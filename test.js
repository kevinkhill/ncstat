import test from 'ava'
import NcScanner from './index'
import Machine from './src/Machine'

test('foo', async (t) => {
  const vault = new NcScanner('./nc/example.NC')

  const files = await vault.scan()

  t.is(files[0].toolpaths.length, 6)
})

// test('bar', async (t) => {
//   const bar = Promise.resolve('bar')
//
//   t.is(await bar, 'bar')
// })
