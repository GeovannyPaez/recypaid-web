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
import { Input } from "@/components/ui/input";
import useToastActionResponse from '@/hooks/useToastActionResponse';

type ModalDeleteActionProps = {
  serverAction: (reason?: string) => Promise<ActionResponse>;
  alertMessage?: string;
  title?: string;
  children: React.ReactNode;
  showInput?: boolean;
  inputPlaceholder?: string;
}

export default function ModalDeleteAction({
  serverAction,
  alertMessage = "¿Estás seguro de que quieres eliminar este registro?",
  title,
  children,
  showInput = false,
  inputPlaceholder = "Ingrese el motivo"
}: ModalDeleteActionProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isPending, startTransition] = useTransition();
  const [reason, setReason] = useState("");
  const { toastActionResponse } = useToastActionResponse();

  const handleDelete = async () => {
    startTransition(async () => {
      const res = await serverAction(showInput ? reason : undefined);
      toastActionResponse(res);
      if (res.error) return;
      setIsOpen(false);
      setReason("");
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
        {showInput && (
          <div className="mt-4">
            <Input
              type="text"
              placeholder={inputPlaceholder}
              value={reason}
              onChange={(e) => setReason(e.target.value)}
            />
          </div>
        )}
        <AlertDialogFooter className="mt-4">
          <AlertDialogCancel>Cancelar</AlertDialogCancel>
          <Button isLoading={isPending} variant="destructive" onClick={handleDelete}>
            Aceptar
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}