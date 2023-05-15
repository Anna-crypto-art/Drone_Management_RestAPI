export function sortAlphabetical<T>(arr: Array<T>, prop: string) {
  return arr.sort((a, b) => {
    const valA = a[prop].toLowerCase();
    const valB = b[prop].toLowerCase();

    if (valA < valB) {
      return -1;
    }
    if (valA > valB) {
      return 1;
    }

    return 0;
  });
}

export function sortBy<T>(array: Array<T>, ...args: Array<(e: T) => string | number>) {
  return array.sort((a, b) => {
    for (const arg of args) {
      const valA = arg(a);
      const valB = arg(b);

      if (valA < valB) {
        return -1;
      }
      if (valA > valB) {
        return 1;
      }
    }

    return 0;
  });
}