import dayjs, { Dayjs } from 'dayjs'
import { Controller, ControllerProps, FieldPath, FieldValues } from 'react-hook-form'
import { FormItemProps, Form, RangePickerProps, DatePicker as DatePickerAntd } from '@karasports/ui'

import { FormFieldContext, KaraLabel } from 'src/components/base'

type IRangeDatePickerProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
> = RangePickerProps<Dayjs> & {
  name: ControllerProps<TFieldValues, TName>['name']
  control: ControllerProps<TFieldValues, TName>['control']
  label: string
  formItemProps?: Omit<FormItemProps, 'label'>
  customHelp?: string
}

export const RangeDatePicker = <
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
>({
  name,
  control,
  label,
  formItemProps,
  customHelp,
  ...props
}: IRangeDatePickerProps<TFieldValues, TName>) => {
  return (
    <FormFieldContext.Provider value={{ name: name }}>
      <Controller
        name={name}
        control={control}
        render={({ field, fieldState }) => {
          const { onChange, value } = field
          const { error } = fieldState

          return (
            <Form.Item
              {...formItemProps}
              label={<KaraLabel value={label} />}
              validateStatus={error ? 'error' : 'validating'}
              help={error ? error?.message : customHelp || undefined}>
              <DatePickerAntd.RangePicker
                {...props}
                onChange={(dates) => {
                  const dateRange = {
                    start_date: dates?.[0]?.toISOString(),
                    end_date: dates?.[1]?.toISOString()
                  }
                  onChange(dateRange)
                }}
                value={[dayjs(value[0]), dayjs(value[1])]}
              />
            </Form.Item>
          )
        }}
      />
    </FormFieldContext.Provider>
  )
}
