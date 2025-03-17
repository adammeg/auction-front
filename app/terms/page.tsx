import Link from "next/link"
import { ArrowRight } from "lucide-react"

import { Button } from "@/components/ui/button"

export default function TermsPage() {
  return (
    <div className="container px-4 py-8 md:px-6 md:py-12">
      <div className="mx-auto max-w-3xl space-y-8">
        <div className="space-y-4">
          <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl">Terms of Service</h1>
          <p className="text-muted-foreground">Last updated: March 1, 2025</p>
        </div>

        <div className="prose prose-gray max-w-none dark:prose-invert">
          <p>
            Welcome to BidMaster. These Terms of Service ("Terms") govern your access to and use of the BidMaster
            website, services, and applications (collectively, the "Service"). Please read these Terms carefully before
            using the Service.
          </p>

          <h2>1. Acceptance of Terms</h2>
          <p>
            By accessing or using the Service, you agree to be bound by these Terms and our Privacy Policy. If you do
            not agree to these Terms, you may not access or use the Service.
          </p>

          <h2>2. Eligibility</h2>
          <p>
            You must be at least 18 years old to use the Service. By using the Service, you represent and warrant that
            you are at least 18 years old and have the legal capacity to enter into these Terms.
          </p>

          <h2>3. Account Registration</h2>
          <p>
            To access certain features of the Service, you must register for an account. You agree to provide accurate,
            current, and complete information during the registration process and to update such information to keep it
            accurate, current, and complete.
          </p>
          <p>
            You are responsible for safeguarding your account credentials and for all activities that occur under your
            account. You agree to notify us immediately of any unauthorized use of your account.
          </p>

          <h2>4. User Conduct</h2>
          <p>You agree not to:</p>
          <ul>
            <li>
              Use the Service for any illegal purpose or in violation of any local, state, national, or international
              law
            </li>
            <li>
              Violate or encourage others to violate the rights of third parties, including intellectual property rights
            </li>
            <li>
              Post, upload, or distribute any content that is unlawful, defamatory, libelous, inaccurate, or that a
              reasonable person could deem to be objectionable, profane, indecent, pornographic, harassing, threatening,
              hateful, or otherwise inappropriate
            </li>
            <li>Interfere with security-related features of the Service</li>
            <li>Interfere with the operation of the Service or any user's enjoyment of the Service</li>
            <li>Use any robot, spider, crawler, scraper, or other automated means to access the Service</li>
            <li>Attempt to circumvent any technological measure implemented by us to protect the Service</li>
            <li>
              Attempt to decipher, decompile, disassemble, or reverse engineer any of the software used to provide the
              Service
            </li>
          </ul>

          <h2>5. Auctions and Bidding</h2>
          <p>
            5.1 <strong>Binding Bids</strong>: All bids placed on the Service are legally binding offers to purchase the
            item at the bid price.
          </p>
          <p>
            5.2 <strong>Bid Retraction</strong>: In general, bids cannot be retracted. In exceptional circumstances, we
            may, at our sole discretion, allow a bid to be retracted.
          </p>
          <p>
            5.3 <strong>Auction End</strong>: The highest bidder at the end of an auction, provided the reserve price
            (if any) has been met, is obligated to complete the purchase of the item.
          </p>
          <p>
            5.4 <strong>Payment</strong>: Winning bidders must complete payment within 3 days of the auction end unless
            otherwise specified in the listing.
          </p>

          <h2>6. Selling</h2>
          <p>
            6.1 <strong>Listing Accuracy</strong>: Sellers must provide accurate and complete descriptions of items
            listed for auction.
          </p>
          <p>
            6.2 <strong>Prohibited Items</strong>: Sellers may not list illegal items, counterfeit goods, hazardous
            materials, weapons, live animals, or adult content, among other prohibited items.
          </p>
          <p>
            6.3 <strong>Fees</strong>: Sellers agree to pay all applicable fees, including listing fees and final value
            fees, as outlined in our Fee Schedule.
          </p>
          <p>
            6.4 <strong>Shipping</strong>: Sellers are responsible for shipping items to buyers within the timeframe
            specified in the listing.
          </p>

          <h2>7. Intellectual Property</h2>
          <p>
            The Service and its original content, features, and functionality are owned by BidMaster and are protected
            by international copyright, trademark, patent, trade secret, and other intellectual property or proprietary
            rights laws.
          </p>

          <h2>8. User Content</h2>
          <p>
            You retain all rights in any content you submit, post, or display on or through the Service. By submitting,
            posting, or displaying content on or through the Service, you grant us a worldwide, non-exclusive,
            royalty-free license to use, reproduce, modify, adapt, publish, translate, create derivative works from,
            distribute, and display such content in any media.
          </p>

          <h2>9. Termination</h2>
          <p>
            We may terminate or suspend your account and bar access to the Service immediately, without prior notice or
            liability, under our sole discretion, for any reason whatsoever, including but not limited to a breach of
            the Terms.
          </p>

          <h2>10. Limitation of Liability</h2>
          <p>
            In no event shall BidMaster, its directors, employees, partners, agents, suppliers, or affiliates, be liable
            for any indirect, incidental, special, consequential, or punitive damages, including without limitation,
            loss of profits, data, use, goodwill, or other intangible losses, resulting from your access to or use of or
            inability to access or use the Service.
          </p>

          <h2>11. Governing Law</h2>
          <p>
            These Terms shall be governed and construed in accordance with the laws of [Your Jurisdiction], without
            regard to its conflict of law provisions.
          </p>

          <h2>12. Changes to Terms</h2>
          <p>
            We reserve the right, at our sole discretion, to modify or replace these Terms at any time. If a revision is
            material, we will provide at least 30 days' notice prior to any new terms taking effect. What constitutes a
            material change will be determined at our sole discretion.
          </p>

          <h2>13. Contact Us</h2>
          <p>If you have any questions about these Terms, please contact us at legal@bidmaster.com.</p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 pt-6">
          <Link href="/privacy">
            <Button variant="outline">
              Privacy Policy
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
          <Link href="/contact">
            <Button variant="outline">
              Contact Us
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}

