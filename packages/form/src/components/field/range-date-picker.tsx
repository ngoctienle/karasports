import { ReactNode } from 'react'
import { Controller, UseFormReturn } from 'react-hook-form'
import dayjs, { Dayjs } from 'dayjs'
import { DatePicker, FormItemProps } from 'antd'
import {
  PickerProps,
  RangePickerProps
} from 'antd/lib/date-picker/generatePicker'

import { KaraFormItem } from '@core/components/base'

type RangeDatePickerProps = PickerProps<Dayjs> &
  RangePickerProps<Dayjs> & {
    name: string
    label: ReactNode
    customHelp?: string
    formHook: UseFormReturn
    formItemProps?: FormItemProps
  }
export const RangeDatePicker = ({
  name,
  label,
  formHook,
  customHelp,
  formItemProps,
  ...props
}: RangeDatePickerProps) => {
  const { control } = formHook

  return (
    <Controller
      name={name}
      render={({ field, fieldState }) => {
        const { onChange, value } = field
        const { error } = fieldState
        const { start_date, end_date } = value || {}

        return (
          <KaraFormItem
            {...formItemProps}
            label={label}
            validateStatus={error ? 'error' : 'validating'}
            help={error ? error?.message : customHelp || undefined}>
            <DatePicker.RangePicker
              {...props}
              onChange={(dates) => {
                const dateRange = {
                  start_date: dates?.[0]?.toISOString(),
                  end_date: dates?.[1]?.toISOString()
                }
                onChange(dateRange)
              }}
              value={[dayjs(start_date), dayjs(end_date)]}
            />
          </KaraFormItem>
        )
      }}
      control={control}
    />
  )
}
