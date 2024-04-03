async function loadModule() {
  const base = document.getElementById('base')
  const height = document.getElementById('height')

  const importObject = {
    env: {
      memory: new WebAssembly.Memory({ initial: 256, maximum: 256 }),
      table: new WebAssembly.Table({
        initial: 0,
        maximum: 0,
        element: 'anyfunc',
      }),
      abort(_msg, _file, line, column) {
        console.error('abort called at index.ts:' + line + ':' + column)
      },
    },
  }

  const wasmModule = await WebAssembly.instantiateStreaming(
    fetch('./triangle.wasm'),
    importObject
  )

  const { triangleArea } = wasmModule.instance.exports

  const calculateArea = () => {
    const baseValue = parseFloat(base.value)
    const heightValue = parseFloat(height.value)
    const area = triangleArea(baseValue, heightValue)
    alert(`The area of the triangle is ${area}`)
  }

  document.getElementById('form').addEventListener('submit', (event) => {
    event.preventDefault()
    calculateArea()
  })
}

loadModule()
