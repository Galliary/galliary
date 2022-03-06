import { z } from 'zod'
import { Box, HStack, VStack } from '@chakra-ui/react'
import { Form, FormProps } from 'app/components/forms/Form'
import LabeledImageField from 'app/components/forms/fields/LabeledImageField'
import LabeledTextField from 'app/components/forms/fields/LabeledTextField'
import LabeledTextareaField from 'app/components/forms/fields/LabeledTextareaField'

export function AlbumForm<S extends z.ZodType<any, any>>(props: FormProps<S>) {
  return (
    <Form<S> {...props}>
      <HStack spacing={12} align="start" w="70vw">
        <Box>
          <LabeledImageField
            name="file"
            label="Album Cover"
            ratio={1}
            imageProps={{
              boxSize: '512px',
            }}
          />
        </Box>
        <VStack align="stretch" w="full" spacing={8}>
          <LabeledTextField
            name="title"
            label="Title"
            placeholder="Untilited Album"
          />
          <LabeledTextareaField
            name="description"
            label="Description"
            placeholder="Description"
            maxH="350px"
            minH="120px"
          />
        </VStack>
      </HStack>
    </Form>
  )
}
