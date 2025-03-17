import Image from "next/image"
import Link from "next/link"
import { ArrowRight, CheckCircle, DollarSign, Package, Clock, AlertCircle, HelpCircle } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function SellerGuidePage() {
  return (
    <div className="container px-4 py-8 md:px-6 md:py-12">
      <div className="space-y-12">
        <div className="space-y-4 text-center">
          <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Seller Guide</h1>
          <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
            Everything you need to know to become a successful seller on BidMaster
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 items-center">
          <div className="space-y-4">
            <h2 className="text-3xl font-bold tracking-tighter">Why Sell on BidMaster?</h2>
            <div className="space-y-4 text-muted-foreground">
              <p>
                BidMaster connects you with millions of collectors and enthusiasts worldwide, providing a trusted
                platform to sell your unique items through a dynamic auction format.
              </p>
              <p>
                Whether you're an individual seller with a few special items or a professional dealer with an extensive
                inventory, our platform offers the tools and support you need to reach the right buyers and maximize
                your selling potential.
              </p>
            </div>
            <div className="space-y-2 pt-2">
              <div className="flex items-start gap-2">
                <CheckCircle className="mt-0.5 h-5 w-5 text-primary flex-shrink-0" />
                <span>Access to a global audience of qualified buyers</span>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle className="mt-0.5 h-5 w-5 text-primary flex-shrink-0" />
                <span>Secure payment processing and fraud protection</span>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle className="mt-0.5 h-5 w-5 text-primary flex-shrink-0" />
                <span>Dedicated seller support and resources</span>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle className="mt-0.5 h-5 w-5 text-primary flex-shrink-0" />
                <span>Competitive fee structure with no upfront costs</span>
              </div>
            </div>
            <div className="pt-4">
              <Link href="/auth/signup">
                <Button size="lg">
                  Start Selling
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
          <div className="relative aspect-video overflow-hidden rounded-xl">
            <Image
              src="/placeholder.svg?height=720&width=1280"
              alt="Seller preparing items for auction"
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
            Follow these steps to begin your selling journey on BidMaster
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
                    Sign up for a BidMaster account and complete the seller verification process.
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
                  <h3 className="text-xl font-bold">Prepare Your Items</h3>
                  <p className="text-muted-foreground">
                    Take quality photos, write detailed descriptions, and research appropriate pricing.
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
                  <h3 className="text-xl font-bold">Create Listings</h3>
                  <p className="text-muted-foreground">
                    Use our intuitive listing tool to create compelling auction listings for your items.
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
                  <h3 className="text-xl font-bold">Ship & Get Paid</h3>
                  <p className="text-muted-foreground">
                    When your items sell, ship them promptly and receive payment securely through BidMaster.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        <div className="space-y-6">
          <h2 className="text-3xl font-bold tracking-tighter text-center">Seller Best Practices</h2>

          <Tabs defaultValue="photos">
            <TabsList className="grid w-full grid-cols-2 md:grid-cols-4">
              <TabsTrigger value="photos">Photography</TabsTrigger>
              <TabsTrigger value="descriptions">Descriptions</TabsTrigger>
              <TabsTrigger value="pricing">Pricing</TabsTrigger>
              <TabsTrigger value="shipping">Shipping</TabsTrigger>
            </TabsList>

            <TabsContent value="photos" className="mt-6">
              <div className="grid gap-6 md:grid-cols-2 items-center">
                <div className="space-y-4">
                  <h3 className="text-2xl font-bold">Quality Photography</h3>
                  <div className="space-y-4 text-muted-foreground">
                    <p>
                      High-quality photos are essential for successful auctions. They help buyers see exactly what
                      they're bidding on and build trust in your listings.
                    </p>
                    <ul className="space-y-2">
                      <li className="flex items-start gap-2">
                        <CheckCircle className="mt-0.5 h-5 w-5 text-primary flex-shrink-0" />
                        <span>Use good lighting - natural daylight works best</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="mt-0.5 h-5 w-5 text-primary flex-shrink-0" />
                        <span>Take photos from multiple angles</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="mt-0.5 h-5 w-5 text-primary flex-shrink-0" />
                        <span>Include close-ups of important details and any flaws</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="mt-0.5 h-5 w-5 text-primary flex-shrink-0" />
                        <span>Use a clean, simple background</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="mt-0.5 h-5 w-5 text-primary flex-shrink-0" />
                        <span>Include a size reference when appropriate</span>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="relative aspect-square overflow-hidden rounded-xl">
                  <Image
                    src="/placeholder.svg?height=600&width=600"
                    alt="Product photography example"
                    width={600}
                    height={600}
                    className="object-cover"
                  />
                </div>
              </div>
            </TabsContent>

            <TabsContent value="descriptions" className="mt-6">
              <div className="grid gap-6 md:grid-cols-2 items-center">
                <div className="space-y-4">
                  <h3 className="text-2xl font-bold">Compelling Descriptions</h3>
                  <div className="space-y-4 text-muted-foreground">
                    <p>
                      A detailed, honest description helps buyers make informed decisions and reduces the likelihood of
                      returns or disputes.
                    </p>
                    <ul className="space-y-2">
                      <li className="flex items-start gap-2">
                        <CheckCircle className="mt-0.5 h-5 w-5 text-primary flex-shrink-0" />
                        <span>Be thorough - include dimensions, materials, age, and condition</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="mt-0.5 h-5 w-5 text-primary flex-shrink-0" />
                        <span>Highlight unique features and selling points</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="mt-0.5 h-5 w-5 text-primary flex-shrink-0" />
                        <span>Disclose any flaws, damage, or repairs honestly</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="mt-0.5 h-5 w-5 text-primary flex-shrink-0" />
                        <span>Include provenance or history when relevant</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="mt-0.5 h-5 w-5 text-primary flex-shrink-0" />
                        <span>Use keywords that buyers might search for</span>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="relative aspect-square overflow-hidden rounded-xl bg-muted p-6">
                  <div className="space-y-4">
                    <h4 className="font-bold">Example Description</h4>
                    <div className="text-sm text-muted-foreground">
                      <p className="font-medium">Vintage 1960s Omega Seamaster Automatic Watch</p>
                      <p className="mt-2">
                        This elegant Omega Seamaster dates from approximately 1965 and features a stunning silver dial
                        with applied hour markers and date window at 3 o'clock. The stainless steel case measures 35mm
                        in diameter (excluding crown) and has been recently polished.
                      </p>
                      <p className="mt-2">
                        The automatic movement has been serviced by a professional watchmaker in January 2025 and is
                        running well, keeping time to within +/- 10 seconds per day. The watch comes with its original
                        Omega-signed crown and a new leather strap.
                      </p>
                      <p className="mt-2">
                        Condition: Excellent vintage condition with minor signs of age. The dial has developed a subtle
                        patina consistent with its age. There is a small scratch on the crystal at 1 o'clock position
                        (see close-up photo).
                      </p>
                      <p className="mt-2">
                        Includes: Watch only, no box or papers. Will be carefully packaged in a protective travel case.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="pricing" className="mt-6">
              <div className="grid gap-6 md:grid-cols-2 items-center">
                <div className="space-y-4">
                  <h3 className="text-2xl font-bold">Strategic Pricing</h3>
                  <div className="space-y-4 text-muted-foreground">
                    <p>
                      Setting the right starting price and reserve is crucial for attracting bidders and achieving the
                      best final price for your items.
                    </p>
                    <ul className="space-y-2">
                      <li className="flex items-start gap-2">
                        <CheckCircle className="mt-0.5 h-5 w-5 text-primary flex-shrink-0" />
                        <span>Research comparable items that have sold recently</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="mt-0.5 h-5 w-5 text-primary flex-shrink-0" />
                        <span>Set a competitive starting price to attract initial bids</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="mt-0.5 h-5 w-5 text-primary flex-shrink-0" />
                        <span>Use reserve prices judiciously for higher-value items</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="mt-0.5 h-5 w-5 text-primary flex-shrink-0" />
                        <span>Consider seasonal timing for certain categories</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="mt-0.5 h-5 w-5 text-primary flex-shrink-0" />
                        <span>Be transparent about shipping costs</span>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="relative aspect-square overflow-hidden rounded-xl bg-muted p-6">
                  <div className="space-y-6">
                    <div>
                      <h4 className="font-bold">Starting Price Strategies</h4>
                      <ul className="mt-2 space-y-2 text-sm text-muted-foreground">
                        <li className="flex items-start gap-2">
                          <DollarSign className="mt-0.5 h-4 w-4 text-primary flex-shrink-0" />
                          <span>
                            <strong>Low Starting Price:</strong> Attracts more bidders and can create bidding momentum,
                            potentially driving the final price higher.
                          </span>
                        </li>
                        <li className="flex items-start gap-2">
                          <DollarSign className="mt-0.5 h-4 w-4 text-primary flex-shrink-0" />
                          <span>
                            <strong>Value-Based Starting Price:</strong> Starting closer to the item's value may attract
                            fewer bidders but more serious ones.
                          </span>
                        </li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-bold">Reserve Price Considerations</h4>
                      <ul className="mt-2 space-y-2 text-sm text-muted-foreground">
                        <li className="flex items-start gap-2">
                          <AlertCircle className="mt-0.5 h-4 w-4 text-primary flex-shrink-0" />
                          <span>Set reserves only when necessary - many bidders prefer no-reserve auctions</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <AlertCircle className="mt-0.5 h-4 w-4 text-primary flex-shrink-0" />
                          <span>Keep reserves reasonable - too high can discourage bidding</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="shipping" className="mt-6">
              <div className="grid gap-6 md:grid-cols-2 items-center">
                <div className="space-y-4">
                  <h3 className="text-2xl font-bold">Efficient Shipping</h3>
                  <div className="space-y-4 text-muted-foreground">
                    <p>
                      Professional shipping practices lead to positive buyer experiences and good reviews, which help
                      build your reputation as a seller.
                    </p>
                    <ul className="space-y-2">
                      <li className="flex items-start gap-2">
                        <CheckCircle className="mt-0.5 h-5 w-5 text-primary flex-shrink-0" />
                        <span>Ship promptly - within 3 business days of payment</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="mt-0.5 h-5 w-5 text-primary flex-shrink-0" />
                        <span>Package items securely to prevent damage</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="mt-0.5 h-5 w-5 text-primary flex-shrink-0" />
                        <span>Use tracking and insurance for all shipments</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="mt-0.5 h-5 w-5 text-primary flex-shrink-0" />
                        <span>Communicate shipping information to buyers</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="mt-0.5 h-5 w-5 text-primary flex-shrink-0" />
                        <span>Offer international shipping when possible</span>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="relative aspect-square overflow-hidden rounded-xl">
                  <Image
                    src="/placeholder.svg?height=600&width=600"
                    alt="Packaging and shipping example"
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
          <h2 className="text-3xl font-bold tracking-tighter text-center">Seller Fees & Payments</h2>
          <p className="mx-auto max-w-[700px] text-center text-muted-foreground">
            Transparent fee structure and secure payment processing
          </p>

          <div className="mt-8 grid gap-6 md:grid-cols-2">
            <Card>
              <CardContent className="p-6">
                <div className="space-y-4">
                  <h3 className="text-xl font-bold">Fee Structure</h3>
                  <p className="text-muted-foreground">BidMaster charges two main types of fees for sellers:</p>
                  <div className="space-y-4 mt-4">
                    <div className="rounded-lg border p-4">
                      <h4 className="font-bold">Listing Fee</h4>
                      <p className="text-sm text-muted-foreground mt-1">
                        A small flat fee charged when you create an auction listing. This fee varies based on the
                        starting price and category:
                      </p>
                      <ul className="mt-2 space-y-1 text-sm">
                        <li className="flex justify-between">
                          <span>Starting price under $50</span>
                          <span className="font-medium">$1.00</span>
                        </li>
                        <li className="flex justify-between">
                          <span>Starting price $50-$199</span>
                          <span className="font-medium">$2.00</span>
                        </li>
                        <li className="flex justify-between">
                          <span>Starting price $200-$999</span>
                          <span className="font-medium">$5.00</span>
                        </li>
                        <li className="flex justify-between">
                          <span>Starting price $1,000+</span>
                          <span className="font-medium">$10.00</span>
                        </li>
                      </ul>
                    </div>
                    <div className="rounded-lg border p-4">
                      <h4 className="font-bold">Final Value Fee</h4>
                      <p className="text-sm text-muted-foreground mt-1">
                        A percentage of the final selling price, charged only when your item sells. The percentage
                        varies by category:
                      </p>
                      <ul className="mt-2 space-y-1 text-sm">
                        <li className="flex justify-between">
                          <span>General Categories</span>
                          <span className="font-medium">10%</span>
                        </li>
                        <li className="flex justify-between">
                          <span>Electronics</span>
                          <span className="font-medium">8%</span>
                        </li>
                        <li className="flex justify-between">
                          <span>Luxury Watches & Jewelry</span>
                          <span className="font-medium">12%</span>
                        </li>
                        <li className="flex justify-between">
                          <span>Art & Collectibles</span>
                          <span className="font-medium">15%</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Note: Additional fees may apply for premium listing features, such as highlighted listings or
                    featured placement.
                  </p>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <div className="space-y-4">
                  <h3 className="text-xl font-bold">Payment Processing</h3>
                  <p className="text-muted-foreground">
                    BidMaster handles all payment processing to ensure a secure transaction for both buyers and sellers.
                  </p>
                  <div className="space-y-4 mt-4">
                    <div className="rounded-lg border p-4">
                      <h4 className="font-bold">How You Get Paid</h4>
                      <ul className="mt-2 space-y-2 text-sm text-muted-foreground">
                        <li className="flex items-start gap-2">
                          <Clock className="mt-0.5 h-4 w-4 text-primary flex-shrink-0" />
                          <div>
                            <span className="font-medium">Payment Hold Period</span>
                            <p>Funds are held until 3 days after confirmed delivery to protect both parties.</p>
                          </div>
                        </li>
                        <li className="flex items-start gap-2">
                          <Package className="mt-0.5 h-4 w-4 text-primary flex-shrink-0" />
                          <div>
                            <span className="font-medium">Shipping Confirmation</span>
                            <p>Enter tracking information promptly to start the payment process.</p>
                          </div>
                        </li>
                        <li className="flex items-start gap-2">
                          <DollarSign className="mt-0.5 h-4 w-4 text-primary flex-shrink-0" />
                          <div>
                            <span className="font-medium">Payout Methods</span>
                            <p>Receive funds via direct deposit to your bank account or PayPal.</p>
                          </div>
                        </li>
                      </ul>
                    </div>
                    <div className="rounded-lg border p-4">
                      <h4 className="font-bold">Payment Schedule</h4>
                      <p className="text-sm text-muted-foreground mt-1">
                        Once the hold period is complete, funds are released according to this schedule:
                      </p>
                      <ul className="mt-2 space-y-1 text-sm">
                        <li className="flex justify-between">
                          <span>New Sellers (first 90 days)</span>
                          <span className="font-medium">Weekly payouts</span>
                        </li>
                        <li className="flex justify-between">
                          <span>Established Sellers</span>
                          <span className="font-medium">Daily payouts</span>
                        </li>
                        <li className="flex justify-between">
                          <span>High-Volume Sellers</span>
                          <span className="font-medium">Same-day payouts available</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    All payment processing is secure and compliant with industry standards for data protection.
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
                <AccordionTrigger>What can I sell on BidMaster?</AccordionTrigger>
                <AccordionContent>
                  BidMaster supports a wide range of categories including art, collectibles, watches, jewelry,
                  electronics, fashion, home goods, and more. However, there are restrictions on certain items such as
                  counterfeit goods, weapons, live animals, and adult content. Please review our full list of prohibited
                  items in our Terms of Service before listing.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="faq-2">
                <AccordionTrigger>How long do auctions last?</AccordionTrigger>
                <AccordionContent>
                  You can choose an auction duration of 1, 3, 5, 7, or 14 days. For most items, 7 days is recommended to
                  give your listing maximum exposure. For rare or high-value items, longer durations may be beneficial,
                  while for trending or time-sensitive items, shorter durations might create more urgency.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="faq-3">
                <AccordionTrigger>What if my item doesn't sell?</AccordionTrigger>
                <AccordionContent>
                  If your item doesn't sell, you have several options: you can relist it with a lower starting price,
                  improve your photos or description, add more details about the item, or consider offering free
                  shipping. You can also enable the "Best Offer" feature to allow potential buyers to make offers on
                  unsold items.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="faq-4">
                <AccordionTrigger>How do I handle returns?</AccordionTrigger>
                <AccordionContent>
                  As a seller, you can set your own return policy, which should be clearly stated in your listing. If a
                  buyer requests a return because an item was significantly misrepresented, BidMaster may require you to
                  accept the return. For all other cases, your stated return policy will apply. If you do accept a
                  return, the buyer is typically responsible for return shipping costs unless the item was
                  misrepresented.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="faq-5">
                <AccordionTrigger>What if a buyer doesn't pay?</AccordionTrigger>
                <AccordionContent>
                  If a buyer hasn't paid within 3 days of winning an auction, you can open an unpaid item case through
                  our Resolution Center. BidMaster will contact the buyer, and if they still don't pay, you can cancel
                  the transaction and relist the item. The buyer may receive a strike on their account, and multiple
                  strikes can lead to account restrictions.
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
            <h2 className="text-2xl font-bold tracking-tighter">Ready to Start Selling?</h2>
            <p className="text-muted-foreground">
              Create your seller account today and reach millions of potential buyers worldwide.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4 pt-4">
              <Link href="/auth/signup">
                <Button size="lg">
                  Create Seller Account
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Link href="/contact">
                <Button variant="outline" size="lg">
                  Contact Seller Support
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

