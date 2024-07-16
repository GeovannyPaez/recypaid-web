import { ReactNode } from "react";
import { X } from "lucide-react";
import GoBackCLient from "./go-back-client";

type ModalProps = {
  children: ReactNode;
  title: string;
};

const ModalParallel = ({ children, title }: ModalProps) => {
  return (
    <div>
      {/* Fondo desenfocado */}
      <GoBackCLient className="fixed inset-0 z-40 bg-black bg-opacity-50 backdrop-blur" />
      {/* Diálogo */}
      <dialog className="fixed z-50 rounded-sm left-1 right-1 top-7 bottom-7 transition-all shadow-md border flex flex-col p-2 bg-background bg-opacity-90 max-h-screen overflow-y-auto">
        <div className="flex justify-between p-2">
          <h2 className="text-2xl font-bold">{title}</h2>
          {/* Botón de cerrar */}
          <GoBackCLient className="flex justify-end cursor-pointer">
            <X size={28} />
          </GoBackCLient>
        </div>
        <div className="overflow-y-auto">{children}</div>
      </dialog>
    </div>
  );
};

export default ModalParallel;
