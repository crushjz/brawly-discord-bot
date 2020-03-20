import { Lens } from 'monocle-ts'

export function lFromProp<TObj>() {
  return Lens.fromProp<TObj>()
}

export function lFromNullableProp<TObj>() {
  return Lens.fromNullableProp<TObj>()
}

export function lFromPath<TObj>() {
  return Lens.fromPath<TObj>()
}

export function lCompose<TObj, TValue1, TValue2>(
  lens2: Lens<TValue1, TValue2>
) {
  return (lens1: Lens<TObj, TValue1>) => lens1.compose(lens2)
}

export function lGet<TObj, TValue>(lens: Lens<TObj, TValue>) {
  return lens.get
}

export function lSet<TObj, TValue>(lens: Lens<TObj, TValue>) {
  return lens.set
}

export function lModify<TObj, TValue>(lens: Lens<TObj, TValue>) {
  return lens.modify
}

export function lAsOptional<TObj, TValue>(lens: Lens<TObj, TValue>) {
  return lens.asOptional()
}
