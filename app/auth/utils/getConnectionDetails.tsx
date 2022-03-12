import { UserConnectionType } from 'db'
import { ReactNode } from 'react'
import { CancelIcon } from 'app/components/icons/CancelIcon'
import { TwitterIcon } from 'app/components/icons/TwitterIcon'

interface ConnectionDetails {
  icon: ReactNode
  baseUrl: string
  displayName: string
  preHandle?: string
  postHandle?: string
}

const getBaseUrl = (type: UserConnectionType) => {
  switch (type) {
    case UserConnectionType.TWITTER:
      return 'https://twitter.com/'
    default:
      return '#not-implemented'
  }
}

const getDisplayName = (type: UserConnectionType) => {
  switch (type) {
    case UserConnectionType.TWITTER:
      return 'Twitter'
    default:
      return 'Not Implemented'
  }
}

const getIcon = (type: UserConnectionType) => {
  switch (type) {
    case UserConnectionType.TWITTER:
      return <TwitterIcon boxSize={6} />
    default:
      return <CancelIcon boxSize={6} />
  }
}

const getPreHandle = (type: UserConnectionType) => {
  switch (type) {
    case UserConnectionType.TWITTER:
      return '@'
    default:
      return undefined
  }
}

const getPostHandle = (type: UserConnectionType) => {
  switch (type) {
    default:
      return undefined
  }
}

export const getConnectionDetails = (
  type: UserConnectionType,
): ConnectionDetails => ({
  icon: getIcon(type),
  baseUrl: getBaseUrl(type),
  displayName: getDisplayName(type),
  preHandle: getPreHandle(type),
  postHandle: getPostHandle(type),
})
