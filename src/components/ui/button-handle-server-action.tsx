"use client";

import { errorAction } from '@/errors/ResponseError'
import useToastActionResponse from '@/hooks/useToastActionResponse'
import{useTransition } from 'react'
import { Button, ButtonProps } from './button'

type ButtonHandleServerActionProps = {
  serverAction: () => Promise<ActionResponse>
  children: React.ReactNode
  buttonProps:ButtonProps
}
export default function ButtonHandleServerAction( { serverAction, children, buttonProps}: ButtonHandleServerActionProps) {

  const {toastActionResponse} = useToastActionResponse();
  const [isLoading,handleLoading] = useTransition();
  const handleClick =async()=>{
    try {
      const res = await serverAction();
      toastActionResponse(res);
    } catch (error) {
      toastActionResponse(errorAction("Algo salio mal, intente mas tarde."))
    }
  }
  return (
    <Button
    {...buttonProps}  
    isLoading={isLoading}
    onClick={()=> handleLoading(handleClick)}
    >
      {children}
    </Button>
  )
}
