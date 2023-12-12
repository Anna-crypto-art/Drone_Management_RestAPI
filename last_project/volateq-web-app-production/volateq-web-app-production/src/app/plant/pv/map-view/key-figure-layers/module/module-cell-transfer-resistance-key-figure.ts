import { ModuleClassKeyFigure } from "./abstract/pv-module-class-key-figure";

export class ModuleCellTransferResistanceKeyFigure extends ModuleClassKeyFigure {
  protected getQueryClassParam(): number {
    return this.query!.module_cell_transfer_resistance_class!;
  }
}