import { Linking } from 'react-native'
import { Box, String } from '@ludo/ui'

import LegalLayout from '../components/legal-layout.component'
import LegalParagraph from '../components/legal-paragraph.component'
import LegalBulletItem from '../components/legal-bullet-item.component'
import LegalSectionTitle from '../components/legal-section-title.component'

export default function LegalCgvScreen() {
  return (
    <LegalLayout title="Conditions Générales de Vente" subtitle="En vigueur au 25/02/2026">
      {/* Article 1 */}
      <Box className="gap-3">
        <LegalSectionTitle>Article 1 – Champ d&apos;application</LegalSectionTitle>
        <LegalParagraph>
          Les présentes Conditions Générales de Vente (dites &quot; CGV &quot;) s&apos;appliquent, sans restriction ni réserve à l&apos;ensemble des ventes conclues par le Vendeur auprès d&apos;acheteurs non professionnels (&quot; Les Clients ou le Client &quot;), désirant acquérir les produits proposés à la vente (&quot; Les Produits &quot;) par le Vendeur sur le site https://ludora.fr.
        </LegalParagraph>
        <LegalParagraph>Les Produits proposés à la vente sur le site sont les suivants :</LegalParagraph>
        <LegalParagraph>
          Services de mise en relation entre sportifs et gestionnaires de terrains, frais de service sur la réservation de terrains de sport privés, gestion et sécurisation des réservations en ligne, accès aux outils d&apos;organisation de sessions sportives sur terrains partenaires.
        </LegalParagraph>
        <LegalParagraph>
          Les caractéristiques principales des Produits et notamment les spécifications, illustrations et indications de dimensions ou de capacité des Produits, sont présentées sur le site https://ludora.fr ce dont le client est tenu de prendre connaissance avant de commander.
        </LegalParagraph>
        <LegalParagraph>Le choix et l&apos;achat d&apos;un Produit sont de la seule responsabilité du Client.</LegalParagraph>
        <LegalParagraph>Les offres de Produits s&apos;entendent dans la limite des stocks disponibles, tels que précisés lors de la passation de la commande.</LegalParagraph>
        <LegalParagraph>Ces CGV sont accessibles à tout moment sur le site https://ludora.fr et prévaudront sur tout autre document.</LegalParagraph>
        <LegalParagraph>
          Le Client déclare avoir pris connaissance des présentes CGV et les avoir acceptées en cochant la case prévue à cet effet avant la mise en œuvre de la procédure de commande en ligne du site https://ludora.fr.
        </LegalParagraph>
        <LegalParagraph>
          Sauf preuve contraire, les données enregistrées dans le système informatique du Vendeur constituent la preuve de l&apos;ensemble des transactions conclues avec le Client.
        </LegalParagraph>

        <Box className="bg-primary/5 border border-primary/20 rounded-xl p-4 gap-2">
          <String font="primaryBold" variant="body-sm">Coordonnées du Vendeur :</String>
          <LegalBulletItem label="Nom :" value="Meberbeche Hichem Amir" />
          <LegalBulletItem label="Adresse :" value="8 impasse André le Notre, 94000 Créteil" />
          <LegalBulletItem label="N° immatriculation :" value="931 604 102" />
          <LegalBulletItem label="Email :" value="contact@ludora.fr" />
          <LegalBulletItem label="Téléphone :" value="06 01 77 08 14" />
        </Box>
      </Box>

      {/* Article 2 */}
      <Box className="gap-3">
        <LegalSectionTitle>Article 2 – Prix</LegalSectionTitle>
        <LegalParagraph>
          Les Produits sont fournis aux tarifs en vigueur figurant sur le site https://ludora.fr, lors de l&apos;enregistrement de la commande par le Vendeur.
        </LegalParagraph>
        <LegalParagraph>Les prix sont exprimés en Euros, HT et TTC.</LegalParagraph>
        <LegalParagraph>
          Les tarifs tiennent compte d&apos;éventuelles réductions qui seraient consenties par le Vendeur sur le site https://ludora.fr.
        </LegalParagraph>
        <LegalParagraph>
          Ces tarifs sont fermes et non révisables pendant leur période de validité mais le Vendeur se réserve le droit, hors période de validité, d&apos;en modifier les prix à tout moment.
        </LegalParagraph>
        <LegalParagraph>
          Les prix ne comprennent pas les frais de traitement, d&apos;expédition, de transport et de livraison, qui sont facturés en supplément, dans les conditions indiquées sur le site et calculés préalablement à la passation de la commande.
        </LegalParagraph>
        <LegalParagraph>Le paiement demandé au Client correspond au montant total de l&apos;achat, y compris ces frais.</LegalParagraph>
        <LegalParagraph>Une facture est établie par le Vendeur et remise au Client lors de la livraison des Produits commandés.</LegalParagraph>
        <LegalParagraph>TVA non applicable, article 293 B du CGI.</LegalParagraph>
      </Box>

      {/* Article 3 */}
      <Box className="gap-3">
        <LegalSectionTitle>Article 3 – Commandes</LegalSectionTitle>
        <LegalParagraph>
          Il appartient au Client de sélectionner sur le site https://ludora.fr les Produits qu&apos;il désire commander, selon les modalités suivantes :
        </LegalParagraph>
        <LegalParagraph>
          L&apos;Utilisateur sélectionne une session de sport ou un terrain sur l&apos;Application. Il accède à un récapitulatif présentant le détail de la réservation et le prix total, qu&apos;il peut modifier ou abandonner avant toute validation. Après avoir accepté les présentes CGV, l&apos;Utilisateur confirme sa réservation, ce qui rend la commande définitive et exige paiement. Le paiement est effectué de manière sécurisée via l&apos;interface intégrée. Une fois le paiement validé, une confirmation est immédiatement affichée dans l&apos;Application et envoyée par e-mail, rendant le service accessible dans l&apos;espace client.
        </LegalParagraph>
        <LegalParagraph>Les offres de Produits sont valables tant qu&apos;elles sont visibles sur le site, dans la limite des stocks disponibles.</LegalParagraph>
        <LegalParagraph>La vente ne sera considérée comme valide qu&apos;après paiement intégral du prix. Il appartient au Client de vérifier l&apos;exactitude de la commande et de signaler immédiatement toute erreur.</LegalParagraph>
        <LegalParagraph>
          Toute commande passée sur le site https://ludora.fr constitue la formation d&apos;un contrat conclu à distance entre le Client et le Vendeur.
        </LegalParagraph>
        <LegalParagraph>
          Le Vendeur se réserve le droit d&apos;annuler ou de refuser toute commande d&apos;un Client avec lequel il existerait un litige relatif au paiement d&apos;une commande antérieure.
        </LegalParagraph>
        <LegalParagraph>Le Client pourra suivre l&apos;évolution de sa commande sur le site.</LegalParagraph>
      </Box>

      {/* Article 3 Bis */}
      <Box className="gap-3">
        <LegalSectionTitle>Article 3 Bis – Espace client / Compte</LegalSectionTitle>
        <LegalParagraph>
          Afin de passer commande, le Client est invité à créer un compte (espace personnel). Pour ce faire, il doit s&apos;inscrire en remplissant le formulaire qui lui sera proposé au moment de sa commande et s&apos;engage à fournir des informations sincères et exactes concernant son état civil et ses coordonnées, notamment son adresse email.
        </LegalParagraph>
        <LegalParagraph>Le Client est responsable de la mise à jour des informations fournies. Il lui est précisé qu&apos;il peut les modifier en se connectant à son compte.</LegalParagraph>
        <LegalParagraph>
          Pour accéder à son espace personnel et aux historiques de commande, le Client devra s&apos;identifier à l&apos;aide de son nom d&apos;utilisateur et de son mot de passe qui lui seront communiqués après son inscription et qui sont strictement personnels. A ce titre, le Client s&apos;en interdit toute divulgation. Dans le cas contraire, il restera seul responsable de l&apos;usage qui en sera fait.
        </LegalParagraph>
        <LegalParagraph>
          Le Client pourra également solliciter sa désinscription en se rendant à la page dédiée sur son espace personnel ou en envoyant un email à : contact@ludora.fr. Celle-ci sera effective dans un délai raisonnable.
        </LegalParagraph>
        <LegalParagraph>
          En cas de non respect des conditions générales de vente et/ou d&apos;utilisation, le site https://ludora.fr aura la possibilité de suspendre voire de fermer le compte d&apos;un client après mise en demeure adressée par voie électronique et restée sans effet.
        </LegalParagraph>
        <LegalParagraph>Toute suppression de compte, quel qu&apos;en soit le motif, engendre la suppression pure et simple de toutes informations personnelles du Client.</LegalParagraph>
        <LegalParagraph>
          Tout événement dû à un cas de force majeure ayant pour conséquence un dysfonctionnement du site ou serveur et sous réserve de toute interruption ou modification en cas de maintenance, n&apos;engage pas la responsabilité du Vendeur.
        </LegalParagraph>
        <LegalParagraph>La création du compte entraîne l&apos;acceptation des présentes conditions générales de vente.</LegalParagraph>
      </Box>

      {/* Article 4 */}
      <Box className="gap-3">
        <LegalSectionTitle>Article 4 – Conditions de paiement</LegalSectionTitle>
        <LegalParagraph>Le prix est payé par voie de paiement sécurisé, selon les modalités suivantes : paiement par carte bancaire.</LegalParagraph>
        <LegalParagraph>Le prix est payable comptant par le Client, en totalité au jour de la passation de la commande.</LegalParagraph>
        <LegalParagraph>
          Les données de paiement sont échangées en mode crypté grâce au protocole défini par le prestataire de paiement agréé intervenant pour les transactions bancaires réalisées sur le site https://ludora.fr.
        </LegalParagraph>
        <LegalParagraph>Les paiements effectués par le Client ne seront considérés comme définitifs qu&apos;après encaissement effectif par le Vendeur des sommes dues.</LegalParagraph>
        <LegalParagraph>Le Vendeur ne sera pas tenu de procéder à la délivrance des Produits commandés par le Client si celui-ci ne lui en paye pas le prix en totalité dans les conditions ci-dessus indiquées.</LegalParagraph>
      </Box>

      {/* Article 5 */}
      <Box className="gap-3">
        <LegalSectionTitle>Article 5 – Livraisons</LegalSectionTitle>
        <LegalParagraph>Les Produits commandés par le Client seront livrés en France métropolitaine.</LegalParagraph>
        <LegalParagraph>Les livraisons interviennent dans un délai immédiat à l&apos;adresse indiquée par le Client lors de sa commande sur le site.</LegalParagraph>
        <LegalParagraph>
          La livraison est constituée par le transfert au Client de la possession physique ou du contrôle du Produit. Sauf cas particulier ou indisponibilité d&apos;un ou plusieurs Produits, les Produits commandés seront livrés en une seule fois.
        </LegalParagraph>
        <LegalParagraph>Le Vendeur s&apos;engage à faire ses meilleurs efforts pour livrer les produits commandés par le Client dans les délais ci-dessus précisés.</LegalParagraph>
        <LegalParagraph>
          Si les Produits commandés n&apos;ont pas été livrés dans un délai de 24 heures après la date indicative de livraison, pour toute autre cause que la force majeure ou le fait du Client, la vente pourra être résolue à la demande écrite du Client dans les conditions prévues aux articles L 216-2, L 216-3 et L 241-4 du Code de la consommation. Les sommes versées par le Client lui seront alors restituées au plus tard dans les quatorze jours qui suivent la date de dénonciation du contrat, à l&apos;exclusion de toute indemnisation ou retenue.
        </LegalParagraph>
        <LegalParagraph>
          Le Client est tenu de vérifier l&apos;état des produits livrés. Il dispose d&apos;un délai de 48 heures à compter de la livraison pour formuler des réclamations par e-mail à l&apos;adresse : contact@ludora.fr ou via le formulaire de contact intégré à l&apos;application, accompagnées de tous les justificatifs y afférents (photos notamment). Passé ce délai et à défaut d&apos;avoir respecté ces formalités, les Produits seront réputés conformes et exempts de tout vice apparent et aucune réclamation ne pourra être valablement acceptée par le Vendeur.
        </LegalParagraph>
        <LegalParagraph>
          Le Vendeur remboursera ou remplacera dans les plus brefs délais et à ses frais, les Produits livrés dont les défauts de conformité ou les vices apparents ou cachés auront été dûment prouvés par le Client, dans les conditions prévues aux articles L 217-4 et suivants du Code de la consommation et celles prévues aux présentes CGV.
        </LegalParagraph>
      </Box>

      {/* Article 6 */}
      <Box className="gap-3">
        <LegalSectionTitle>Article 6 – Transfert de propriété</LegalSectionTitle>
        <LegalParagraph>Le transfert de propriété des Produits du Vendeur au Client ne sera réalisé qu&apos;après complet paiement du prix par ce dernier, et ce quelle que soit la date de livraison desdits Produits.</LegalParagraph>
      </Box>

      {/* Article 7 */}
      <Box className="gap-3">
        <LegalSectionTitle>Article 7 – Droit de rétractation</LegalSectionTitle>
        <LegalParagraph>Compte tenu de la nature des Produits vendus, les commandes passées par le Client ne bénéficient pas du droit de rétractation.</LegalParagraph>
        <LegalParagraph>Le contrat est donc conclu de façon définitive dès la passation de la commande par le Client selon les modalités précisées aux présentes CGV.</LegalParagraph>
      </Box>

      {/* Article 8 */}
      <Box className="gap-3">
        <LegalSectionTitle>Article 8 – Responsabilité du vendeur / Garanties</LegalSectionTitle>
        <LegalParagraph>Les Produits fournis par le Vendeur bénéficient :</LegalParagraph>
        <Box className="gap-1">
          <LegalBulletItem value="De la garantie légale de conformité, pour les Produits défectueux, abîmés ou endommagés ou ne correspondant pas à la commande." />
          <LegalBulletItem value="De la garantie légale contre les vices cachés provenant d&apos;un défaut de matière, de conception ou de fabrication affectant les produits livrés et les rendant impropres à l&apos;utilisation." />
        </Box>

        <Box className="bg-primary/5 border border-primary/20 rounded-xl p-4 gap-3">
          <String font="primaryBold" variant="body-sm">Dispositions relatives aux garanties légales</String>

          <Box className="gap-1">
            <String font="primaryBold" variant="body-xs">Article L217-4 du Code de la consommation</String>
            <LegalParagraph>&laquo; Le vendeur est tenu de livrer un bien conforme au contrat et répond des défauts de conformité existant lors de la délivrance. Il répond également des défauts de conformité résultant de l&apos;emballage, des instructions de montage ou de l&apos;installation lorsque celle-ci a été mise à sa charge par le contrat ou a été réalisée sous sa responsabilité. &raquo;</LegalParagraph>
          </Box>

          <Box className="gap-1">
            <String font="primaryBold" variant="body-xs">Article L217-5 du Code de la consommation</String>
            <LegalParagraph>&laquo; Le bien est conforme au contrat : 1&deg; S&apos;il est propre à l&apos;usage habituellement attendu d&apos;un bien semblable et, le cas échéant : s&apos;il correspond à la description donnée par le vendeur et possède les qualités que celui-ci a présentées à l&apos;acheteur sous forme d&apos;échantillon ou de modèle ; s&apos;il présente les qualités qu&apos;un acheteur peut légitimement attendre eu égard aux déclarations publiques faites par le vendeur, par le producteur ou par son représentant, notamment dans la publicité ou l&apos;étiquetage ; 2&deg; Ou s&apos;il présente les caractéristiques définies d&apos;un commun accord par les parties ou est propre à tout usage spécial recherché par l&apos;acheteur, porté à la connaissance du vendeur et que ce dernier a accepté. &raquo;</LegalParagraph>
          </Box>

          <Box className="gap-1">
            <String font="primaryBold" variant="body-xs">Article L217-12 du Code de la consommation</String>
            <LegalParagraph>&laquo; L&apos;action résultant du défaut de conformité se prescrit par deux ans à compter de la délivrance du bien. &raquo;</LegalParagraph>
          </Box>

          <Box className="gap-1">
            <String font="primaryBold" variant="body-xs">Article 1641 du Code civil</String>
            <LegalParagraph>&laquo; Le vendeur est tenu de la garantie à raison des défauts cachés de la chose vendue qui la rendent impropre à l&apos;usage auquel on la destine, ou qui diminuent tellement cet usage, que l&apos;acheteur ne l&apos;aurait pas acquise, ou n&apos;en aurait donné qu&apos;un moindre prix, s&apos;il les avait connus. &raquo;</LegalParagraph>
          </Box>

          <Box className="gap-1">
            <String font="primaryBold" variant="body-xs">Article 1648 alinéa 1er du Code civil</String>
            <LegalParagraph>&laquo; L&apos;action résultant des vices rédhibitoires doit être intentée par l&apos;acquéreur dans un délai de deux ans à compter de la découverte du vice. &raquo;</LegalParagraph>
          </Box>

          <Box className="gap-1">
            <String font="primaryBold" variant="body-xs">Article L217-16 du Code de la consommation</String>
            <LegalParagraph>&laquo; Lorsque l&apos;acheteur demande au vendeur, pendant le cours de la garantie commerciale qui lui a été consentie lors de l&apos;acquisition ou de la réparation d&apos;un bien meuble, une remise en état couverte par la garantie, toute période d&apos;immobilisation d&apos;au moins sept jours vient s&apos;ajouter à la durée de la garantie qui restait à courir. Cette période court à compter de la demande d&apos;intervention de l&apos;acheteur ou de la mise à disposition pour réparation du bien en cause, si cette mise à disposition est postérieure à la demande d&apos;intervention. &raquo;</LegalParagraph>
          </Box>
        </Box>

        <LegalParagraph>Afin de faire valoir ses droits, le Client devra informer le Vendeur, par écrit (mail ou courrier), de la non-conformité des Produits ou de l&apos;existence des vices cachés à compter de leur découverte.</LegalParagraph>
        <LegalParagraph>Le Vendeur remboursera, remplacera ou fera réparer les Produits ou pièces sous garantie jugés non conformes ou défectueux.</LegalParagraph>
        <LegalParagraph>Les remboursements, remplacements ou réparations des Produits jugés non conformes ou défectueux seront effectués dans les meilleurs délais et au plus tard dans les 14 jours suivant la constatation par le Vendeur du défaut de conformité ou du vice caché.</LegalParagraph>
        <LegalParagraph>La responsabilité du Vendeur ne saurait être engagée dans les cas suivants :</LegalParagraph>
        <Box className="gap-1">
          <LegalBulletItem value="Non respect de la législation du pays dans lequel les produits sont livrés, qu&apos;il appartient au Client de vérifier." />
          <LegalBulletItem value="En cas de mauvaise utilisation, d&apos;utilisation à des fins professionnelles, négligence ou défaut d&apos;entretien de la part du Client, comme en cas d&apos;usure normale du Produit, d&apos;accident ou de force majeure." />
        </Box>
        <LegalParagraph>Les photographies et graphismes présentés sur le site ne sont pas contractuels et ne sauraient engager la responsabilité du Vendeur.</LegalParagraph>
        <LegalParagraph>La garantie du Vendeur est, en tout état de cause, limitée au remplacement ou au remboursement des Produits non conformes ou affectés d&apos;un vice.</LegalParagraph>
      </Box>

      {/* Article 9 */}
      <Box className="gap-3">
        <LegalSectionTitle>Article 9 – Données personnelles</LegalSectionTitle>
        <LegalParagraph>Le Client est informé que la collecte de ses données à caractère personnel est nécessaire à la vente des Produits par le Vendeur ainsi qu&apos;à leur transmission à des tiers à des fins de livraison des Produits. Ces données à caractère personnel sont récoltées uniquement pour l&apos;exécution du contrat de vente.</LegalParagraph>

        <String font="primaryBold" variant="body-sm">9.1 Collecte des données à caractère personnel</String>
        <LegalParagraph>Les données à caractère personnel qui sont collectées sur le site https://ludora.fr sont les suivantes :</LegalParagraph>
        <String font="primaryBold" variant="body-xs">Ouverture de compte</String>
        <LegalParagraph>Lors de la création du compte Client / utilisateur : Nom, prénom, adresse e-mail (via Google Auth), photographie de profil, coordonnées de géolocalisation (uniquement pour la recherche de terrains à proximité), identifiant unique de l&apos;appareil (Device ID pour les notifications Firebase), historique des réservations et des sessions de sport, messages échangés via la messagerie interne, données de paiement (traitées de manière sécurisée par le prestataire tiers).</LegalParagraph>
        <String font="primaryBold" variant="body-xs">Paiement</String>
        <LegalParagraph>Dans le cadre du paiement des Produits proposés sur le site https://ludora.fr, celui-ci enregistre des données financières relatives au compte bancaire ou à la carte de crédit du Client / utilisateur.</LegalParagraph>

        <String font="primaryBold" variant="body-sm">9.2 Destinataires des données à caractère personnel</String>
        <LegalParagraph>Les données à caractère personnel sont utilisées par le Vendeur et ses co-contractants pour l&apos;exécution du contrat et pour assurer l&apos;efficacité de la prestation de vente et de délivrance des Produits.</LegalParagraph>
        <LegalParagraph>La ou les catégorie(s) de co-contractant(s) :</LegalParagraph>
        <Box className="gap-1">
          <LegalBulletItem value="Prestataires établissements de paiement." />
          <LegalBulletItem value="Prestataires d&apos;hébergement et de stockage (OVH et Cloudflare R2)." />
          <LegalBulletItem value="Prestataire de services de notifications push (Google Firebase)." />
          <LegalBulletItem value="Prestataire d&apos;authentification sécurisée (Google Auth)." />
          <LegalBulletItem value="PostHog : Outil d&apos;analyse de l&apos;expérience utilisateur nous permettant de comprendre l&apos;utilisation de l&apos;application (clics, parcours) afin d&apos;en améliorer l&apos;ergonomie." />
        </Box>

        <String font="primaryBold" variant="body-sm">9.3 Responsable de traitement</String>
        <LegalParagraph>Le responsable de traitement des données est le Vendeur, au sens de la loi Informatique et libertés et à compter du 25 mai 2018 du Règlement 2016/679 sur la protection des données à caractère personnel.</LegalParagraph>

        <String font="primaryBold" variant="body-sm">9.4 Limitation du traitement</String>
        <LegalParagraph>Sauf si le Client exprime son accord exprès, ses données à caractère personnelles ne sont pas utilisées à des fins publicitaires ou marketing.</LegalParagraph>

        <String font="primaryBold" variant="body-sm">9.5 Durée de conservation des données</String>
        <LegalParagraph>Le Vendeur conservera les données ainsi recueillies pendant un délai de 5 ans, couvrant le temps de la prescription de la responsabilité civile contractuelle applicable.</LegalParagraph>

        <String font="primaryBold" variant="body-sm">9.6 Sécurité et confidentialité</String>
        <LegalParagraph>Le Vendeur met en œuvre des mesures organisationnelles, techniques, logicielles et physiques en matière de sécurité du numérique pour protéger les données personnelles contre les altérations, destructions et accès non autorisés. Toutefois il est à signaler qu&apos;Internet n&apos;est pas un environnement complètement sécurisé et le Vendeur ne peut garantir la sécurité de la transmission ou du stockage des informations sur Internet.</LegalParagraph>

        <String font="primaryBold" variant="body-sm">9.7 Mise en œuvre des droits des Clients et utilisateurs</String>
        <LegalParagraph>En application de la réglementation applicable aux données à caractère personnel, les Clients et utilisateurs du site https://ludora.fr disposent des droits suivants :</LegalParagraph>
        <Box className="gap-1">
          <LegalBulletItem value="Ils peuvent mettre à jour ou supprimer les données qui les concernent depuis la fonctionnalité de suppression de compte dans les réglages du profil utilisateur, ou par e-mail à contact@ludora.fr. L&apos;Editeur s&apos;engage à traiter la demande dans un délai maximal de 30 jours." />
          <LegalBulletItem value="Ils peuvent supprimer leur compte en écrivant à l&apos;adresse électronique indiquée à l&apos;article 9.3." />
          <LegalBulletItem value="Ils peuvent exercer leur droit d&apos;accès pour connaître les données personnelles les concernant." />
          <LegalBulletItem value="Si les données sont inexactes, ils peuvent demander la mise à jour des informations." />
          <LegalBulletItem value="Ils peuvent demander la suppression de leurs données à caractère personnel, conformément aux lois applicables." />
          <LegalBulletItem value="Ils peuvent solliciter la portabilité des données détenues par le Vendeur vers un autre prestataire." />
          <LegalBulletItem value="Ils peuvent s&apos;opposer au traitement de leurs données par le Vendeur." />
        </Box>
        <LegalParagraph>Ces droits peuvent être exercés en adressant une demande par courrier ou par e-mail au Responsable de traitement. Le responsable de traitement doit apporter une réponse dans un délai maximum d&apos;un mois.</LegalParagraph>
        <LegalParagraph>En cas de refus, le Client est informé qu&apos;il peut introduire une réclamation auprès de la CNIL (3 place de Fontenoy, 75007 PARIS) ou saisir une autorité judiciaire.</LegalParagraph>
      </Box>

      {/* Article 10 */}
      <Box className="gap-3">
        <LegalSectionTitle>Article 10 – Propriété intellectuelle</LegalSectionTitle>
        <LegalParagraph>Le contenu du site https://ludora.fr est la propriété du Vendeur et de ses partenaires et est protégé par les lois françaises et internationales relatives à la propriété intellectuelle.</LegalParagraph>
        <LegalParagraph>Toute reproduction totale ou partielle de ce contenu est strictement interdite et est susceptible de constituer un délit de contrefaçon.</LegalParagraph>
      </Box>

      {/* Article 11 */}
      <Box className="gap-3">
        <LegalSectionTitle>Article 11 – Droit applicable / Langue</LegalSectionTitle>
        <LegalParagraph>Les présentes CGV et les opérations qui en découlent sont régies et soumises au droit français.</LegalParagraph>
        <LegalParagraph>Les présentes CGV sont rédigées en langue française. Dans le cas où elles seraient traduites en une ou plusieurs langues étrangères, seul le texte français ferait foi en cas de litige.</LegalParagraph>
      </Box>

      {/* Article 12 */}
      <Box className="gap-3">
        <LegalSectionTitle>Article 12 – Litiges</LegalSectionTitle>
        <LegalParagraph>Pour toute réclamation merci de contacter le service clientèle à l&apos;adresse postale ou mail du Vendeur indiquée à l&apos;Article 1 des présentes CGV.</LegalParagraph>
        <LegalParagraph>Le Client est informé qu&apos;il peut en tout état de cause recourir à une médiation conventionnelle, auprès des instances de médiation sectorielles existantes ou à tout mode alternatif de règlement des différends (conciliation, par exemple) en cas de contestation.</LegalParagraph>

        <Box className="bg-primary/5 border border-primary/20 rounded-xl p-4 gap-2">
          <String font="primaryBold" variant="body-sm">Médiateur désigné :</String>
          <LegalBulletItem label="CM2C :" value="49 rue de Ponthieu, 75008 Paris" />
          <String
            variant="body-sm"
            colorVariant="primary"
            onPress={() => Linking.openURL('https://www.cm2c.net/declarer-un-litige.php')}
          >
            www.cm2c.net
          </String>
          <LegalParagraph>Email : litiges@cm2c.net</LegalParagraph>
        </Box>

        <LegalParagraph>Le Client est également informé qu&apos;il peut recourir à la plateforme de Règlement en Ligne des Litiges (RLL) :</LegalParagraph>
        <String
          variant="body-sm"
          colorVariant="primary"
          onPress={() => Linking.openURL('https://webgate.ec.europa.eu/odr/main/index.cfm?event=main.home.show')}
        >
          Plateforme européenne de RLL
        </String>

        <LegalParagraph>Tous les litiges auxquels les opérations d&apos;achat et de vente conclues en application des présentes CGV et qui n&apos;auraient pas fait l&apos;objet d&apos;un règlement amiable entre le vendeur ou par médiation, seront soumis aux tribunaux compétents dans les conditions de droit commun.</LegalParagraph>
      </Box>

    </LegalLayout>
  )
}
