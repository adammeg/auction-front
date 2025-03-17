import Link from "next/link"
import { Search, ArrowRight, HelpCircle, Book, MessageSquare, FileText, Video, Mail, Phone } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

// Common help topics
const commonTopics = [
  {
    title: "Account & Registration",
    icon: <HelpCircle className="h-5 w-5" />,
    description: "Creating an account, profile settings, verification, and security",
    link: "/help/account",
  },
  {
    title: "Bidding & Buying",
    icon: <HelpCircle className="h-5 w-5" />,
    description: "How to bid, payment methods, shipping, and returns",
    link: "/help/buying",
  },
  {
    title: "Selling",
    icon: <HelpCircle className="h-5 w-5" />,
    description: "Creating listings, seller fees, shipping, and payouts",
    link: "/help/selling",
  },
  {
    title: "Authentication",
    icon: <HelpCircle className="h-5 w-5" />,
    description: "Verification process, authenticity guarantees, and reporting fakes",
    link: "/help/authentication",
  },
  {
    title: "Shipping & Delivery",
    icon: <HelpCircle className="h-5 w-5" />,
    description: "Shipping options, tracking, international shipping, and customs",
    link: "/help/shipping",
  },
  {
    title: "Payments & Billing",
    icon: <HelpCircle className="h-5 w-5" />,
    description: "Payment methods, invoices, refunds, and payment issues",
    link: "/help/payments",
  },
]

// Popular FAQs
const popularFAQs = [
  {
    question: "How do I create an account?",
    answer:
      "To create an account, click on the 'Sign Up' button in the top right corner of the homepage. Fill in your details, verify your email address, and you're ready to start bidding or selling on BidMaster.",
  },
  {
    question: "What payment methods are accepted?",
    answer:
      "BidMaster accepts various payment methods including credit/debit cards (Visa, Mastercard, American Express), PayPal, and bank transfers. The available payment methods may vary depending on your location.",
  },
  {
    question: "How do I place a bid?",
    answer:
      "To place a bid, navigate to the auction page of the item you're interested in. Enter your bid amount in the bidding box, which must be at least the current bid plus the minimum increment. You can also set a maximum bid and our system will automatically bid for you up to that amount.",
  },
  {
    question: "What happens if I win an auction?",
    answer:
      "When you win an auction, you'll receive a notification via email and in your BidMaster account. You'll then need to complete the payment for the item within the specified timeframe (usually 3 days). Once payment is confirmed, the seller will ship the item to you.",
  },
  {
    question: "How do I track my order?",
    answer:
      "You can track your order by going to your account dashboard and selecting 'Purchases'. Click on the specific order to view its status and tracking information, if available. You'll also receive email updates when your order ships with tracking details.",
  },
]

export default function HelpCenterPage() {
  return (
    <div className="container px-4 py-8 md:px-6 md:py-12">
      <div className="space-y-12">
        <div className="space-y-4 text-center">
          <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Help Center</h1>
          <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
            Find answers, guides, and support for all your BidMaster questions
          </p>

          <div className="mx-auto mt-6 max-w-2xl">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
              <Input placeholder="Search for help articles..." className="pl-10 py-6 text-lg" />
              <Button className="absolute right-1 top-1">Search</Button>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <h2 className="text-2xl font-bold tracking-tighter">Browse Help Topics</h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {commonTopics.map((topic, index) => (
              <Card key={index} className="overflow-hidden">
                <Link href={topic.link}>
                  <CardContent className="p-6">
                    <div className="flex flex-col items-start gap-2">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                        {topic.icon}
                      </div>
                      <h3 className="text-xl font-bold">{topic.title}</h3>
                      <p className="text-sm text-muted-foreground">{topic.description}</p>
                      <Button variant="link" className="p-0">
                        Learn more
                        <ArrowRight className="ml-1 h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Link>
              </Card>
            ))}
          </div>
        </div>

        <div className="space-y-4">
          <h2 className="text-2xl font-bold tracking-tighter">Popular FAQs</h2>
          <Accordion type="single" collapsible className="w-full">
            {popularFAQs.map((faq, index) => (
              <AccordionItem key={index} value={`faq-${index}`}>
                <AccordionTrigger>{faq.question}</AccordionTrigger>
                <AccordionContent>{faq.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
          <div className="flex justify-center mt-4">
            <Link href="/faq">
              <Button variant="outline">
                View All FAQs
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardContent className="p-6">
              <div className="flex flex-col items-start gap-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                  <Book className="h-5 w-5 text-primary" />
                </div>
                <h3 className="text-xl font-bold">Guides & Tutorials</h3>
                <p className="text-muted-foreground">
                  Step-by-step guides and tutorials to help you navigate BidMaster like a pro.
                </p>
                <div className="space-y-2 w-full">
                  <Link
                    href="/help/guides/bidding-guide"
                    className="flex items-center justify-between rounded-md p-2 hover:bg-muted"
                  >
                    <span>Complete Bidding Guide</span>
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                  <Link
                    href="/help/guides/seller-guide"
                    className="flex items-center justify-between rounded-md p-2 hover:bg-muted"
                  >
                    <span>Seller Success Guide</span>
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                  <Link
                    href="/help/guides/authentication"
                    className="flex items-center justify-between rounded-md p-2 hover:bg-muted"
                  >
                    <span>Authentication Process</span>
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
                <Button variant="outline" className="w-full">
                  View All Guides
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex flex-col items-start gap-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                  <Video className="h-5 w-5 text-primary" />
                </div>
                <h3 className="text-xl font-bold">Video Tutorials</h3>
                <p className="text-muted-foreground">
                  Watch our video tutorials to learn how to use BidMaster features.
                </p>
                <div className="space-y-2 w-full">
                  <Link
                    href="/help/videos/getting-started"
                    className="flex items-center justify-between rounded-md p-2 hover:bg-muted"
                  >
                    <span>Getting Started with BidMaster</span>
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                  <Link
                    href="/help/videos/bidding-strategies"
                    className="flex items-center justify-between rounded-md p-2 hover:bg-muted"
                  >
                    <span>Effective Bidding Strategies</span>
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                  <Link
                    href="/help/videos/creating-listings"
                    className="flex items-center justify-between rounded-md p-2 hover:bg-muted"
                  >
                    <span>Creating Attractive Listings</span>
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
                <Button variant="outline" className="w-full">
                  View All Videos
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          <Card>
            <CardContent className="p-6">
              <div className="flex flex-col items-start gap-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                  <MessageSquare className="h-5 w-5 text-primary" />
                </div>
                <h3 className="text-xl font-bold">Live Chat</h3>
                <p className="text-muted-foreground">
                  Chat with our support team in real-time for immediate assistance.
                </p>
                <p className="text-sm">Available Monday-Friday, 9am-5pm EST</p>
                <Button className="w-full">Start Chat</Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex flex-col items-start gap-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                  <Mail className="h-5 w-5 text-primary" />
                </div>
                <h3 className="text-xl font-bold">Email Support</h3>
                <p className="text-muted-foreground">Send us an email and we'll get back to you within 24 hours.</p>
                <p className="text-sm">support@bidmaster.com</p>
                <Link href="/contact">
                  <Button variant="outline" className="w-full">
                    Contact Form
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex flex-col items-start gap-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                  <Phone className="h-5 w-5 text-primary" />
                </div>
                <h3 className="text-xl font-bold">Phone Support</h3>
                <p className="text-muted-foreground">Call us directly for urgent matters or complex issues.</p>
                <p className="text-sm">+1 (800) 123-4567</p>
                <p className="text-xs text-muted-foreground">Monday-Friday, 9am-5pm EST</p>
                <Button variant="outline" className="w-full">
                  Request Callback
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-4">
          <h2 className="text-2xl font-bold tracking-tighter">Help Resources</h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <Link href="/terms">
              <Card className="h-full">
                <CardContent className="flex h-full flex-col items-center justify-center p-6 text-center">
                  <FileText className="mb-2 h-8 w-8 text-primary" />
                  <h3 className="font-bold">Terms of Service</h3>
                </CardContent>
              </Card>
            </Link>
            <Link href="/privacy">
              <Card className="h-full">
                <CardContent className="flex h-full flex-col items-center justify-center p-6 text-center">
                  <FileText className="mb-2 h-8 w-8 text-primary" />
                  <h3 className="font-bold">Privacy Policy</h3>
                </CardContent>
              </Card>
            </Link>
            <Link href="/help/shipping-policy">
              <Card className="h-full">
                <CardContent className="flex h-full flex-col items-center justify-center p-6 text-center">
                  <FileText className="mb-2 h-8 w-8 text-primary" />
                  <h3 className="font-bold">Shipping Policy</h3>
                </CardContent>
              </Card>
            </Link>
            <Link href="/help/returns-policy">
              <Card className="h-full">
                <CardContent className="flex h-full flex-col items-center justify-center p-6 text-center">
                  <FileText className="mb-2 h-8 w-8 text-primary" />
                  <h3 className="font-bold">Returns Policy</h3>
                </CardContent>
              </Card>
            </Link>
          </div>
        </div>

        <div className="rounded-xl bg-muted p-8 text-center">
          <div className="mx-auto max-w-[700px] space-y-4">
            <h2 className="text-2xl font-bold tracking-tighter">Still Need Help?</h2>
            <p className="text-muted-foreground">
              If you couldn't find what you're looking for, our support team is here to help you with any questions or
              concerns.
            </p>
            <Link href="/contact">
              <Button size="lg" className="mt-4">
                Contact Support
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

