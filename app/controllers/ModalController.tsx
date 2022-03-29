import dynamic, { DynamicOptions } from 'next/dynamic'
import { useDisclosure } from '@chakra-ui/hooks'
import { createContext, PropsWithChildren, useMemo, useState } from 'react'
import { Box, Center } from '@chakra-ui/layout'
import { Portal } from '@chakra-ui/portal'
import type { UseDisclosureReturn } from '@chakra-ui/hooks'
import { ConfirmationModalProps } from 'app/components/modals/ConfirmationModal'
import { NotUndefined } from 'types'
import { EditProfileModalProps } from 'app/components/modals/EditProfileModal'
import { Loader } from 'app/components/views/Loader'
import { ManageConnectionsModalProps } from 'app/components/modals/ManageConnectionsModal'

const dynamicOptions: DynamicOptions<
  ModalContextProps[keyof ModalContextProps]
> = {
  ssr: false,
  loading: () => (
    <Center pos="fixed" inset={0} m="auto">
      <Loader />
    </Center>
  ),
}

const modals = {
  confirm: dynamic(
    () => import('app/components/modals/ConfirmationModal'),
    dynamicOptions,
  ),
  editProfile: dynamic(
    () => import('app/components/modals/EditProfileModal'),
    dynamicOptions,
  ),
  manageConnections: dynamic(
    () => import('app/components/modals/ManageConnectionsModal'),
    dynamicOptions,
  ),
} as const

export type ModalContextProps = {
  confirm: ConfirmationModalProps
  editProfile: EditProfileModalProps
  manageConnections: ManageConnectionsModalProps
}

export type ModalContextNames = keyof typeof modals

interface ModalContextValue {
  disclosure: UseDisclosureReturn
  activeModal?: ModalContextNames
  setActiveModal(
    name: ModalContextNames,
    props: ModalContextProps[typeof name],
  ): void
}

export const ModalContext = createContext<ModalContextValue>(
  {} as ModalContextValue,
)

export const ModalController = ({ children }: PropsWithChildren<unknown>) => {
  const disclosure = useDisclosure({ defaultIsOpen: true })

  const [activeModal, _setActiveModal] = useState<
    ModalContextNames | undefined
  >()

  const [modalProps, setModalProps] =
    useState<ModalContextProps[NotUndefined<typeof activeModal>]>()

  const ActiveModal = useMemo(
    () => (activeModal ? modals[activeModal] : undefined),
    [activeModal],
  )

  const setActiveModal = (
    name: ModalContextNames,
    props: ModalContextProps[typeof name],
  ) => {
    setModalProps(props)
    _setActiveModal(name)

    if (!disclosure.isOpen) {
      disclosure.onOpen()
    }
  }
  return (
    <ModalContext.Provider value={{ setActiveModal, activeModal, disclosure }}>
      <Portal>
        <Box pos="fixed" top={0} left={0} pointerEvents="none">
          {/* @ts-ignore TODO: FIX LATER */}
          {ActiveModal && <ActiveModal {...modalProps} {...disclosure} />}
        </Box>
      </Portal>
      {children}
    </ModalContext.Provider>
  )
}
