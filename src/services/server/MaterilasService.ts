import api from "@/lib/api";
import { ApiService } from "./ApiService";
import { Material } from "@/types/materilas";

class MaterialsService extends ApiService {
    private constructor(readonly pathName: string) {
        super(pathName);
    }

    private static privateInstance: MaterialsService;

    public static getInstance(): MaterialsService {
        if (!MaterialsService.privateInstance) {
            MaterialsService.privateInstance = new MaterialsService("/materials");
        }
        return MaterialsService.privateInstance;
    }

    async getAllMaterials(): Promise<Material[]> {
        try {
            const response = await api.get<Material[]>(this.pathName);
            return response.data;
        } catch (error) {
            console.error(error);
            return []
        }
    }

}

export default MaterialsService.getInstance();