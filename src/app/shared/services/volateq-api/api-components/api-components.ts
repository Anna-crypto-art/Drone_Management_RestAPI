import { ApiTechnology } from "../api-technologies";

export enum ApiComponent {
  CSP_PTC_ABSORBER = 1,
  CSP_PTC_SWIVEL = 3,
  CSP_PTC_MIRROR = 4,
  CSP_PTC_SCA = 5,
  CSP_PTC_SCE = 6,
  CSP_PTC_SUBFIELD = 7,
  CSP_PTC_LOOP = 8,

  PV_MODULE = 9,
  PV_TRACKER = 10,
  PV_TRACKERGROUP = 11,
}

export const apiTechnologyComponents: Record<ApiTechnology, ApiComponent[]> = {
  [ApiTechnology.CSP_PTC]: [
    ApiComponent.CSP_PTC_ABSORBER,
    ApiComponent.CSP_PTC_SWIVEL,
    ApiComponent.CSP_PTC_MIRROR,
    ApiComponent.CSP_PTC_SCA,
    ApiComponent.CSP_PTC_SCE,
    ApiComponent.CSP_PTC_SUBFIELD,
    ApiComponent.CSP_PTC_LOOP,
  ],
  [ApiTechnology.PV]: [
    ApiComponent.PV_MODULE,
    ApiComponent.PV_TRACKER,
    ApiComponent.PV_TRACKERGROUP,
  ],
}