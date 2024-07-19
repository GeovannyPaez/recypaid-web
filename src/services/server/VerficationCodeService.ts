import api from "@/lib/api";
import { ApiService } from "./ApiService"

class VerificationCodeService extends ApiService {
    private constructor(pathName: string) {
        super(pathName)
    }

    private static instance: VerificationCodeService;

    static getInstance() {
        if (!VerificationCodeService.instance) {
            VerificationCodeService.instance = new VerificationCodeService('verification-code')
        }
        return VerificationCodeService.instance
    }

    async sendCodeToEmail(email: string) {
        try {
            const response = await api.post(`${this.pathName}/send-code`, {}, { params: { email } })
            console.log("response", response.data)
            return response.data
        } catch (error) {
            throw this.handlerError(error)
        }
    }

    async verifyCode(email: string, code: string): Promise<boolean> {
        try {
            const response = await api.post(`${this.pathName}/verify-code`, {}, { params: { email, code } })
            return response.data
        } catch (error) {
            throw this.handlerError(error)
        }
    }
}


export default VerificationCodeService.getInstance()