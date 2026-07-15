import type { Metadata, Viewport } from "next";
import { Oswald, Inter, Cairo, Changa } from "next/font/google";
import "./globals.css";
import { LanguageProvider } from "@/components/LanguageProvider";

const display = Oswald({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-display",
});

const sans = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-sans",
});

const arabic = Cairo({
  subsets: ["arabic", "latin"],
  weight: ["400", "600", "700", "900"],
  variable: "--font-ar",
});

// Strong, athletic Arabic display face for headings
const arabicDisplay = Changa({
  subsets: ["arabic", "latin"],
  weight: ["600", "700", "800"],
  variable: "--font-ar-display",
});

const siteUrl = "https://fit-lift-gym.vercel.app";
const siteTitle = "FIT & LIFT GYM | جيم بنها الأول";
const siteDescription =
  "فيت آند ليفت — جيم متكامل في بنها. أحدث الأجهزة، مدربين محترفين، وحصص متنوعة. الجسد يحقق ما يؤمن به العقل.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: siteTitle,
  description: siteDescription,
  keywords: ["جيم بنها", "Fit and Lift", "gym Benha", "fitness Qalyubia", "جيم قليوبية", "فيت اند ليفت"],
  applicationName: "FIT & LIFT GYM",
  alternates: {
    canonical: "/",
  },
  icons: {
    icon: "/logo.png",
    shortcut: "/logo.png",
    apple: "/logo.png",
  },
  openGraph: {
    title: siteTitle,
    description: "الجسد يحقق ما يؤمن به العقل — جيم متكامل في بنها.",
    url: siteUrl,
    siteName: "FIT & LIFT GYM",
    locale: "ar_EG",
    type: "website",
    images: [
      {
        url: "/mainLogo.png",
        width: 631,
        height: 780,
        alt: "FIT & LIFT GYM",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteTitle,
    description: "الجسد يحقق ما يؤمن به العقل — جيم متكامل في بنها.",
    images: ["/mainLogo.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  themeColor: "#0a0a0a",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      dir="ltr"
      className={`${display.variable} ${sans.variable} ${arabic.variable} ${arabicDisplay.variable}`}
    >
      <body className="font-sans antialiased">
        <LanguageProvider>{children}</LanguageProvider>
        {/* Failsafe: if GSAP fails to load, still reveal content after 2.5s */}
        <script
          dangerouslySetInnerHTML={{
            __html:
              "setTimeout(function(){document.body.classList.add('reveal-ready');document.body.classList.add('anim-ready')},2500);",
          }}
        />
      </body>
    </html>
  );
}
