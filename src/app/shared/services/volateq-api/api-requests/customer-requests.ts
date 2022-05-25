/**
 * class CreateCustomerRequest(SchemaRequestBase):
    name = fields.String(required=True)
    role = fields.String(default=None)


class UpdateCustomerRequest(SchemaRequestBase):
    name = fields.String(default=None)
    role = fields.String(default=None)
    plant_ids = fields.List(cls_or_instance=fields.String(), default=None)
 */

export interface CustomerRequest {
  name: string;
  role?: string;
  plant_ids: string[];
}