import * as React from 'react'
import { Controller, ControllerProps, FieldPath, FieldValues } from 'react-hook-form'
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons'
import {
  Form,
  FormItemProps,
  Image,
  ImageProps,
  message,
  Upload,
  UploadProps,
  RcFile
} from '@karasports/ui'
import ImgCrop, { type ImgCropProps } from 'antd-img-crop'
import { checkJpgOrPng, checkLt2M, getBase64 } from 'src/components/field/upload/utils'
import { FormFieldContext, KaraLabel } from 'src/components/base'

interface IImageUploadFieldProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
> extends UploadProps {
  name: ControllerProps<TFieldValues, TName>['name']
  control: ControllerProps<TFieldValues, TName>['control']
  label: string
  formItemProps?: Omit<FormItemProps, 'label'>
  customHelp?: string
  buttonLabel?: string
  cropProps?: ImgCropProps
  url?: string
  imageProps?: ImageProps
}

export const ImageUploadField: React.FC<IImageUploadFieldProps> = ({
  name,
  control,
  label,
  formItemProps,
  customHelp,
  buttonLabel,
  cropProps,
  url,
  imageProps,
  ...props
}) => {
  const [dataUri, setDataUri] = React.useState(url)
  const [loading, setLoading] = React.useState<boolean>(false)

  return (
    <FormFieldContext.Provider value={{ name: name }}>
      <Controller
        name={name}
        control={control}
        render={({ field, fieldState }) => {
          const { onChange, value } = field
          const { error } = fieldState

          const beforeUpload = async (file: RcFile) => {
            setLoading(true)
            const isJpgOrPng = checkJpgOrPng(file)
            const isLt2M = checkLt2M(file)
            if (!isJpgOrPng) message.error('You can only upload JPG/PNG file!')
            if (!isLt2M) message.error('File must smaller than 2MB!')
            if (!(isJpgOrPng && isLt2M)) {
              setLoading(false)
              return isJpgOrPng && isLt2M
            }
            onChange(file)
            const fileUrl = await getBase64(file)
            setDataUri(fileUrl as string)
            setLoading(false)
            return isJpgOrPng && isLt2M
          }

          return (
            <Form.Item
              {...formItemProps}
              label={<KaraLabel value={label} />}
              validateStatus={error ? 'error' : 'validating'}
              help={error ? error?.message : customHelp || undefined}>
              <ImgCrop {...cropProps}>
                <Upload
                  {...props}
                  listType='picture-card'
                  showUploadList={false}
                  maxCount={1}
                  beforeUpload={beforeUpload}>
                  {url && !value ? (
                    <Image {...imageProps} src={url} />
                  ) : value ? (
                    <Image {...imageProps} src={dataUri} />
                  ) : (
                    <div>
                      {loading ? <LoadingOutlined /> : <PlusOutlined />}
                      <div style={{ marginTop: 8 }}>{buttonLabel || 'Upload'}</div>
                    </div>
                  )}
                </Upload>
              </ImgCrop>
            </Form.Item>
          )
        }}
      />
    </FormFieldContext.Provider>
  )
}
