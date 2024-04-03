async function loadWasmModule() {
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
    fetch('./index.wasm'),
    importObject
  )
  const { moveHorizontalCars, moveVerticalCars, checkCount } =
    wasmModule.instance.exports

  const $rightLights = document.querySelectorAll('.right')
  const $leftLights = document.querySelectorAll('.left')
  const $topLights = document.querySelectorAll('.top')
  const $bottomLights = document.querySelectorAll('.bottom')

  const RED_LIGHT_TIME = 5000
  const YELLOW_GREEN_LIGHT_TIME = 2500
  const FRAME_RATE = 16

  let leftRightCount = 0
  let topBottomCount = 2
  let leftRightInterval
  let topBottomInterval
  let isHorizontalGreen = true
  let isVerticalGreen = false

  const resetClassName = (light, direction, count) => {
    light[count].className = `light ${direction}`
  }

  const addNewColor = (light, count) => {
    light[count].classList.add(light[count].getAttribute('color'))
  }

  const switchLightColor = (lights, count, direction) => {
    resetClassName(lights[0], direction[0], count)
    resetClassName(lights[1], direction[1], count)
    count = checkCount(count)
    addNewColor(lights[0], count)
    addNewColor(lights[1], count)
    return count
  }

  const switchColorLeftRight = () => {
    const leftRightLights = [$leftLights, $rightLights]
    const leftRightDirections = ['left', 'right']
    leftRightCount = switchLightColor(
      leftRightLights,
      leftRightCount,
      leftRightDirections
    )
  }

  const switchColorTopBottom = () => {
    const topBottomLights = [$topLights, $bottomLights]
    const topBottomDirections = ['top', 'bottom']
    topBottomCount = switchLightColor(
      topBottomLights,
      topBottomCount,
      topBottomDirections
    )
  }

  const leftRightTrafficLights = (interval) => {
    clearInterval(leftRightInterval)
    leftRightInterval = setInterval(() => {
      switchColorLeftRight()
      if (leftRightCount != 0) {
        isHorizontalGreen = false
      } else {
        isHorizontalGreen = true
      }
      if (leftRightCount == 2) {
        leftRightTrafficLights(RED_LIGHT_TIME)
      } else {
        leftRightTrafficLights(YELLOW_GREEN_LIGHT_TIME)
      }
    }, interval)
  }

  const topBottomTrafficLights = (interval) => {
    clearInterval(topBottomInterval)
    topBottomInterval = setInterval(() => {
      switchColorTopBottom()
      if (topBottomCount != 0) {
        isVerticalGreen = false
      } else {
        isVerticalGreen = true
      }
      if (topBottomCount == 2) {
        topBottomTrafficLights(RED_LIGHT_TIME)
      } else {
        topBottomTrafficLights(YELLOW_GREEN_LIGHT_TIME)
      }
    }, interval)
  }

  leftRightTrafficLights(YELLOW_GREEN_LIGHT_TIME)
  topBottomTrafficLights(RED_LIGHT_TIME)

  const cars = [
    document.getElementById('car-1'),
    document.getElementById('car-2'),
    document.getElementById('car-3'),
    document.getElementById('car-4'),
  ]

  setInterval(() => {
    const carsHrzPosition = parseInt(cars[1].style.right) || 0
    const carsVrtPosition = parseInt(cars[0].style.top) || 0

    const newCarsHrzPosition = moveHorizontalCars(
      carsHrzPosition,
      isHorizontalGreen
    )
    const newCarsVrtPosition = moveVerticalCars(
      carsVrtPosition,
      isVerticalGreen
    )

    cars[0].style.top = newCarsVrtPosition + 'px'
    cars[1].style.right = newCarsHrzPosition + 'px'
    cars[2].style.bottom = newCarsVrtPosition + 'px'
    cars[3].style.left = newCarsHrzPosition + 'px'
  }, FRAME_RATE)
}

loadWasmModule()
