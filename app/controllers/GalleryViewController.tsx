import { Box, Button, HStack, Text, VStack, Wrap } from '@chakra-ui/react'
import { Album, Image } from '@prisma/client'
import { Fragment, ReactNode } from 'react'
import { usePage } from 'app/data/hooks/usePage'
import { Link } from 'app/components/Link'

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

export const DEFAULT_ITEMS_PER_PAGE = 32

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

  return (
    <VStack
      py={8}
      align="start"
      spacing={8}
      w="full"
      maxW="content.width"
      px={4}
      pos="relative"
    >
      <VStack align="start" spacing={1} w="full">
        <HStack justify="space-between" w="full">
          <Text textStyle="heading.large">{title}</Text>
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

      <Wrap p={0} spacing={4} align="center" justify="center">
        {data.map((item) => (
          <Fragment key={item.id}>{onDisplay(item)}</Fragment>
        ))}
        {data.length < itemsPerPage && addPrompt}
      </Wrap>

      <HStack spacing={2}>
        {page !== 0 && <Button onClick={prev}>Previous</Button>}
        {hasMore && <Button onClick={next}>Next</Button>}
      </HStack>
    </VStack>
  )
}
