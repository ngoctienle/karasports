import { Form, FormProps } from 'antd'
import React from 'react'
import { FieldValues, FormProvider, UseFormReturn } from 'react-hook-form'

interface IKaraFormProps extends FormProps {
  formHook: UseFormReturn
  onSubmit: (values: FieldValues) => void
  children: React.ReactNode
}

const KaraForm: React.FC<IKaraFormProps> = ({
  children,
  onSubmit,
  formHook,
  ...props
}) => {
  const { handleSubmit } = formHook

  return (
    <FormProvider {...formHook}>
      <Form {...props} onFinish={handleSubmit(onSubmit)}>
        {children}
      </Form>
    </FormProvider>
  )
}

export default KaraForm
