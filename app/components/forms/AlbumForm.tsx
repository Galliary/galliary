import { z } from 'zod'
import { Box, Center, HStack, VStack } from '@chakra-ui/react'
import { Form, FormProps } from 'app/components/forms/Form'
import LabeledTextField from 'app/components/forms/fields/LabeledTextField'
import LabeledTextareaField from 'app/components/forms/fields/LabeledTextareaField'
import { useFormikContext } from 'formik'
import { useEffect, Suspense, lazy } from 'react'
import { atom, useAtom } from 'jotai'
import { MotionBox } from 'app/components/Motion'
import { Loader } from 'app/components/views/Loader'
import { dynamic } from 'blitz'

const LabeledImageField = dynamic(
  () => import('app/components/forms/fields/LabeledImageField'),
  {
    ssr: false,
    loading: () => <Loader />,
  },
)

const image = atom('')

function getImageBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    try {
      const reader = new FileReader()
      reader.readAsDataURL(file)
      reader.onload = function () {
        resolve(reader.result as string)
      }
      reader.onerror = function (error) {
        reject(error)
      }
    } catch (e) {
      reject(e)
    }
  })
}

const SetImageAsBackground = () => {
  const formik = useFormikContext<Record<string, any>>()
  const [, setImageUrl] = useAtom(image)

  useEffect(() => {
    getImageBase64(formik.values.file)
      .then((imgUrl) => {
        setImageUrl(imgUrl)
      })
      .catch(() => {})
  }, [formik.values.file])

  return null
}

export function AlbumForm<S extends z.ZodType<any, any>>(props: FormProps<S>) {
  const [imageUrl] = useAtom(image)

  return (
    <Center boxSize="full" pos="relative">
      {imageUrl && (
        <MotionBox
          pos="absolute"
          bgImg={`url(${imageUrl})`}
          bgPos="center"
          bgSize="cover"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.1 }}
          inset={0}
          boxSize="full"
          filter="blur(45px)"
        />
      )}
      <Form<S> {...props}>
        <HStack spacing={12} align="start" w="70vw">
          <SetImageAsBackground />
          <Box>
            <Suspense fallback={<Loader />}>
              <LabeledImageField
                name="file"
                label="Album Cover"
                ratio={1}
                imageProps={{
                  boxSize: '512px',
                }}
              />
            </Suspense>
          </Box>
          <VStack align="stretch" w="full" spacing={8}>
            <LabeledTextField
              name="title"
              label="Title"
              placeholder="Untitled Album"
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
    </Center>
  )
}
