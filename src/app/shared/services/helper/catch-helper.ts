import { createDecorator } from "vue-class-component";


export function CatchError(loadingProp?: string) {
  return createDecorator((options, key) => {
    if (key === "created") {
      const originalCreated = options.created!;
      options.created = async function() {
        if (loadingProp) {
          this[loadingProp] = true
        }

        try {
          await originalCreated.apply(this);
        } catch (e) {
          (this as any).showError(e)
        } finally {
          if (loadingProp) {
            this[loadingProp] = false;
          }
        }
      }
    } else {
      options.methods = options.methods || {};
      const originalMethod = options.methods[key];
      options.methods[key] = async function (...args) {
        if (loadingProp) {
          this[loadingProp] = true
        }

        try {
          await originalMethod.apply(this, args);
        } catch (e) {
          (this as any).showError(e)
        } finally {
          if (loadingProp) {
            this[loadingProp] = false;
          }
        }
      } 
    }
  });
}