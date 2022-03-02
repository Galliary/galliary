import { MotionBox, transitionMediumConfig } from "app/core/components/MotionBox"
import { Box, Portal, Text, useBoolean } from "@chakra-ui/react"
import { arrow, autoUpdate, offset, shift, useFloating } from "@floating-ui/react-dom"
import { ReactNode, useEffect, useRef } from "react"
import { useBanner } from "app/core/store/banner.store"

export type TooltipProps = {
  label: string
  offset?: number
  children: ReactNode | (({ isHovering: boolean }) => ReactNode)
}

export const Tooltip = ({ label, children, offset: offsetN = 8 }: TooltipProps) => {
  const [banner] = useBanner()
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
    strategy: "absolute",
    placement: "bottom",
    middleware: [shift({ padding: 8 }), offset(offsetN), arrow({ element: arrowRef })],
  })

  useEffect(() => {
    if (!refs.reference.current || !refs.floating.current) {
      return
    }

    return autoUpdate(refs.reference.current, refs.floating.current, update)
  }, [banner, refs.reference, refs.floating, update])

  return (
    <Box ref={reference} onPointerEnter={setHovering.on} onPointerLeave={setHovering.off}>
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
            left={arrowX != null ? `${arrowX}px` : ""}
            top={arrowY != null ? `${arrowY}px` : ""}
            initial={{ y: -6 }}
            animate={{ y: isHovering ? -6 : 12 }}
          >
            <Box bg="background.dark" boxSize={4} rounded="sm" transform="rotate(45deg)" />
          </MotionBox>
          <MotionBox
            transition={transitionMediumConfig}
            p={4}
            bg="background.dark"
            pointerEvents="none"
            rounded="md"
          >
            <Text color="ui.80" pointerEvents="none" userSelect="none">
              {label}
            </Text>
          </MotionBox>
        </MotionBox>
      </Portal>
      {typeof children === "function" ? children({ isHovering }) : children}
    </Box>
  )
}
