"use client";

import { useRouter } from "next/navigation";

type GoBackCLientProps = {
  children?: React.ReactNode;
  className?: string;
};
export default function GoBackCLient({
  children,
  className,
}: GoBackCLientProps) {
  const router = useRouter();

  const goBack = () => {
    router.back();
  };
  return (
    <div className={className} onClick={goBack}>
      {children}
    </div>
  );
}
