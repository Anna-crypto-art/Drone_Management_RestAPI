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

// export const catchError = (settings?: { 
//   loadingPropertyName?: string,
//  }) => {
//   return (target: BaseComponent, key: string, descriptor: PropertyDescriptor) => {
//     const method = descriptor.value;

//     console.log(descriptor);

//     descriptor.value = async (...args: any) => {
//       if (settings?.loadingPropertyName) {
//         console.log("target.constructor[settings?.loadingPropertyName]");
//         console.log(target.constructor[settings?.loadingPropertyName]);

//         target[settings?.loadingPropertyName] = true; 
//       }

//       console.log(target);

//       try {
//         return await method.apply(target, args);
//       } catch (e) {
//         console.log(target);

//         target.showError(e);
//       } finally {
//         if (settings?.loadingPropertyName) {
//           target[settings?.loadingPropertyName] = false; 
//         }
//       }
//     }
//   }
// }
