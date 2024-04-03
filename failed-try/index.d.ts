/** Exported memory */
export declare const memory: WebAssembly.Memory;
/** assembly/index/RED_LIGHT_TIME */
export declare const RED_LIGHT_TIME: {
  /** @type `i32` */
  get value(): number
};
/** assembly/index/YELLOW_GREEN_LIGHT_TIME */
export declare const YELLOW_GREEN_LIGHT_TIME: {
  /** @type `i32` */
  get value(): number
};
/** assembly/index/FRAME_RATE */
export declare const FRAME_RATE: {
  /** @type `i32` */
  get value(): number
};
/**
 * assembly/index/switchLightColor
 * @param count `i32`
 */
export declare function switchLightColor(count: number): void;
/**
 * assembly/index/leftRightTrafficLights
 */
export declare function leftRightTrafficLights(): void;
/**
 * assembly/index/topBottomTrafficLights
 */
export declare function topBottomTrafficLights(): void;
/**
 * assembly/index/moveCars
 */
export declare function moveCars(): void;
