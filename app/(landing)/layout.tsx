import Link from "next/link"

import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"

// import { SiteFooter } from "@/components/site-footer"
import { siteConfig } from "@/config/site"
import { MainNav } from "@/components/layout/main-nav"

interface LandingLayoutProps {
  children: React.ReactNode
}

export default async function LandingLayout({
  children,
}: LandingLayoutProps) {
  return (
    <div className="flex min-h-screen flex-col items-center">
      <header className="container z-40 bg-background">
        <div className="flex h-20 items-center justify-between py-6">
          <MainNav items={siteConfig.mainNav} />
          
          <nav>
            <Link
              href="/login"
              className={cn(
                buttonVariants({ variant: "secondary", size: "sm" }),
                "px-4"
              )}
            >
              Login
            </Link>
          </nav>
        </div>
      </header>
      <main className="flex-1">{children}</main>
    </div>
  )
}
