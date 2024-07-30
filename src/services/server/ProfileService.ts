import { CreateUserProfileDto } from "@/types/user-profile";
import { ApiService } from "./ApiService";

class ProfileService extends ApiService {
    private constructor(readonly pathName: string) {
        super(pathName);
    }
    private static privateInstance: ProfileService;
    static getInstance(): ProfileService {
        if (!ProfileService.privateInstance) {
            ProfileService.privateInstance = new ProfileService("/profile");
        }
        return ProfileService.privateInstance;
    }

    async create(createProfileDto: CreateUserProfileDto) {
        return this.makeRequest({
            method: "post",
            endpoint: "",
            data: createProfileDto
        })

    }

    async get(): Promise<CreateUserProfileDto | undefined> {
        return this.makeRequest({
            method: "get",
            endpoint: "",
            defaultErrorResponse: undefined
        })
    }

    async update(updateProfileDto: CreateUserProfileDto) {
        return this.makeRequest({
            method: "patch",
            endpoint: "",
            data: updateProfileDto
        })
    }
    async delete() {
        return this.makeRequest({
            method: "delete",
            endpoint: ""
        })
    }
}

export default ProfileService.getInstance();