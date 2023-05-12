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

export function sortBy<T>(array: Array<T>, ...args: Array<string | ((e: T) => any)>) {
  return array.sort((a, b) => {
    for (const arg of args) {
      const valA = typeof arg === "string" ? a[arg] : arg(a);
      const valB = typeof arg === "string" ? b[arg] : arg(b);

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