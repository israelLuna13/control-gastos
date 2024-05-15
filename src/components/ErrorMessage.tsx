import { ReactNode } from "react"

//obtenemos el state que viene desde el formulario 
type ErrorMessageProps = {
    children:ReactNode
}
export const ErrorMessage = ({children}:ErrorMessageProps) => {
  return (
    <p className="bg-red-600 p-2 text-white font-bold text-sm text-center">
        {children}
    </p>


  )
}
