(module
  (import "js" "mem" (memory 1))  ;; Importa un objeto Memory desde JavaScript
  (data (i32.const 0) "admin\00")  ;; Almacena la cadena "admin" en la memoria en el índice 0

  ;; Función para asignar una cadena en la memoria y devolver un puntero a esa cadena
  (func $__allocString (export "__allocString")(param $strPtr i32) (param $strLen i32) (result i32)
    (local $strOffset i32)

    ;; Obtener la longitud de la cadena y calcular el espacio necesario en la memoria
    (local.get $strLen)
    (i32.const 1)  ;; Tamaño de un carácter (1 byte)
    (i32.add)
    (local.set $strOffset)

    ;; Asignar espacio en la memoria y copiar la cadena
    (local.get $strPtr)
    (local.get $strOffset)
    (i32.store)  ;; Almacena la longitud de la cadena en la posición inicial
    (local.get $strPtr)
    (i32.const 4)  ;; Desplazamiento de 4 bytes para almacenar la longitud
    (i32.add)
    (local.get $strLen)
    (i32.const 1)  ;; Tamaño de un carácter (1 byte)
    (i32.mul)
    (i32.store)  ;; Almacena la cadena a partir del desplazamiento

    ;; Devolver el puntero a la cadena asignada
    (local.get $strPtr)
  )

  ;; Función para retener un objeto en la memoria para evitar que sea liberado por el recolector de basura
 (func $__retain (export "__retain") (param $obj i32) (result i32)
    (local.get $obj)  ;; Simplemente devolver el puntero que se pasó
  )

  ;; Función para liberar un objeto de la memoria cuando ya no se necesita
  (func $__release (export "__release") (param $obj i32)
    ;; No hacer nada, ya que este ejemplo no implementa un verdadero sistema de conteo de referencias
  )

  (func $validateCredentials (export "validateCredentials") (param $username i32) (param $password i32) (result i32)

    ;; Comparar el usuario con 'admin'
    (local.get $username)
    (i32.const 0) ;; Puntero a la cadena 'admin'
    (i32.load)
    (i32.eq) ;; Comparar si son iguales
    (if (result i32)
      (then
        ;; Si el usuario es 'admin', comparar la contraseña con 'admin'
        (local.get $password)
        (i32.const 0) ;; Puntero a la cadena 'admin'
        (i32.load)
        (i32.eq) ;; Comparar si son iguales
      )
      (else
        ;; Si el usuario no es 'admin', devolver falso
        (i32.const 0)
      )
    )
  )
)
