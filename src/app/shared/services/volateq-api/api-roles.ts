export enum ApiRoles {
  SUPER_ADMIN = 1,
  CUSTOMER_ADMIN = 2,
  PILOT = 3,
}

export const apiRoleNames: Record<ApiRoles, string> = {
  [ApiRoles.SUPER_ADMIN]: "SUPER_ADMIN",
  [ApiRoles.CUSTOMER_ADMIN]: "CUSTOMER_ADMIN",
  [ApiRoles.PILOT]: "PILOT",
};
