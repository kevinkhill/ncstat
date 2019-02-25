import test from 'ava'
import NcScanner from './index'

test('foo', async (t) => {
  const vault = new NcScanner('./nc/example.NC')

  const files = await vault.scan()

  console.log(`Analyzed ${files[0].toolpaths.length} toolpaths in ${files.length} NC files`)

  files[0].toolpaths.forEach(toolpath => console.log(toolpath.type))
})

// test('bar', async (t) => {
//   const bar = Promise.resolve('bar')
//
//   t.is(await bar, 'bar')
// })
