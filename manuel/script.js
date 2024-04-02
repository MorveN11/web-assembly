const $rightLights = document.querySelectorAll('.right')
const $leftLights = document.querySelectorAll('.left')
const $topLights = document.querySelectorAll('.top')
const $bottomLights = document.querySelectorAll('.bottom')

const RED_LIGHT_TIME = 5000
const YELLOW_GREEN_LIGHT_TIME = 2500
const VELOCITY = 1
const FRAME_RATE = 16
const MAX_WIDTH = 920
const MAX_HEIGHT = 687
const CAR_WIDTH = 60
const WIDTH_MIN_FLAG = 240
const WIDTH_MAX_FLAG = 280
const HEIGHT_MIN_FLAG = 120
const HEIGHT_MAX_FLAG = 160

let leftRightCount = 0
let topBottomCount = 2
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
  count = count === 2 ? 0 : count + 1
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

let leftRightInterval

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

let topBottomInterval

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
  const carsWidth = parseInt(cars[1].style.right) || 0
  const carsHeight = parseInt(cars[0].style.top) || 0
  if (
    isHorizontalGreen ||
    (!isHorizontalGreen &&
      (carsWidth < WIDTH_MIN_FLAG || carsWidth > WIDTH_MAX_FLAG))
  ) {
    cars[1].style.right = (parseInt(cars[1].style.right) || 0) + VELOCITY + 'px'
    cars[3].style.left = (parseInt(cars[3].style.left) || 0) + VELOCITY + 'px'
  }
  if (
    isVerticalGreen ||
    (!isVerticalGreen &&
      (carsHeight < HEIGHT_MIN_FLAG || carsHeight > HEIGHT_MAX_FLAG))
  ) {
    cars[0].style.top = (parseInt(cars[0].style.top) || 0) + VELOCITY + 'px'
    cars[2].style.bottom =
      (parseInt(cars[2].style.bottom) || 0) + VELOCITY + 'px'
  }

  if (parseInt(cars[1].style.right) > MAX_WIDTH) {
    cars[1].style.right = -CAR_WIDTH + 'px'
  }
  if (parseInt(cars[3].style.left) > MAX_WIDTH) {
    cars[3].style.left = -CAR_WIDTH + 'px'
  }

  if (parseInt(cars[0].style.top) > MAX_HEIGHT) {
    cars[0].style.top = -CAR_WIDTH + 'px'
  }

  if (parseInt(cars[2].style.bottom) > MAX_HEIGHT) {
    cars[2].style.bottom = -CAR_WIDTH + 'px'
  }
}, FRAME_RATE)
