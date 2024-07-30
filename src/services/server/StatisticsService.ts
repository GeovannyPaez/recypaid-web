import { PickerStatistics, UserStatistics } from "@/types/statistics";
import { ApiService } from "./ApiService";

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
        return this.makeRequest({
            method: "get",
            endpoint: "/user"
        })
    }

    async getPickerStatistics(): Promise<PickerStatistics> {
        return this.makeRequest({
            method: "get",
            endpoint: "/picker"
        })
    }
}

export default StatisticsService.getInstance();