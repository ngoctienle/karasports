import { Controller, ControllerProps, FieldPath, FieldValues } from 'react-hook-form'
import { FormItemProps, Form, CheckboxProps, Checkbox } from '@karasports/ui'

import { FormFieldContext, KaraLabel } from 'src/components/base'

interface ICheckboxFieldProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
> extends CheckboxProps {
  name: ControllerProps<TFieldValues, TName>['name']
  control: ControllerProps<TFieldValues, TName>['control']
  label: string
  formItemProps?: Omit<FormItemProps, 'label'>
  customHelp?: string
}

export const CheckboxField = <
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
>({
  name,
  control,
  label,
  formItemProps,
  customHelp,
  children,
  ...props
}: ICheckboxFieldProps<TFieldValues, TName>) => {
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
              <Checkbox {...props} checked={value} onChange={onChange}>
                {children}
              </Checkbox>
            </Form.Item>
          )
        }}
      />
    </FormFieldContext.Provider>
  )
}
