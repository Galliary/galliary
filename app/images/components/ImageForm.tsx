import { Form, FormProps } from "app/core/components/Form"
import { LabeledTextField } from "app/core/components/LabeledTextField"
import { z } from "zod"
import LabeledImageField from "app/core/components/LabeledImageField"
import { Text, VStack } from "@chakra-ui/react"
export { FORM_ERROR } from "app/core/components/Form"

export function ImageForm<S extends z.ZodType<any, any>>(props: FormProps<S>) {
  return (
    <Form<S> {...props}>
      <LabeledImageField
        name="file"
        label="Image"
        ratio={1}
        imageProps={{
          boxSize: "full",
        }}
      />
      <VStack spacing={8} align="stretch" w="full">
        <Text textStyle="heading.small">Optional</Text>
        <LabeledTextField name="title" label="Title" placeholder="Title" />
        <LabeledTextField name="description" label="Description" placeholder="Description" />
      </VStack>
    </Form>
  )
}
