import { getAntiCSRFToken } from 'blitz'
import { CLOUDFLARE_ACCOUNT_HASH } from 'app/constants'

export enum StaticImages {
  SocialPreview = 'c301acf6-b759-4b0e-f7e2-78c475360900',
}

export enum ImageType {
  Social = 'social',
  Public = 'public',
  Small = '96',
  Medium = '128',
  Large = '192',
  ExtraLarge = '256',
  UltraLarge = '516',
}

export class CDN {
  public static API_KEY = process.env.CDN_API_KEY ?? ''
  public static ACCOUNT_ID = process.env.CDN_ACCOUNT_ID ?? ''

  public static BASE_PATH = `https://api.cloudflare.com/client/v4/accounts/${CDN.ACCOUNT_ID}/images/v1`

  public static getImageUrl(
    id: string,
    type: ImageType = ImageType.Public,
  ): string {
    return `https://cdn.galliary.com/cdn-cgi/imagedelivery/${CLOUDFLARE_ACCOUNT_HASH}/${id}/${type}`
  }

  public static getPublicImageUrl(id: string): string {
    return CDN.getImageUrl(id, ImageType.Public)
  }

  static async delete(sourceId: string): Promise<boolean> {
    const response = await fetch(`${CDN.BASE_PATH}/${sourceId}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${CDN.API_KEY}`,
      },
    })

    return response.ok && (await response.json())?.success
  }

  static async upload(file: File): Promise<string | false> {
    const formData = new FormData()

    formData.append('file', file)

    const csrfToken = getAntiCSRFToken()

    const response = await fetch('/api/images', {
      method: 'POST',
      credentials: 'include',
      headers: {
        'anti-csrf': csrfToken,
      },
      body: formData,
    })

    return response.ok && (await response.text())
  }

  static get SAMPLE_IMG_URL() {
    return CDN.getImageUrl('3e9bcb67-d338-49f0-5f3f-90782820ef00')
  }
}
