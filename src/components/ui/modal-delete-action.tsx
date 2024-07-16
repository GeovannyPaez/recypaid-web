"use client";
import React, { useState, useTransition } from 'react';
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import useToastActionResponse from '@/hooks/useToastActionResponse';

type ModalDeleteActionProps = {
  // eslint-disable-next-line no-unused-vars
  serverAction: () => Promise<ActionResponse>;
  alertMessage?: string;
  title?: string;
  children: React.ReactNode;
}

export default function ModalDeleteAction({ serverAction, alertMessage = "¿Estás seguro de que quieres eliminar este registro?", title,children}: ModalDeleteActionProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isPending, startTransition] = useTransition();
  const {toastActionResponse} = useToastActionResponse();

  const handleDelete = async () => {
    startTransition(async () => {
        const res = await serverAction();
        toastActionResponse(res);
        if(res.error) return;
        setIsOpen(false);
    });
  };

  return (
    <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
      <AlertDialogTrigger asChild>
        {children}
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          <AlertDialogDescription>
            {alertMessage}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className="mt-4">
          <AlertDialogCancel>Cancelar</AlertDialogCancel>
          <Button isLoading={isPending} variant={"destructive"} onClick={handleDelete}>
            Aceptar
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}