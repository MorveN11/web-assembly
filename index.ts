// Velocity constant for car movement
export const VELOCITY: i32 = 2

// Constants for invalid positions of horizontal cars
export const HRZ_MIN_INVALID_POS: i32 = 240
export const HRZ_MAX_INVALID_POS: i32 = 280

// Constants for invalid positions of vertical cars
export const VERTICAL_MIN_INVALID_POS: i32 = 120
export const VERTICAL_MAX_INVALID_POS: i32 = 160

// Maximum width and height of the simulation area
export const MAX_WIDTH: i32 = 920
export const MAX_HEIGHT: i32 = 687

// Width of the cars
export const CAR_WIDTH: i32 = 60

// Function to check the count and return the next count value
export function checkCount(count: i32): i32 {
  return count === 2 ? 0 : count + 1
}

// Function to move the cars based on the provided parameters
export function moveCars(
  carPosition: i32,
  isGreen: bool,
  minInvalidPos: i32,
  maxInvalidPos: i32,
  maxPos: i32
): i32 {
   // If the light is green or the car is not in the invalid position range, move the car
  if (
    isGreen ||
    (!isGreen && (carPosition < minInvalidPos || carPosition > maxInvalidPos))
  ) {
    carPosition += VELOCITY
  }
  // If the car position exceeds the maximum position, reset it to the negative car width
  if (carPosition > maxPos) {
    carPosition = -CAR_WIDTH
  }

  return carPosition
}

// Function to move the horizontal cars
export function moveHorizontalCars(
  carHrzPosition: i32,
  isHorizontalGreen: bool
): i32 {
  return moveCars(
    carHrzPosition,
    isHorizontalGreen,
    HRZ_MIN_INVALID_POS,
    HRZ_MAX_INVALID_POS,
    MAX_WIDTH
  )
}

// Function to move the vertical cars
export function moveVerticalCars(
  carVrtPosition: i32,
  isVerticalGreen: bool
): i32 {
  return moveCars(
    carVrtPosition,
    isVerticalGreen,
    VERTICAL_MIN_INVALID_POS,
    VERTICAL_MAX_INVALID_POS,
    MAX_HEIGHT
  )
}
