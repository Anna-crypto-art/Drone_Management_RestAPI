import { apiBaseUrl } from "@/environment/environment";
import { HttpClientBase } from "../volateq-api/http-client-base";
import volateqApi from "../volateq-api/volateq-api";

export class AppDownloader {
  public static download(url: string, label?: string): void {
    const fileLink = document.createElement('a');
    fileLink.href = url;
    fileLink.setAttribute('download', label || url);

    document.body.appendChild(fileLink);

    fileLink.click();
  }
}