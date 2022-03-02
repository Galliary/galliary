import { PropsWithoutRef } from "react"
import { useField, useFormikContext, ErrorMessage } from "formik"
import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  forwardRef,
  Input,
  InputProps,
  Text,
  VStack,
} from "@chakra-ui/react"

export interface LabeledTextFieldProps extends PropsWithoutRef<JSX.IntrinsicElements["input"]> {
  /** Field name. */
  name: string
  /** Field label. */
  label: string
  /** Field type. Doesn't include radio buttons and checkboxes */
  type?: "text" | "password" | "email" | "number"
  outerProps?: PropsWithoutRef<JSX.IntrinsicElements["div"]>
}

export const LabeledTextField = forwardRef<InputProps & LabeledTextFieldProps, typeof Input>(
  ({ name, label, outerProps, ...props }, ref) => {
    const [input] = useField(name)
    const { isSubmitting, errors } = useFormikContext()

    return (
      <FormControl {...outerProps} isInvalid={errors[name]}>
        <FormLabel as={VStack} spacing={2} align="stretch" w="full">
          <Text color="ui.80" textStyle="label.medium">
            {label}
          </Text>
          <Input {...input} disabled={isSubmitting} {...props} ref={ref} />
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

export default LabeledTextField
