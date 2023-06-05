import { Dispatch, MutableRefObject, SetStateAction, useRef, useState } from 'react';

/**
 * useState返回参数中添加Ref.
 *
 * At 2022.01.04
 * By TangJiaHui
 * Tips：解决了闭包情况下数据不同步的问题。
 *      如setTimeout中的值不能获取当前useState变量的值。
 */
export function useStateWithRef <T = undefined>(initialState: T | (() => T)):
  [T, Dispatch<SetStateAction<T>>, MutableRefObject<T | undefined>] {

  const [value, setValue] = useState<T>(initialState)
  const valueRef = useRef<T>(value)
  valueRef.current = value

  return [value, setValue, valueRef]
}
