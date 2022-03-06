import { z } from 'zod'
import { Text, VStack } from '@chakra-ui/react'
import LabeledImageField from 'app/components/forms/fields/LabeledImageField'
import Form, { FormProps } from 'app/components/forms/Form'
import LabeledTextField from 'app/components/forms/fields/LabeledTextField'

export function ImageForm<S extends z.ZodType<any, any>>(props: FormProps<S>) {
  return (
    <Form<S> {...props}>
      <LabeledImageField
        name="file"
        label="Image"
        ratio={1}
        imageProps={{
          boxSize: 'full',
        }}
      />
      <VStack spacing={8} align="stretch" w="full">
        <Text textStyle="heading.small">Optional</Text>
        <LabeledTextField name="title" label="Title" placeholder="Title" />
        <LabeledTextField
          name="description"
          label="Description"
          placeholder="Description"
        />
      </VStack>
    </Form>
  )
}
