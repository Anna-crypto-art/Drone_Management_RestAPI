import { apiBaseUrl } from "@/environment/environment";
import { HttpClientBase } from "../volateq-api/http-client-base";

export class AppDownloader {
  public static download(url: string, label?: string): void {
    const fileLink = document.createElement('a');
    fileLink.href = url;
    fileLink.setAttribute('download', label || url);

    document.body.appendChild(fileLink);

    fileLink.click();
  }

  public static async authDownload(url: string, label?: string): Promise<void> {
    // https://stackoverflow.com/questions/29452031/how-to-handle-file-downloads-with-jwt-based-authentication

    const httpClient = HttpClientBase.createAuthHttpClient(apiBaseUrl!);
    // response.
  }
}