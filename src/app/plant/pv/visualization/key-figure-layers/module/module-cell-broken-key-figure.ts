import { ModuleClassKeyFigure } from "./abstract/pv-module-class-key-figure";

export class ModuleCellBrokenKeyFigure extends ModuleClassKeyFigure {
  protected getQueryClassParam(): number {
    return this.query!.module_cell_broken_class!;
  }
}