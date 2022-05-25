import { SimplePlantSchema } from "./plant-schema";

export interface AddressSchema {
  street: string;
  zipcode: string;
  city: string;
  country: string;
}

export enum CustomerRole {
  SERVICE = 'Service',
  OWNER = 'Owner',
  OPERATOR = 'Operator',
}

export interface CustomerSchema {
  id: string;
  name: string;
  role: CustomerRole;
  profile: AddressSchema;
  plants: SimplePlantSchema[];
}
