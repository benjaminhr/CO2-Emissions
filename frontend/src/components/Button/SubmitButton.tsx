import React from 'react'

type SubmitProps = {
  text: string, 
  onClick(e: any): Promise<any>
}

const SubmitButton = ({ text, onClick }: SubmitProps) => {
  return (
    <button onClick={onClick}>
      {text}
    </button>
  )
}

export default SubmitButton