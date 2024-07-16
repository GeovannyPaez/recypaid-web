"use client";
import { signOut } from "next-auth/react";
import { Button } from "../ui/button";

export default function ButtonLogout() {
  const handleLogout = () => {
    signOut();
  };
  return (
    <Button onClick={handleLogout} size={"sm"} variant={"destructive"}>
      Cerrar sesión
    </Button>
  );
}
