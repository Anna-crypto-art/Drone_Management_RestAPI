import { ModuleClassKeyFigure } from "./abstract/pv-module-class-key-figure";

export class ModuleSoilingKeyFigure extends ModuleClassKeyFigure {
  protected getQueryClassParam(): number {
    return this.query!.module_soiling_level!;
  }
}