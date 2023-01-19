import { ProductPackageWithKeyFiguresSchema } from "@/app/shared/services/volateq-api/api-schemas/product-package";

export interface ProductPackageItem {
  id: number;
  name: string;
  technology: string;
  product_package: ProductPackageWithKeyFiguresSchema;
  number_currently_booked: number;
}

export interface EditProductPackage {
  id: number;
  product_package: ProductPackageWithKeyFiguresSchema;
}