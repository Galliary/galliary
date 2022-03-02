import { default as ServerFormData } from "form-data"
import { request } from "http"
import { getAntiCSRFToken } from "blitz"

export enum ImageType {
  Public = "public",
  Small = "96",
  Medium = "128",
  Large = "192",
  ExtraLarge = "256",
}

export class CDN {
  public static ACCOUNT_HASH = "8yAzsAP1tGpuA0gIh26SsA"

  public static API_KEY = process.env.CDN_API_KEY ?? ""
  public static ACCOUNT_ID = process.env.CDN_ACCOUNT_ID ?? ""

  public static BASE_PATH = `https://api.cloudflare.com/client/v4/accounts/${CDN.ACCOUNT_ID}/images/v1`

  public static getImageUrl(id: string, type: ImageType = ImageType.Public): string {
    return `https://synqat.gg/cdn-cgi/imagedelivery/${CDN.ACCOUNT_HASH}/${id}/${type}`
  }

  public static getPublicImageUrl(id: string): string {
    return CDN.getImageUrl(id, ImageType.Public)
  }

  static async delete(sourceId: string): Promise<boolean> {
    const response = await fetch(`${CDN.BASE_PATH}/${sourceId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${CDN.API_KEY}`,
      },
    })

    return response.ok && (await response.json())?.success
  }

  static async upload(file: File): Promise<string | false> {
    const formData = new FormData()

    formData.append("file", file)

    const csrfToken = getAntiCSRFToken()

    const response = await fetch("/api/images", {
      method: "POST",
      credentials: "include",
      headers: {
        "anti-csrf": csrfToken,
      },
      body: formData,
    })

    console.log(response)

    return response.ok && (await response.text())
  }

  static get SAMPLE_IMG_URL() {
    return CDN.getImageUrl("3e9bcb67-d338-49f0-5f3f-90782820ef00")
  }
}
