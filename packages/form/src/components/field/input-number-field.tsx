import { ReactNode } from 'react'
import { Controller, UseFormReturn } from 'react-hook-form'
import { FormItemProps, InputNumber, InputNumberProps } from 'antd'

import { KaraFormItem } from '@core/components/base'

interface InputNumberFieldProps extends InputNumberProps {
  name: string
  label: ReactNode
  customHelp?: string
  formHook: UseFormReturn
  formItemProps?: FormItemProps
}

export const InputNumberField = ({
  name,
  label,
  formHook,
  customHelp,
  formItemProps,
  ...props
}: InputNumberFieldProps) => {
  const { control } = formHook

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => {
        const { onChange, value, onBlur } = field
        const { error } = fieldState

        return (
          <KaraFormItem
            {...formItemProps}
            label={label}
            validateStatus={error ? 'error' : 'validating'}
            help={error ? error?.message : customHelp || undefined}>
            <InputNumber
              {...props}
              value={value}
              onChange={onChange}
              onBlur={onBlur}
            />
          </KaraFormItem>
        )
      }}
    />
  )
}
