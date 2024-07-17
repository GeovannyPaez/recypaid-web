import { PickerStatistics, UserStatistics } from "@/types/statistics";
import { ApiService } from "./ApiService";
import api from "@/lib/api";

class StatisticsService extends ApiService {
    private constructor(pathName: string) {
        super(pathName);
    }

    private static privateInstance: StatisticsService;
    static getInstance(): StatisticsService {
        if (!StatisticsService.privateInstance) {
            StatisticsService.privateInstance = new StatisticsService("/statistics");
        }
        return StatisticsService.privateInstance;
    }


    async getUserStatistics(): Promise<UserStatistics> {
        try {
            const headers = await this.authHeaders();
            const response = await api.get<UserStatistics>(`${this.pathName}/user`, headers);
            return response.data;
        } catch (error) {
            throw this.handlerError(error);
        }
    }

    async getPickerStatistics(): Promise<PickerStatistics> {
        try {
            const headers = await this.authHeaders();
            const response = await api.get<PickerStatistics>(`${this.pathName}/picker`, headers);
            return response.data;
        } catch (error) {
            throw this.handlerError(error);
        }
    }
}

export default StatisticsService.getInstance();