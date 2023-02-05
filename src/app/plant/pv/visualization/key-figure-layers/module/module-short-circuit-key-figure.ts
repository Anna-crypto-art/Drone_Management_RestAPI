import { ModuleClassKeyFigure } from "./abstract/pv-module-class-key-figure";

export class ModuleShortCircuitKeyFigure extends ModuleClassKeyFigure {
  protected getQueryClassParam(): number {
    return this.query!.module_short_circuit_class!;
  }
}