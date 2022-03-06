import { PropsWithoutRef, ReactNode, useState } from "react"
import { Formik, FormikProps } from "formik"
import { validateZodSchema } from "blitz"
import { z } from "zod"
import { Button, FormErrorMessage, VStack } from "@chakra-ui/react"

export interface FormProps<S extends z.ZodType<any, any>>
  extends Omit<PropsWithoutRef<JSX.IntrinsicElements["form"]>, "onSubmit"> {
  /** All your form fields */
  children?: ReactNode
  /** Text to display in the submit button */
  submitText?: string
  schema?: S
  onSubmit: (values: z.infer<S>) => Promise<void | OnSubmitResult>
  initialValues?: FormikProps<z.infer<S>>["initialValues"]
}

interface OnSubmitResult {
  FORM_ERROR?: string
  [prop: string]: any
}

export const FORM_ERROR = "FORM_ERROR"

export function Form<S extends z.ZodType<any, any>>({
  children,
  submitText,
  schema,
  initialValues,
  onSubmit,
  ...props
}: FormProps<S>) {
  const [formError, setFormError] = useState<string | null>(null)

  return (
    <Formik
      initialValues={initialValues || {}}
      validate={validateZodSchema(schema)}
      onSubmit={async (values, { setErrors }) => {
        const { FORM_ERROR, ...otherErrors } = (await onSubmit(values)) || {}

        if (FORM_ERROR) {
          setFormError(FORM_ERROR)
        }

        if (Object.keys(otherErrors).length > 0) {
          setErrors(otherErrors)
        }
      }}
    >
      {({ handleSubmit, isSubmitting }) => (
        <form
          acceptCharset="UTF-8"
          encType="multipart/form-data"
          onSubmit={handleSubmit}
          {...props}
        >
          <VStack align="stretch" w="full" spacing={8}>
            {/* Form fields supplied as children are rendered here */}
            {children}

            {formError && (
              <FormErrorMessage role="alert" color="status.bad">
                {formError}
              </FormErrorMessage>
            )}

            {submitText && (
              <Button variant="primary" type="submit" disabled={isSubmitting}>
                {submitText}
              </Button>
            )}
          </VStack>
        </form>
      )}
    </Formik>
  )
}

export default Form
