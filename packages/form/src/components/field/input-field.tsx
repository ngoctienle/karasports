import { ReactNode, Ref } from 'react'
import { Controller, UseFormReturn } from 'react-hook-form'
import { FormItemProps, Input, InputProps, InputRef } from 'antd'

import { KaraFormItem } from '@core/components/base'

interface InputFieldProps extends InputProps {
  name: string
  label: ReactNode
  customHelp?: string
  formHook: UseFormReturn
  formItemProps?: FormItemProps
  ref?: Ref<InputRef>
}

export const InputField = ({
  name,
  label,
  formHook,
  customHelp,
  formItemProps,
  ref,
  ...props
}: InputFieldProps) => {
  const { control } = formHook

  return (
    <Controller
      name={name}
      render={({ field, fieldState }) => {
        const { onChange, value, onBlur } = field
        const { error } = fieldState

        return (
          <KaraFormItem
            {...formItemProps}
            label={label}
            validateStatus={error ? 'error' : 'validating'}
            help={error ? error?.message : customHelp || undefined}>
            <Input
              {...props}
              value={value}
              onChange={onChange}
              onBlur={onBlur}
              ref={ref}
            />
          </KaraFormItem>
        )
      }}
      control={control}
    />
  )
}