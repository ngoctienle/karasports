import { RcFile } from '@karasports/ui'

const getBase64 = async (file: RcFile) => {
  if (file) {
    const data: string | ArrayBuffer = await new Promise((resolve) => {
      const reader = new FileReader()
      reader?.readAsDataURL(file)
      reader.onload = () => resolve(reader?.result as string)
    })

    return data
  }
  return ''
}
const checkJpgOrPng = (file: RcFile) => file.type === 'image/jpeg' || file.type === 'image/png'
const checkLt2M = (file: RcFile) => file.size / 1024 / 1024 < 2

export { getBase64, checkJpgOrPng, checkLt2M }
