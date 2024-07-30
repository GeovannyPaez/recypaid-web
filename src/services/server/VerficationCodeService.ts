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
        return this.makeRequest({
            method: 'post',
            endpoint: '/send-code',
            searchParams: { email },
            isPublic: true
        });
    }

    async verifyCode(email: string, code: string): Promise<boolean> {
        return this.makeRequest({
            method: 'post',
            endpoint: '/verify-code',
            searchParams: { email, code },
            isPublic: true
        });
    }
}


export default VerificationCodeService.getInstance()