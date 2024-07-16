"use client";

import React from "react";
import { useFormStatus } from "react-dom";
import { Button, ButtonProps } from "./button";

const ButtonServerAction: React.FC<ButtonProps> = (props) => {
  const { pending } = useFormStatus();
  return <Button type="submit" isLoading={pending} {...props} />;
};

export default ButtonServerAction;
