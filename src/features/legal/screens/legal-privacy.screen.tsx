import { Box, String } from '@ludo/ui'

import LegalLayout from '../components/legal-layout.component'
import LegalParagraph from '../components/legal-paragraph.component'
import LegalBulletItem from '../components/legal-bullet-item.component'
import LegalSectionTitle from '../components/legal-section-title.component'

export default function LegalPrivacyScreen() {
  return (
    <LegalLayout title=" Politique de confidentialité" subtitle="Application Ludora – En vigueur au 25/02/2026">

      {/* Mentions Légales – Éditeur */}
      <Box className="gap-3">
        <LegalSectionTitle>Mentions Légales – Éditeur du site</LegalSectionTitle>
        <LegalParagraph>Le présent site web est édité par Ludora.</LegalParagraph>
        <Box className="bg-primary/5 border border-primary/20 rounded-xl p-4 gap-2">
          <LegalBulletItem label="Nom de l&apos;Entreprise :" value="MEBERBECHE Hichem Amir Fouad" />
          <LegalBulletItem label="Enseigne commerciale :" value="Ludora" />
          <LegalBulletItem label="Siège social :" value="8 impasse André le Notre, 94000 Créteil" />
          <LegalBulletItem label="SIRET :" value="931 604 102 00018" />
          <LegalBulletItem label="Directeur de la publication :" value="Meberbeche Hichem Amir Fouad" />
          <LegalBulletItem label="Contact :" value="06 01 77 08 14 / contact@ludora.fr" />
        </Box>
      </Box>

      {/* Hébergeur */}
      <Box className="gap-3">
        <LegalSectionTitle>Hébergeur</LegalSectionTitle>
        <LegalParagraph>Le présent site web est hébergé par :</LegalParagraph>
        <Box className="bg-primary/5 border border-primary/20 rounded-xl p-4 gap-2">
          <String font="primaryBold" variant="body-sm">OVH</String>
          <LegalParagraph>Siège social : 2 rue Kellermann – 59100 Roubaix, France</LegalParagraph>
          <LegalParagraph>Tél. +33 (0)8 99 70 17 61</LegalParagraph>
        </Box>
      </Box>

      {/* Politique de confidentialité – intro */}
      <Box className="gap-3">
        <LegalSectionTitle>Politique de confidentialité</LegalSectionTitle>
        <LegalParagraph>
          Cette politique de confidentialité a pour objectif de vous expliquer pourquoi nous recueillons vos données et comment nous nous engageons à les protéger.
        </LegalParagraph>
        <LegalParagraph>
          Ludora s&apos;engage en faveur de la protection de vos données personnelles et de votre vie privée.
        </LegalParagraph>
        <LegalParagraph>
          À ce titre, et en application du Règlement Général de Protection des Données (ci-après dénommé &quot;RGPD&quot;), nous vous communiquons ci-après les conditions dans lesquelles vos données personnelles sont appelées à être traitées par nos soins.
        </LegalParagraph>
      </Box>

      {/* Quelles données personnelles traitons-nous ? */}
      <Box className="gap-3">
        <LegalSectionTitle>Quelles données personnelles traitons-nous ?</LegalSectionTitle>
        <String font="primaryBold" variant="body-sm">Finalités :</String>
        <LegalParagraph>
          Nous sommes susceptibles de recueillir et de conserver vos données à caractère personnel, notamment pour :
        </LegalParagraph>
        <Box className="gap-1">
          <LegalBulletItem value="Traiter et répondre à vos messages" />
          <LegalBulletItem value="Créer et gérer l&apos;accès à vos comptes" />
          <LegalBulletItem value="Gérer vos inscriptions à nos newsletters" />
          <LegalBulletItem value="Etablir et assurer le suivi de la relation commerciale pouvant découler de vos messages" />
          <LegalBulletItem value="Rédiger un avis/commentaire publié sur le site" />
          <LegalBulletItem value="Percevoir votre paiement" />
          <LegalBulletItem value="Assurer la comptabilité et la gestion" />
          <LegalBulletItem value="Améliorer notre suivi et service client" />
          <LegalBulletItem value="Gérer le bon fonctionnement et la personnalisation des services" />
          <LegalBulletItem value="Vous envoyer des informations commerciales et publicitaires en fonction de vos préférences" />
          <LegalBulletItem value="Détection d&apos;attaques et recours contentieux contre la fraude" />
          <LegalBulletItem value="Mémoriser vos choix quant à l&apos;utilisation des cookies" />
          <LegalBulletItem value="Traiter et répondre à vos demandes d&apos;exercice de droits" />
          <LegalBulletItem value="Pour répondre aux exigences réglementaires en vigueur ou en cours d&apos;adoption" />
        </Box>

        <String font="primaryBold" variant="body-sm">Catégories des données :</String>
        <Box className="gap-1">
          <LegalBulletItem value="Des coordonnées (par exemple nom, prénom, numéro de téléphone, email)" />
          <LegalBulletItem value="Des informations personnelles (par exemple date de naissance, nationalité, vie maritale, profession)" />
          <LegalBulletItem value="Vos préférences" />
          <LegalBulletItem value="Des informations techniques et de localisation générées dans le cadre de l&apos;utilisation de nos services" />
        </Box>

        <String font="primaryBold" variant="body-sm">Fondement juridiques des traitements</String>
        <LegalParagraph>Les traitements de données à caractère personnel mis en œuvre sont fondés :</LegalParagraph>
        <Box className="gap-1">
          <LegalBulletItem value="Soit sur le consentement de la personne concernée (Article 6.1.a du RGPD) pour tous les traitements qui nécessitent le recueil préalable du consentement. Dans les formulaires en ligne, les champs obligatoires sont marqués d&apos;un astérisque. A défaut de réponse aux questions obligatoires, nous ne serons pas en mesure de vous fournir les services demandés." />
          <LegalBulletItem value="Soit pour l&apos;exécution d&apos;un contrat ou l&apos;exécution de mesures précontractuelles" />
          <LegalBulletItem value="Soit pour la poursuite d&apos;un intérêt légitime (Article 6.1.e du RGPD)" />
          <LegalBulletItem value="Soit pour le respect d&apos;une obligation légale ou règlementaire" />
        </Box>
      </Box>

      {/* Durée de conservation */}
      <Box className="gap-3">
        <LegalSectionTitle>Durée de conservation</LegalSectionTitle>
        <LegalParagraph>
          Vos données sont conservées pour la durée nécessaire à l&apos;accomplissement des finalités mentionnées ci-dessus.
        </LegalParagraph>
        <LegalParagraph>
          La durée de conservation des données personnelles des Clients dépend de la finalité concernée. Dans ce cadre, les données personnelles des Clients sont conservées le temps nécessaire à l&apos;accomplissement de leur requête. A défaut d&apos;une quelconque réalisation, les données personnelles sont supprimées dans les délais recommandés par la Commission Nationale Informatique et Libertés (CNIL), au terme d&apos;un délai de trois ans à compter de leur collecte, sous réserve : des possibilités et obligations légales en matière d&apos;archivage, des obligations de conservation de certaines données à des fins probatoires, et/ou d&apos;anonymisation de celles-ci.
        </LegalParagraph>
        <LegalParagraph>
          Les données personnelles du Client collectées et traitées, pour les besoins d&apos;exécution des offres, sont conservées pour la durée nécessaire à la gestion de la relation contractuelle.
        </LegalParagraph>
        <LegalParagraph>
          Par dérogation, les données personnelles requises pour l&apos;établissement de la preuve d&apos;un droit ou d&apos;un contrat sont archivées conformément aux dispositions légales (5 ou 10 ans après la fin de la relation commerciale selon le cas).
        </LegalParagraph>
      </Box>

      {/* Destinataires des données */}
      <Box className="gap-3">
        <LegalSectionTitle>Quels sont les destinataires de vos données ?</LegalSectionTitle>
        <LegalParagraph>Vos données personnelles sont destinées à Ludora.</LegalParagraph>
        <Box className="gap-2">
          <LegalBulletItem label="Nos services internes :" value="Elles sont traitées par le personnel de nos différents services tel que le service commercial ou le service en charge de la sécurité informatique." />
          <LegalBulletItem label="Des entreprises ou personnes de confiance :" value="Ils traitent vos informations pour nous aux fins énoncées ci-dessus, conformément à nos instructions telles qu&apos;elles sont décrites dans notre Politique de confidentialité et à tous autres cas d&apos;usage approprié en termes de confidentialité et de sécurité." />
          <LegalBulletItem label="Des sous-traitants techniques :" value="Les données personnelles vous concernant peuvent être transférées à nos sous-traitants techniques (au sens de l&apos;article 4.8 du RGPD) de façon encadrée strictement. En cas de transfert, nous nous assurons que les sous-traitants respectent le RGPD et prennent des mesures techniques et organisationnelles pour garantir la protection des données (art. 28 du RGPD)." />
        </Box>
        <Box className="gap-1">
          <LegalBulletItem value="Analyse de trafic (comme Google Analytics)" />
          <LegalBulletItem value="Prestataire de paiement (comme Stripe)" />
          <LegalBulletItem value="Service de CDN (comme Cloudflare)" />
        </Box>
        <LegalParagraph>
          Nous devons parfois permettre à nos partenaires de traiter, en notre nom, les informations personnelles que nous détenons sur vous aux fins énoncées dans cette politique ou pour toute autre raison requise par la loi.
        </LegalParagraph>
        <LegalParagraph>Les données personnelles des Clients collectées sont hébergées en France.</LegalParagraph>
        <LegalParagraph>
          Dans le cas du recours à un prestataire situé en dehors de l&apos;Union européenne, nous nous engageons à vérifier que des mesures appropriées ont été mises en place afin que les données personnelles bénéficient d&apos;un niveau de protection adéquat.
        </LegalParagraph>
      </Box>

      {/* Sécurité des données */}
      <Box className="gap-3">
        <LegalSectionTitle>Comment Ludora préserve la sécurité de vos données ?</LegalSectionTitle>
        <LegalParagraph>
          Nous mettons en place toutes les mesures organisationnelles et techniques permettant d&apos;assurer un niveau approprié de sécurité à vos données personnelles, et notamment d&apos;éviter toute perte de confidentialité, d&apos;intégrité ou d&apos;accessibilité.
        </LegalParagraph>
        <Box className="gap-1">
          <LegalBulletItem value="Nous effectuons fréquemment la sauvegarde des données" />
          <LegalBulletItem value="Nous procédons au cryptage de vos données pour les protéger durant leur transfert" />
          <LegalBulletItem value="Dans la mesure du possible, nous limitons l&apos;accès aux informations personnelles aux seules personnes qui ont besoin de les traiter" />
          <LegalBulletItem value="Mise en place de mesures techniques et organisationnelles pour assurer que la conservation des données personnelles des Clients est sécurisée, pendant la durée nécessaire à l&apos;exercice des finalités poursuivies" />
          <LegalBulletItem value="Formation RGPD de nos équipes" />
        </Box>
      </Box>

      {/* Droits sur les données */}
      <Box className="gap-3">
        <LegalSectionTitle>Quels sont vos droits sur vos données personnelles ?</LegalSectionTitle>
        <LegalParagraph>Conformément à la Réglementation Applicable, vous disposez des droits suivants :</LegalParagraph>
        <Box className="gap-2">
          <LegalBulletItem label="Un droit de rectification :" value="vous avez le droit d&apos;obtenir la rectification des données inexactes vous concernant. Vous avez également le droit de compléter les données incomplètes vous concernant, en fournissant une déclaration complémentaire. En cas d&apos;exercice de ce droit, nous nous engageons à communiquer toute rectification à l&apos;ensemble des destinataires de vos données." />
          <LegalBulletItem label="Un droit d&apos;effacement :" value="dans certains cas, vous avez le droit d&apos;obtenir l&apos;effacement de vos données. Cependant, ceci n&apos;est pas un droit absolu et nous pouvons pour des raisons légales ou légitimes conserver ces données." />
          <LegalBulletItem label="Un droit à la limitation du traitement :" value="dans certains cas, vous avez le droit d&apos;obtenir la limitation du traitement sur vos données." />
          <LegalBulletItem label="Un droit à la portabilité des données :" value="vous avez le droit de recevoir vos données que vous nous avez fournies, dans un format structuré, couramment utilisé et lisible par une machine, pour votre usage personnel ou pour les transmettre à un tiers de votre choix. Ce droit ne s&apos;applique que lorsque le traitement de vos données est basé sur votre consentement, sur un contrat ou que ce traitement est effectué par des moyens automatisés." />
          <LegalBulletItem label="Un droit d&apos;opposition au traitement :" value="vous avez le droit de vous opposer à tout moment au traitement de vos données pour les traitements basés sur notre intérêt légitime, une mission d&apos;intérêt public et ceux à des fins de prospection commerciale. Ceci n&apos;est pas un droit absolu et nous pouvons pour des raisons légales ou légitimes refuser votre demande d&apos;opposition." />
          <LegalBulletItem label="Le droit de retirer votre consentement à tout moment :" value="vous pouvez retirer votre consentement au traitement de vos données lorsque le traitement est basé sur votre consentement. Le retrait du consentement ne compromet pas la licéité du traitement fondé sur le consentement effectué avant ce retrait." />
          <LegalBulletItem label="Le droit de déposer une plainte auprès d&apos;une autorité de contrôle :" value="vous avez le droit de contacter votre autorité de protection des données pour vous plaindre de nos pratiques de protection des données personnelles." />
        </Box>
        <LegalParagraph>
          En application du RGPD, les conditions d&apos;exercice de ces droits peuvent varier selon la base de licéité du traitement mentionné dans le premier paragraphe.
        </LegalParagraph>
        <LegalParagraph>
          Nous donnerons suite à tout exercice de droit dans les meilleurs délais et en tout état de cause dans un délai de 30 jours à compter de la réception de la demande.
        </LegalParagraph>
        <LegalParagraph>Nous nous réservons le droit :</LegalParagraph>
        <Box className="gap-1">
          <LegalBulletItem value="De demander une preuve de l&apos;identité du demandeur en cas de doute raisonnable sur cette dernière et ce afin de respecter son obligation de confidentialité" />
          <LegalBulletItem value="De prolonger le délai de réponse de deux mois, informant alors le demandeur de cette prolongation et des motifs du report dans un délai d&apos;un mois à compter de la réception de la demande" />
          <LegalBulletItem value="De refuser de répondre à un exercice de droit si celui-ci était considéré comme abusif (au vu de leur nombre, de leur caractère répétitif ou systématique)" />
        </Box>
      </Box>

      {/* Contact RGPD */}
      <Box className="gap-3">
        <LegalSectionTitle>Qui contacter pour toutes les demandes liées au RGPD ?</LegalSectionTitle>
        <LegalParagraph>Pour exercer vos droits, vous pouvez nous contacter :</LegalParagraph>
        <Box className="bg-primary/5 border border-primary/20 rounded-xl p-4 gap-2">
          <String font="primaryBold" variant="body-sm">Ludora</String>
          <LegalBulletItem label="Nom de l&apos;Entreprise :" value="MEBERBECHE Hichem Amir Fouad (Auto-entrepreneur)" />
          <LegalBulletItem label="Enseigne commerciale :" value="Ludora" />
          <LegalBulletItem label="Siège social :" value="8 impasse André le Notre, 94000 Créteil" />
          <LegalBulletItem label="SIRET :" value="931 604 102 00018" />
          <LegalBulletItem label="Directeur de la publication :" value="Meberbeche Hichem Amir Fouad" />
          <LegalBulletItem label="Contact :" value="06 01 77 08 14 / contact@ludora.fr" />
        </Box>
        <LegalParagraph>
          Si, en dépit de nos efforts et de nos engagements, vous estimiez que vos droits concernant vos données personnelles n&apos;étaient pas respectés, vous pouvez adresser une réclamation auprès de la Commission Nationale Informatique et Libertés : CNIL 3 Place de Fontenoy TSA 80715 75334 Paris Cedex 07.
        </LegalParagraph>
      </Box>

      {/* Réserve de modification */}
      <Box className="gap-3">
        <LegalSectionTitle>Réserve de modification de la Politique de protection des données</LegalSectionTitle>
        <LegalParagraph>
          La présente Politique de protection des données personnelles peut être amenée à évoluer. Elles ont été élaborées à partir d&apos;un modèle libre qui peut être téléchargé sur le site https://donnees.net. Comme nous développons constamment nos services, nous nous réservons le droit de modifier cette Politique de confidentialité, conformément aux dispositions légales en vigueur. Toute modification est publiée sur ce document en temps opportun. Nous vous conseillons de consulter régulièrement cette page pour prendre connaissance des éventuelles modifications ou mises à jour apportées à notre politique de confidentialité.
        </LegalParagraph>
      </Box>

      {/* Politique de Cookies */}
      <Box className="gap-3">
        <LegalSectionTitle>Qu&apos;est-ce qu&apos;un &quot;cookie&quot; ?</LegalSectionTitle>
        <LegalParagraph>
          Les cookies sont de petits fichiers texte qu&apos;un site web enregistre sur votre ordinateur ou votre appareil mobile lorsque vous visitez le site.
        </LegalParagraph>
        <LegalParagraph>
          Ils facilitent votre expérience en ligne en sauvegardant les informations de navigation. Grâce aux cookies, les sites peuvent vous garder connecté, se souvenir de vos préférences de site et vous proposer un contenu personnalisé. Les cookies peuvent également être utilisés pour établir des statistiques sur l&apos;expérience de navigation et pour montrer des publicités ciblées.
        </LegalParagraph>
        <LegalParagraph>En général, les cookies peuvent être classés par :</LegalParagraph>

        <Box className="gap-2">
          <String font="primaryBold" variant="body-sm">Domaine :</String>
          <LegalBulletItem value="Les cookies de première partie sont émis par un site web qu&apos;un utilisateur consulte directement." />
          <LegalBulletItem value="Les cookies tiers ne sont pas créés par le site web consulté, mais par un tiers comme Google Analytics, DoubleClick, Facebook, Twitter, LinkedIn, Youtube, Vimeo, etc." />
        </Box>

        <Box className="gap-2">
          <String font="primaryBold" variant="body-sm">Objectif :</String>
          <LegalBulletItem value="Les cookies strictement nécessaires sont requis pour que le site web fonctionne correctement." />
          <LegalBulletItem value="Les cookies de préférences permettent à un site web de se souvenir des choix que vous avez faits dans le passé." />
          <LegalBulletItem value="Les cookies de statistiques aident le propriétaire du site web à collecter des données statistiques et à comprendre comment les visiteurs interagissent avec le site web." />
          <LegalBulletItem value="Les cookies marketing suivent l&apos;activité en ligne de l&apos;utilisateur pour aider les annonceurs à diffuser des publicités plus pertinentes." />
        </Box>

        <Box className="gap-2">
          <String font="primaryBold" variant="body-sm">Durée :</String>
          <LegalBulletItem value="Les cookies de session qui sont effacés lorsque l&apos;utilisateur ferme le navigateur." />
          <LegalBulletItem value="Les cookies persistants qui restent sur le dispositif de l&apos;utilisateur pendant une certaine période de temps." />
        </Box>
      </Box>

      <Box className="gap-3">
        <LegalSectionTitle>Quels sont les cookies et traceurs que nous utilisons ?</LegalSectionTitle>
        <LegalParagraph>
          L&apos;application Ludora et son site vitrine utilisent exclusivement des cookies techniques et fonctionnels nécessaires au bon fonctionnement du service.
        </LegalParagraph>
        <LegalParagraph>Cookies utilisés :</LegalParagraph>
        <Box className="gap-2">
          <LegalBulletItem label="Cookies de session / Authentification :" value="Ces cookies (ou jetons de stockage local) permettent de vous identifier et de maintenir votre connexion à votre espace client. Ils sont indispensables à l&apos;utilisation de l&apos;application." />
          <LegalBulletItem label="Cookies de sécurité :" value="Utilisés par notre infrastructure Cloudflare pour protéger nos serveurs contre les attaques malveillantes (DDoS, bots)." />
          <LegalBulletItem label="Cookies de préférences :" value="Permettent de mémoriser vos choix d&apos;utilisation (ex: langue, acceptation de la politique de confidentialité)." />
        </Box>
        <LegalParagraph>
          Note : Nous n&apos;utilisons aucun cookie de ciblage publicitaire ni de cookie tiers à des fins de profilage commercial.
        </LegalParagraph>
      </Box>

      <Box className="gap-3">
        <LegalSectionTitle>Vos préférences concernant les cookies</LegalSectionTitle>
        <LegalParagraph>
          Quand vous arrivez pour la première fois sur l&apos;application mobile, un bandeau cookie vous propose d&apos;accepter ou de refuser les Cookies qui ne sont pas essentiels au fonctionnement de l&apos;application mobile. Vous pouvez refuser ou désactiver les Cookies à tout moment, à l&apos;exception des Cookies nécessaires au fonctionnement stable de l&apos;application mobile. Vous avez la possibilité de modifier à tout moment vos préférences relatives à la gestion des cookies.
        </LegalParagraph>
      </Box>

    </LegalLayout>
  )
}
