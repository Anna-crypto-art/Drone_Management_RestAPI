export class AppDownloader {
  public static download(url: string, label?: string): void {
    const fileLink = document.createElement("a");
    fileLink.href = url;
    fileLink.setAttribute("download", label || url);

    document.body.appendChild(fileLink);

    fileLink.click();

    document.body.removeChild(fileLink);
  }

  public static open(url: string, target="_blank"): void {
    window.open(url, target)?.focus();
  }
}
