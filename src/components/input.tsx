import { Button, Input } from "@nextui-org/react";
import { FieldError } from 'react-hook-form'


type inputTypes = {
  // type: string,
  error?: FieldError
}

const Input = ({type, error}:inputTypes) => {

  return (
    <Input type={'password'} ></Input>
  )
}

export default Input