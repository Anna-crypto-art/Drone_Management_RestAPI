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