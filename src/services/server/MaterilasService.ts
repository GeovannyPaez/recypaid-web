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
        return this.makeRequest<Material[]>({
            method: 'get',
            endpoint: '',
            isPublic: true
        });
    }

}

export default MaterialsService.getInstance();