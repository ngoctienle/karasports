import { ReactNode } from 'react'
import { Controller, UseFormReturn } from 'react-hook-form'
import dayjs, { Dayjs } from 'dayjs'
import { DatePicker as DatePickerAntd, FormItemProps } from 'antd'
import { PickerProps } from 'antd/lib/date-picker/generatePicker'

import { KaraFormItem } from '@core/components/base'

type DatePickerProps = PickerProps<Dayjs> & {
  name: string
  label: ReactNode
  customHelp?: string
  formHook: UseFormReturn
  formItemProps?: FormItemProps
}

export const DatePicker = ({
  name,
  label,
  formHook,
  customHelp,
  formItemProps,
  ...props
}: DatePickerProps) => {
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
            <DatePickerAntd
              {...props}
              onBlur={onBlur}
              onChange={(date) => {
                onChange(date)
              }}
              value={dayjs(value).second(0)}
            />
          </KaraFormItem>
        )
      }}
      control={control}
    />
  )
}
