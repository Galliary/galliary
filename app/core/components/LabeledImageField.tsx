import { ChangeEvent, PropsWithoutRef, useState } from "react"
import { ErrorMessage, useField, useFormikContext } from "formik"
import {
  AspectRatio,
  Box,
  BoxProps,
  FormControl,
  FormErrorMessage,
  FormLabel,
  forwardRef,
  Image,
  ImageProps,
  Input,
  InputProps,
  Text,
  useBoolean,
  VStack,
} from "@chakra-ui/react"
import { CDN } from "app/core/utils/cdn"

export interface LabeledImageFieldProps extends PropsWithoutRef<JSX.IntrinsicElements["input"]> {
  /** Field name. */
  name: string
  /** Field label. */
  label: string
  outerProps?: PropsWithoutRef<JSX.IntrinsicElements["div"]>
  ratio?: number
  imageProps?: Omit<ImageProps, "src" | "srcSet" | "fallback" | "fallbackSrc">
}

export const LabeledImageField = forwardRef<InputProps & LabeledImageFieldProps, typeof Input>(
  ({ name, label, outerProps, ratio, imageProps, ...props }, ref) => {
    const [{ onChange: _, value, ...input }] = useField(name)
    const { isSubmitting, errors, values, setFieldValue } = useFormikContext<{ sourceId: string }>()
    const [isHovering, setHovering] = useBoolean(false)
    const [imageSrc, setImageSrc] = useState(
      values.sourceId ? CDN.getImageUrl(values.sourceId) : ""
    )

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

      reader.onload = () => {
        setImageSrc(reader.result as string)
        setFieldValue(name, file)
      }

      reader.readAsDataURL(file)
    }

    return (
      <FormControl {...outerProps} isInvalid={errors[name]}>
        <FormLabel as={VStack} spacing={2} align="stretch" w="full">
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
    )
  }
)

export default LabeledImageField
