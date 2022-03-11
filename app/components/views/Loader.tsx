import { createIcon } from '@chakra-ui/icon'

export const Loader = createIcon({
  displayName: 'Loader',
  viewBox: '0 0 24 24',
  defaultProps: {
    x: '0px',
    y: '0px',
    boxSize: 12,
    xmlSpace: 'preserve',
    color: 'brand.primary.100',
    enableBackground: 'new 0 0 0 0',
  },
  path: (
    <>
      <rect x="4" y="2" rx="2" width="4" height="8" fill="currentColor">
        <animateTransform
          attributeType="xml"
          attributeName="transform"
          type="translate"
          values="0 0; 0 12; 0 0"
          begin="0"
          dur="0.6s"
          repeatCount="indefinite"
        />
      </rect>
      <rect x="10" y="2" rx="2" width="4" height="8" fill="currentColor">
        <animateTransform
          attributeType="xml"
          attributeName="transform"
          type="translate"
          values="0 0; 0 12; 0 0"
          begin="0.2s"
          dur="0.6s"
          repeatCount="indefinite"
        />
      </rect>
      <rect x="16" y="2" rx="2" width="4" height="8" fill="currentColor">
        <animateTransform
          attributeType="xml"
          attributeName="transform"
          type="translate"
          values="0 0; 0 12; 0 0"
          begin="0.4s"
          dur="0.6s"
          repeatCount="indefinite"
        />
      </rect>
    </>
  ),
})
