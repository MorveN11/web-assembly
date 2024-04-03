(module
  (type $t0 (func (param i32 i32) (result i32)))
  (type $t1 (func (param i32) (result i32)))
  (type $t2 (func (param i32 i32 i32 i32 i32) (result i32)))
  (func $checkCount (export "checkCount") (type $t1) (param $p0 i32) (result i32)
    (return
      (if $I0 (result i32)
        (i32.eq
          (local.get $p0)
          (i32.const 2))
        (then
          (i32.const 0))
        (else
          (i32.add
            (local.get $p0)
            (i32.const 1))))))
  (func $moveCars (export "moveCars") (type $t2) (param $p0 i32) (param $p1 i32) (param $p2 i32) (param $p3 i32) (param $p4 i32) (result i32)
    (if $I3
      (if $I0 (result i32)
        (local.get $p1)
        (then
          (i32.const 1))
        (else
          (if $I1 (result i32)
            (i32.eqz
              (local.get $p1))
            (then
              (if $I2 (result i32)
                (i32.lt_s
                  (local.get $p0)
                  (local.get $p2))
                (then
                  (i32.const 1))
                (else
                  (i32.gt_s
                    (local.get $p0)
                    (local.get $p3)))))
            (else
              (i32.const 0)))))
      (then
        (local.set $p0
          (i32.add
            (local.get $p0)
            (global.get $VELOCITY)))))
    (if $I4
      (i32.gt_s
        (local.get $p0)
        (local.get $p4))
      (then
        (local.set $p0
          (i32.sub
            (i32.const 0)
            (global.get $CAR_WIDTH)))))
    (return
      (local.get $p0)))
  (func $moveHorizontalCars (export "moveHorizontalCars") (type $t0) (param $p0 i32) (param $p1 i32) (result i32)
    (return
      (call $moveCars
        (local.get $p0)
        (local.get $p1)
        (global.get $HRZ_MIN_INVALID_POS)
        (global.get $HRZ_MAX_INVALID_POS)
        (global.get $MAX_WIDTH))))
  (func $moveVerticalCars (export "moveVerticalCars") (type $t0) (param $p0 i32) (param $p1 i32) (result i32)
    (return
      (call $moveCars
        (local.get $p0)
        (local.get $p1)
        (global.get $VERTICAL_MIN_INVALID_POS)
        (global.get $VERTICAL_MAX_INVALID_POS)
        (global.get $MAX_HEIGHT))))
  (table $T0 1 1 funcref)
  (memory $memory (export "memory") 0)
  (global $VELOCITY (export "VELOCITY") i32 (i32.const 2))
  (global $HRZ_MIN_INVALID_POS (export "HRZ_MIN_INVALID_POS") i32 (i32.const 240))
  (global $HRZ_MAX_INVALID_POS (export "HRZ_MAX_INVALID_POS") i32 (i32.const 280))
  (global $VERTICAL_MIN_INVALID_POS (export "VERTICAL_MIN_INVALID_POS") i32 (i32.const 120))
  (global $VERTICAL_MAX_INVALID_POS (export "VERTICAL_MAX_INVALID_POS") i32 (i32.const 160))
  (global $MAX_WIDTH (export "MAX_WIDTH") i32 (i32.const 920))
  (global $MAX_HEIGHT (export "MAX_HEIGHT") i32 (i32.const 687))
  (global $CAR_WIDTH (export "CAR_WIDTH") i32 (i32.const 60))
  (global $g8 i32 (i32.const 8))
  (global $g9 (mut i32) (i32.const 32776))
  (global $g10 i32 (i32.const 32776))
  (elem $e0 (i32.const 1) func)
)
