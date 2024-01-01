import './globals.css'
import { AntdRegistry } from '@ant-design/nextjs-registry'

export default function KRSApplication({ children }: React.PropsWithChildren) {
  return (
    <html lang='en' suppressHydrationWarning>
      <body>
        <AntdRegistry>{children}</AntdRegistry>
      </body>
    </html>
  )
}
