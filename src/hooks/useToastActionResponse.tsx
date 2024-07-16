import { useToast } from '@/components/ui/use-toast'

export default function useToastActionResponse() {
    const { toast } = useToast();

    const toastActionResponse =({error, message}:ActionResponse) => {
      toast({
        title: error ? "Error" : "Éxito",
        description: message,
        variant: error ? "destructive":"default",
      })
    }
  return (
    {toastActionResponse,toast}
  )
}
