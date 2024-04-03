async function instantiate(module, imports = {}) {
  const { exports } = await WebAssembly.instantiate(module, imports);
  return exports;
}
export const {
  memory,
  RED_LIGHT_TIME,
  YELLOW_GREEN_LIGHT_TIME,
  FRAME_RATE,
  switchLightColor,
  leftRightTrafficLights,
  topBottomTrafficLights,
  moveCars,
} = await (async url => instantiate(
  await (async () => {
    try { return await globalThis.WebAssembly.compileStreaming(globalThis.fetch(url)); }
    catch { return globalThis.WebAssembly.compile(await (await import("node:fs/promises")).readFile(url)); }
  })(), {
  }
))(new URL("index.wasm", import.meta.url));
