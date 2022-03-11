export interface ImageMetaProps {
  imageUrl: string
  imageWidth: string
  imageHeight: string
  imageAlt: string
  imageType: string
}

export const ImageMeta = ({
  imageAlt,
  imageHeight,
  imageUrl,
  imageWidth,
  imageType,
}: ImageMetaProps) => (
  <>
    <meta name="twitter:image" content={imageUrl} />
    <meta property="og:image" content={imageUrl} />
    <meta property="og:image:secure_url" content={imageUrl} />
    <meta property="og:image:width" content={imageWidth} />
    <meta property="og:image:height" content={imageHeight} />
    <meta property="og:image:alt" content={imageAlt} />
    <meta property="og:image:type" content={imageType} />
  </>
)
