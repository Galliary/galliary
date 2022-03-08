import dynamic, { DynamicOptions } from 'next/dynamic'
import { useDisclosure } from '@chakra-ui/hooks'
import { createContext, PropsWithChildren, useMemo, useState } from 'react'
import {
  Box,
  Center,
  Portal,
  Spinner,
  UseDisclosureReturn,
} from '@chakra-ui/react'
import { ConfirmationModalProps } from 'app/components/modals/ConfirmationModal'
import { NotUndefined } from 'types'
import { EditProfileModalProps } from 'app/components/modals/EditProfileModal'

const dynamicOptions: DynamicOptions<
  ModalContextProps[keyof ModalContextProps]
> = {
  ssr: false,
  loading: () => (
    <Center pos="fixed" inset={0} m="auto">
      <Spinner color="brand.primary.100" />
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
} as const

export type ModalContextProps = {
  confirm: ConfirmationModalProps
  editProfile: EditProfileModalProps
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
