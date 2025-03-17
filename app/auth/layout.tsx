// This is how a nested layout should look - no Header or Footer
export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="auth-layout">
      {/* Auth-specific layout elements */}
      {children}
    </div>
  )
} 