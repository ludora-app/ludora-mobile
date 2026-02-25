import { Box } from '@ludo/ui'

import LegalLayout from '../components/legal-layout.component'
import LegalParagraph from '../components/legal-paragraph.component'
import LegalBulletItem from '../components/legal-bullet-item.component'
import LegalSectionTitle from '../components/legal-section-title.component'

export default function LegalNonDiscriminationScreen() {
  return (
    <LegalLayout title="Politique de Non-Discrimination" subtitle="Application Ludora – En vigueur au 25/02/2026">

      <Box className="gap-3">
        <LegalSectionTitle>Notre engagement</LegalSectionTitle>
        <LegalParagraph>
          Ludora croit en un accès universel au sport. Notre communauté est ouverte à tous, quels que soient l&apos;origine, le sexe, l&apos;âge, le handicap, l&apos;orientation sexuelle, la religion ou toute autre caractéristique personnelle.
        </LegalParagraph>
        <LegalParagraph>
          Toute personne utilisant l&apos;application Ludora s&apos;engage à traiter les autres membres avec respect et dignité.
        </LegalParagraph>
      </Box>

      <Box className="gap-3">
        <LegalSectionTitle>Comportements interdits</LegalSectionTitle>
        <LegalParagraph>
          Les comportements suivants sont strictement interdits sur la plateforme Ludora :
        </LegalParagraph>
        <Box className="gap-1">
          <LegalBulletItem value="Refuser de participer à une session ou d&apos;inviter un utilisateur en raison de son origine, sa nationalité, son sexe, son âge, son handicap, son orientation sexuelle, sa religion ou toute autre caractéristique personnelle." />
          <LegalBulletItem value="Tenir des propos discriminatoires, insultants ou dégradants dans la messagerie ou dans les descriptions de sessions et de terrains." />
          <LegalBulletItem value="Utiliser des photos de profil, des noms d&apos;utilisateur ou tout autre contenu véhiculant un message haineux ou discriminatoire." />
          <LegalBulletItem value="Harceler, menacer ou intimider d&apos;autres membres de la communauté." />
        </Box>
      </Box>

      <Box className="gap-3">
        <LegalSectionTitle>Signalement et modération</LegalSectionTitle>
        <LegalParagraph>
          Tout utilisateur victime ou témoin d&apos;un comportement discriminatoire peut le signaler directement à l&apos;équipe Ludora via l&apos;adresse contact@ludora.fr.
        </LegalParagraph>
        <LegalParagraph>
          Ludora se réserve le droit, sans mise en demeure préalable, de supprimer tout contenu contrevenant à la présente politique et de suspendre ou fermer définitivement le compte de l&apos;utilisateur responsable.
        </LegalParagraph>
      </Box>

      <Box className="gap-3">
        <LegalSectionTitle>Cadre légal</LegalSectionTitle>
        <LegalParagraph>
          Cette politique s&apos;inscrit dans le respect des dispositions légales françaises et européennes relatives à la lutte contre les discriminations, notamment :
        </LegalParagraph>
        <Box className="gap-1">
          <LegalBulletItem value="Loi n° 2008-496 du 27 mai 2008 portant diverses dispositions d&apos;adaptation au droit communautaire dans le domaine de la lutte contre les discriminations." />
          <LegalBulletItem value="Articles 225-1 et suivants du Code pénal relatifs aux discriminations." />
          <LegalBulletItem value="Directive 2000/43/CE relative à l&apos;égalité de traitement entre les personnes sans distinction de race ou d&apos;origine ethnique." />
        </Box>
      </Box>

      <Box className="gap-3">
        <LegalSectionTitle>Contact</LegalSectionTitle>
        <LegalParagraph>
          Pour toute question relative à la présente politique, vous pouvez nous contacter à l&apos;adresse contact@ludora.fr ou par courrier à : Ludora – 8 impasse André le Notre, 94000 Créteil.
        </LegalParagraph>
      </Box>

    </LegalLayout>
  )
}
