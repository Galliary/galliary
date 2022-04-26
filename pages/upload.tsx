import { Center, Container, Image, Text, VStack, Wrap } from "@chakra-ui/react";
import Layout from "app/layouts/Layout";
import { createContext, useContext, useEffect, useState } from "react";
import { Box } from "@chakra-ui/layout";
import { ImageUploader } from "app/components/views/ImageUploader";
import { getDataUriForBlob } from "app/utils/files";
import { NextPage } from "next";
import { getGlobalServerSideProps } from "app/utils/getGlobalServerSideProps";

export const getServerSideProps = getGlobalServerSideProps(async () => {
  return {
    props: {},
  }
})

const EMPTY_ITEMS = [...Array(12)].fill(undefined)

const NewAlbumPage: NextPage = () => {
  const [items, setItems] = useState<Array<string | undefined>>([])

  const queueUpload = () => {

  }

  const onUploadFiles = (startIndex: number, fileList: FileList | null) => {
    if (fileList) {
      Promise.all(Array.from(fileList).map(getDataUriForBlob)).then((files) => {
        setItems((_currentItems) => {
          const currentItems = [..._currentItems]

          let currentIndex = startIndex
          let handledFileIndex = 0

          const handleFile = () => {
            if (currentItems[currentIndex] !== undefined) {
              currentIndex++
              return handleFile()
            }
            currentItems[currentIndex] = files[handledFileIndex]
            handledFileIndex++
            return handledFileIndex < files.length && handleFile()
          }

          handleFile()

          return currentItems
        })
      })
    }
  }

  return (
    <Layout>
      <VStack spacing={0} boxSize="full">
        <Center
          p={8}
          w="full"
          pos="relative"
          overflow="hidden"
          textAlign="center"
          h={[
            'banner-mobile.height-with-header',
            null,
            'banner.height-with-header',
          ]}
          mt="-header.height"
        >
          <Text
            as="h2"
            fontSize="24px"
            zIndex={10}
            color="ui.100"
            pt="header.height"
          >
            Untitled Album
          </Text>
          <Box pos="absolute" inset={0} opacity={0.6} boxSize="full">
            <Box
              pos="absolute"
              inset={0}
              zIndex={1}
              boxSize="full"
              bg="background.full"
              opacity={0.5}
            />
            <Image
              bg="flow.60"
              pos="absolute"
              inset={0}
              w="full"
              h="full"
              objectFit="cover"
              objectPosition="center calc(50% + 90px)"
              alt="Untitled Album"
              src={'?'}
            />
          </Box>
        </Center>

        <Center>
          <Container>
            <Wrap p={10} spacing={1}>
              {[...items, ...EMPTY_ITEMS].map((maybeSource, i) => (
                <ImageUploader
                  key={i}
                  uploadedImageSrc={maybeSource}
                  onUpload={(fileList) => onUploadFiles(i, fileList)}
                />
              ))}
            </Wrap>
          </Container>
        </Center>
      </VStack>
    </Layout>
  )
}

export default NewAlbumPage
