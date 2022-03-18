import { Head } from 'blitz'
import { Center, Text, VStack } from '@chakra-ui/react'
import Layout from 'app/layouts/Layout'

export default function Page500() {
  const statusCode = 500
  const title = 'Internal Server Error'
  return (
    <>
      <Head>
        <title>
          {statusCode}: {title}
        </title>
      </Head>
      <Layout hideFooter>
        <Center>
          <VStack spacing={8}>
            <Text textStyle="display.large">{statusCode}</Text>
            <Text textStyle="heading.small">{title}</Text>
          </VStack>
        </Center>
      </Layout>
    </>
  )
}
