"use client"

import { useState } from "react"
import Link from "next/link"
import { Search, ArrowRight } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

// Données FAQ organisées par catégorie
const faqData = {
  general: [
    {
      question: "Qu'est-ce qu'EnchèrePro ?",
      answer:
        "EnchèrePro est une plateforme d'enchères en ligne qui connecte acheteurs et vendeurs d'articles uniques dans diverses catégories, notamment l'art, les objets de collection, les montres, les bijoux et bien plus encore. Nous fournissons un environnement sécurisé pour enchérir et vendre des articles à un public mondial.",
    },
    {
      question: "Comment créer un compte ?",
      answer:
        "Pour créer un compte, cliquez sur le bouton 'Inscription' dans le coin supérieur droit de la page d'accueil. Remplissez vos coordonnées, vérifiez votre adresse e-mail, et vous êtes prêt à commencer à enchérir ou à vendre sur EnchèrePro.",
    },
    {
      question: "EnchèrePro est-il disponible à l'international ?",
      answer:
        "Oui, EnchèrePro est disponible pour les utilisateurs du monde entier. Nous prenons en charge les expéditions internationales et avons des vendeurs et des acheteurs de plus de 50 pays. Veuillez noter que les frais d'expédition et les droits d'importation peuvent varier en fonction de votre emplacement.",
    },
    {
      question: "Quelles catégories d'articles puis-je trouver sur EnchèrePro ?",
      answer:
        "EnchèrePro propose une large gamme de catégories, notamment Montres & Bijoux, Art & Collections, Véhicules, Livres & Manuscrits, Électronique, Mode, Maison & Jardin, Jouets & Loisirs, Musique & Audio, et bien d'autres. Nous élargissons constamment nos catégories pour répondre aux intérêts de notre communauté.",
    },
  ],
  bidding: [
    {
      question: "Comment fonctionnent les enchères ?",
      answer:
        "Enchérir sur EnchèrePro est simple. Parcourez les enchères, trouvez un article qui vous intéresse et placez une enchère qui atteint ou dépasse l'enchère actuelle plus l'incrément minimum. Si vous êtes le plus offrant à la fin de l'enchère, vous remportez l'article. Vous pouvez également définir une enchère maximale et notre système enchérira automatiquement pour vous jusqu'à ce montant.",
    },
    {
      question: "Qu'est-ce que l'enchère automatique ?",
      answer:
        "L'enchère automatique vous permet de définir un montant maximum que vous êtes prêt à payer pour un article. Notre système placera alors automatiquement des enchères en votre nom, en augmentant votre enchère uniquement autant que nécessaire pour maintenir votre position d'enchérisseur le plus élevé, jusqu'à votre montant maximum.",
    },
    {
      question: "Que se passe-t-il si je remporte une enchère ?",
      answer:
        "Félicitations ! Lorsque vous remportez une enchère, vous recevrez une notification par e-mail et dans votre compte EnchèrePro. Vous devrez ensuite effectuer le paiement de l'article dans le délai spécifié (généralement 3 jours). Une fois le paiement confirmé, le vendeur expédiera l'article.",
    },
    {
      question: "Puis-je retirer une enchère ?",
      answer:
        "En général, les enchères sont contraignantes et ne peuvent pas être retirées. Cependant, dans des circonstances exceptionnelles (par exemple, si la description de l'article a été considérablement déformée), vous pouvez contacter notre équipe d'assistance client qui examinera votre demande au cas par cas.",
    },
  ],
  selling: [
    {
      question: "Comment commencer à vendre sur EnchèrePro ?",
      answer:
        "Pour commencer à vendre, vous devez créer un compte vendeur. Une fois votre compte vérifié, vous pouvez créer des annonces d'enchères en cliquant sur 'Créer une Enchère' dans votre tableau de bord. Remplissez les détails de votre article, téléchargez des photos de haute qualité, définissez votre enchère de départ et la durée de l'enchère, puis publiez votre annonce.",
    },
    {
      question: "Quels frais EnchèrePro facture-t-il aux vendeurs ?",
      answer:
        "EnchèrePro facture des frais d'annonce et des frais de valeur finale. Les frais d'annonce sont un petit montant forfaitaire facturé lorsque vous créez une enchère. Les frais de valeur finale sont un pourcentage du prix de vente final, facturés uniquement lorsque votre article est vendu. La structure exacte des frais se trouve dans notre Politique Vendeur.",
    },
    {
      question: "Comment suis-je payé lorsque mon article est vendu ?",
      answer:
        "Lorsque votre article est vendu et que l'acheteur effectue le paiement, les fonds seront conservés dans votre compte EnchèrePro. Après une brève période de détention (généralement 3 jours après la livraison confirmée), vous pouvez retirer les fonds sur votre compte bancaire lié ou votre compte PayPal.",
    },
    {
      question: "Quels articles sont interdits à la vente sur EnchèrePro ?",
      answer:
        "EnchèrePro interdit la vente d'articles illégaux, de contrefaçons, de matières dangereuses, d'armes, d'animaux vivants et de contenu pour adultes, entre autres. Veuillez consulter notre liste complète d'articles interdits dans nos Conditions d'Utilisation avant de publier une annonce.",
    },
  ],
  payment: [
    {
      question: "Quels moyens de paiement sont acceptés ?",
      answer:
        "EnchèrePro accepte divers moyens de paiement, notamment les cartes de crédit/débit (Visa, Mastercard, American Express), PayPal et les virements bancaires. Les méthodes de paiement disponibles peuvent varier en fonction de votre emplacement.",
    },
    {
      question: "Mes informations de paiement sont-elles sécurisées ?",
      answer:
        "Oui, EnchèrePro utilise un cryptage et des mesures de sécurité conformes aux normes de l'industrie pour protéger vos informations de paiement. Nous ne stockons pas vos coordonnées complètes de carte de crédit sur nos serveurs. Tout le traitement des paiements est géré par des processeurs de paiement tiers de confiance.",
    },
    {
      question: "Quand dois-je payer après avoir remporté une enchère ?",
      answer:
        "Vous êtes tenu d'effectuer le paiement dans les 3 jours (72 heures) suivant la fin de l'enchère. Le non-paiement dans ce délai peut entraîner l'annulation de la vente et d'éventuelles restrictions de compte.",
    },
    {
      question: "Puis-je obtenir un remboursement si l'article n'est pas conforme à sa description ?",
      answer:
        "Si vous recevez un article qui diffère considérablement de sa description, vous pouvez être éligible à un remboursement. Contactez d'abord le vendeur pour résoudre le problème. Si vous ne parvenez pas à trouver une solution, vous pouvez ouvrir un litige via notre Centre de Résolution dans les 7 jours suivant la réception de l'article.",
    },
  ],
  shipping: [
    {
      question: "Qui est responsable de l'expédition ?",
      answer:
        "Le vendeur est responsable de l'emballage et de l'expédition de l'article à l'acheteur. Les frais d'expédition sont généralement payés par l'acheteur et doivent être clairement indiqués dans l'annonce de l'enchère avant d'enchérir.",
    },
    {
      question: "Combien de temps prend l'expédition ?",
      answer:
        "Les délais d'expédition varient en fonction de l'emplacement du vendeur, de votre emplacement et du mode d'expédition choisi. L'expédition nationale prend généralement 3 à 7 jours ouvrables, tandis que l'expédition internationale peut prendre 1 à 4 semaines. Les vendeurs sont tenus d'expédier les articles dans les 3 jours ouvrables suivant la réception du paiement.",
    },
    {
      question: "Proposez-vous l'expédition internationale ?",
      answer:
        "EnchèrePro prend en charge l'expédition internationale, mais c'est aux vendeurs individuels de préciser dans quels pays ils expédient. Les frais d'expédition internationaux, les droits d'importation et les taxes sont généralement à la charge de l'acheteur.",
    },
    {
      question: "Que faire si mon article arrive endommagé ?",
      answer:
        "Si votre article arrive endommagé, prenez des photos des dommages et de l'emballage, et contactez immédiatement le vendeur. Si le vendeur ne résout pas le problème de manière satisfaisante, vous pouvez ouvrir un litige via notre Centre de Résolution dans les 7 jours suivant la réception de l'article.",
    },
  ],
  account: [
    {
      question: "Comment réinitialiser mon mot de passe ?",
      answer:
        "Pour réinitialiser votre mot de passe, cliquez sur le bouton 'Connexion', puis sélectionnez 'Mot de passe oublié ?'. Entrez votre adresse e-mail, et nous vous enverrons un lien de réinitialisation du mot de passe. Suivez les instructions dans l'e-mail pour créer un nouveau mot de passe.",
    },
    {
      question: "Comment modifier mes informations de compte ?",
      answer:
        "Vous pouvez mettre à jour vos informations de compte en vous connectant et en accédant à vos paramètres de compte. De là, vous pouvez modifier vos informations de profil, changer votre mot de passe, mettre à jour votre adresse d'expédition et gérer vos méthodes de paiement.",
    },
    {
      question: "Puis-je avoir plusieurs comptes ?",
      answer:
        "Non, la politique d'EnchèrePro n'autorise qu'un seul compte par utilisateur. Avoir plusieurs comptes peut entraîner la suspension du compte. Si vous avez besoin d'utiliser EnchèrePro à des fins personnelles et professionnelles, veuillez contacter notre équipe d'assistance pour obtenir de l'aide.",
    },
    {
      question: "Comment supprimer mon compte ?",
      answer:
        "Pour supprimer votre compte, accédez à vos paramètres de compte et sélectionnez 'Fermer le compte'. Veuillez noter que vous ne pouvez pas supprimer votre compte si vous avez des enchères actives, des articles invendus ou des paiements en attente. Toutes les fermetures de compte sont examinées par notre équipe avant d'être traitées.",
    },
  ],
}

export default function FAQPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [activeTab, setActiveTab] = useState("general")

  // Filtrer les FAQ en fonction de la requête de recherche
  const filteredFAQs = searchQuery
    ? Object.values(faqData)
        .flat()
        .filter(
          (faq) =>
            faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
            faq.answer.toLowerCase().includes(searchQuery.toLowerCase()),
        )
    : []

  return (
    <div className="container px-4 py-8 md:px-6 md:py-12">
      <div className="space-y-8">
        <div className="space-y-4 text-center">
          <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Foire Aux Questions</h1>
          <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
            Trouvez des réponses aux questions courantes sur l'utilisation d'EnchèrePro
          </p>
        </div>

        <div className="mx-auto max-w-2xl">
          <div className="relative">
            <Search className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
            <Input
              placeholder="Rechercher des réponses..."
              className="pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          {searchQuery && (
            <div className="mt-6 space-y-4">
              <h2 className="text-xl font-semibold">Résultats de Recherche</h2>
              {filteredFAQs.length === 0 ? (
                <p className="text-muted-foreground">
                  Aucun résultat trouvé. Essayez un terme de recherche différent ou parcourez les catégories ci-dessous.
                </p>
              ) : (
                <Accordion type="single" collapsible className="w-full">
                  {filteredFAQs.map((faq, index) => (
                    <AccordionItem key={index} value={`search-${index}`}>
                      <AccordionTrigger>{faq.question}</AccordionTrigger>
                      <AccordionContent>{faq.answer}</AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              )}
            </div>
          )}
        </div>

        {!searchQuery && (
          <div className="mx-auto max-w-3xl">
            <Tabs defaultValue="general" value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="grid w-full grid-cols-3 md:grid-cols-6">
                <TabsTrigger value="general">Général</TabsTrigger>
                <TabsTrigger value="bidding">Enchères</TabsTrigger>
                <TabsTrigger value="selling">Vente</TabsTrigger>
                <TabsTrigger value="payment">Paiement</TabsTrigger>
                <TabsTrigger value="shipping">Expédition</TabsTrigger>
                <TabsTrigger value="account">Compte</TabsTrigger>
              </TabsList>

              {Object.entries(faqData).map(([category, faqs]) => (
                <TabsContent key={category} value={category} className="mt-6">
                  <Accordion type="single" collapsible className="w-full">
                    {faqs.map((faq, index) => (
                      <AccordionItem key={index} value={`${category}-${index}`}>
                        <AccordionTrigger>{faq.question}</AccordionTrigger>
                        <AccordionContent>{faq.answer}</AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </TabsContent>
              ))}
            </Tabs>
          </div>
        )}

        <div className="mx-auto max-w-2xl rounded-xl bg-muted p-6 text-center">
          <h2 className="text-xl font-semibold">Vous avez encore des questions ?</h2>
          <p className="mt-2 text-muted-foreground">
            Si vous n'avez pas trouvé la réponse que vous cherchiez, notre équipe d'assistance est là pour vous aider.
          </p>
          <div className="mt-4 flex justify-center gap-4">
            <Link href="/contact">
              <Button>
                Contacter le Support
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

