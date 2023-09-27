export interface GeoVisualQuery {
  undefined?: 1 | 0;
  /**
   * If you need to visualize same PI in several ways,
   * you can difference the visualizuation of the same PI with this param.
   * But you need to now the python class name of the key figure.
   */
  key_figure_class_name?: string;
}

export interface GeoVisualCspPtcQuery extends GeoVisualQuery {
  glass_tube_temperature_class?: 1 | 2 | 3 | 4;
  missing_glass_tube?: 0 | 1;
  coating_degraded?: 0 | 1;
  oxygen_penetration?: 0 | 1;
  h2_concentration?: 0 | 1;
  hot_glass_tube_ends?: 0 | 1;
  recommended_action_class?: 1 | 2 | 3;
  orientation_offset_class?: 1 | 2 | 3;
  torsion_class?: 1 | 2 | 3;
  sdx_class?: 1 | 2 | 3;
  gripping_potential_class?: 1 | 2 | 3;
  white_glass_tube?: 0 | 1;
  rotation_joint_angle_gripping_potential_class?: 1 | 2 | 3 | 4;
  
  hce_position_support_offset_class?: 1 | 2 | 3;
  hce_position_center_offset_class?: 1 | 2 | 3;

  /**
   * Parameters for load ortho images
   */
  child_component_id?: number;
  child_pcs?: string;
}

export interface GeoVisualPvQuery extends GeoVisualQuery {
  tracker_soiling_level?: 1 | 2 | 3;
  tracker_deviation_class?: 1 | 2 | 3;
  module_soiling_level?: 1 | 2 | 3;
  module_broken_glass_class?: 1 | 2 | 3;
  module_pid?: 0 | 1;
  module_open_circuit?: 0 | 1;
  bypass_diode_active?: 0 | 1;
  module_cell_hotspot?: 0 | 1;
  module_cell_transfer_resistance_class?: 1 | 2 | 3;
  module_shadowing?: 0 | 1;
}