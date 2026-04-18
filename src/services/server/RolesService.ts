import { ApiService } from "./ApiService";

type AssignRolePayload = {
  userId: string;
  roleName: string;
  expiresAt?: string;
};

class RolesService extends ApiService {
  private constructor(readonly pathName: string) {
    super(pathName);
  }

  private static privateInstance: RolesService;

  static getInstance(): RolesService {
    if (!RolesService.privateInstance) {
      RolesService.privateInstance = new RolesService("/roles");
    }
    return RolesService.privateInstance;
  }

  async assignRole(payload: AssignRolePayload): Promise<void> {
    await this.makeRequest({
      method: "post",
      endpoint: "/assign",
      data: payload,
    });
  }
}

export default RolesService.getInstance();
