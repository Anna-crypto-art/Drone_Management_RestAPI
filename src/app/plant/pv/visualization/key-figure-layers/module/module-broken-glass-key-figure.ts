import { ModuleClassKeyFigure } from "./abstract/pv-module-class-key-figure";

export class ModuleBrokenGlassKeyFigure extends ModuleClassKeyFigure {
  protected getQueryClassParam(): number {
    return this.query!.module_broken_glass_class!;
  }
}