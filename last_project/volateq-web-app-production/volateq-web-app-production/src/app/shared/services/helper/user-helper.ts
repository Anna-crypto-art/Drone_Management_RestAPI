import { SimpleUserSchema } from "../volateq-api/api-schemas/user-schemas";

export function getUserName(user: SimpleUserSchema | undefined): string {
  if (!user) {
    return "";
  }
  
  return ((user.first_name || "") + " " + (user.last_name || "")).trim() || user.email;
}