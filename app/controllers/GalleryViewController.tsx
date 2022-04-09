import { Link } from 'app/components/Link'
import { Fragment, ReactNode } from 'react'
import { Album, Image } from '@prisma/client'
import { usePage } from 'app/data/hooks/usePage'
import {
  Box,
  Text,
  Wrap,
  Button,
  HStack,
  VStack,
  useBreakpointValue,
} from '@chakra-ui/react'

interface GalleryViewControllerProps<Data extends Album | Image> {
  title?: null | string
  description?: null | string
  actions?: ReactNode
  actionSubText?: ReactNode
  actionSubHref?: string

  data: Array<Data>
  onDisplay: (data: Data) => ReactNode
  addPrompt: ReactNode
  hasMore?: boolean
  itemsPerPage?: number
}

export const DEFAULT_ITEMS_PER_PAGE = 30

export function GalleryViewController<Data extends Album | Image>({
  title,
  description,
  actions,
  actionSubText,
  actionSubHref,
  data,
  onDisplay,
  addPrompt,
  hasMore = false,
  itemsPerPage = DEFAULT_ITEMS_PER_PAGE,
}: GalleryViewControllerProps<Data>) {
  const { page, next, prev } = usePage()

  const [firstCount, secondCount] = useBreakpointValue({
    base: [2, 4],
    sm: [4, 8],
    md: [6, 12],
    lg: [8, 16],
  }) ?? [8, 16]

  const first = data.slice(0, firstCount)
  const second = data.slice(firstCount, secondCount)
  const final = data.slice(secondCount, data.length)

  return (
    <VStack
      py={8}
      px={4}
      w="full"
      spacing={8}
      align="start"
      pos="relative"
      maxW="content.width"
    >
      <VStack align={['center', null, 'start']} spacing={1} w="full">
        <HStack justify="space-between" w="full">
          <Text
            textStyle="heading.medium"
            bgGradient="linear(to-br, brand.primary.100, brand.secondary.100)"
            backgroundClip="text"
            color="transparent"
          >
            {title}
          </Text>
          <Box>{actions}</Box>
        </HStack>
        <HStack justify="space-between" w="full">
          {description && (
            <Text textStyle="paragraph.large" color="ui.80">
              {description}
            </Text>
          )}
          {actionSubText &&
            (actionSubHref ? (
              <Link href={actionSubHref ?? '#'}>
                <Text
                  textStyle="paragraph.large"
                  color="ui.40"
                  _hover={{ color: 'ui.80' }}
                >
                  {actionSubText}
                </Text>
              </Link>
            ) : (
              <Text textStyle="paragraph.large" color="ui.40">
                {actionSubText}
              </Text>
            ))}
        </HStack>
      </VStack>

      <VStack align="center" spacing={1}>
        {/* <HStack align="center" spacing={1}>
          {onFeatureDisplay(featured)}
          <Wrap as="div" p={0} spacing={1} align="center" justify="center">
            {first.map((item, index) => (
              <Fragment key={item?.id ?? index}>{onDisplay(item)}</Fragment>
            ))}
          </Wrap>
        </HStack>

        <HStack align="center" spacing={1}>
          <Wrap p={0} spacing={1} align="center" justify="center">
            {second.map((item, index) => (
              <Fragment key={item?.id ?? index}>{onDisplay(item)}</Fragment>
            ))}
          </Wrap>
          {onFeatureDisplay(featured)}
        </HStack>*/}

        <Wrap p={0} spacing={1} align="center" justify="center">
          {data.map((item, index) => (
            <Fragment key={item?.id ?? index}>{onDisplay(item)}</Fragment>
          ))}
        </Wrap>
      </VStack>

      <HStack spacing={2}>
        {page !== 0 && <Button onClick={prev}>Previous</Button>}
        {hasMore && <Button onClick={next}>Next</Button>}
      </HStack>
    </VStack>
  )
}
