import { Box, Portal, Text, useBoolean } from '@chakra-ui/react'
import {
  arrow,
  autoUpdate,
  offset,
  shift,
  useFloating,
} from '@floating-ui/react-dom'
import { ReactNode, useEffect, useRef } from 'react'
import { MotionBox, transitionMediumConfig } from 'app/components/Motion'

export type TooltipProps = {
  label: string
  offset?: number
  children: ReactNode | (({ isHovering: boolean }) => ReactNode)
}

const TOOLTIP_GRADIENT_BG = '#000000'
const DEFAULT_OFFSET = 0
const OFFSET_OFFSET = 8 // Offset because of arrow size

export const Tooltip = ({
  label,
  children,
  offset: offsetN = DEFAULT_OFFSET,
}: TooltipProps) => {
  const arrowRef = useRef(null)
  const [isHovering, setHovering] = useBoolean(false)

  const {
    x,
    y,
    strategy,
    reference,
    floating,
    refs,
    update,
    middlewareData: { arrow: { x: arrowX, y: arrowY } = {} },
  } = useFloating({
    strategy: 'absolute',
    placement: 'bottom',
    middleware: [
      shift({ padding: 8 }),
      offset(OFFSET_OFFSET + offsetN),
      arrow({ element: arrowRef }),
    ],
  })

  useEffect(() => {
    if (!refs.reference.current || !refs.floating.current) {
      return
    }

    return autoUpdate(refs.reference.current, refs.floating.current, update)
  }, [refs.reference, refs.floating, update, isHovering])

  return (
    <Box
      ref={reference}
      onPointerEnter={setHovering.on}
      onPointerLeave={setHovering.off}
      onFocus={setHovering.on}
      onBlur={setHovering.off}
    >
      <Portal>
        <MotionBox
          transition={transitionMediumConfig}
          pointerEvents="none"
          userSelect="none"
          ref={floating}
          pos={strategy}
          top={y ?? 0}
          left={x ?? 0}
          initial={{ opacity: 0, y: -4 }}
          animate={{ opacity: Number(isHovering), y: isHovering ? 0 : -4 }}
          zIndex={1000}
        >
          <MotionBox
            transition={transitionMediumConfig}
            zIndex={-1}
            ref={arrowRef}
            pos={strategy}
            left={arrowX != null ? `${arrowX}px` : ''}
            top={arrowY != null ? `${arrowY}px` : ''}
            initial={{ y: -6 }}
            animate={{ y: isHovering ? -6 : 12 }}
          >
            <Box
              boxSize={4}
              rounded="sm"
              transform="rotate(45deg)"
              bg={TOOLTIP_GRADIENT_BG}
            />
          </MotionBox>
          <MotionBox
            transition={transitionMediumConfig}
            p={4}
            rounded="md"
            pointerEvents="none"
            bg={TOOLTIP_GRADIENT_BG}
          >
            <Text color="ui.80" pointerEvents="none" userSelect="none">
              {label}
            </Text>
          </MotionBox>
        </MotionBox>
      </Portal>
      {typeof children === 'function' ? children({ isHovering }) : children}
    </Box>
  )
}
