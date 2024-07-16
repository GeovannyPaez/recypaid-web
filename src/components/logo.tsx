import Image from "next/image";
import React from "react";
type Props = {
  alt?: string;
  width?: number;
  height?: number;
};
export default function Logo({
  alt = "Logo paid recycling",
  width = 50,
  height = 50,
}: Props) {
  return (
    <Image
      alt={alt}
      width={width}
      height={height}
      src={"/paid-recycling.png"}
    />
  );
}
