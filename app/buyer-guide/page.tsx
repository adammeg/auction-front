import Image from "next/image"
import Link from "next/link"
import { ArrowRight, CheckCircle, AlertCircle, HelpCircle } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function BuyerGuidePage() {
  return (
    <div className="container px-4 py-8 md:px-6 md:py-12">
      <div className="space-y-12">
        <div className="space-y-4 text-center">
          <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Buyer Guide</h1>
          <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
            Everything you need to know to find and win auctions on BidMaster
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 items-center">
          <div className="space-y-4">
            <h2 className="text-3xl font-bold tracking-tighter">Why Buy on BidMaster?</h2>
            <div className="space-y-4 text-muted-foreground">
              <p>
                BidMaster connects you with unique items from sellers around the world, offering an exciting auction
                experience where you can discover treasures and build your collections.
              </p>
              <p>
                Whether you're a seasoned collector or new to online auctions, our platform provides the tools and
                protections you need to bid with confidence and find items you'll love.
              </p>
            </div>
            <div className="space-y-2 pt-2">
              <div className="flex items-start gap-2">
                <CheckCircle className="mt-0.5 h-5 w-5 text-primary flex-shrink-0" />
                <span>Discover unique and rare items not found elsewhere</span>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle className="mt-0.5 h-5 w-5 text-primary flex-shrink-0" />
                <span>Secure payment processing and buyer protection</span>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle className="mt-0.5 h-5 w-5 text-primary flex-shrink-0" />
                <span>Verified sellers and detailed item descriptions</span>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle className="mt-0.5 h-5 w-5 text-primary flex-shrink-0" />
                <span>Exciting bidding experience with the thrill of winning</span>
              </div>
            </div>
            <div className="pt-4">
              <Link href="/auctions">
                <Button size="lg">
                  Start Browsing
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
          <div className="relative aspect-video overflow-hidden rounded-xl">
            <Image
              src="/placeholder.svg?height=720&width=1280"
              alt="Person bidding on auction items"
              width={1280}
              height={720}
              className="object-cover"
              priority
            />
          </div>
        </div>

        <div className="space-y-4 text-center">
          <h2 className="text-3xl font-bold tracking-tighter">Getting Started in 4 Simple Steps</h2>
          <p className="mx-auto max-w-[700px] text-muted-foreground">
            Follow these steps to begin your buying journey on BidMaster
          </p>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4 mt-8">
            <Card>
              <CardContent className="pt-6">
                <div className="flex flex-col items-center space-y-2 text-center">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                    <span className="text-xl font-bold text-primary">1</span>
                  </div>
                  <h3 className="text-xl font-bold">Create an Account</h3>
                  <p className="text-muted-foreground">
                    Sign up for a BidMaster account and complete your profile information.
                  </p>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="flex flex-col items-center space-y-2 text-center">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                    <span className="text-xl font-bold text-primary">2</span>
                  </div>
                  <h3 className="text-xl font-bold">Browse Auctions</h3>
                  <p className="text-muted-foreground">
                    Explore categories, use search filters, and find items that interest you.
                  </p>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="flex flex-col items-center space-y-2 text-center">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                    <span className="text-xl font-bold text-primary">3</span>
                  </div>
                  <h3 className="text-xl font-bold">Place Bids</h3>
                  <p className="text-muted-foreground">
                    Enter your maximum bid amount and let our system automatically bid for you.
                  </p>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="flex flex-col items-center space-y-2 text-center">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                    <span className="text-xl font-bold text-primary">4</span>
                  </div>
                  <h3 className="text-xl font-bold">Win & Pay</h3>
                  <p className="text-muted-foreground">
                    Complete payment for items you win and wait for delivery from the seller.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        <div className="space-y-6">
          <h2 className="text-3xl font-bold tracking-tighter text-center">Bidding Strategies</h2>

          <Tabs defaultValue="basics">
            <TabsList className="grid w-full grid-cols-2 md:grid-cols-4">
              <TabsTrigger value="basics">Bidding Basics</TabsTrigger>
              <TabsTrigger value="strategies">Smart Strategies</TabsTrigger>
              <TabsTrigger value="timing">Timing Your Bids</TabsTrigger>
              <TabsTrigger value="winning">Winning Tips</TabsTrigger>
            </TabsList>

            <TabsContent value="basics" className="mt-6">
              <div className="grid gap-6 md:grid-cols-2 items-center">
                <div className="space-y-4">
                  <h3 className="text-2xl font-bold">Bidding Basics</h3>
                  <div className="space-y-4 text-muted-foreground">
                    <p>
                      Understanding how bidding works on BidMaster will help you participate effectively in auctions and
                      increase your chances of winning items you want.
                    </p>
                    <ul className="space-y-2">
                      <li className="flex items-start gap-2">
                        <CheckCircle className="mt-0.5 h-5 w-5 text-primary flex-shrink-0" />
                        <span>Enter your maximum bid - the highest amount you're willing to pay</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="mt-0.5 h-5 w-5 text-primary flex-shrink-0" />
                        <span>Our system will automatically bid incrementally on your behalf</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="mt-0.5 h-5 w-5 text-primary flex-shrink-0" />
                        <span>You'll only pay the minimum amount needed to outbid others</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="mt-0.5 h-5 w-5 text-primary flex-shrink-0" />
                        <span>You'll receive notifications when you're outbid</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="mt-0.5 h-5 w-5 text-primary flex-shrink-0" />
                        <span>All bids are binding - you're committing to buy if you win</span>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="relative aspect-square overflow-hidden rounded-xl bg-muted p-6">
                  <div className="space-y-6">
                    <div>
                      <h4 className="font-bold">Example: How Automatic Bidding Works</h4>
                      <div className="mt-4 space-y-3 text-sm">
                        <div className="rounded-md bg-background p-3">
                          <p>
                            <strong>Current bid:</strong> $100
                          </p>
                          <p>
                            <strong>Minimum increment:</strong> $10
                          </p>
                          <p>
                            <strong>You enter maximum bid:</strong> $150
                          </p>
                        </div>
                        <div className="rounded-md bg-background p-3">
                          <p>
                            <strong>System places bid:</strong> $110 on your behalf
                          </p>
                          <p>
                            <strong>Another bidder bids:</strong> $120
                          </p>
                          <p>
                            <strong>System automatically bids:</strong> $130 for you
                          </p>
                        </div>
                        <div className="rounded-md bg-background p-3">
                          <p>
                            <strong>Another bidder bids:</strong> $160
                          </p>
                          <p>
                            <strong>Result:</strong> You're outbid (above your $150 maximum)
                          </p>
                          <p>
                            <strong>Action:</strong> You receive notification to place a higher bid if desired
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="strategies" className="mt-6">
              <div className="grid gap-6 md:grid-cols-2 items-center">
                <div className="space-y-4">
                  <h3 className="text-2xl font-bold">Smart Bidding Strategies</h3>
                  <div className="space-y-4 text-muted-foreground">
                    <p>
                      Developing effective bidding strategies can help you win items at fair prices and avoid overpaying
                      in the excitement of an auction.
                    </p>
                    <ul className="space-y-2">
                      <li className="flex items-start gap-2">
                        <CheckCircle className="mt-0.5 h-5 w-5 text-primary flex-shrink-0" />
                        <span>Research the item's market value before bidding</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="mt-0.5 h-5 w-5 text-primary flex-shrink-0" />
                        <span>Set a firm maximum bid and stick to it</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="mt-0.5 h-5 w-5 text-primary flex-shrink-0" />
                        <span>Use odd numbers in your maximum bid (e.g., $103 instead of $100)</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="mt-0.5 h-5 w-5 text-primary flex-shrink-0" />
                        <span>Watch multiple similar items to compare prices</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="mt-0.5 h-5 w-5 text-primary flex-shrink-0" />
                        <span>Factor in shipping costs when determining your maximum bid</span>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="relative aspect-square overflow-hidden rounded-xl bg-muted p-6">
                  <div className="space-y-6">
                    <div>
                      <h4 className="font-bold">Psychological Factors to Consider</h4>
                      <ul className="mt-4 space-y-3 text-sm">
                        <li className="rounded-md bg-background p-3">
                          <p className="font-medium">Auction Fever</p>
                          <p className="mt-1 text-muted-foreground">
                            The excitement of bidding can lead to emotional decisions. Set your maximum bid before the
                            auction and stick to it.
                          </p>
                        </li>
                        <li className="rounded-md bg-background p-3">
                          <p className="font-medium">Winner's Curse</p>
                          <p className="mt-1 text-muted-foreground">
                            Winning an auction doesn't always mean you got a good deal. Research thoroughly to avoid
                            overpaying.
                          </p>
                        </li>
                        <li className="rounded-md bg-background p-3">
                          <p className="font-medium">Sunk Cost Fallacy</p>
                          <p className="mt-1 text-muted-foreground">
                            Don't continue bidding just because you've already invested time or emotional energy in an
                            auction.
                          </p>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="timing" className="mt-6">
              <div className="grid gap-6 md:grid-cols-2 items-center">
                <div className="space-y-4">
                  <h3 className="text-2xl font-bold">Timing Your Bids</h3>
                  <div className="space-y-4 text-muted-foreground">
                    <p>
                      When you place your bid can be just as important as how much you bid. Different timing strategies
                      can be effective depending on the situation.
                    </p>
                    <ul className="space-y-2">
                      <li className="flex items-start gap-2">
                        <CheckCircle className="mt-0.5 h-5 w-5 text-primary flex-shrink-0" />
                        <span>Early bidding establishes interest but alerts other potential bidders</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="mt-0.5 h-5 w-5 text-primary flex-shrink-0" />
                        <span>Last-minute bidding ("sniping") gives others little time to respond</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="mt-0.5 h-5 w-5 text-primary flex-shrink-0" />
                        <span>Consider time zones when bidding on international auctions</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="mt-0.5 h-5 w-5 text-primary flex-shrink-0" />
                        <span>Weekday evenings often see more bidding activity than other times</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="mt-0.5 h-5 w-5 text-primary flex-shrink-0" />
                        <span>Set reminders for auctions ending soon that you're interested in</span>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="relative aspect-square overflow-hidden rounded-xl bg-muted p-6">
                  <div className="space-y-6">
                    <div>
                      <h4 className="font-bold">Timing Strategies Compared</h4>
                      <div className="mt-4 space-y-3 text-sm">
                        <div className="rounded-md bg-background p-3">
                          <p className="font-medium">Early Bidding</p>
                          <p className="mt-1 text-muted-foreground">
                            <strong>Pros:</strong> Establishes interest, may discourage casual bidders
                          </p>
                          <p className="mt-1 text-muted-foreground">
                            <strong>Cons:</strong> Alerts other bidders, gives them time to plan counter-bids
                          </p>
                          <p className="mt-1 text-muted-foreground">
                            <strong>Best for:</strong> Items with less competition or when you want to gauge interest
                          </p>
                        </div>
                        <div className="rounded-md bg-background p-3">
                          <p className="font-medium">Last-Minute Bidding (Sniping)</p>
                          <p className="mt-1 text-muted-foreground">
                            <strong>Pros:</strong> Gives others little time to respond, may help avoid bidding wars
                          </p>
                          <p className="mt-1 text-muted-foreground">
                            <strong>Cons:</strong> Risk of technical issues or missing the window
                          </p>
                          <p className="mt-1 text-muted-foreground">
                            <strong>Best for:</strong> Popular items with high competition
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="winning" className="mt-6">
              <div className="grid gap-6 md:grid-cols-2 items-center">
                <div className="space-y-4">
                  <h3 className="text-2xl font-bold">Winning Tips</h3>
                  <div className="space-y-4 text-muted-foreground">
                    <p>
                      These advanced tips can give you an edge in competitive auctions and help you secure the items you
                      want at fair prices.
                    </p>
                    <ul className="space-y-2">
                      <li className="flex items-start gap-2">
                        <CheckCircle className="mt-0.5 h-5 w-5 text-primary flex-shrink-0" />
                        <span>
                          Look for auctions with poor titles or descriptions - they often attract fewer bidders
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="mt-0.5 h-5 w-5 text-primary flex-shrink-0" />
                        <span>Check seller ratings and reviews before bidding</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="mt-0.5 h-5 w-5 text-primary flex-shrink-0" />
                        <span>Ask questions about the item before bidding if anything is unclear</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="mt-0.5 h-5 w-5 text-primary flex-shrink-0" />
                        <span>Consider bidding on similar but less popular alternatives</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="mt-0.5 h-5 w-5 text-primary flex-shrink-0" />
                        <span>Use the "Watch" feature to track items without revealing your interest</span>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="relative aspect-square overflow-hidden rounded-xl">
                  <Image
                    src="/placeholder.svg?height=600&width=600"
                    alt="Successful bidding strategy"
                    width={600}
                    height={600}
                    className="object-cover"
                  />
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>

        <div className="space-y-4">
          <h2 className="text-3xl font-bold tracking-tighter text-center">Buyer Protection & Safety</h2>
          <p className="mx-auto max-w-[700px] text-center text-muted-foreground">
            How we keep you safe when buying on BidMaster
          </p>

          <div className="mt-8 grid gap-6 md:grid-cols-2">
            <Card>
              <CardContent className="p-6">
                <div className="space-y-4">
                  <h3 className="text-xl font-bold">Buyer Protection</h3>
                  <p className="text-muted-foreground">
                    BidMaster offers comprehensive buyer protection to ensure a safe and satisfying auction experience:
                  </p>
                  <div className="space-y-4 mt-4">
                    <div className="rounded-lg border p-4">
                      <h4 className="font-bold">Item Not as Described Protection</h4>
                      <p className="text-sm text-muted-foreground mt-1">
                        If you receive an item that significantly differs from its description, you can request a return
                        and refund within 7 days of delivery.
                      </p>
                    </div>
                    <div className="rounded-lg border p-4">
                      <h4 className="font-bold">Non-Delivery Protection</h4>
                      <p className="text-sm text-muted-foreground mt-1">
                        If you don't receive your item or it arrives significantly damaged due to poor packaging, you're
                        eligible for a full refund.
                      </p>
                    </div>
                    <div className="rounded-lg border p-4">
                      <h4 className="font-bold">Authenticity Guarantee</h4>
                      <p className="text-sm text-muted-foreground mt-1">
                        For eligible categories (luxury watches, designer items, etc.), we offer an authenticity
                        guarantee. If an item is found to be counterfeit, you'll receive a full refund.
                      </p>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    To be eligible for buyer protection, always complete payment through BidMaster's secure payment
                    system and keep all communication on the platform.
                  </p>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <div className="space-y-4">
                  <h3 className="text-xl font-bold">Safety Tips</h3>
                  <p className="text-muted-foreground">
                    Follow these best practices to ensure a safe buying experience:
                  </p>
                  <div className="space-y-4 mt-4">
                    <div className="rounded-lg border p-4">
                      <h4 className="font-bold">Before Bidding</h4>
                      <ul className="mt-2 space-y-2 text-sm text-muted-foreground">
                        <li className="flex items-start gap-2">
                          <AlertCircle className="mt-0.5 h-4 w-4 text-primary flex-shrink-0" />
                          <span>Research the item thoroughly and check market value</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <AlertCircle className="mt-0.5 h-4 w-4 text-primary flex-shrink-0" />
                          <span>Review the seller's rating, feedback, and history</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <AlertCircle className="mt-0.5 h-4 w-4 text-primary flex-shrink-0" />
                          <span>Read the item description carefully, including condition notes</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <AlertCircle className="mt-0.5 h-4 w-4 text-primary flex-shrink-0" />
                          <span>Check shipping costs and delivery timeframes</span>
                        </li>
                      </ul>
                    </div>
                    <div className="rounded-lg border p-4">
                      <h4 className="font-bold">After Winning</h4>
                      <ul className="mt-2 space-y-2 text-sm text-muted-foreground">
                        <li className="flex items-start gap-2">
                          <AlertCircle className="mt-0.5 h-4 w-4 text-primary flex-shrink-0" />
                          <span>Always pay through BidMaster's secure payment system</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <AlertCircle className="mt-0.5 h-4 w-4 text-primary flex-shrink-0" />
                          <span>Keep all communication on the platform</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <AlertCircle className="mt-0.5 h-4 w-4 text-primary flex-shrink-0" />
                          <span>Document the condition of items upon arrival</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <AlertCircle className="mt-0.5 h-4 w-4 text-primary flex-shrink-0" />
                          <span>Report any issues promptly through our Resolution Center</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    If you encounter any suspicious activity, report it immediately to our Trust & Safety team.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        <div className="space-y-4">
          <h2 className="text-3xl font-bold tracking-tighter text-center">Frequently Asked Questions</h2>

          <div className="mx-auto max-w-3xl mt-6">
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="faq-1">
                <AccordionTrigger>How do I know if an item is authentic?</AccordionTrigger>
                <AccordionContent>
                  BidMaster takes authenticity seriously. For high-value categories like luxury watches, designer items,
                  and collectibles, many sellers provide authentication certificates or detailed provenance information.
                  Additionally, our Authenticity Guarantee program for eligible items ensures that experts verify the
                  item before it reaches you. Always check the seller's ratings and reviews, and don't hesitate to ask
                  questions about an item's authenticity before bidding.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="faq-2">
                <AccordionTrigger>What happens if I win multiple items from the same seller?</AccordionTrigger>
                <AccordionContent>
                  If you win multiple items from the same seller, you can often save on shipping by requesting combined
                  shipping. After winning the auctions, contact the seller through our messaging system to ask about
                  combined shipping options before completing payment. Many sellers are happy to combine shipping to
                  save on packaging and handling costs, and will send you an updated invoice with the adjusted shipping
                  amount.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="faq-3">
                <AccordionTrigger>Can I cancel a bid once it's placed?</AccordionTrigger>
                <AccordionContent>
                  In general, bids on BidMaster are binding and cannot be retracted. However, in exceptional
                  circumstances (such as if you accidentally entered the wrong bid amount or if the item description was
                  significantly changed after you bid), you may request a bid cancellation. To do this, go to the
                  auction page, click on "Contact Seller," and explain your situation. The seller may choose to cancel
                  your bid at their discretion. For serious issues, you can also contact BidMaster customer support.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="faq-4">
                <AccordionTrigger>What payment methods are accepted?</AccordionTrigger>
                <AccordionContent>
                  BidMaster accepts various payment methods including credit/debit cards (Visa, Mastercard, American
                  Express), PayPal, and bank transfers. The available payment methods may vary depending on your
                  location. All payments are processed securely through our platform to ensure buyer and seller
                  protection. We never recommend making payments outside of the BidMaster system, as these transactions
                  would not be covered by our buyer protection policies.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="faq-5">
                <AccordionTrigger>What if my item arrives damaged?</AccordionTrigger>
                <AccordionContent>
                  If your item arrives damaged, take photos of the damage and the packaging immediately. Contact the
                  seller within 48 hours through our messaging system to report the issue. Most sellers will work with
                  you to resolve the situation. If you can't reach a resolution with the seller, you can open a case
                  through our Resolution Center within 7 days of delivery. Provide all documentation including photos,
                  and our team will review your case. If approved, you'll receive instructions for returning the item
                  (if required) and getting a refund.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>

          <div className="flex justify-center mt-6">
            <Link href="/faq">
              <Button variant="outline">
                View All FAQs
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>

        <div className="rounded-xl bg-muted p-8 text-center">
          <div className="mx-auto max-w-[700px] space-y-4">
            <div className="flex justify-center">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                <HelpCircle className="h-6 w-6 text-primary" />
              </div>
            </div>
            <h2 className="text-2xl font-bold tracking-tighter">Ready to Start Bidding?</h2>
            <p className="text-muted-foreground">
              Create your account today and discover unique items from sellers worldwide.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4 pt-4">
              <Link href="/auth/signup">
                <Button size="lg">
                  Create Account
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Link href="/auctions">
                <Button variant="outline" size="lg">
                  Browse Auctions
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

