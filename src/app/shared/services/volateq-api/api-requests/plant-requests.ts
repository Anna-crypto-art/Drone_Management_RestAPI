export interface UpdatePlantRequest {
    name?: string;
    in_setup_phase?: boolean;
}

export interface CreatePlantRequest {
    name: string;
    customer_id: string;
    technology_id: number;
}