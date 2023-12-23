import { ReactNode } from 'react'
import { Controller, UseFormReturn } from 'react-hook-form'
import { FormItemProps, Switch, SwitchProps } from 'antd'

import { KaraFormItem } from '@core/components/base'

interface SwitchFieldProps extends SwitchProps {
  name: string
  label: ReactNode
  customHelp?: string
  formHook: UseFormReturn
  formItemProps?: FormItemProps
}

export const SwitchField = ({
  name,
  label,
  formHook,
  customHelp,
  formItemProps,
  ...props
}: SwitchFieldProps) => {
  const { control } = formHook

  return (
    <Controller
      name={name}
      render={({ field, fieldState }) => {
        const { onChange, value } = field
        const { error } = fieldState

        return (
          <KaraFormItem
            {...formItemProps}
            label={label}
            validateStatus={error ? 'error' : 'validating'}
            help={error ? error?.message : customHelp || undefined}>
            <Switch {...props} checked={value} onChange={onChange} />
          </KaraFormItem>
        )
      }}
      control={control}
    />
  )
}
