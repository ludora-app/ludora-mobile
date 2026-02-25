import { Box } from '@ludo/ui'

import LegalLayout from '../components/legal-layout.component'
import LegalParagraph from '../components/legal-paragraph.component'
import LegalBulletItem from '../components/legal-bullet-item.component'
import LegalSectionTitle from '../components/legal-section-title.component'

export default function LegalCguMentionsScreen() {
  return (
    <LegalLayout title="Conditions générales d'utilisation" subtitle="Application Ludora – En vigueur au 25/02/2026">

      {/* Définitions */}
      <Box className="gap-3">
        <LegalSectionTitle>Définitions</LegalSectionTitle>
        <LegalParagraph>
          Client : tout professionnel ou personne physique capable au sens des articles 1123 et suivants du Code civil, ou personne morale, qui visite le site objet des présentes conditions générales.
        </LegalParagraph>
        <LegalParagraph>
          Prestations et Services : https://ludora.fr met à disposition des Clients les services de l&apos;application mobile et du site vitrine.
        </LegalParagraph>
        <LegalParagraph>
          Contenu : ensemble des éléments constituant l&apos;information présente sur le site (textes, images, vidéos).
        </LegalParagraph>
        <LegalParagraph>
          Informations clients : données personnelles susceptibles d&apos;être détenues par Ludora pour la gestion du compte, de la relation client et à des fins d&apos;analyses et de statistiques.
        </LegalParagraph>
        <LegalParagraph>
          Utilisateur : internaute ou utilisateur se connectant et utilisant le site ou l&apos;application susnommés.
        </LegalParagraph>
        <LegalParagraph>
          Informations personnelles : « Les informations qui permettent, sous quelque forme que ce soit, directement ou non, l&apos;identification des personnes physiques auxquelles elles s&apos;appliquent » (article 4 de la loi n° 78-17 du 6 janvier 1978). Les termes « données à caractère personnel », « personne concernée », « sous-traitant » et « données sensibles » ont le sens défini par le Règlement général sur la protection des données (RGPD n° 2016-679).
        </LegalParagraph>
      </Box>

      {/* Intro CGU */}
      <Box className="gap-3">
        <LegalParagraph>
          Les présentes conditions générales d&apos;utilisation (dites « CGU ») ont pour objet l&apos;encadrement juridique des services proposés par l&apos;application mobile Ludora et son site vitrine https://ludora.fr, et de définir les conditions d&apos;accès et d&apos;utilisation des services par « l&apos;Utilisateur ».
        </LegalParagraph>
        <LegalParagraph>Les présentes CGU sont accessibles sur l&apos;application et sur le site à la rubrique « CGU ».</LegalParagraph>
        <LegalParagraph>
          Toute inscription ou utilisation du site implique l&apos;acceptation sans aucune réserve ni restriction des présentes CGU par l&apos;utilisateur. Lors de l&apos;inscription sur le site via le Formulaire d&apos;inscription, chaque utilisateur accepte expressément les présentes CGU en cochant la case précédant le texte suivant : « Je reconnais avoir lu et compris les CGU et je les accepte ».
        </LegalParagraph>
        <LegalParagraph>
          En cas de non-acceptation des CGU stipulées dans le présent contrat, l&apos;Utilisateur se doit de renoncer à l&apos;accès des services proposés par le site.
        </LegalParagraph>
        <LegalParagraph>
          https://ludora.fr se réserve le droit de modifier unilatéralement et à tout moment le contenu des présentes CGU.
        </LegalParagraph>
      </Box>

      {/* Article 1 – Mentions légales / Présentation du site */}
      <Box className="gap-3">
        <LegalSectionTitle>Article 1 – Les mentions légales</LegalSectionTitle>
        <LegalParagraph>
          En vertu de l&apos;article 6 de la loi n° 2004-575 du 21 juin 2004 pour la confiance dans l&apos;économie numérique, il est précisé l&apos;identité des différents intervenants. L&apos;édition et la direction de la publication du site https://ludora.fr sont assurées par Meberbeche Hichem Amir Fouad, domicilié 8 impasse André le Notre, 94000 Créteil.
        </LegalParagraph>
        <Box className="bg-primary/5 border border-primary/20 rounded-xl p-4 gap-2">
          <LegalBulletItem label="Propriétaire / Responsable publication :" value="Meberbeche Hichem Amir Fouad – contact@ludora.fr" />
          <LegalBulletItem label="Webmaster / DPO :" value="Meberbeche – contact@ludora.fr" />
          <LegalBulletItem label="Numéro de téléphone :" value="06 01 77 08 14" />
          <LegalBulletItem label="Adresse e-mail :" value="contact@ludora.fr" />
          <LegalBulletItem label="RCS :" value="Numéro d&apos;inscription 931 604 102" />
          <LegalBulletItem label="TVA :" value="TVA non applicable, art. 293 B du CGI." />
          <LegalBulletItem label="Hébergeur :" value="OVH SAS – 2 rue Kellermann, 59100 Roubaix – +33 9 72 10 10 07" />
        </Box>
        <LegalParagraph>
          L&apos;hébergeur du site https://ludora.fr est la société OVH SAS, dont le siège social est situé au 2 rue Kellermann, 59100 Roubaix, France.
        </LegalParagraph>
      </Box>

      {/* Conditions générales d'utilisation du site */}
      <Box className="gap-3">
        <LegalSectionTitle>Conditions générales d&apos;utilisation du site et des services</LegalSectionTitle>
        <LegalParagraph>
          Le site constitue une œuvre de l&apos;esprit protégée par le Code de la propriété intellectuelle. Le Client ne peut réutiliser, céder ou exploiter pour son propre compte tout ou partie des éléments ou travaux du site.
        </LegalParagraph>
        <LegalParagraph>
          Ce site est normalement accessible à tout moment. Une interruption pour raison de maintenance technique peut être décidée par Ludora, qui s&apos;efforcera d&apos;en communiquer préalablement les dates et heures. Les mentions légales peuvent être modifiées à tout moment ; l&apos;utilisateur est invité à s&apos;y référer le plus souvent possible.
        </LegalParagraph>
      </Box>

      {/* Article 2 – Accès au site */}
      <Box className="gap-3">
        <LegalSectionTitle>Article 2 – Accès au site</LegalSectionTitle>
        <LegalParagraph>
          Le site https://ludora.fr permet à l&apos;Utilisateur un accès gratuit aux services suivants :
        </LegalParagraph>
        <Box className="gap-1">
          <LegalBulletItem value="Création et gestion d&apos;un compte utilisateur sécurisé via authentification tierce (Google Auth)" />
          <LegalBulletItem value="Création et personnalisation d&apos;un profil public avec photo" />
          <LegalBulletItem value="Création et organisation de sessions de sport collectives" />
          <LegalBulletItem value="Recherche et inscription à des sessions de sport créées par d&apos;autres utilisateurs" />
          <LegalBulletItem value="Publication et référencement de terrains ou complexes sportifs" />
          <LegalBulletItem value="Système de messagerie instantanée privée entre membres" />
          <LegalBulletItem value="Envoi d&apos;invitations à des activités sportives" />
          <LegalBulletItem value="Réception de notifications push en temps réel relatives à l&apos;activité du compte (Firebase)" />
          <LegalBulletItem value="Stockage et partage de contenus multimédias liés aux profils et aux terrains (Cloudflare R2)" />
        </Box>
        <LegalParagraph>
          Le site est accessible gratuitement en tout lieu à tout Utilisateur ayant un accès à Internet. Tous les frais supportés par l&apos;Utilisateur pour accéder au service (matériel informatique, logiciels, connexion Internet, etc.) sont à sa charge.
        </LegalParagraph>
        <LegalParagraph>
          L&apos;Utilisateur non membre n&apos;a pas accès aux services réservés. Pour cela, il doit s&apos;inscrire en remplissant le formulaire. En acceptant de s&apos;inscrire aux services réservés, l&apos;Utilisateur membre s&apos;engage à fournir des informations sincères et exactes concernant son état civil et ses coordonnées, notamment son adresse email.
        </LegalParagraph>
        <LegalParagraph>
          Pour accéder aux services, l&apos;Utilisateur doit ensuite s&apos;identifier à l&apos;aide de son identifiant et de son mot de passe qui lui seront communiqués après son inscription.
        </LegalParagraph>
        <LegalParagraph>
          Tout Utilisateur membre régulièrement inscrit pourra également solliciter sa désinscription en se rendant à la page dédiée sur son espace personnel. Celle-ci sera effective dans un délai raisonnable.
        </LegalParagraph>
        <LegalParagraph>
          Tout événement dû à un cas de force majeure ayant pour conséquence un dysfonctionnement du site ou serveur et sous réserve de toute interruption ou modification en cas de maintenance, n&apos;engage pas la responsabilité de https://ludora.fr. Dans ces cas, l&apos;Utilisateur accepte ainsi de ne pas tenir rigueur à l&apos;éditeur de toute interruption ou suspension de service, même sans préavis.
        </LegalParagraph>
        <LegalParagraph>
          L&apos;Utilisateur a la possibilité de contacter le site par messagerie électronique à l&apos;adresse email de l&apos;éditeur communiquée à l&apos;Article 1.
        </LegalParagraph>
        <LegalParagraph>
          Ludora s&apos;efforce de fournir des informations aussi précises que possible. Toutefois, il ne pourra être tenu responsable des oublis, inexactitudes ou carences dans la mise à jour. Toutes les informations indiquées sur le site sont données à titre indicatif, susceptibles d&apos;évoluer et ne sont pas exhaustives.
        </LegalParagraph>
      </Box>

      {/* Limitations contractuelles sur les données techniques */}
      <Box className="gap-3">
        <LegalSectionTitle>Limitations contractuelles sur les données techniques</LegalSectionTitle>
        <LegalParagraph>
          Le site utilise la technologie JavaScript. Le site ne pourra être tenu responsable de dommages matériels liés à l&apos;utilisation du site. L&apos;utilisateur s&apos;engage à accéder au site avec un matériel récent, ne contenant pas de virus et avec un navigateur à jour.
        </LegalParagraph>
        <LegalParagraph>
          Le site https://ludora.fr est hébergé chez un prestataire sur le territoire de l&apos;Union européenne conformément au RGPD (n° 2016-679). L&apos;objectif est d&apos;assurer le meilleur taux d&apos;accessibilité. L&apos;hébergeur assure la continuité de son service 24h/24 ; il se réserve la possibilité d&apos;interrompre le service pour des durées courtes (maintenance, amélioration des infrastructures).
        </LegalParagraph>
        <LegalParagraph>
          Ludora et l&apos;hébergeur ne pourront être tenus responsables en cas de dysfonctionnement du réseau Internet, des lignes téléphoniques ou du matériel informatique, notamment en cas d&apos;encombrement du réseau empêchant l&apos;accès au serveur.
        </LegalParagraph>
      </Box>

      {/* Article 3 – Collecte des données */}
      <Box className="gap-3">
        <LegalSectionTitle>Article 3 – Collecte des données</LegalSectionTitle>
        <LegalParagraph>
          Ludora assure à l&apos;Utilisateur une collecte et un traitement d&apos;informations personnelles dans le respect de la vie privée conformément à la loi n°78-17 du 6 janvier 1978 relative à l&apos;informatique, aux fichiers et aux libertés, et au Règlement général sur la protection des données (RGPD).
        </LegalParagraph>
        <LegalParagraph>
          En vertu de la loi Informatique et Libertés et du RGPD, l&apos;Utilisateur dispose d&apos;un droit d&apos;accès, de rectification, de suppression et d&apos;opposition de ses données personnelles. L&apos;Utilisateur exerce ce droit via son espace personnel ou en contactant l&apos;éditeur aux coordonnées de l&apos;Article 1. Une Politique de confidentialité détaillée est disponible et précise l&apos;ensemble des traitements réalisés.
        </LegalParagraph>
        <LegalParagraph>
          Les données personnelles sont hébergées en France (OVH) et les contenus multimédias sont stockés via le prestataire Cloudflare R2, dans le respect des garanties prévues par le RGPD.
        </LegalParagraph>
        <LegalParagraph>
          Les données sont conservées tant que le compte est actif, ou pendant une durée de 2 ans après la dernière activité sur l&apos;application, sous réserve des obligations légales d&apos;archivage.
        </LegalParagraph>
      </Box>

      {/* Article 4 – Propriété intellectuelle */}
      <Box className="gap-3">
        <LegalSectionTitle>Article 4 – Propriété intellectuelle</LegalSectionTitle>
        <LegalParagraph>
          Les marques, logos, signes ainsi que tous les contenus du site (textes, images, son…) font l&apos;objet d&apos;une protection par le Code de la propriété intellectuelle et plus particulièrement par le droit d&apos;auteur.
        </LegalParagraph>
        <LegalParagraph>
          L&apos;Utilisateur doit solliciter l&apos;autorisation préalable du site pour toute reproduction, publication, copie des différents contenus. Il s&apos;engage à une utilisation des contenus du site dans un cadre strictement privé ; toute utilisation à des fins commerciales et publicitaires est strictement interdite.
        </LegalParagraph>
        <LegalParagraph>
          Toute représentation totale ou partielle de ce site par quelque procédé que ce soit, sans l&apos;autorisation expresse de l&apos;exploitant du site Internet constituerait une contrefaçon sanctionnée par l&apos;article L 335-2 et suivants du Code de la propriété intellectuelle.
        </LegalParagraph>
        <LegalParagraph>
          Il est rappelé conformément à l&apos;article L122-5 du Code de propriété intellectuelle que l&apos;Utilisateur qui reproduit, copie ou publie le contenu protégé doit citer l&apos;auteur et sa source.
        </LegalParagraph>
      </Box>

      {/* Article 5 – Responsabilité et limitations */}
      <Box className="gap-3">
        <LegalSectionTitle>Article 5 – Limitations de responsabilité</LegalSectionTitle>
        <LegalParagraph>
          Ludora agit en tant qu&apos;éditeur du site et est responsable de la qualité et de la véracité du Contenu qu&apos;il publie.
        </LegalParagraph>
        <LegalParagraph>
          Les sources des informations diffusées sur le site https://ludora.fr sont réputées fiables mais le site ne garantit pas qu&apos;il soit exempt de défauts, d&apos;erreurs ou d&apos;omissions. Les informations communiquées sont présentées à titre indicatif et général sans valeur contractuelle.
        </LegalParagraph>
        <LegalParagraph>
          Ludora ne pourra être tenu responsable des dommages directs et indirects causés au matériel de l&apos;utilisateur lors de l&apos;accès au site, résultant de l&apos;utilisation d&apos;un matériel inadapté, d&apos;un bug ou d&apos;une incompatibilité, ni des dommages indirects (perte de marché, perte d&apos;une chance) consécutifs à l&apos;utilisation du site.
        </LegalParagraph>
        <LegalParagraph>
          Des espaces interactifs (contact, etc.) sont à la disposition des utilisateurs. Ludora se réserve le droit de supprimer, sans mise en demeure préalable, tout contenu déposé qui contreviendrait à la législation applicable en France (protection des données, messages à caractère raciste, injurieux, diffamant ou pornographique). Le cas échéant, Ludora se réserve la possibilité de mettre en cause la responsabilité civile et/ou pénale de l&apos;utilisateur.
        </LegalParagraph>
        <LegalParagraph>
          Malgré des mises à jour régulières, le site https://ludora.fr ne peut être tenu responsable de la modification des dispositions administratives et juridiques survenant après la publication. De même, le site ne peut être tenu responsable de l&apos;utilisation et de l&apos;interprétation de l&apos;information contenue dans ce site.
        </LegalParagraph>
        <LegalParagraph>
          L&apos;Utilisateur s&apos;assure de garder son mot de passe secret lorsqu&apos;un accès par identifiant et mot de passe est utilisé. Toute divulgation du mot de passe, quelle que soit sa forme, est interdite. Il assume les risques liés à l&apos;utilisation de son identifiant et mot de passe. Dans le cas d&apos;une connexion via un tiers (Google Auth), l&apos;Utilisateur est responsable de la sécurité de son compte tiers. Ludora décline toute responsabilité en la matière.
        </LegalParagraph>
        <LegalParagraph>
          Le site https://ludora.fr ne peut être tenu pour responsable d&apos;éventuels virus qui pourraient infecter l&apos;ordinateur ou tout matériel informatique de l&apos;Internaute, suite à une utilisation, à l&apos;accès, ou au téléchargement provenant de ce site.
        </LegalParagraph>
        <LegalParagraph>
          La responsabilité du site ne peut être engagée en cas de force majeure ou du fait imprévisible et insurmontable d&apos;un tiers. Les utilisateurs peuvent déposer une réclamation auprès des autorités de contrôle, notamment la CNIL (https://www.cnil.fr/fr/plaintes).
        </LegalParagraph>
      </Box>

      {/* Article 6 – Liens hypertextes */}
      <Box className="gap-3">
        <LegalSectionTitle>Article 6 – Liens hypertextes</LegalSectionTitle>
        <LegalParagraph>
          Des liens hypertextes peuvent être présents sur le site. L&apos;Utilisateur est informé qu&apos;en cliquant sur ces liens, il sortira du site https://ludora.fr. Ce dernier n&apos;a pas de contrôle sur les pages web sur lesquelles aboutissent ces liens et ne saurait, en aucun cas, être responsable de leur contenu.
        </LegalParagraph>
      </Box>

      {/* Article 7 – Cookies */}
      <Box className="gap-3">
        <LegalSectionTitle>Article 7 – Cookies et traceurs</LegalSectionTitle>
        <LegalParagraph>
          Sur l&apos;application mobile, des traceurs techniques sont utilisés pour maintenir la session utilisateur (NestJS) et permettre l&apos;envoi de notifications (Firebase).
        </LegalParagraph>
        <LegalParagraph>
          L&apos;Utilisateur est informé que lors de ses visites sur le site vitrine, un cookie peut s&apos;installer automatiquement sur son logiciel de navigation.
        </LegalParagraph>
        <LegalParagraph>
          Les cookies sont de petits fichiers stockés temporairement sur le disque dur de l&apos;ordinateur de l&apos;Utilisateur par le navigateur et qui sont nécessaires à l&apos;utilisation du site https://ludora.fr. Les cookies ne contiennent pas d&apos;information personnelle et ne peuvent pas être utilisés pour identifier quelqu&apos;un. Un cookie contient un identifiant unique, généré aléatoirement et donc anonyme. Certains cookies expirent à la fin de la visite de l&apos;Utilisateur, d&apos;autres restent.
        </LegalParagraph>
        <LegalParagraph>L&apos;information contenue dans les cookies est utilisée pour améliorer le site https://ludora.fr. En naviguant sur le site, l&apos;Utilisateur les accepte.</LegalParagraph>
        <LegalParagraph>L&apos;Utilisateur doit toutefois donner son consentement quant à l&apos;utilisation de certains cookies.</LegalParagraph>
        <LegalParagraph>A défaut d&apos;acceptation, l&apos;Utilisateur est informé que certaines fonctionnalités ou pages risquent de lui être refusées.</LegalParagraph>
        <LegalParagraph>L&apos;Utilisateur pourra désactiver ces cookies par l&apos;intermédiaire des paramètres figurant au sein de son logiciel de navigation. Pour l&apos;application mobile, la gestion des traceurs et des notifications peut être effectuée depuis les réglages du terminal ou de l&apos;application.</LegalParagraph>
        <LegalParagraph>
          Sauf désactivation de votre part, vous acceptez que le site puisse utiliser cookies et traceurs. Ludora peut employer des balises Internet (tags) pour évaluer l&apos;utilisation du site et l&apos;efficacité des services ; ces dispositifs sont détaillés dans la Politique de confidentialité.
        </LegalParagraph>
      </Box>

      {/* Article 8 – Publication par l'Utilisateur */}
      <Box className="gap-3">
        <LegalSectionTitle>Article 8 – Publication par l&apos;Utilisateur</LegalSectionTitle>
        <LegalParagraph>Le site permet aux membres de publier les contenus suivants :</LegalParagraph>
        <Box className="gap-1">
          <LegalBulletItem value="Informations de profil (nom, bio, photos de profil)" />
          <LegalBulletItem value="Annonces et descriptions de sessions de sport" />
          <LegalBulletItem value="Informations et photographies de terrains ou complexes sportifs" />
          <LegalBulletItem value="Messages privés échangés entre utilisateurs" />
          <LegalBulletItem value="Commentaires et avis sur les sessions ou les lieux" />
        </Box>
        <LegalParagraph>
          Dans ses publications, le membre s&apos;engage à respecter les règles de la Netiquette (règles de bonne conduite de l&apos;internet) et les règles de droit en vigueur.
        </LegalParagraph>
        <LegalParagraph>
          Le site peut exercer une modération sur les publications et se réserve le droit de refuser leur mise en ligne, sans avoir à s&apos;en justifier auprès du membre.
        </LegalParagraph>
        <LegalParagraph>
          Le membre reste titulaire de l&apos;intégralité de ses droits de propriété intellectuelle. Mais en publiant une publication sur le site, il cède à la société éditrice le droit non exclusif et gratuit de représenter, reproduire, adapter, modifier, diffuser et distribuer sa publication, directement ou par un tiers autorisé, dans le monde entier, sur tout support (numérique ou physique), pour la durée de la propriété intellectuelle. Le Membre cède notamment le droit d&apos;utiliser sa publication sur internet et sur les réseaux de téléphonie mobile.
        </LegalParagraph>
        <LegalParagraph>La société éditrice s&apos;engage à faire figurer le nom du membre à proximité de chaque utilisation de sa publication.</LegalParagraph>
        <LegalParagraph>
          Tout contenu mis en ligne par l&apos;Utilisateur est de sa seule responsabilité. L&apos;Utilisateur s&apos;engage à ne pas mettre en ligne de contenus pouvant porter atteinte aux intérêts de tierces personnes. Tout recours en justice engagé par un tiers lésé contre le site sera pris en charge par l&apos;Utilisateur.
        </LegalParagraph>
        <LegalParagraph>Le contenu de l&apos;Utilisateur peut être à tout moment et pour n&apos;importe quelle raison supprimé ou modifié par le site, sans préavis.</LegalParagraph>
      </Box>

      {/* Notification d'incident et sécurité */}
      <Box className="gap-3">
        <LegalSectionTitle>Notification d&apos;incident et sécurité des données</LegalSectionTitle>
        <LegalParagraph>
          Aucune méthode de transmission sur Internet ni de stockage électronique n&apos;est complètement sûre. Ludora ne peut garantir une sécurité absolue. Si une brèche de sécurité était portée à sa connaissance, les utilisateurs concernés seraient avertis afin qu&apos;ils puissent prendre les mesures appropriées. Les procédures de notification tiennent compte des obligations légales nationales et européennes.
        </LegalParagraph>
        <LegalParagraph>
          Aucune information personnelle de l&apos;utilisateur n&apos;est publiée à son insu, échangée, transférée, cédée ou vendue à des tiers. Seule l&apos;hypothèse du rachat de Ludora et de ses droits permettrait la transmission de ces informations à l&apos;éventuel acquéreur, tenu de la même obligation de conservation et de modification des données.
        </LegalParagraph>
        <LegalParagraph>
          Pour assurer la sécurité et la confidentialité des données personnelles, Ludora utilise des réseaux protégés par des dispositifs standards (pare-feu, pseudonymisation, chiffrement). Lors du traitement des données personnelles, Ludora prend toutes les mesures raisonnables pour les protéger contre toute perte, utilisation détournée, accès non autorisé, divulgation, altération ou destruction.
        </LegalParagraph>
      </Box>

      {/* Article 9 – Droit applicable */}
      <Box className="gap-3">
        <LegalSectionTitle>Article 9 – Droit applicable et juridiction compétente</LegalSectionTitle>
        <LegalParagraph>
          Tout litige en relation avec l&apos;utilisation du site https://ludora.fr est soumis au droit français. La législation française s&apos;applique au présent contrat. En cas d&apos;absence de résolution amiable d&apos;un litige né entre les parties, il est fait attribution exclusive de juridiction aux tribunaux compétents de Paris.
        </LegalParagraph>
        <LegalParagraph>
          Pour toute question relative à l&apos;application des présentes CGU, vous pouvez joindre l&apos;éditeur aux coordonnées inscrites à l&apos;Article 1.
        </LegalParagraph>
      </Box>

    </LegalLayout>
  )
}
