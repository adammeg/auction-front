import Link from "next/link"
import { ArrowRight } from "lucide-react"

import { Button } from "@/components/ui/button"

export default function PrivacyPage() {
  return (
    <div className="container px-4 py-8 md:px-6 md:py-12">
      <div className="mx-auto max-w-3xl space-y-8">
        <div className="space-y-4">
          <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl">Privacy Policy</h1>
          <p className="text-muted-foreground">Last updated: March 1, 2025</p>
        </div>

        <div className="prose prose-gray max-w-none dark:prose-invert">
          <p>
            At BidMaster, we take your privacy seriously. This Privacy Policy explains how we collect, use, disclose,
            and safeguard your information when you use our website, services, and applications (collectively, the
            "Service").
          </p>

          <h2>1. Information We Collect</h2>
          <p>
            We collect information that you provide directly to us, information we collect automatically when you use
            the Service, and information from third parties.
          </p>

          <h3>1.1 Information You Provide</h3>
          <p>
            We collect information you provide when you register for an account, create or modify your profile, set
            preferences, sign up for or make purchases through the Service. This information may include:
          </p>
          <ul>
            <li>Your name, email address, phone number, and mailing address</li>
            <li>Your username, password, and profile information</li>
            <li>Payment information</li>
            <li>Information about items you list for auction or bid on</li>
            <li>Communications you send to us</li>
          </ul>

          <h3>1.2 Information We Collect Automatically</h3>
          <p>When you use our Service, we automatically collect certain information, including:</p>
          <ul>
            <li>Log information (e.g., IP address, browser type, pages visited)</li>
            <li>Device information (e.g., device identifiers, hardware model)</li>
            <li>Location information</li>
            <li>Cookies and similar technologies</li>
            <li>Usage information (e.g., bidding activity, viewing history)</li>
          </ul>

          <h2>2. How We Use Your Information</h2>
          <p>We use the information we collect to:</p>
          <ul>
            <li>Provide, maintain, and improve the Service</li>
            <li>Process transactions and send related information</li>
            <li>Send administrative messages, updates, and security alerts</li>
            <li>Respond to your comments, questions, and requests</li>
            <li>Provide customer service</li>
            <li>Send marketing communications</li>
            <li>Monitor and analyze trends, usage, and activities</li>
            <li>Detect, investigate, and prevent fraudulent transactions and other illegal activities</li>
            <li>Personalize and improve the Service</li>
            <li>Facilitate contests, sweepstakes, and promotions</li>
          </ul>

          <h2>3. Sharing of Information</h2>
          <p>We may share your information as follows:</p>
          <ul>
            <li>
              With other users as necessary for the functioning of the Service (e.g., when you win an auction, we share
              your shipping information with the seller)
            </li>
            <li>
              With vendors, consultants, and other service providers who need access to such information to carry out
              work on our behalf
            </li>
            <li>
              In response to a request for information if we believe disclosure is in accordance with any applicable
              law, regulation, or legal process
            </li>
            <li>
              If we believe your actions are inconsistent with our user agreements or policies, or to protect the
              rights, property, and safety of BidMaster or others
            </li>
            <li>
              In connection with, or during negotiations of, any merger, sale of company assets, financing, or
              acquisition of all or a portion of our business to another company
            </li>
            <li>With your consent or at your direction</li>
          </ul>

          <h2>4. Data Retention</h2>
          <p>
            We retain your information for as long as your account is active or as needed to provide you with the
            Service. We will also retain and use your information as necessary to comply with our legal obligations,
            resolve disputes, and enforce our agreements.
          </p>

          <h2>5. Your Choices</h2>
          <p>You have several choices regarding the information you provide to us:</p>
          <ul>
            <li>
              <strong>Account Information</strong>: You may update, correct, or delete your account information at any
              time by logging into your account. If you wish to delete your account, please contact us.
            </li>
            <li>
              <strong>Cookies</strong>: Most web browsers are set to accept cookies by default. You can usually choose
              to set your browser to remove or reject cookies.
            </li>
            <li>
              <strong>Promotional Communications</strong>: You may opt out of receiving promotional emails from us by
              following the instructions in those emails. If you opt out, we may still send you non-promotional emails.
            </li>
            <li>
              <strong>Location Information</strong>: You can prevent us from collecting location information by
              disabling location services on your device.
            </li>
          </ul>

          <h2>6. Security</h2>
          <p>
            We take reasonable measures to help protect your information from loss, theft, misuse, unauthorized access,
            disclosure, alteration, and destruction. However, no security system is impenetrable, and we cannot
            guarantee the security of our systems.
          </p>

          <h2>7. International Transfer</h2>
          <p>
            Your information may be transferred to, and maintained on, computers located outside of your state,
            province, country, or other governmental jurisdiction where the data protection laws may differ from those
            in your jurisdiction.
          </p>

          <h2>8. Children's Privacy</h2>
          <p>
            The Service is not directed to children under the age of 18, and we do not knowingly collect personal
            information from children under 18. If we learn that we have collected personal information of a child under
            18, we will take steps to delete such information as quickly as possible.
          </p>

          <h2>9. Changes to this Privacy Policy</h2>
          <p>
            We may update this Privacy Policy from time to time. If we make material changes, we will notify you by
            email or through the Service prior to the change becoming effective.
          </p>

          <h2>10. Contact Us</h2>
          <p>If you have any questions about this Privacy Policy, please contact us at privacy@bidmaster.com.</p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 pt-6">
          <Link href="/terms">
            <Button variant="outline">
              Terms of Service
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

