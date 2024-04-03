// This function loads the WebAssembly module and sets up the traffic light simulation
async function loadWasmModule() {
  // Define the import object for the WebAssembly module
  const importObject = {
    env: {
       // Set up memory and table for the WebAssembly module
      memory: new WebAssembly.Memory({ initial: 256, maximum: 256 }),
      table: new WebAssembly.Table({
        initial: 0,
        maximum: 0,
        element: 'anyfunc',
      }),
      // Define an abort function for error handling
      abort(_msg, _file, line, column) {
        console.error('abort called at index.ts:' + line + ':' + column)
      },
    },
  }

  // Instantiate the WebAssembly module
  const wasmModule = await WebAssembly.instantiateStreaming(
    fetch('./index.wasm'),
    importObject
  )
  // Get the exported functions from the WebAssembly module
  const { moveHorizontalCars, moveVerticalCars, checkCount } =
    wasmModule.instance.exports

  // Get references to the traffic light elements
  const $rightLights = document.querySelectorAll('.right')
  const $leftLights = document.querySelectorAll('.left')
  const $topLights = document.querySelectorAll('.top')
  const $bottomLights = document.querySelectorAll('.bottom')

  // Define constants for light timings and frame rate
  const RED_LIGHT_TIME = 5000
  const YELLOW_GREEN_LIGHT_TIME = 2500
  const FRAME_RATE = 16

  // Initialize variables for light states and intervals
  let leftRightCount = 0
  let topBottomCount = 2
  let leftRightInterval
  let topBottomInterval
  let isHorizontalGreen = true
  let isVerticalGreen = false

  // Helper function to reset the class name of a light element
  const resetClassName = (light, direction, count) => {
    light[count].className = `light ${direction}`
  }

  // Helper function to add a new color class to a light element
  const addNewColor = (light, count) => {
    light[count].classList.add(light[count].getAttribute('color'))
  }

  // Function to switch the color of a set of traffic lights
  const switchLightColor = (lights, count, direction) => {
    resetClassName(lights[0], direction[0], count)
    resetClassName(lights[1], direction[1], count)
    count = checkCount(count)
    addNewColor(lights[0], count)
    addNewColor(lights[1], count)
    return count
  }

  // Function to switch the color of left and right traffic lights
  const switchColorLeftRight = () => {
    const leftRightLights = [$leftLights, $rightLights]
    const leftRightDirections = ['left', 'right']
    leftRightCount = switchLightColor(
      leftRightLights,
      leftRightCount,
      leftRightDirections
    )
  }

  // Function to switch the color of top and bottom traffic lights
  const switchColorTopBottom = () => {
    const topBottomLights = [$topLights, $bottomLights]
    const topBottomDirections = ['top', 'bottom']
    topBottomCount = switchLightColor(
      topBottomLights,
      topBottomCount,
      topBottomDirections
    )
  }

  // Function to control the left and right traffic lights
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

  // Function to control the top and bottom traffic lights
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

  // Start the traffic light intervals
  leftRightTrafficLights(YELLOW_GREEN_LIGHT_TIME)
  topBottomTrafficLights(RED_LIGHT_TIME)

  // Get references to the car elements
  const cars = [
    document.getElementById('car-1'),
    document.getElementById('car-2'),
    document.getElementById('car-3'),
    document.getElementById('car-4'),
  ]

  // Set up an interval to move the cars  
  setInterval(() => {
    const carsHrzPosition = parseInt(cars[1].style.right) || 0
    const carsVrtPosition = parseInt(cars[0].style.top) || 0
    // Move the horizontal cars using the WebAssembly function
    const newCarsHrzPosition = moveHorizontalCars(
      carsHrzPosition,
      isHorizontalGreen
    )
    // Move the vertical cars using the WebAssembly function
    const newCarsVrtPosition = moveVerticalCars(
      carsVrtPosition,
      isVerticalGreen
    )
    // Update the positions of the cars
    cars[0].style.top = newCarsVrtPosition + 'px'
    cars[1].style.right = newCarsHrzPosition + 'px'
    cars[2].style.bottom = newCarsVrtPosition + 'px'
    cars[3].style.left = newCarsHrzPosition + 'px'
  }, FRAME_RATE)
}

// Call the loadWasmModule function to start the simulation
loadWasmModule()
