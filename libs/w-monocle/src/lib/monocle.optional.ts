import { Option } from 'fp-ts/Option'
import { Optional } from 'monocle-ts'

// Copy-paste from monocle-ts index.d.ts: Needed to type `loFromOptionProp`
type OptionPropertyNames<T> = {
  readonly // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [TKey in keyof T]-?: T[TKey] extends Option<any> ? TKey : never
}[keyof T]

export function loFromNullableProp<TObj>(k: keyof TObj) {
  return Optional.fromNullableProp<TObj>()(k)
}

export function loFromOptionProp<TObj>(k: OptionPropertyNames<TObj>) {
  return Optional.fromOptionProp<TObj>()(k)
}

export function loFromPath<TObj>() {
  return Optional.fromPath<TObj>()
}

export function loCompose<TObj, TValue1, TValue2>(
  optional2: Optional<TValue1, TValue2>
) {
  return (optional1: Optional<TObj, TValue1>) => optional1.compose(optional2)
}

export function loGet<TObj, TValue>(optional: Optional<TObj, TValue>) {
  return optional.getOption
}

export function loSet<TObj, TValue>(optional: Optional<TObj, TValue>) {
  return optional.set
}

export function loModify<TObj, TValue>(
  optional: Optional<TObj, TValue>,
  f: (value: TValue) => TValue
) {
  return optional.modify(f)
}
