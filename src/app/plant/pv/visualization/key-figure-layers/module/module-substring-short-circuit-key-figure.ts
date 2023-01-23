import { ModuleClassKeyFigure } from "./abstract/pv-module-class-key-figure";

export class ModuleSubstringShortCircuitKeyFigure extends ModuleClassKeyFigure {
  protected getQueryClassParam(): number {
    return this.query!.module_substring_short_circuit_class!;
  }
}