import { z } from 'zod'
import { Text, VStack } from '@chakra-ui/react'
import Form, { FormProps } from 'app/components/forms/Form'
import LabeledTextField from 'app/components/forms/fields/LabeledTextField'
import { Suspense } from 'react'
import { Loader } from 'app/components/views/Loader'
import { dynamic } from 'blitz'

const LabeledImageField = dynamic(
  () => import('app/components/forms/fields/LabeledImageField'),
  {
    ssr: false,
    loading: () => <Loader />,
  },
)

export function ImageForm<S extends z.ZodType<any, any>>(props: FormProps<S>) {
  return (
    <Form<S> {...props}>
      <Suspense fallback={<Loader />}>
        <LabeledImageField
          name="file"
          label="Image"
          ratio={1}
          imageProps={{
            boxSize: 'full',
          }}
        />
      </Suspense>
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
