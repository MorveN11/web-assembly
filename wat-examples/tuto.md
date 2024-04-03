# Understanding WebAssembly Text Format (WAT) Syntax

WebAssembly Text Format (WAT) is a human-readable representation of WebAssembly code. It allows developers to write WebAssembly modules using a textual format instead of directly working with binary code. This README provides an explanation of the WAT syntax, using examples from the provided WAT file.

## Table of Contents
- [Module Structure](#module-structure)
- [Types](#types)
- [Functions](#functions)
- [Tables and Memories](#tables-and-memories)
- [Globals](#globals)
- [Exports](#exports)
- [Control Flow](#control-flow)
- [Instructions](#instructions)

## Module Structure

A WAT file represents a WebAssembly module and is enclosed within a `(module ...)` block. The module contains various sections such as types, functions, tables, memories, and globals.

```wasm
(module
  ;; Module contents go here
)
```

## Types

The types section defines the function signatures used in the module. Each function type is represented by a `(type ...)` block and specifies the parameter types and return types.

```wasm
(type $t0 (func (param i32 i32) (result i32)))
(type $t1 (func (param i32) (result i32)))
(type $t2 (func (param i32 i32 i32 i32 i32) (result i32)))
```

In the example above, `$t0`, `$t1`, and `$t2` are function type definitions with different parameter and return types.

## Functions

The functions section contains the definitions of functions in the module. Each function is represented by a `(func ...)` block and specifies its name, export name (if applicable), type, parameters, and body.

```wasm
(func $checkCount (export "checkCount") (type $t1) (param $p0 i32) (result i32)
  ;; Function body goes here
)
```

In the example above, `$checkCount` is a function with the export name "checkCount". It has a single `i32` parameter and returns an `i32` value.

## Tables and Memories

The tables and memories section defines the tables and linear memories used in the module.

```wasm
(table $T0 1 1 funcref)
(memory $memory (export "memory") 0)
```

In the example above, `$T0` is a table with a minimum and maximum size of 1, containing function references. `$memory` is a linear memory exported as "memory" with an initial size of 0.

## Globals

The globals section defines global variables used in the module. Each global variable is represented by a `(global ...)` block and specifies its name, type, mutability, and initial value.

```wasm
(global $VELOCITY (export "VELOCITY") i32 (i32.const 2))
(global $HRZ_MIN_INVALID_POS (export "HRZ_MIN_INVALID_POS") i32 (i32.const 240))
```

In the example above, `$VELOCITY` and `$HRZ_MIN_INVALID_POS` are global variables of type `i32` with initial values of 2 and 240, respectively. They are also exported with the same names.

## Exports

The exports section specifies the functions, memories, tables, and globals that are exported from the module and can be accessed by the host environment.

```wasm
(func $checkCount (export "checkCount") ...)
(memory $memory (export "memory") ...)
(global $VELOCITY (export "VELOCITY") ...)
```

In the example above, the function `$checkCount`, memory `$memory`, and global `$VELOCITY` are exported with the names "checkCount", "memory", and "VELOCITY", respectively.

## Control Flow

WAT provides control flow instructions for branching and looping. Some commonly used control flow instructions include:

- `if`: Performs conditional execution based on a condition.
- `else`: Specifies an alternative block to execute if the condition is false.
- `loop`: Defines a loop block.
- `block`: Defines a block of code.
- `br`: Performs an unconditional branch to a labeled block or loop.
- `br_if`: Performs a conditional branch based on a condition.
- `return`: Returns from a function.

```wasm
(if $I3 (if $I0 (result i32) (local.get $p1)
  (then (i32.const 1))
  (else (if $I1 (result i32) (i32.eqz (local.get $p1))
    (then (if $I2 (result i32) (i32.lt_s (local.get $p0) (local.get $p2))
      (then (i32.const 1))
      (else (i32.gt_s (local.get $p0) (local.get $p3)))))
    (else (i32.const 0)))))
  (then (local.set $p0 (i32.add (local.get $p0) (global.get $VELOCITY)))))
```

In the example above, nested `if` blocks are used to perform conditional execution based on multiple conditions.

## Instructions

WAT provides various instructions for performing operations on values, memory, and control flow. Some commonly used instructions include:

- `local.get`: Retrieves the value of a local variable.
- `local.set`: Sets the value of a local variable.
- `global.get`: Retrieves the value of a global variable.
- `i32.const`: Defines an `i32` constant value.
- `i32.add`: Performs addition on `i32` values.
- `i32.sub`: Performs subtraction on `i32` values.
- `i32.eqz`: Checks if an `i32` value is equal to zero.
- `i32.lt_s`: Performs a signed less than comparison on `i32` values.
- `i32.gt_s`: Performs a signed greater than comparison on `i32` values.

```wasm
(local.set $p0 (i32.add (local.get $p0) (global.get $VELOCITY)))
(if $I4 (i32.gt_s (local.get $p0) (local.get $p4))
  (then (local.set $p0 (i32.sub (i32.const 0) (global.get $CAR_WIDTH)))))
```

In the example above, `local.set`, `i32.add`, `i32.gt_s`, and `i32.sub` instructions are used to perform operations on local variables and constants.

Certainly! Let's dive deeper into memory, elements, and tables in WebAssembly.

## Memory

In WebAssembly, memory represents a contiguous block of bytes that can be accessed and manipulated by the WebAssembly module. It is used to store data that the module needs to work with, such as variables, arrays, and structures.

The memory section in a WAT file is defined using the `(memory ...)` syntax. It specifies the initial and maximum size of the memory, as well as any export names.

```wasm
(memory $memory (export "memory") 0)
```

In the example above, `$memory` is a linear memory block exported as "memory" with an initial size of 0 pages (each page is 64KB).

WebAssembly memory is accessed using load and store instructions, such as `i32.load`, `i64.load`, `f32.load`, `f64.load`, `i32.store`, `i64.store`, `f32.store`, and `f64.store`. These instructions allow reading from and writing to specific memory addresses.

```wasm
(i32.store (i32.const 0) (i32.const 42))
(i32.load (i32.const 0))
```

In the example above, the value 42 is stored at memory address 0 using `i32.store`, and then loaded back using `i32.load`.

## Elements

Elements in WebAssembly refer to a way to initialize a table with a sequence of elements, typically function references. The elements section is defined using the `(elem ...)` syntax.

```wasm
(elem $e0 (i32.const 1) func)
```

In the example above, `$e0` is an element segment that initializes the table at offset 1 with a sequence of function references.

Elements are used in conjunction with tables to store and refer to function references. They provide a way to populate the table with initial values and define the structure of the table.

## Table

In WebAssembly, a table is a resizable typed array of references, typically used to store function references. It allows indirect function calls and enables dynamic behavior in WebAssembly modules.

The table section in a WAT file is defined using the `(table ...)` syntax. It specifies the table type, initial size, maximum size (if applicable), and element type.

```wasm
(table $T0 1 1 funcref)
```

In the example above, `$T0` is a table with a minimum and maximum size of 1, containing function references (`funcref`).

Tables are accessed using `call_indirect` instructions, which perform an indirect function call based on an index in the table.

```wasm
(call_indirect (type $t0) (i32.const 0))
```

In the example above, `call_indirect` is used to call the function at index 0 in the table, expecting a function type `$t0`.

Tables provide a way to introduce dynamic behavior and runtime polymorphism in WebAssembly modules. They allow functions to be stored, referenced, and called indirectly based on their indices in the table.

The combination of memory, elements, and tables in WebAssembly enables powerful and flexible programming patterns. Memory provides a way to store and manipulate data, elements define the initial contents of tables, and tables enable dynamic function calls and runtime polymorphism.

These features are essential for implementing complex algorithms, data structures, and runtime behavior in WebAssembly modules, making it possible to build high-performance, portable, and secure applications that can run in web browsers and other environments supporting WebAssembly.
