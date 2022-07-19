import { PlantSchema } from "./plant-schema";

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

export interface SimpleCustomerSchema {
  id: string;
  name: string;
  role: CustomerRole;
}

export interface CustomerSchema extends SimpleCustomerSchema {
  profile: AddressSchema;
  plants: PlantSchema[];
}

