import { Form, FormProps } from "app/core/components/Form"
import { LabeledTextField } from "app/core/components/LabeledTextField"
import { z } from "zod"
import LabeledImageField from "app/core/components/LabeledImageField"
export { FORM_ERROR } from "app/core/components/Form"

export function AlbumForm<S extends z.ZodType<any, any>>(props: FormProps<S>) {
  return (
    <Form<S> {...props}>
      <LabeledImageField
        name="file"
        label="Album Cover"
        ratio={1}
        imageProps={{
          boxSize: "full",
        }}
      />
      <LabeledTextField name="title" label="Title" placeholder="Title" />
      <LabeledTextField name="description" label="Description" placeholder="Description" />
    </Form>
  )
}
