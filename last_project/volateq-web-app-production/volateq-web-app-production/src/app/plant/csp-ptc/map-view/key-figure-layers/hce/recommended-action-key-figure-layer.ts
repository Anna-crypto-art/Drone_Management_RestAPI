import { ClassHceKeyFigureLayer } from "./abstract/class-hce-key-figure-layer";

export class RecommendedActionKeyFigureLayer extends ClassHceKeyFigureLayer {
  public getQueryClass(): number | undefined {
    return this.query?.recommended_action_class;
  }
}
