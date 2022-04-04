import { Link } from 'app/components/Link'
import { DISCORD_SUPPORT_SERVER_URL } from 'app/constants'
import { PixelArtIcon } from 'app/components/icons/PixelArtIcon'
import { Box, Center, HStack, Text, VStack } from '@chakra-ui/layout'
import { Button } from '@chakra-ui/react'

export interface FooterProps {}

export const Footer = ({}: FooterProps) => (
  <VStack as="footer" w="full" spacing={0}>
    <Center p={16} w="full" bg="flow.40">
      <HStack w="header.width" py={16} spacing={16} justify="space-between">
        <Box flexShrink={0}>
          <VStack align="start">
            <Text
              as="h3"
              textStyle="display.small"
              fontSize="38px"
              color="ui.100"
            >
              Galliary
            </Text>
            <Text
              color="ui.80"
              textStyle="paragraph.medium"
              fontFamily="courier"
            >
              Made with <PixelArtIcon d="inline" cursor="text" /> by{' '}
              <Link href="https://github.com/Synqat">Synqat</Link>
            </Text>
          </VStack>
        </Box>
        <HStack w="full" align="start">
          <VStack flexGrow={1} align="end">
            <Text as="h4" color="ui.100" textStyle="heading.small">
              Important
            </Text>
            <Link as={Text} rel="external" href="/tos" textStyle="label.medium">
              Terms of Service
            </Link>
            <Link
              as={Text}
              rel="external"
              href="/privacy"
              textStyle="label.medium"
            >
              Privacy Policy
            </Link>
          </VStack>
          <VStack flexGrow={1} align="end">
            <Text as="h4" color="ui.100" textStyle="heading.small">
              Other
            </Text>
            <Link
              as={Text}
              rel="external"
              href="https://github.com/synqat/galliary"
              textStyle="label.medium"
            >
              About Galliary
            </Link>
            <Link
              as={Text}
              rel="external"
              href="https://twitter.com/GalliaryApp"
              textStyle="label.medium"
            >
              twitter.com
            </Link>
            <Link
              as={Text}
              rel="external"
              target="_blank"
              href={DISCORD_SUPPORT_SERVER_URL}
              textStyle="label.medium"
            >
              discord.gg
            </Link>
          </VStack>
          <VStack flexGrow={1} align="end">
            <Text as="h4" color="ui.100" textStyle="heading.small">
              Links
            </Text>
            <Link
              as={Text}
              rel="external"
              href="https://github.com/synqat/galliary"
              textStyle="label.medium"
            >
              github.com
            </Link>
            <Link
              as={Text}
              rel="external"
              href="https://twitter.com/GalliaryApp"
              textStyle="label.medium"
            >
              twitter.com
            </Link>
            <Link
              as={Text}
              rel="external"
              target="_blank"
              href={DISCORD_SUPPORT_SERVER_URL}
              textStyle="label.medium"
            >
              discord.gg
            </Link>
          </VStack>
        </HStack>
      </HStack>
    </Center>
    <Center p={8} w="full" bg="flow.80">
      <Text textStyle="paragraph.large" color="ui.100">
        Ⓒ Copyright {new Date().getFullYear()} •{' '}
        <Text
          as="span"
          fontSize="20px"
          textStyle="overline"
          fontFamily="courier"
          lineHeight="inherit"
          fontWeight="inherit"
          color="brand.secondary.100"
        >
          Galliary.com
        </Text>
      </Text>
    </Center>
  </VStack>
)
