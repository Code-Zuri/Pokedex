import { useState } from "react";

interface FormData {
  username: string,
  password: string,
  cp: string
}

interface useFormHook{
  formData: FormData;
  formList: FormData[];
  //handleInputUserName: ( username: string ) => void;
  handleInputChange: ( fieldName: keyof FormData, value: string ) => void;
  handleSubmit: () => void;
}

export const useFormHook = (): useFormHook => {
  
  const initialState: FormData = {
    username: '', 
    password: '',
    cp: ''
  }

  const [ formData, setFormData ] = useState<FormData>( initialState );
  const [ formList, setFormList ] = useState<FormData[]>([]);
  
  const handleInputChange = ( fieldName: keyof FormData, value: string ) => {
    setFormData( (prevData)  => ({
      ...prevData,
      [fieldName]: value,
    }));
  }

  const handleSubmit = () => {
    setFormList( (prevList) => [...prevList, formData] );
    setFormData( initialState );
  }
  
  return { formData, formList, handleInputChange, handleSubmit };
}