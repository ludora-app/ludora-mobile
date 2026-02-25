import { String } from '@ludo/ui'

type LegalParagraphProps = {
  children: string
}

export default function LegalParagraph({ children }: LegalParagraphProps) {
  return (
    <String variant="body-sm" className="text-gray-700">
      {children}
    </String>
  )
}
