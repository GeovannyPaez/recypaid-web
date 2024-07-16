import api from "@/lib/api";
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
        try {
            const headers = await this.authHeaders();
            const response = await api.post(this.pathName, createProfileDto, headers);
            return response.data;
        } catch (error) {
            throw this.handlerError(error);
        }
    }

    async get(): Promise<CreateUserProfileDto | undefined> {
        try {
            const response = await api.get(this.pathName, await this.authHeaders());
            return response.data;
        } catch (error) {
            return undefined;
        }
    }

    async update(updateProfileDto: CreateUserProfileDto) {
        try {
            const response = await api.patch(this.pathName, updateProfileDto, await this.authHeaders());
            return response.data;
        } catch (error) {
            throw this.handlerError(error);
        }
    }
    async delete() {
        try {
            const response = await api.delete(this.pathName, await this.authHeaders());
            return response.data
        } catch (error) {
            console.log(error);
        }
    }



}

export default ProfileService.getInstance();