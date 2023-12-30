import { Controller, ControllerProps, FieldPath, FieldValues } from 'react-hook-form'
import { FormItemProps, Input, Form, InputRef, PasswordProps } from '@karasports/ui'

import { FormFieldContext, KaraLabel } from 'src/components/base'

interface IInputPasswordFieldProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
> extends PasswordProps {
  name: ControllerProps<TFieldValues, TName>['name']
  control: ControllerProps<TFieldValues, TName>['control']
  label: string
  formItemProps?: Omit<FormItemProps, 'label'>
  customHelp?: string
  ref?: React.Ref<InputRef>
}

export const InputPasswordField = <
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
>({
  name,
  control,
  label,
  formItemProps,
  customHelp,
  ref,
  ...props
}: IInputPasswordFieldProps<TFieldValues, TName>) => {
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
              <Input.Password
                {...props}
                value={value}
                onChange={onChange}
                onBlur={onBlur}
                ref={ref}
              />
            </Form.Item>
          )
        }}
      />
    </FormFieldContext.Provider>
  )
}
