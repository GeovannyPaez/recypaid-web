import { UserPublic } from "@/types/user";
import { ApiService } from "./ApiService";

class UsersService extends ApiService {
  private constructor(readonly pathName: string) {
    super(pathName);
  }

  private static privateInstance: UsersService;

  static getInstance(): UsersService {
    if (!UsersService.privateInstance) {
      UsersService.privateInstance = new UsersService("/users");
    }
    return UsersService.privateInstance;
  }

  async findAll(): Promise<UserPublic[]> {
    return this.makeRequest({
      method: "get",
      endpoint: "",
      defaultErrorResponse: [],
    });
  }
}

export default UsersService.getInstance();
