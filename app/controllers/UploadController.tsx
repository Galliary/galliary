import { FC, Reducer, useEffect, useReducer } from 'react'
import produce from 'immer'
import {
  useCreateImageFragmentMutation,
  useUploadImageMutation,
} from 'generated/graphql.client'
import { Wrap } from '@chakra-ui/react'

export interface UploaderProps {
  onError(error: Error): void

  onUpload(files: File): void
  onUploadMany(files: Array<File>): void
}

export interface UploadControllerProps {
  uploader: FC<UploaderProps>
}

enum ActionType {
  UploadImages,
  QueueImageUpload,
  UploadProgress,
  FinishImageUpload,
}

enum StateType {
  Idle,
  StartQueue,
  Uploading,
  ProcessNext,
  FinishQueue,
}

export type UploadControllerActions =
  | {
      type: ActionType.UploadImages
      payload: {
        images: Array<File>
      }
    }
  | {
      type: ActionType.QueueImageUpload
      payload: {
        index: number
      }
    }
  | {
      type: ActionType.UploadProgress
      payload: {
        progress: number
      }
    }
  | {
      type: ActionType.FinishImageUpload
      payload: null
    }

export interface UploadControllerState {
  type: StateType
  uploadIndex: number
  incomplete: Array<File>
  queue: Array<File>
  completed: Array<File>
}

const initialState: UploadControllerState = {
  type: StateType.Idle,
  uploadIndex: 0,
  incomplete: [],
  queue: [],
  completed: [],
}

const reducer: Reducer<UploadControllerState, UploadControllerActions> = (
  state = initialState,
  action,
) => {
  return produce<UploadControllerState>(state, (draft) => {
    switch (action.type) {
      case ActionType.UploadImages:
        draft.type = StateType.StartQueue
        draft.incomplete = action.payload.images
        break
      case ActionType.QueueImageUpload:
        draft.type = StateType.Uploading
        draft.uploadIndex = action.payload.index
        draft.queue.push()
        break
      case ActionType.UploadProgress:
        break
      case ActionType.FinishImageUpload:
        break
      default:
        throw new Error('Unhandled action type for UploadController state.')
    }
  })
}

// 6 per row
const AMOUNT_OF_UPLOAD_PROMPTS = 12
const EMPTY_ITEMS = [...Array(AMOUNT_OF_UPLOAD_PROMPTS)].fill(undefined)

export const UploadController = ({
  uploader: Uploader,
}: UploadControllerProps) => {
  const [createImageFragment] = useCreateImageFragmentMutation()
  const [uploadImage] = useUploadImageMutation()

  const [state, dispatch] = useReducer<
    Reducer<UploadControllerState, UploadControllerActions>
  >(reducer, initialState)

  return <Wrap p={10} spacing={1}></Wrap>
}
