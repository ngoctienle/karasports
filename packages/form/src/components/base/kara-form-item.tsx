import { Form, FormItemProps } from 'antd'

interface IKaraFormItemProps extends FormItemProps {}

const KaraFormItem: React.FC<IKaraFormItemProps> = ({ children, ...props }) => {
  return <Form.Item {...props}>{children}</Form.Item>
}

export default KaraFormItem
