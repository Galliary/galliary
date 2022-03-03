import { ChangeEvent, PropsWithoutRef, useState } from "react"
import { ErrorMessage, useField, useFormikContext } from "formik"
import {
  AspectRatio,
  Box,
  BoxProps,
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  forwardRef,
  HStack,
  Image,
  ImageProps,
  Input,
  InputProps,
  Text,
  useBoolean,
  VStack,
  Wrap,
} from "@chakra-ui/react"
import { CDN } from "app/core/utils/cdn"
import { getColorFromURL, getPaletteFromURL, Palette } from "color-thief-node"
import { AnimateSharedLayout } from "framer-motion"
import {
  MotionBox,
  MotionButton,
  transitionFastConfig,
  transitionMediumConfig,
} from "app/core/components/MotionBox"

export interface LabeledImageFieldProps extends PropsWithoutRef<JSX.IntrinsicElements["input"]> {
  /** Field name. */
  name: string
  /** Field label. */
  label: string
  outerProps?: PropsWithoutRef<JSX.IntrinsicElements["div"]>
  ratio?: number
  imageProps?: Omit<ImageProps, "src" | "srcSet" | "fallback" | "fallbackSrc">
}

const isColorSelected = (color: Palette, selected: Palette) => {
  return color[0] === selected[0] && color[1] === selected[1] && color[2] === selected[2]
}

export const LabeledImageField = forwardRef<InputProps & LabeledImageFieldProps, typeof Input>(
  ({ name, label, outerProps, ratio, imageProps, ...props }, ref) => {
    const [{ onChange: _, value, ...input }] = useField(name)
    const { isSubmitting, errors, values, setFieldValue } =
      useFormikContext<{ sourceId: string; __image_color: Palette }>()
    const [isFocused, setFocusing] = useBoolean(false)
    const [isHovering, setHovering] = useBoolean(false)
    const [imageSrc, setImageSrc] = useState(
      values.sourceId ? CDN.getImageUrl(values.sourceId) : ""
    )
    const [colors, setColors] = useState<Palette[] | undefined>()

    const sizeProps: BoxProps = {
      boxSize: imageProps?.boxSize,
      w: imageProps?.w,
      h: imageProps?.h,
      width: imageProps?.width,
      height: imageProps?.height,
    }

    const onFileUpload = (event: ChangeEvent<HTMLInputElement>) => {
      const file = event.currentTarget.files?.[0]
      if (!file) {
        return
      }

      const reader = new FileReader()

      reader.onload = async () => {
        setImageSrc(reader.result as string)
        setFieldValue(name, file)

        const selectedColors = await getPaletteFromURL(reader.result as string, 8, 1).catch(
          () => []
        )

        // remove duplicate rgb colors
        const uniqueColors = selectedColors.filter(
          (color, index, self) => index === self.findIndex((t) => isColorSelected(t, color))
        )

        setColors(uniqueColors)
        setFieldValue("__image_color", uniqueColors[0])
      }

      reader.readAsDataURL(file)
    }

    return (
      <VStack boxSize="full" align="start" spacing={4}>
        <FormControl w="full" {...outerProps} isInvalid={errors[name]}>
          <FormLabel
            as={VStack}
            spacing={2}
            align="stretch"
            w="full"
            rounded="md"
            _focus={{ shadow: "outline" }}
            transitionDuration="fast"
            transitionTimingFunction="ease"
          >
            <Text color="ui.80" textStyle="label.medium">
              {label}
            </Text>
            <AspectRatio ratio={ratio ?? 0}>
              <Box
                onPointerEnter={setHovering.on}
                onPointerLeave={setHovering.off}
                pos="relative"
                {...sizeProps}
                bg="ui.5"
                rounded="md"
                cursor="pointer"
                transitionProperty="common"
                transitionDuration="normal"
                _hover={{ bg: "ui.10" }}
              >
                <Input
                  zIndex={1}
                  opacity={0}
                  pos="absolute"
                  inset={0}
                  boxSize="full"
                  type="file"
                  accept="image/*"
                  cursor="pointer"
                  {...input}
                  onChange={onFileUpload}
                  disabled={isSubmitting}
                  {...props}
                  ref={ref}
                />
                {imageSrc ? (
                  <Image
                    alt={label}
                    src={imageSrc}
                    pos="absolute"
                    inset={0}
                    boxSize="full"
                    objectFit="cover"
                    transitionProperty="common"
                    transitionDuration="normal"
                    opacity={isHovering ? 0.8 : 1}
                  />
                ) : (
                  <Text color="ui.40" textStyle="label.large">
                    Upload image
                  </Text>
                )}
              </Box>
            </AspectRatio>
          </FormLabel>

          <ErrorMessage name={name}>
            {(error) => (
              <FormErrorMessage role="alert" color="status.bad">
                {error}
              </FormErrorMessage>
            )}
          </ErrorMessage>
        </FormControl>
        {colors && (
          <VStack spacing={2} align="start" w="full">
            <Text color="ui.80" textStyle="label.medium">
              Select a color
            </Text>
            <AnimateSharedLayout>
              <Wrap maxW="512px" spacing={2}>
                {colors.map(([r, g, b], i) => (
                  <Box key={i + [r, g, b].toString()} boxSize={16} pos="relative">
                    {isColorSelected([r, g, b], values.__image_color) && (
                      <MotionBox
                        userSelect="none"
                        pointerEvents="none"
                        transition={transitionMediumConfig}
                        layoutId="color-outline"
                        shadow="outline"
                        pos="absolute"
                        inset={0}
                        rounded="md"
                      />
                    )}
                    <MotionButton
                      size="none"
                      variant="none"
                      cursor="pointer"
                      _hover={{
                        opacity: 0.8,
                      }}
                      zIndex={1}
                      pos="absolute"
                      inset={0}
                      borderWidth={4}
                      borderColor="background.full"
                      bg={`rgb(${r}, ${g}, ${b})`}
                      onClick={() => setFieldValue("__image_color", [r, g, b])}
                    />
                  </Box>
                ))}
              </Wrap>
            </AnimateSharedLayout>
          </VStack>
        )}
      </VStack>
    )
  }
)

export default LabeledImageField
