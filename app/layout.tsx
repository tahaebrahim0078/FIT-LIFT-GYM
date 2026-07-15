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

export const metadata: Metadata = {
  title: "FIT & LIFT GYM | جيم بنها الأول",
  description:
    "فيت آند ليفت — جيم متكامل في بنها. أحدث الأجهزة، مدربين محترفين، وحصص متنوعة. الجسد يحقق ما يؤمن به العقل.",
  keywords: ["جيم بنها", "Fit and Lift", "gym Benha", "fitness Qalyubia"],
  openGraph: {
    title: "FIT & LIFT GYM | جيم بنها الأول",
    description: "الجسد يحقق ما يؤمن به العقل — جيم متكامل في بنها.",
    type: "website",
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
