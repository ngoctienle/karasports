import * as React from 'react'
import { Form, FormProps } from '@karasports/ui'

interface IKaraFormProps extends Omit<FormProps, 'children'> {
  children: React.ReactNode
}

export const KaraForm: React.FC<IKaraFormProps> = ({ children, ...props }) => {
  return <Form {...props}>{children}</Form>
}
