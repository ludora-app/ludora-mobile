import { String } from '@ludo/ui'



type LegalSectionTitleProps = {
  children: string
}

export default function LegalSectionTitle({ children }: LegalSectionTitleProps) {
  return (
    <String font="primaryBold" variant="body-2" className="uppercase">
      {children}
    </String>
  )
}
