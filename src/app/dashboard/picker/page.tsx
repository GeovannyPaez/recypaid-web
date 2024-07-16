import OrdersService from "@/services/server/OrdersService";
import { redirect } from "next/navigation";

export default async function  PickerPage(){
    const currentOrder = await OrdersService.getCurrentPickerOrder();
    // if(!currentOrder){
    //     redirect('/dashboard/picker/orders')    
    // }
    console.log(currentOrder)
    return (
        <div>
            <h1>Picker Page</h1>
        </div>
    )
}