import { ClassHceKeyFigureLayer } from "./shared/class-hce-key-figure-layer";

export class HcePositionSupportKeyFigureLayer extends ClassHceKeyFigureLayer {
  protected getQueryClass(): number | undefined {
    return this.query?.hce_position_support_offset_class
  }
}

export class HcePositionCenterKeyFigureLayer extends ClassHceKeyFigureLayer {
  protected getQueryClass(): number | undefined {
    return this.query?.hce_position_center_offset_class
  }
}