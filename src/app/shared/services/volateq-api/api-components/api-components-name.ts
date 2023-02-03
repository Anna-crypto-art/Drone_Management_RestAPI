import { ApiComponent } from "./api-components";

/**
 * Name of the component must be translatable!
 */
export const apiComponentNames: Record<ApiComponent, string> = {
  [ApiComponent.CSP_PTC_ABSORBER]: "absorber-tubes",
  [ApiComponent.CSP_PTC_MIRROR]: "mirrors",
  [ApiComponent.CSP_PTC_SCE]: "single-collector-elements",
  [ApiComponent.CSP_PTC_SCA]: "solar-collector-assembly",
  [ApiComponent.CSP_PTC_LOOP]: "loop",
  [ApiComponent.CSP_PTC_SUBFIELD]: "subfield",
  [ApiComponent.CSP_PTC_SWIVEL]: "rotation-joints",

  [ApiComponent.PV_MODULE]: "pv-module",
  [ApiComponent.PV_TRACKER]: "pv-tracker",
  [ApiComponent.PV_TRACKERGROUP]: "pv-tracker-group",
}