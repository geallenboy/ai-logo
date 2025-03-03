import { Toaster } from "@/components/ui/sonner";
import { Nunito } from "next/font/google";
import { NextIntlClientProvider } from "next-intl";
import { getLocale, getMessages } from "next-intl/server";
import { ThemeProvider } from "@/components/theme-provider";
import "./globals.css";
import { Metadata } from "next";
import Provider from "./provider";

const MyAppFont = Nunito({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "AI Logo",
  description: "AI Logo Generation",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const locale = await getLocale();
  const messages = await getMessages();
  return (
    <html lang={locale} suppressHydrationWarning>
      <head>
        <link rel="icon" href="./logo.svg" />
      </head>
      <body className={`${MyAppFont.className} font-sans`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <NextIntlClientProvider messages={messages}>
            <Provider>
              {children}
              <Toaster richColors />
            </Provider>
          </NextIntlClientProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
