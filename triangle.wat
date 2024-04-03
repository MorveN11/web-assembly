(module
  (func $triangleArea (export "triangleArea") (param $base f64) (param $height f64) (result f64)
    local.get 0
    local.get 1
    f64.mul
    f64.const 0.5
    (f64.mul)
  )
)
