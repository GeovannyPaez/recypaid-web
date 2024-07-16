import ModalParallel from "./modal-parallel";
import { LoaderIcon } from "lucide-react";

export default function ModalParallelLoading() {
  return (
    <ModalParallel title="Cargando Info...">
      <div className="flex justify-center items-center w-72 min-h-52">
        <LoaderIcon
          size={48}
          className="animate-spin  text-primary-foreground"
        />
      </div>
    </ModalParallel>
  );
}
