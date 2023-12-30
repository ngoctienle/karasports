import { Controller, ControllerProps, FieldPath, FieldValues } from 'react-hook-form'
import { FormItemProps, Form, SwitchProps, Switch } from '@karasports/ui'

import { FormFieldContext, KaraLabel } from 'src/components/base'

interface ISwitchFieldProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
> extends SwitchProps {
  name: ControllerProps<TFieldValues, TName>['name']
  control: ControllerProps<TFieldValues, TName>['control']
  label: string
  formItemProps?: Omit<FormItemProps, 'label'>
  customHelp?: string
}

export const SwitchField = <
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
>({
  name,
  control,
  label,
  formItemProps,
  customHelp,
  ...props
}: ISwitchFieldProps<TFieldValues, TName>) => {
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
              <Switch {...props} checked={value} onChange={onChange} />
            </Form.Item>
          )
        }}
      />
    </FormFieldContext.Provider>
  )
}
