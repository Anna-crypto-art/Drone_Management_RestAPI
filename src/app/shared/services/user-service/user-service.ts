import { UserSchema } from "../volateq-api/api-schemas/user-schemas";
import volateqApi from "../volateq-api/volateq-api";

export class UserService {
  private meUser: UserSchema | null = null;

  public async me(): Promise<UserSchema> {
    if (this.meUser === null) {
      await this.refreshMe();
    }

    return this.meUser!;
  }

  public async refreshMe() {
    this.meUser = await volateqApi.getMe();
  }
}

export const userService = new UserService();