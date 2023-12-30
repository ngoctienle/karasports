import dayjs, { Dayjs } from 'dayjs'
import { Controller, ControllerProps, FieldPath, FieldValues } from 'react-hook-form'
import { FormItemProps, Form, PickerProps, DatePicker as DatePickerAntd } from '@karasports/ui'

import { FormFieldContext, KaraLabel } from 'src/components/base'

type IDatePickerProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
> = PickerProps<Dayjs> & {
  name: ControllerProps<TFieldValues, TName>['name']
  control: ControllerProps<TFieldValues, TName>['control']
  label: string
  formItemProps?: Omit<FormItemProps, 'label'>
  customHelp?: string
}

export const DatePicker = <
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
>({
  name,
  control,
  label,
  formItemProps,
  customHelp,
  ...props
}: IDatePickerProps<TFieldValues, TName>) => {
  return (
    <FormFieldContext.Provider value={{ name: name }}>
      <Controller
        name={name}
        control={control}
        render={({ field, fieldState }) => {
          const { onChange, value, onBlur } = field
          const { error } = fieldState

          return (
            <Form.Item
              {...formItemProps}
              label={<KaraLabel value={label} />}
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
            </Form.Item>
          )
        }}
      />
    </FormFieldContext.Provider>
  )
}
