export function getReadableFileSize(size: number): string {
  const sizes = ["KB", "MB", "GB", "TB"];

  let i = 0;
  do {
    size = size / 1024;
  } while (size > 1024 && ++i < sizes.length);

  // console.log(`${Math.round(size)} ${sizes[i]}`);
  return `${Math.round(size)} ${sizes[i]}`;
}
