import { ApiComponent } from "./api-components"

/**
 * Defines which parent components can be filtered for a component of a PI
 */
export type ComponentsMapping = Record<ApiComponent, ApiComponent[] | null>;

export const apiComponentsFilter: ComponentsMapping = {
  [ApiComponent.CSP_PTC_SWIVEL]: [
    ApiComponent.CSP_PTC_SCA,
    ApiComponent.CSP_PTC_LOOP,
    ApiComponent.CSP_PTC_SUBFIELD,
  ],
  [ApiComponent.CSP_PTC_ABSORBER]: [
    ApiComponent.CSP_PTC_SCA,
    ApiComponent.CSP_PTC_LOOP,
    ApiComponent.CSP_PTC_SUBFIELD,
  ],
  [ApiComponent.CSP_PTC_MIRROR]: [
    ApiComponent.CSP_PTC_SCA,
    ApiComponent.CSP_PTC_LOOP,
    ApiComponent.CSP_PTC_SUBFIELD,
  ],
  [ApiComponent.CSP_PTC_SCE]: [
    ApiComponent.CSP_PTC_SCA,
    ApiComponent.CSP_PTC_LOOP,
    ApiComponent.CSP_PTC_SUBFIELD,
  ],
  [ApiComponent.CSP_PTC_SCA]: [
    ApiComponent.CSP_PTC_LOOP,
    ApiComponent.CSP_PTC_SUBFIELD,
  ],

  [ApiComponent.CSP_PTC_LOOP]: null,
  [ApiComponent.CSP_PTC_SUBFIELD]: null,

  [ApiComponent.PV_MODULE]: [
    ApiComponent.PV_TRACKER,
    ApiComponent.PV_TRACKERGROUP,
  ],
  [ApiComponent.PV_TRACKER]: [
    ApiComponent.PV_TRACKERGROUP,
  ],
  [ApiComponent.PV_TRACKERGROUP]: null,
}