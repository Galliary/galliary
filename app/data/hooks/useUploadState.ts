import { useReducer } from "react";


export enum ImageUploadStateType {
  NoContent,
  ReadyToUpload,
  StartUpload,
  UploadProgress,
  FinishUpload,
  Complete,
}

type ImageUploadState = {
  type: ImageUploadStateType
  file?: File
  dataUri?: string
  percent?: number
}

type ImageUploadAction = {
  type: ImageUploadStateType.NoContent
} | {
  type: ImageUploadStateType.ReadyToUpload
  file: File
  dataUri: string
} | {
  type: ImageUploadStateType.StartUpload
} | {
  type: ImageUploadStateType.UploadProgress
  percent: number
} | {
  type: ImageUploadStateType.FinishUpload
} | {
  type: ImageUploadStateType.Complete
}

const reducer = (state: ImageUploadState, action: ImageUploadAction) => {
  switch (action.type) {
    case ImageUploadStateType.NoContent:
      return {
        ...state,
        type: ImageUploadStateType.NoContent,
      }
    case ImageUploadStateType.ReadyToUpload:
      return {
        ...state,
        type: ImageUploadStateType.ReadyToUpload,
      }
    case ImageUploadStateType.StartUpload:
      return {
        ...state,
        type: ImageUploadStateType.StartUpload,
        percent: 0
      }
    case ImageUploadStateType.UploadProgress:
      return {
        ...state,
        type: ImageUploadStateType.UploadProgress,
        percent: action.percent,
      }
    case ImageUploadStateType.FinishUpload:
      return {
        ...state,
        type: ImageUploadStateType.FinishUpload,
        percent: 100,
      }
    case ImageUploadStateType.Complete:
      return {
        ...state,
        type: ImageUploadStateType.Complete,
      }
    default: throw new Error("Unhandled action type")
  }
}

export const useUploadState = () => {
  const [state, dispatch] = useReducer(reducer, {
    type: ImageUploadStateType.NoContent,
  })

  const setNoContent = () => dispatch({ type: ImageUploadStateType.NoContent })
  const setReadyToUpload = (file: File, dataUri: string) => dispatch({ type: ImageUploadStateType.ReadyToUpload, file, dataUri })
  const setStartUpload = () => dispatch({ type: ImageUploadStateType.StartUpload })
  const setUploadProgress = (percent: number) => dispatch({ type: ImageUploadStateType.UploadProgress, percent })
  const setFinishUpload = () => dispatch({ type: ImageUploadStateType.FinishUpload })
  const setComplete = () => dispatch({ type: ImageUploadStateType.Complete })

  return {
    state,
    setNoContent,
    setReadyToUpload,
    setStartUpload,
    setUploadProgress,
    setFinishUpload,
    setComplete,
  } as const
}
