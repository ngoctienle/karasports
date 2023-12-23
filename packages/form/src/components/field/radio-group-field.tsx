import { ReactNode } from 'react'
import { Controller, UseFormReturn } from 'react-hook-form'
import { FormItemProps, Radio, RadioGroupProps } from 'antd'

import { KaraFormItem } from '@core/components/base'

interface RadioGroupFieldProps extends RadioGroupProps {
  name: string
  label: ReactNode
  customHelp?: string
  formHook: UseFormReturn
  formItemProps?: FormItemProps
}

export const RadioGroupField = ({
  name,
  label,
  formHook,
  options,
  customHelp,
  formItemProps,
  ...props
}: RadioGroupFieldProps) => {
  const { control } = formHook

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => {
        const { onChange, value } = field
        const { error } = fieldState

        return (
          <KaraFormItem
            {...formItemProps}
            label={label}
            validateStatus={error ? 'error' : 'validating'}
            help={error ? error?.message : customHelp || undefined}>
            <Radio.Group
              {...props}
              options={options}
              value={value}
              onChange={onChange}
            />
          </KaraFormItem>
        )
      }}
    />
  )
}
