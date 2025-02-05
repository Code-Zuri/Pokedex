import { useState } from "react";

//Definir data type que se recibe
export interface Data {
  count: number;
}

//lo que retorna el custom hook
interface UseCounterHook{
  value: Data;
  add: () => void;
  decrement: () => void;
  reset: () => void;
}

export const useCounterHook = ( info: Data): UseCounterHook => {

  const [value, setValue] = useState(info);

  const add = () => setValue( { count: value.count + 1} );
  const decrement = () => setValue( { count: value.count - 1} );
  const reset = () => setValue( { count: info.count } );

  return { value, add, decrement, reset }

}