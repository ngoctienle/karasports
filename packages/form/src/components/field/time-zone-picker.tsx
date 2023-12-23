import { ReactNode } from 'react'
import { Controller, UseFormReturn } from 'react-hook-form'
import { FormItemProps, Select, SelectProps } from 'antd'

import { KaraFormItem } from '@core/components/base'
import { timezones } from '@core/helpers'

interface TimezonePickerProps extends SelectProps {
  name: string
  label: ReactNode
  customHelp?: string
  formHook: UseFormReturn
  formItemProps?: FormItemProps
}

const options = timezones.map((timezone) => {
  return {
    label: timezone.label,
    value: timezone.tzCode
  }
})

export const TimezonePicker = ({
  name,
  label,
  formHook,
  customHelp,
  formItemProps,
  ...props
}: TimezonePickerProps) => {
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
            <Select
              {...props}
              defaultValue='Europe/Dublin'
              value={value}
              onChange={onChange}
              onBlur={onBlur}
              options={options}
              showSearch
            />
          </KaraFormItem>
        )
      }}
      control={control}
    />
  )
}
