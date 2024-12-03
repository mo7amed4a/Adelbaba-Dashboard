import HeaderApp from "@/components/layouts/Header-auth";

export async function generateMetadata() {
  return {
    title: "adelbaba",
    content:
      "A playground to explore new Next.js 13/14 app directory features such as nested layouts, instant loading states, streaming, and component level data fetching.",
  };
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html>
      <head />
      <body>
        <HeaderApp />
        <div className="[&>*]:h-full h-screen min-h-screen">{children}</div>
      </body>
    </html>
  );
}
