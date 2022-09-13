export interface UpdatePlantRequest {
    name?: string;
    in_setup_phase?: boolean;
    orientation?: number;
}

export interface CreatePlantRequest {
    name: string;
    customer_id: string;
    technology_id: number;
}

export interface updatePlantPackagesRequest {
    product_packages: number[];
    yearly_intervals: number[];
}