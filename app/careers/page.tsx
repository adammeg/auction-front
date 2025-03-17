import Image from "next/image"
import Link from "next/link"
import { ArrowRight, Building, Users, Heart, Zap, Coffee, Globe } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

// Mock job listings
const jobListings = [
  {
    id: 1,
    title: "Senior Full Stack Developer",
    department: "Engineering",
    location: "New York, NY (Hybrid)",
    type: "Full-time",
    description:
      "We're looking for an experienced Full Stack Developer to join our engineering team and help build the next generation of our auction platform.",
  },
  {
    id: 2,
    title: "UX/UI Designer",
    department: "Design",
    location: "Remote",
    type: "Full-time",
    description:
      "Join our design team to create intuitive, engaging user experiences that make online auctions accessible and enjoyable for everyone.",
  },
  {
    id: 3,
    title: "Customer Success Manager",
    department: "Customer Support",
    location: "New York, NY",
    type: "Full-time",
    description:
      "Help our users succeed on BidMaster by providing exceptional support and guidance throughout their auction journey.",
  },
  {
    id: 4,
    title: "Marketing Specialist",
    department: "Marketing",
    location: "Remote",
    type: "Full-time",
    description:
      "Drive growth and engagement through creative marketing campaigns that connect collectors with the items they love.",
  },
  {
    id: 5,
    title: "Authentication Expert - Watches",
    department: "Authentication",
    location: "New York, NY",
    type: "Full-time",
    description:
      "Use your expertise in luxury watches to authenticate items and ensure the integrity of our marketplace.",
  },
  {
    id: 6,
    title: "Authentication Expert - Art",
    department: "Authentication",
    location: "New York, NY",
    type: "Part-time",
    description:
      "Help verify the authenticity of art pieces listed on our platform, ensuring a trustworthy marketplace for collectors.",
  },
]

export default function CareersPage() {
  return (
    <div className="container px-4 py-8 md:px-6 md:py-12">
      <div className="space-y-12">
        <div className="space-y-4 text-center">
          <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Join Our Team</h1>
          <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
            Help us build the future of online auctions and connect collectors worldwide
          </p>
        </div>

        <div className="relative overflow-hidden rounded-xl">
          <div className="absolute inset-0">
            <Image
              src="/placeholder.svg?height=600&width=1600"
              alt="BidMaster team"
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-black/50" />
          </div>
          <div className="relative z-10 px-6 py-24 text-center text-white md:px-12 md:py-32">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Make an Impact</h2>
            <p className="mx-auto mt-4 max-w-[700px] text-lg text-white/80">
              At BidMaster, you'll work on meaningful projects that help collectors and enthusiasts discover unique
              items they love. Join us in building a platform that brings joy to millions.
            </p>
            <Button size="lg" className="mt-8" variant="default">
              View Open Positions
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>

        <div className="space-y-4 text-center">
          <h2 className="text-3xl font-bold tracking-tighter">Why Work With Us</h2>
          <p className="mx-auto max-w-[700px] text-muted-foreground">
            Join a team that values innovation, collaboration, and personal growth
          </p>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 mt-8">
            <Card>
              <CardContent className="pt-6">
                <div className="flex flex-col items-center space-y-2 text-center">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                    <Zap className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold">Impactful Work</h3>
                  <p className="text-muted-foreground">
                    Build products used by millions of collectors and sellers around the world.
                  </p>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="flex flex-col items-center space-y-2 text-center">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                    <Users className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold">Collaborative Culture</h3>
                  <p className="text-muted-foreground">
                    Work with talented, passionate people who care about creating exceptional experiences.
                  </p>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="flex flex-col items-center space-y-2 text-center">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                    <Heart className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold">Comprehensive Benefits</h3>
                  <p className="text-muted-foreground">
                    Enjoy competitive compensation, health benefits, flexible work options, and more.
                  </p>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="flex flex-col items-center space-y-2 text-center">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                    <Building className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold">Growth Opportunities</h3>
                  <p className="text-muted-foreground">
                    Develop your skills and advance your career with mentorship and learning resources.
                  </p>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="flex flex-col items-center space-y-2 text-center">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                    <Coffee className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold">Work-Life Balance</h3>
                  <p className="text-muted-foreground">
                    Flexible schedules, generous PTO, and a focus on sustainable work practices.
                  </p>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="flex flex-col items-center space-y-2 text-center">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                    <Globe className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold">Diverse & Inclusive</h3>
                  <p className="text-muted-foreground">
                    We're committed to building a team that represents a variety of backgrounds and perspectives.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        <div className="space-y-4">
          <h2 className="text-3xl font-bold tracking-tighter text-center">Open Positions</h2>
          <p className="mx-auto max-w-[700px] text-center text-muted-foreground">
            Join our team and help shape the future of online auctions
          </p>

          <div className="mt-8 space-y-4">
            {jobListings.map((job) => (
              <Card key={job.id}>
                <CardContent className="p-6">
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                    <div className="space-y-1">
                      <h3 className="text-xl font-bold">{job.title}</h3>
                      <div className="flex flex-wrap gap-2 text-sm text-muted-foreground">
                        <span>{job.department}</span>
                        <span>•</span>
                        <span>{job.location}</span>
                        <span>•</span>
                        <span>{job.type}</span>
                      </div>
                      <p className="mt-2 text-muted-foreground">{job.description}</p>
                    </div>
                    <div className="flex-shrink-0">
                      <Link href={`/careers/${job.id}`}>
                        <Button>
                          Apply Now
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                      </Link>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        <div className="space-y-4">
          <h2 className="text-3xl font-bold tracking-tighter text-center">Our Hiring Process</h2>
          <p className="mx-auto max-w-[700px] text-center text-muted-foreground">
            What to expect when you apply to BidMaster
          </p>

          <div className="mt-8">
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="step-1">
                <AccordionTrigger>1. Application Review</AccordionTrigger>
                <AccordionContent>
                  Our recruiting team reviews your application and resume to determine if your skills and experience
                  align with the position requirements. This typically takes 1-2 weeks.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="step-2">
                <AccordionTrigger>2. Initial Screening</AccordionTrigger>
                <AccordionContent>
                  If your profile matches what we're looking for, a recruiter will schedule a 30-minute phone or video
                  call to discuss your background, interest in BidMaster, and answer any initial questions you might
                  have.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="step-3">
                <AccordionTrigger>3. Skills Assessment</AccordionTrigger>
                <AccordionContent>
                  Depending on the role, you may be asked to complete a skills assessment or take-home assignment. For
                  technical roles, this might involve a coding challenge; for design roles, a design exercise; and for
                  other positions, a relevant task that demonstrates your capabilities.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="step-4">
                <AccordionTrigger>4. Team Interviews</AccordionTrigger>
                <AccordionContent>
                  You'll meet with several team members, including potential teammates and your prospective manager.
                  These interviews focus on your technical skills, problem-solving abilities, and cultural fit. We value
                  diverse perspectives and collaborative approaches.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="step-5">
                <AccordionTrigger>5. Final Interview</AccordionTrigger>
                <AccordionContent>
                  The final round typically involves a conversation with a senior leader or department head. This
                  discussion centers on your career aspirations, how you align with our mission, and any remaining
                  questions you have about BidMaster.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="step-6">
                <AccordionTrigger>6. Offer & Onboarding</AccordionTrigger>
                <AccordionContent>
                  If you're selected, we'll extend an offer and work with you to determine a start date. Our
                  comprehensive onboarding program will help you integrate into the team and set you up for success at
                  BidMaster.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </div>

        <div className="grid gap-8 md:grid-cols-2 items-center">
          <div className="relative aspect-square overflow-hidden rounded-xl">
            <Image
              src="/placeholder.svg?height=800&width=800"
              alt="BidMaster office"
              width={800}
              height={800}
              className="object-cover"
            />
          </div>
          <div className="space-y-4">
            <h2 className="text-3xl font-bold tracking-tighter">Life at BidMaster</h2>
            <div className="space-y-4 text-muted-foreground">
              <p>
                At BidMaster, we believe that great work happens when people feel valued, supported, and inspired. Our
                offices are designed to foster collaboration while providing comfortable spaces for focused work.
              </p>
              <p>
                We host regular team events, from hackathons and workshops to social gatherings and volunteer
                opportunities. Our flexible work policy allows team members to work in ways that suit their lifestyle
                and maximize their productivity.
              </p>
              <p>
                Professional development is a priority at BidMaster. We offer learning stipends, mentorship programs,
                and opportunities to attend industry conferences and workshops to help you grow your skills and advance
                your career.
              </p>
            </div>
            <div className="pt-4">
              <Link href="/about">
                <Button variant="outline">
                  Learn More About Us
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </div>

        <div className="rounded-xl bg-muted p-8 text-center">
          <div className="mx-auto max-w-[700px] space-y-4">
            <h2 className="text-3xl font-bold tracking-tighter">Don't See the Right Fit?</h2>
            <p className="text-muted-foreground">
              We're always looking for talented individuals to join our team. If you don't see a position that matches
              your skills, send us your resume and we'll keep you in mind for future opportunities.
            </p>
            <Link href="/contact">
              <Button className="mt-4">
                Contact Our Recruiting Team
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

