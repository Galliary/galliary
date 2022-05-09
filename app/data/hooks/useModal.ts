import { useContext } from 'react'
import merge from 'lodash/merge'
import { UseDisclosureReturn } from '@chakra-ui/react'
import {
  ModalContext,
  ModalContextNames,
  ModalContextProps,
} from 'app/controllers/ModalController'
import { PropsForModal } from 'global'

type WithoutDisclosure<Props extends PropsForModal> = Omit<
  Props,
  keyof UseDisclosureReturn
>

export const useModal = <
  Name extends ModalContextNames,
  Props extends WithoutDisclosure<ModalContextProps[Name]> = WithoutDisclosure<
    ModalContextProps[Name]
  >,
>(
  modalName: Name,
  initialProps?: Props,
) => {
  const { disclosure, setActiveModal } = useContext(ModalContext)

  const openModal = (props?: Partial<Props>) => {
    setActiveModal(modalName, merge(initialProps, props, {}) as any)
  }

  return [openModal, disclosure] as const
}
