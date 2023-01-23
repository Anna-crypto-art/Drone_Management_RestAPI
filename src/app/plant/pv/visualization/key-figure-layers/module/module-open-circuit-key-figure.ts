import { ModuleClassKeyFigure } from "./abstract/pv-module-class-key-figure";

export class ModuleOpenCircuitKeyFigure extends ModuleClassKeyFigure {
  protected getQueryClassParam(): number {
    return this.query!.module_open_circuit_class!;
  }
}