import { Control } from "ol/control";

export class CustomControl extends Control {
  constructor(el: Element) {
    super({});
    this.element = el as HTMLElement;
  }
}
