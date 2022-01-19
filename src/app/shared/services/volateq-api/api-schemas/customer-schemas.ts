export interface AddressSchema {
  street: string;
  zipcode: string;
  city: string;
  country: string;
}

export interface CustomerSchema {
  id: string;
  name: string;
  profile: AddressSchema;
}
