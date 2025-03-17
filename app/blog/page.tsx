import Image from "next/image"
import Link from "next/link"
import { ArrowRight, Calendar, User, Clock } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"

// Mock blog posts data
const blogPosts = [
  {
    id: 1,
    title: "The Art of Bidding: Strategies for Auction Success",
    excerpt:
      "Learn effective bidding strategies to help you win auctions without overpaying. From timing your bids to setting maximum limits, these tips will give you an edge.",
    image: "/placeholder.svg?height=400&width=600",
    date: "March 15, 2025",
    author: "Sarah Johnson",
    authorRole: "Auction Specialist",
    category: "Bidding Tips",
    readTime: "5 min read",
    featured: true,
  },
  {
    id: 2,
    title: "Vintage Watch Collecting: A Beginner's Guide",
    excerpt:
      "Interested in collecting vintage watches? This comprehensive guide covers everything from identifying authentic pieces to understanding value factors and maintenance.",
    image: "/placeholder.svg?height=400&width=600",
    date: "March 10, 2025",
    author: "Michael Chen",
    authorRole: "Watch Expert",
    category: "Collecting Guides",
    readTime: "8 min read",
    featured: true,
  },
  {
    id: 3,
    title: "Authentication 101: Spotting Counterfeit Luxury Items",
    excerpt:
      "Learn how our authentication experts verify the legitimacy of luxury goods, and what red flags to look for when bidding on high-value items.",
    image: "/placeholder.svg?height=400&width=600",
    date: "March 5, 2025",
    author: "Elena Rodriguez",
    authorRole: "Authentication Manager",
    category: "Authentication",
    readTime: "6 min read",
    featured: false,
  },
  {
    id: 4,
    title: "The Psychology of Auctions: Why We Love to Bid",
    excerpt:
      "Explore the psychological factors that make auctions so exciting and addictive, from the thrill of competition to the joy of winning.",
    image: "/placeholder.svg?height=400&width=600",
    date: "February 28, 2025",
    author: "David Kim",
    authorRole: "Consumer Psychologist",
    category: "Auction Insights",
    readTime: "4 min read",
    featured: false,
  },
  {
    id: 5,
    title: "Top 10 Most Expensive Items Ever Sold on BidMaster",
    excerpt:
      "From rare paintings to vintage cars, discover the most valuable items that have changed hands through our platform.",
    image: "/placeholder.svg?height=400&width=600",
    date: "February 20, 2025",
    author: "James Wilson",
    authorRole: "Content Manager",
    category: "Auction History",
    readTime: "7 min read",
    featured: false,
  },
  {
    id: 6,
    title: "Selling Success: How to Create Listings That Attract Bidders",
    excerpt:
      "Maximize your selling potential with these expert tips on creating compelling item descriptions, taking high-quality photos, and setting the right starting price.",
    image: "/placeholder.svg?height=400&width=600",
    date: "February 15, 2025",
    author: "Olivia Martinez",
    authorRole: "Seller Success Manager",
    category: "Selling Tips",
    readTime: "6 min read",
    featured: false,
  },
]

export default function BlogPage() {
  const featuredPosts = blogPosts.filter((post) => post.featured)
  const regularPosts = blogPosts.filter((post) => !post.featured)

  return (
    <div className="container px-4 py-8 md:px-6 md:py-12">
      <div className="space-y-12">
        <div className="space-y-4">
          <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">BidMaster Blog</h1>
          <p className="max-w-[700px] text-muted-foreground md:text-xl">
            Insights, guides, and stories from the world of auctions and collecting
          </p>
        </div>

        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium">Filter by:</span>
            <Select>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="All Categories" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                <SelectItem value="bidding-tips">Bidding Tips</SelectItem>
                <SelectItem value="collecting-guides">Collecting Guides</SelectItem>
                <SelectItem value="authentication">Authentication</SelectItem>
                <SelectItem value="auction-insights">Auction Insights</SelectItem>
                <SelectItem value="auction-history">Auction History</SelectItem>
                <SelectItem value="selling-tips">Selling Tips</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="relative w-full sm:w-[300px]">
            <Input placeholder="Search articles..." className="w-full" />
          </div>
        </div>

        {featuredPosts.length > 0 && (
          <div className="space-y-4">
            <h2 className="text-2xl font-bold tracking-tighter">Featured Articles</h2>
            <div className="grid gap-6 md:grid-cols-2">
              {featuredPosts.map((post) => (
                <Card key={post.id} className="overflow-hidden">
                  <div className="relative aspect-[16/9]">
                    <Image src={post.image || "/placeholder.svg"} alt={post.title} fill className="object-cover" />
                  </div>
                  <CardContent className="p-6">
                    <Badge className="mb-2">{post.category}</Badge>
                    <h3 className="text-2xl font-bold">{post.title}</h3>
                    <p className="mt-2 text-muted-foreground">{post.excerpt}</p>
                    <div className="mt-4 flex items-center gap-4">
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm text-muted-foreground">{post.date}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm text-muted-foreground">{post.readTime}</span>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="border-t bg-muted/50 px-6 py-4">
                    <div className="flex items-center justify-between w-full">
                      <div className="flex items-center gap-2">
                        <User className="h-4 w-4 text-muted-foreground" />
                        <div>
                          <span className="text-sm font-medium">{post.author}</span>
                          <span className="text-xs text-muted-foreground ml-1">({post.authorRole})</span>
                        </div>
                      </div>
                      <Link href={`/blog/${post.id}`}>
                        <Button variant="ghost" size="sm">
                          Read More
                          <ArrowRight className="ml-1 h-4 w-4" />
                        </Button>
                      </Link>
                    </div>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </div>
        )}

        <div className="space-y-4">
          <h2 className="text-2xl font-bold tracking-tighter">Latest Articles</h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {regularPosts.map((post) => (
              <Card key={post.id} className="overflow-hidden">
                <div className="relative aspect-[16/9]">
                  <Image src={post.image || "/placeholder.svg"} alt={post.title} fill className="object-cover" />
                </div>
                <CardContent className="p-6">
                  <Badge className="mb-2">{post.category}</Badge>
                  <h3 className="text-xl font-bold">{post.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground line-clamp-3">{post.excerpt}</p>
                  <div className="mt-4 flex items-center gap-4">
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      <span className="text-xs text-muted-foreground">{post.date}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-muted-foreground" />
                      <span className="text-xs text-muted-foreground">{post.readTime}</span>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="border-t bg-muted/50 px-6 py-3">
                  <div className="flex items-center justify-between w-full">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-medium">{post.author}</span>
                    </div>
                    <Link href={`/blog/${post.id}`}>
                      <Button variant="ghost" size="sm">
                        Read
                        <ArrowRight className="ml-1 h-3 w-3" />
                      </Button>
                    </Link>
                  </div>
                </CardFooter>
              </Card>
            ))}
          </div>
          <div className="flex justify-center mt-8">
            <Button variant="outline" size="lg">
              Load More Articles
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>

        <div className="rounded-xl bg-muted p-8">
          <div className="grid gap-8 md:grid-cols-2 items-center">
            <div className="space-y-4">
              <h2 className="text-2xl font-bold tracking-tighter">Subscribe to Our Newsletter</h2>
              <p className="text-muted-foreground">
                Stay updated with the latest auction news, collecting guides, and exclusive offers. We send our
                newsletter twice a month.
              </p>
              <div className="flex flex-col sm:flex-row gap-2 mt-4">
                <Input placeholder="Enter your email" className="flex-1" />
                <Button>
                  Subscribe
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
              <p className="text-xs text-muted-foreground">
                By subscribing, you agree to our Privacy Policy and consent to receive updates from BidMaster.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <h3 className="font-medium">Popular Categories</h3>
                <ul className="space-y-1 text-sm">
                  <li>
                    <Link href="#" className="text-muted-foreground hover:text-foreground">
                      Bidding Tips
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="text-muted-foreground hover:text-foreground">
                      Collecting Guides
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="text-muted-foreground hover:text-foreground">
                      Authentication
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="text-muted-foreground hover:text-foreground">
                      Auction Insights
                    </Link>
                  </li>
                </ul>
              </div>
              <div className="space-y-2">
                <h3 className="font-medium">Resources</h3>
                <ul className="space-y-1 text-sm">
                  <li>
                    <Link href="/how-it-works" className="text-muted-foreground hover:text-foreground">
                      How It Works
                    </Link>
                  </li>
                  <li>
                    <Link href="/faq" className="text-muted-foreground hover:text-foreground">
                      FAQ
                    </Link>
                  </li>
                  <li>
                    <Link href="/seller-guide" className="text-muted-foreground hover:text-foreground">
                      Seller Guide
                    </Link>
                  </li>
                  <li>
                    <Link href="/buyer-guide" className="text-muted-foreground hover:text-foreground">
                      Buyer Guide
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

