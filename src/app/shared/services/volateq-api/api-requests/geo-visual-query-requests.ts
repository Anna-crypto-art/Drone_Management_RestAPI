export interface GeoVisualQuery {
  undefined?: 1;
  ir_intensity_class?: 1 | 2 | 3;
  glass_tube_temperature_class?: 1 | 2 | 3 | 4;
  missing_glass_tube?: 0 | 1;
  coating_degraded?: 0 | 1;
  oxygen_penetration?: 0 | 1;
  h2_concentration?: 0 | 1;
  recommended_action_class?: 1 | 2 | 3;
  orientation_offset_class?: 1 | 2 | 3;
  torsion_class?: 1 | 2 | 3;
  sdx_class?: 1 | 2 | 3;
}
