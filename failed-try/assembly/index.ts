export const RED_LIGHT_TIME: i32 = 5000;
export const YELLOW_GREEN_LIGHT_TIME: i32 = 2500;
export const VELOCITY: i32 = 1;
export const FRAME_RATE: i32 = 16;
export const MAX_WIDTH: i32 = 920;
export const MAX_HEIGHT: i32 = 687;
export const CAR_WIDTH: i32 = 60;

let leftRightCount: i32 = 0;
let topBottomCount: i32 = 2;
let isHorizontalGreen: boolean = true;
let isVerticalGreen: boolean = false;
let car1PositionX: i32 = 0;
let car2PositionX: i32 = 0;
let car3PositionY: i32 = 0;
let car4PositionY: i32 = 0;

export function init(): void {
  // Initialize any necessary variables or state
}

export function getLightStates(): Int32Array {
  const lightStates = new Int32Array(2);
  lightStates[0] = leftRightCount;
  lightStates[1] = topBottomCount;
  return lightStates;
}

export function getCarPositions(): Int32Array {
  const positions = new Int32Array(4);
  positions[0] = car1PositionX;
  positions[1] = car2PositionX;
  positions[2] = car3PositionY;
  positions[3] = car4PositionY;
  return positions;
}

export function updateLights(): void {
  if (leftRightCount == 2) {
    leftRightCount = 0;
    isHorizontalGreen = true;
  } else {
    leftRightCount++;
    isHorizontalGreen = false;
  }

  if (topBottomCount == 2) {
    topBottomCount = 0;
    isVerticalGreen = true;
  } else {
    topBottomCount++;
    isVerticalGreen = false;
  }
}

export function moveCars(): void {
  if (isHorizontalGreen) {
    car1PositionX += VELOCITY;
    car2PositionX += VELOCITY;
  }

  if (isVerticalGreen) {
    car3PositionY += VELOCITY;
    car4PositionY += VELOCITY;
  }

  if (car1PositionX > MAX_WIDTH) {
    car1PositionX = -CAR_WIDTH;x
  }
  if (car2PositionX > MAX_WIDTH) {
    car2PositionX = -CAR_WIDTH;
  }
  if (car3PositionY > MAX_HEIGHT) {
    car3PositionY = -CAR_WIDTH;
  }
  if (car4PositionY > MAX_HEIGHT) {
    car4PositionY = -CAR_WIDTH;
  }
}

export function step(): void {
  updateLights();
  moveCars();
}