import { createIcon } from '@chakra-ui/icon'

const DASH_FILLED = 710

export const LoadingIcon = createIcon({
  displayName: 'LoadingIcon',
  viewBox: '0 0 128 128',
  defaultProps: {
    h: '128px',
    w: '128px',
    strokeWidth: 2,
    fill: 'none',
    stroke: 'brand.primary.100',
    strokeLinejoin: 'round',
    strokeLinecap: 'round',
    strokeDasharray: 700,
    strokeDashoffset: DASH_FILLED,
  },
  path: (
    <>
      <path
        d="M66.788 115.512C64.42 115.512 62.404 114.744 60.74 113.208C59.14 111.672 58.34 109.528 58.34 106.776C58.34 105.688 58.5 104.472 58.82 103.128C59.14 101.848 59.62 100.504 60.26 99.096C62.692 93.976 65.796 89.432 69.572 85.464C73.348 81.432 77.668 77.944 82.532 75C82.532 73.848 82.5 72.344 82.436 70.488C82.372 68.632 82.276 66.648 82.148 64.536C82.084 62.424 81.988 60.472 81.86 58.68C80.772 61.176 79.588 63.672 78.308 66.168C77.028 68.6 75.94 70.488 75.044 71.832C72.932 75.032 70.5 77.816 67.748 80.184C64.996 82.552 62.148 84.408 59.204 85.752C56.26 87.032 53.412 87.672 50.66 87.672C47.204 87.672 44.324 86.776 42.02 84.984C39.78 83.192 38.116 80.76 37.028 77.688C35.94 74.552 35.396 71.096 35.396 67.32C35.396 64.12 35.78 60.856 36.548 57.528C33.348 56.888 30.692 55.768 28.58 54.168C26.404 52.568 25.316 50.296 25.316 47.352C25.316 45.88 25.7 44.568 26.468 43.416C27.236 42.264 28.164 41.304 29.252 40.536C30.34 39.768 31.332 39.224 32.228 38.904C32.356 38.84 32.516 38.808 32.708 38.808C33.156 38.808 33.38 38.968 33.38 39.288C33.38 39.608 33.124 39.928 32.612 40.248C31.78 40.696 31.012 41.528 30.308 42.744C29.54 43.96 29.156 45.112 29.156 46.2C29.156 48.312 29.956 50.04 31.556 51.384C33.22 52.664 35.14 53.656 37.316 54.36C38.724 49.304 40.868 44.408 43.748 39.672C46.692 34.936 50.34 30.84 54.692 27.384C59.044 23.864 64.036 21.496 69.668 20.28C70.884 20.024 72.132 19.832 73.412 19.704C74.692 19.512 75.94 19.416 77.156 19.416C79.204 19.416 81.124 19.704 82.916 20.28C84.708 20.856 86.148 21.848 87.236 23.256C88.388 24.6 88.964 26.552 88.964 29.112C88.964 32.568 88.004 35.8 86.084 38.808C84.164 41.752 81.7 44.408 78.692 46.776C75.748 49.08 72.612 51.032 69.284 52.632C66.02 54.168 63.012 55.288 60.26 55.992C57.636 56.632 54.948 57.144 52.196 57.528C49.444 57.848 46.852 58.04 44.42 58.104C43.332 62.584 42.788 66.648 42.788 70.296C42.788 74.456 43.524 77.912 44.996 80.664C46.532 83.416 48.9 84.792 52.1 84.792C54.276 84.792 56.612 84.12 59.108 82.776C61.668 81.432 64.228 79.576 66.788 77.208C69.348 74.776 71.716 71.96 73.892 68.76C75.492 66.392 76.9 63.896 78.116 61.272C79.396 58.584 80.42 55.8 81.188 52.92C81.444 49.848 82.116 47.608 83.204 46.2C84.356 44.792 85.572 43.896 86.852 43.512C88.196 43.064 89.284 42.84 90.116 42.84H91.076C92.036 42.84 92.516 43.032 92.516 43.416C92.516 43.544 92.388 43.736 92.132 43.992C91.364 44.632 90.756 45.816 90.308 47.544C89.86 49.208 89.54 51.192 89.348 53.496C89.156 55.736 88.996 58.04 88.868 60.408C88.804 62.712 88.772 64.824 88.772 66.744C88.772 68.664 88.74 70.136 88.676 71.16C90.404 70.136 91.94 69.4 93.284 68.952C94.628 68.44 95.652 68.184 96.356 68.184C96.676 68.184 96.9 68.216 97.028 68.28C97.476 68.344 97.7 68.664 97.7 69.24C97.7 69.624 97.54 69.816 97.22 69.816H96.836C96.196 69.816 95.204 70.168 93.86 70.872C92.516 71.512 91.268 72.28 90.116 73.176C89.028 74.072 88.484 74.84 88.484 75.48V76.536C88.484 83.512 87.78 89.464 86.372 94.392C84.964 99.384 83.14 103.416 80.9 106.488C78.724 109.624 76.388 111.896 73.892 113.304C71.396 114.776 69.028 115.512 66.788 115.512ZM45.092 55.608H45.956C50.372 55.608 54.98 54.968 59.78 53.688C62.02 53.112 64.516 52.056 67.268 50.52C70.084 48.984 72.772 47.128 75.332 44.952C77.956 42.712 80.1 40.312 81.764 37.752C83.492 35.128 84.356 32.472 84.356 29.784C84.356 27.288 83.588 25.464 82.052 24.312C80.58 23.16 78.692 22.584 76.388 22.584C75.556 22.584 74.66 22.68 73.7 22.872C72.804 23 71.844 23.224 70.82 23.544C66.724 24.76 62.98 27.032 59.588 30.36C56.196 33.688 53.284 37.56 50.852 41.976C48.42 46.392 46.5 50.936 45.092 55.608ZM67.94 113.016C69.54 113.016 71.204 112.28 72.932 110.808C74.724 109.4 76.292 107.128 77.636 103.992C79.428 99.832 80.58 95.512 81.092 91.032C81.668 86.616 82.052 82.136 82.244 77.592C81.476 78.04 80.292 78.936 78.692 80.28C77.092 81.56 75.332 83.16 73.412 85.08C71.492 86.936 69.668 88.952 67.94 91.128C66.276 93.304 64.996 95.512 64.1 97.752C62.884 100.632 62.276 103.256 62.276 105.624C62.276 107.992 62.82 109.816 63.908 111.096C64.996 112.376 66.34 113.016 67.94 113.016Z"
        className="outlineAnimation pathStyle"
      />

      <style jsx>
        {`
          .outlineAnimation {
            animation-name: loaderStroke;
            animation-duration: 8s;
            animation-iteration-count: infinite;
          }

          @keyframes loaderStroke {
            0% {
              stroke-dashoffset: ${DASH_FILLED};
            }
            50% {
              stroke-dashoffset: 0;
            }
            100% {
              stroke-dashoffset: ${DASH_FILLED};
            }
          }
        `}
      </style>
    </>
  ),
})
