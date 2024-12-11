/* eslint-disable @typescript-eslint/no-explicit-any */
import { Upload, message } from 'antd'
import { PlusOutlined } from '@ant-design/icons'
import { useFormContext, Controller, RegisterOptions } from 'react-hook-form'
import React from 'react'

interface IImageUpload {
  name: string
  label?: string
  required?: boolean
  validation?: RegisterOptions
  maxCount?: number
  accept?: string
  onUpload: (file: File) => Promise<string | null>
}

const FormImageUpload: React.FC<IImageUpload> = ({
  name,
  label,
  required,
  validation,
  maxCount = 1,
  accept = 'image/*',
  onUpload
}) => {
  const {
    control,
    formState: { errors }
  } = useFormContext()

  const errorMessage = errors[name]?.message as string | undefined

  const beforeUpload = (file: File) => {
    const isImage = file.type.startsWith('image/')
    if (!isImage) {
      message.error(`${file.name} is not an image file`)
    }
    return isImage || Upload.LIST_IGNORE
  }

  const customRequest = async ({ file, onSuccess, onError }: any) => {
    try {
      const url = await onUpload(file)
      if (url) {
        onSuccess({ url }, file)
      } else {
        onError(new Error('Upload failed'))
      }
    } catch (error) {
      onError(error)
    }
  }

  return (
    <div style={{ marginBottom: '1rem' }}>
      {label && (
        <label htmlFor={name}>
          {required && <span style={{ color: 'red' }}>*</span>} {label}
        </label>
      )}
      <Controller
        control={control}
        name={name}
        rules={validation}
        render={({ field }) => (
          <Upload
            listType="picture-card"
            maxCount={maxCount}
            beforeUpload={beforeUpload}
            accept={accept}
            customRequest={customRequest}
            {...field}
            onChange={(info) => {
              const { fileList } = info
              field.onChange(fileList.map(file => file.response?.url))
            }}
          >
            <div>
              <PlusOutlined />
              <div>Upload</div>
            </div>
          </Upload>


        )}
      />
      {errorMessage && (
        <small style={{ color: 'red', display: 'block' }}>{errorMessage}</small>
      )}
    </div>
  )
}

export default FormImageUpload



// <Upload
//                                 name="image"
//                                 listType="picture-card"
//                                 showUploadList={false}
//                                 customRequest={({ file }: any) => {
//                                     handleImageUpload(file).then((imageUrl) => {
//                                         form.setFieldsValue({
//                                             image: [{ url: imageUrl }],
//                                         });
//                                     });
//                                 }}
//                             >
// <div>
//     <PlusOutlined />
//     <div>Upload</div>
// </div>
//                             </Upload>