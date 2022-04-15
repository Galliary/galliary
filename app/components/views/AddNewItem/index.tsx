import { Routes } from 'blitz'
import { Box, Center, Text, useBoolean } from '@chakra-ui/react'
import { MotionBox, transitionConfig } from 'app/components/Motion'
import { NewGraphicIcon } from 'app/components/icons/NewGraphicIcon'
import { Link } from 'app/components/Link'

export const AddNewItem = () => {
  const [isHovering, setHovering] = useBoolean(false)

  return (
    <Box p={4}>
      <Link
        boxSize="full"
        d="flex"
        rounded="full"
        href={Routes.NewAlbumPage()}
        pos="relative"
        onPointerEnter={setHovering.on}
        onPointerLeave={setHovering.off}
        color="ui.60"
        _hover={{ color: 'ui.100' }}
      >
        <MotionBox
          as={NewGraphicIcon}
          pos="absolute"
          inset={0}
          boxSize="full"
          transition={transitionConfig}
          initial={{ opacity: 0, scale: 0.6 }}
          animate={{
            opacity: isHovering ? 1 : 0,
            scale: isHovering ? 1.2 : 0.6,
          }}
        />
        <Center boxSize="full">
          <Text textStyle="display.medium">new</Text>
        </Center>
      </Link>
    </Box>
  )
}
