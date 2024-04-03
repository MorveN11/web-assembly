(module
  (import "js" "getBoundingClientRect" (func $getBoundingClientRect (param i32) (result i32)))
  (import "js" "getComputedStyle" (func $getComputedStyle (param i32) (result i32)))
  (import "js" "querySelector" (func $querySelector (param i32 i32) (result i32)))
  (import "js" "setProperty" (func $setProperty (param i32 i32)))
  (import "js" "requestAnimationFrame" (func $requestAnimationFrame (param i32)))
  (import "js" "includes" (func $includes (param i32 i32) (result i32)))
  
  (func $checkCarPosition
    (local $carRight i32)
    (local $carLeft i32)
    (local $wallRight i32)
    (local $wallLeft i32)
    (local $carsecondRight i32)
    (local $carsecondLeft i32)
    (local $wallsecondRight i32)
    (local $wallsecondLeft i32)
    (local $carthirdTop i32)
    (local $carthirdBottom i32)
    (local $wallthirdTop i32)
    (local $wallthirdBottom i32)
    (local $carfourthTop i32)
    (local $carfourthBottom i32)
    (local $wallfourthTop i32)
    (local $wallfourthBottom i32)
    (local $isStopped i32)
    (local $isStoppedTwo i32)
    (local $isStoppedThird i32)
    (local $isStoppedFourth i32)
    (local $i i32)

    (call $getBoundingClientRect (call $querySelector (i32.const 0) (i32.const 0)))
    (local.set $carRight (i32.load offset=0))
    (local.set $carLeft (i32.load offset=4))

    (call $getBoundingClientRect (call $querySelector (i32.const 0) (i32.const 1)))
    (local.set $wallRight (i32.load offset=0))
    (local.set $wallLeft (i32.load offset=4))

    (local.set $i (i32.const 0))
    (block $block
      (loop $loop
        (br_if $block (i32.eq (i32.load offset=0 (call $getComputedStyle (call $querySelector (i32.const 0) (i32.const 2))) (i32.const 0)) (i32.const 1))) ;; Verifica la luz de tráfico y el estado de la animación del coche
        (call $requestAnimationFrame (i32.const 0)) ;; Solicita una nueva animación de cuadro
        (local.set $i (i32.add (local.get $i) (i32.const 1))) ;; Incrementa el contador
        (br_if $loop (i32.lt (local.get $i) (i32.const 10))) ;; Continúa el bucle si el contador es menor que 10
      )
    )
  )

  (func $main
    (call $checkCarPosition)
  )
  (export "main" (func $main))
)