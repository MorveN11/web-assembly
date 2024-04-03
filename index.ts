export const VELOCITY: i32 = 2
export const HRZ_MIN_INVALID_POS: i32 = 240
export const HRZ_MAX_INVALID_POS: i32 = 280
export const VERTICAL_MIN_INVALID_POS: i32 = 120
export const VERTICAL_MAX_INVALID_POS: i32 = 160
export const MAX_WIDTH: i32 = 920
export const MAX_HEIGHT: i32 = 687
export const CAR_WIDTH: i32 = 60

export function checkCount(count: i32): i32 {
  return count === 2 ? 0 : count + 1
}

export function moveCars(
  carPosition: i32,
  isGreen: bool,
  minInvalidPos: i32,
  maxInvalidPos: i32,
  maxPos: i32
): i32 {
  if (
    isGreen ||
    (!isGreen && (carPosition < minInvalidPos || carPosition > maxInvalidPos))
  ) {
    carPosition += VELOCITY
  }

  if (carPosition > maxPos) {
    carPosition = -CAR_WIDTH
  }

  return carPosition
}

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
