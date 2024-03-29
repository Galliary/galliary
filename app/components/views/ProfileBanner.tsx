import {
  Box,
  Center,
  CenterProps,
  forwardRef,
  useBoolean,
  useConst,
} from '@chakra-ui/react'
import { ChangeEvent, useEffect, useRef, useState } from 'react'
import { AnimatePresence } from 'framer-motion'
import AvatarEditor from 'react-avatar-editor'
import { EditIcon } from 'app/components/icons/EditIcon'
import { MotionBox, MotionImage, transitionConfig } from 'app/components/Motion'
import { CancelIcon } from 'app/components/icons/CancelIcon'
import { SaveIcon } from 'app/components/icons/SaveIcon'
import { Tooltip } from 'app/components/Tooltip'
import { LogoLoadingAnimation } from 'app/components/views/LogoLoadingAnimation'
import { getBannerImageUrl } from 'app/services/cdn.service'
import { snowflake } from 'app/utils/snowflake'

interface ProfileBannerProps {
  user: { id: string; username: string; bannerExt: string; updatedAt: string }
  isOwnProfile: boolean
}

const ClickableIcon = forwardRef<
  CenterProps & { tooltip: string },
  typeof Center
>(({ tooltip, ...props }, ref) => (
  <Box
    pos="absolute"
    {...{ right: props.right ?? 16, bottom: props.bottom ?? 4 }}
  >
    <Tooltip label={tooltip}>
      <Center
        ref={ref}
        rounded="md"
        color="ui.80"
        cursor="pointer"
        transitionDuration="fast"
        transitionTimingFunction="ease"
        _hover={{ color: 'ui.100' }}
        boxSize={10}
        {...props}
      />
    </Tooltip>
  </Box>
))

export const ProfileBanner = ({ user, isOwnProfile }: ProfileBannerProps) => {
  const currentBannerUrl = useConst(getBannerImageUrl(user.id, user.bannerExt))

  const ref = useRef<HTMLDivElement>(null)
  const avatarEditorRef = useRef<AvatarEditor>(null)
  const [isEditing, setEditing] = useBoolean(false)
  const [bannerUrl, setBannerUrl] = useState(currentBannerUrl)
  const [isLoading, setLoading] = useBoolean(false)

  const onCancel = async () => {
    setBannerUrl(currentBannerUrl)
    setEditing.off()
    setLoading.off()
  }

  const onSave = async () => {
    setLoading.on()
    setEditing.off()
    const image = avatarEditorRef.current?.getImage()

    if (!image || bannerUrl === currentBannerUrl) {
      return setLoading.off()
    }

    setBannerUrl(image.toDataURL())

    image.toBlob(async (blob) => {
      if (blob) {
        const file = new File([blob], 'user-banner.png', {
          type: 'image/png',
        })

        // postNextUpload(UploadType.Banner, user, { id: 'banner' }, file)
        //   .then(() => {
        //     setBannerUrl(currentBannerUrl + `?r=${snowflake()}`)
        //     setLoading.off()
        //   })
        //   .catch(() => {
        //     console.error("Failed to update user's banner")
        //   })
      }
    })
  }

  const handleInputOpen = () => {
    setEditing.on()
  }

  const handleImageUpdate = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.currentTarget.files?.[0]
    if (!file) {
      return
    }

    const reader = new FileReader()

    reader.onload = async () => {
      setBannerUrl(reader.result as string)
    }

    reader.readAsDataURL(file)
  }

  useEffect(() => {
    if (currentBannerUrl !== bannerUrl) {
      setBannerUrl(currentBannerUrl)
    }
  }, [currentBannerUrl])

  const freshBannerUrl = `${bannerUrl}?=${user.updatedAt}`

  return (
    <Box w="full">
      <AnimatePresence exitBeforeEnter>
        {!isLoading && (
          <MotionImage
            zIndex={-1}
            pos="absolute"
            w="full"
            h="header.height"
            left={0}
            right={0}
            top={0}
            objectFit="cover"
            objectPosition="top"
            filter="blur(45px)"
            bgGradient="linear(to-b, transparent, flow.60)"
            pointerEvents="none"
            src={freshBannerUrl}
            animate={{ opacity: 1 }}
          />
        )}
      </AnimatePresence>
      <Center
        ref={ref}
        w="full"
        pos="relative"
        flexShrink={0}
        h="profile.banner.height"
        bgGradient="linear(to-b, flow.20, flow.40)"
      >
        <MotionImage
          pos="absolute"
          inset={0}
          boxSize="full"
          objectFit="cover"
          src={freshBannerUrl}
          onLoad={setLoading.off}
          animate={{ opacity: Number(!isLoading) }}
        />
        {isLoading && (
          <Center pos="absolute" inset={0} boxSize="full" zIndex={10}>
            <LogoLoadingAnimation size="50%" />
          </Center>
        )}
        <AnimatePresence exitBeforeEnter>
          {ref.current && isEditing && (
            <MotionBox animate={{ opacity: 1 }}>
              <AvatarEditor
                ref={avatarEditorRef}
                border={0}
                disableDrop
                scale={1}
                height={ref.current.getBoundingClientRect().height}
                width={ref.current.getBoundingClientRect().width}
                style={{
                  position: 'absolute',
                  inset: 0,
                  width: '100%',
                  height: '100%',
                }}
                image={bannerUrl ?? ''}
              />
            </MotionBox>
          )}
        </AnimatePresence>
        {isOwnProfile && (
          <Box
            h="full"
            w="profile.width"
            pos="relative"
            pointerEvents="none"
            zIndex={2}
          >
            <AnimatePresence exitBeforeEnter>
              <label
                onClick={handleInputOpen}
                style={{ pointerEvents: isEditing ? 'none' : 'all' }}
              >
                <input hidden type="file" onChange={handleImageUpdate} />
                {!isEditing && (
                  <MotionBox
                    style={{ position: 'absolute', right: 0, bottom: 0 }}
                    transition={transitionConfig}
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                  >
                    <ClickableIcon tooltip="Edit Banner">
                      <EditIcon boxSize={8} />
                    </ClickableIcon>
                  </MotionBox>
                )}
              </label>
              {isEditing && (
                <>
                  <MotionBox
                    pos="absolute"
                    right={16}
                    bottom={16}
                    transition={transitionConfig}
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                  >
                    <ClickableIcon
                      right={0}
                      bottom={0}
                      tooltip="Cancel"
                      onClick={onCancel}
                      pointerEvents="all"
                    >
                      <CancelIcon boxSize={8} />
                    </ClickableIcon>
                  </MotionBox>
                  <MotionBox
                    pos="absolute"
                    right={16}
                    bottom={4}
                    transition={transitionConfig}
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                  >
                    <ClickableIcon
                      right={0}
                      bottom={0}
                      tooltip="Save"
                      onClick={onSave}
                      pointerEvents="all"
                    >
                      <SaveIcon boxSize={8} />
                    </ClickableIcon>
                  </MotionBox>
                </>
              )}
            </AnimatePresence>
          </Box>
        )}
      </Center>
    </Box>
  )
}
