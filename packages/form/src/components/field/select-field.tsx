import { Controller, ControllerProps, FieldPath, FieldValues } from 'react-hook-form'
import { FormItemProps, Form, SelectProps, Select } from '@karasports/ui'

import { FormFieldContext, KaraLabel } from 'src/components/base'

interface ISelectFieldProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
> extends SelectProps {
  name: ControllerProps<TFieldValues, TName>['name']
  control: ControllerProps<TFieldValues, TName>['control']
  label: string
  formItemProps?: Omit<FormItemProps, 'label'>
  customHelp?: string
}

export const SelectField = <
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
>({
  name,
  control,
  label,
  formItemProps,
  customHelp,
  options,
  ...props
}: ISelectFieldProps<TFieldValues, TName>) => {
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
              <Select
                {...props}
                value={value}
                onChange={onChange}
                onBlur={onBlur}
                options={options}
              />
            </Form.Item>
          )
        }}
      />
    </FormFieldContext.Provider>
  )
}
