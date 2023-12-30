import * as React from 'react'
import { Typography } from '@karasports/ui'

interface IKaraLabelProps {
  value: React.ReactNode
}

export const KaraLabel: React.FC<IKaraLabelProps> = ({ value }) => {
  return <Typography.Text strong>{value}</Typography.Text>
}
