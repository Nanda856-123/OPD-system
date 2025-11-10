import React from 'react'
import './Button.module.css'

const Button = ({btnHandler,children}) => {
  return (
   <button onClick={btnHandler}>{children}</button>
  )
}

export default Button
