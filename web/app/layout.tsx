// apps/web/app/layout.tsx
import "./globals.css"; // ⬅️ add this line

export const metadata = { title: "Page Builder", description: "Schema-driven builder" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="h-full">{children}</body>
    </html>
  );
}
