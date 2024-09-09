import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";

interface LocationDialogProps {
    isOpen: boolean;
    onClose: () => void;
    onGetLocation: () => void;
}

export default function LocationDialog({ isOpen, onClose, onGetLocation }: LocationDialogProps) {
    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Compartir ubicación</DialogTitle>
                    <DialogDescription>
                        Compartir tu ubicación nos ayudará a que los recolectores puedan llegar más fácilmente a tu hogar.
                        Sin embargo, esto es completamente opcional pero, asegúrate de dar una dirección clara para que no haya problemas.
                    </DialogDescription>
                </DialogHeader>
                <div className="flex justify-between mt-4">
                    <Button onClick={onClose} variant="secondary">
                        Cancelar
                    </Button>
                    <Button onClick={() => {
                        onClose();
                        onGetLocation();
                    }}>
                        Aceptar
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    );
}