import { Controller, UseFormReturn } from 'react-hook-form'
import { Checkbox, CheckboxProps, FormItemProps } from 'antd'

import { KaraFormItem } from '@core/components/base'

interface CheckboxFieldProps extends CheckboxProps {
  name: string
  customHelp?: string
  formHook: UseFormReturn
  formItemProps?: FormItemProps
}

export const CheckboxField = ({
  name,
  formHook,
  customHelp,
  formItemProps,
  children,
  ...props
}: CheckboxFieldProps) => {
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
            validateStatus={error ? 'error' : 'validating'}
            help={error ? error?.message : customHelp || undefined}>
            <Checkbox {...props} checked={value} onChange={onChange}>
              {children}
            </Checkbox>
          </KaraFormItem>
        )
      }}
      control={control}
    />
  )
}
