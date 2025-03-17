import Image from "next/image"
import Link from "next/link"
import { ArrowLeft, Calendar, User, Clock, Share2, Bookmark, ThumbsUp, MessageSquare, ArrowRight } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"

// Mock blog post data
const getBlogPost = (id: string) => {
  return {
    id: Number.parseInt(id),
    title: "The Art of Bidding: Strategies for Auction Success",
    content: `
      <p>Online auctions can be exciting and rewarding, but they also require strategy and preparation to be successful. In this comprehensive guide, we'll explore proven bidding strategies that can help you win the items you want without overpaying.</p>
      
      <h2>Understanding Auction Psychology</h2>
      <p>Before diving into specific strategies, it's important to understand the psychology behind auctions. The competitive nature of bidding can trigger emotional responses that lead to impulsive decisions and overbidding. Being aware of these psychological factors can help you maintain a rational approach:</p>
      
      <ul>
        <li><strong>Auction fever</strong>: The excitement of competition can cloud judgment and lead to bidding more than you initially planned.</li>
        <li><strong>Winner's curse</strong>: The tendency for the winning bid to exceed the true value of the item.</li>
        <li><strong>Sunk cost fallacy</strong>: Continuing to bid because you've already invested time and emotional energy in an auction.</li>
      </ul>
      
      <h2>Setting Your Maximum Bid</h2>
      <p>One of the most important aspects of successful bidding is determining your maximum bid before the auction begins:</p>
      
      <ol>
        <li>Research the item thoroughly to understand its market value</li>
        <li>Consider the item's condition and any unique characteristics that might affect its value</li>
        <li>Factor in additional costs like shipping, taxes, and any restoration needed</li>
        <li>Decide on a firm maximum bid that you won't exceed, regardless of auction dynamics</li>
      </ol>
      
      <p>Remember, the goal isn't just to win—it's to win at a price that makes sense for you.</p>
      
      <h2>Timing Your Bids</h2>
      <p>When you place your bid can be just as important as how much you bid. Consider these timing strategies:</p>
      
      <h3>Early Bidding</h3>
      <p>Placing bids early in the auction can establish your interest and potentially discourage casual bidders. However, it also alerts other serious bidders to competition and gives them time to reconsider their strategy.</p>
      
      <h3>Last-Minute Bidding (Sniping)</h3>
      <p>Placing your bid in the final moments of an auction—known as "sniping"—can be effective because it gives other bidders little time to respond. This strategy works particularly well for online auctions with fixed end times.</p>
      
      <h2>Using Proxy Bidding Effectively</h2>
      <p>Most online auction platforms, including BidMaster, offer proxy bidding systems. Here's how to use them effectively:</p>
      
      <p>Enter your true maximum bid right away. The system will automatically bid the minimum increment necessary to maintain your position as the highest bidder, up to your maximum amount. This approach allows you to set your limit once and walk away, reducing the emotional aspect of bidding.</p>
      
      <h2>Research and Preparation</h2>
      <p>Successful bidders do their homework before placing a bid:</p>
      
      <ul>
        <li>Study the item description and photos carefully</li>
        <li>Research the seller's reputation and review history</li>
        <li>Look at completed auctions for similar items to gauge appropriate pricing</li>
        <li>Ask questions about the item before bidding if anything is unclear</li>
      </ul>
      
      <h2>Specialized Strategies for Different Types of Auctions</h2>
      
      <h3>Reserve Price Auctions</h3>
      <p>When an auction has a reserve price (a minimum price the seller will accept), consider placing a bid that meets the reserve early to encourage serious bidding. If the reserve isn't met, you might be able to negotiate with the seller after the auction ends.</p>
      
      <h3>No-Reserve Auctions</h3>
      <p>These can offer great opportunities for deals, but they can also attract more bidders. Be prepared for more competition and potentially faster price increases.</p>
      
      <h2>Conclusion</h2>
      <p>Successful bidding is both an art and a science. By understanding auction psychology, setting firm limits, timing your bids strategically, and doing thorough research, you can increase your chances of winning auctions at favorable prices. Remember that patience is key—if you miss out on one item, another opportunity will come along.</p>
      
      <p>Happy bidding!</p>
    `,
    image: "/placeholder.svg?height=600&width=1200",
    date: "March 15, 2025",
    author: "Sarah Johnson",
    authorRole: "Auction Specialist",
    authorBio:
      "Sarah has been with BidMaster for 5 years and specializes in auction strategy and collector education. She has a background in art history and has personally participated in over 500 auctions.",
    authorImage: "/placeholder.svg?height=200&width=200",
    category: "Bidding Tips",
    readTime: "5 min read",
    tags: ["bidding strategy", "auction tips", "online auctions", "winning tactics"],
    relatedPosts: [
      {
        id: 3,
        title: "Authentication 101: Spotting Counterfeit Luxury Items",
        excerpt:
          "Learn how our authentication experts verify the legitimacy of luxury goods, and what red flags to look for when bidding on high-value items.",
        image: "/placeholder.svg?height=400&width=600",
        date: "March 5, 2025",
        author: "Elena Rodriguez",
        category: "Authentication",
      },
      {
        id: 4,
        title: "The Psychology of Auctions: Why We Love to Bid",
        excerpt:
          "Explore the psychological factors that make auctions so exciting and addictive, from the thrill of competition to the joy of winning.",
        image: "/placeholder.svg?height=400&width=600",
        date: "February 28, 2025",
        author: "David Kim",
        category: "Auction Insights",
      },
      {
        id: 6,
        title: "Selling Success: How to Create Listings That Attract Bidders",
        excerpt:
          "Maximize your selling potential with these expert tips on creating compelling item descriptions, taking high-quality photos, and setting the right starting price.",
        image: "/placeholder.svg?height=400&width=600",
        date: "February 15, 2025",
        author: "Olivia Martinez",
        category: "Selling Tips",
      },
    ],
  }
}

export default function BlogPostPage({ params }: { params: { id: string } }) {
  const post = getBlogPost(params.id)

  return (
    <div className="container px-4 py-8 md:px-6 md:py-12">
      <div className="mx-auto max-w-4xl">
        <div className="mb-6">
          <Link href="/blog" className="flex items-center text-sm text-muted-foreground hover:text-foreground">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Blog
          </Link>
        </div>

        <div className="space-y-8">
          <div className="space-y-4">
            <Badge className="mb-2">{post.category}</Badge>
            <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">{post.title}</h1>

            <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                <span>{post.date}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4" />
                <span>{post.readTime}</span>
              </div>
              <div className="flex items-center gap-2">
                <User className="h-4 w-4" />
                <span>{post.author}</span>
              </div>
            </div>
          </div>

          <div className="relative aspect-[2/1] overflow-hidden rounded-lg">
            <Image src={post.image || "/placeholder.svg"} alt={post.title} fill className="object-cover" priority />
          </div>

          <div className="flex justify-between">
            <div className="flex gap-2">
              <Button variant="outline" size="sm">
                <Share2 className="mr-2 h-4 w-4" />
                Share
              </Button>
              <Button variant="outline" size="sm">
                <Bookmark className="mr-2 h-4 w-4" />
                Save
              </Button>
            </div>
            <div className="flex gap-2">
              <Button variant="ghost" size="sm">
                <ThumbsUp className="mr-2 h-4 w-4" />
                Like
              </Button>
              <Button variant="ghost" size="sm">
                <MessageSquare className="mr-2 h-4 w-4" />
                Comment
              </Button>
            </div>
          </div>

          <div
            className="prose prose-gray max-w-none dark:prose-invert"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />

          <div className="flex flex-wrap gap-2">
            <span className="text-sm font-medium">Tags:</span>
            {post.tags.map((tag, index) => (
              <Badge key={index} variant="outline">
                {tag}
              </Badge>
            ))}
          </div>

          <Separator />

          <div className="flex items-center gap-4">
            <div className="relative h-16 w-16 overflow-hidden rounded-full">
              <Image src={post.authorImage || "/placeholder.svg"} alt={post.author} fill className="object-cover" />
            </div>
            <div>
              <h3 className="font-bold">{post.author}</h3>
              <p className="text-sm text-muted-foreground">{post.authorRole}</p>
              <p className="mt-1 text-sm">{post.authorBio}</p>
            </div>
          </div>

          <Separator />

          <div className="space-y-4">
            <h2 className="text-2xl font-bold tracking-tighter">Related Articles</h2>
            <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3">
              {post.relatedPosts.map((relatedPost) => (
                <Card key={relatedPost.id} className="overflow-hidden">
                  <div className="relative aspect-[16/9]">
                    <Image
                      src={relatedPost.image || "/placeholder.svg"}
                      alt={relatedPost.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <CardContent className="p-4">
                    <Badge className="mb-2">{relatedPost.category}</Badge>
                    <h3 className="font-bold line-clamp-2">{relatedPost.title}</h3>
                    <p className="mt-2 text-xs text-muted-foreground line-clamp-2">{relatedPost.excerpt}</p>
                    <div className="mt-2 flex justify-between items-center">
                      <span className="text-xs text-muted-foreground">{relatedPost.date}</span>
                      <Link href={`/blog/${relatedPost.id}`}>
                        <Button variant="ghost" size="sm">
                          Read
                          <ArrowRight className="ml-1 h-3 w-3" />
                        </Button>
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          <div className="rounded-xl bg-muted p-6 text-center">
            <h3 className="text-xl font-bold">Subscribe to Our Newsletter</h3>
            <p className="mt-2 text-muted-foreground">
              Get the latest auction tips, collecting guides, and news delivered to your inbox.
            </p>
            <div className="mt-4 flex flex-col sm:flex-row gap-2 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              />
              <Button>Subscribe</Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

