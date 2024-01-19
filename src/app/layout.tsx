import type { Metadata, ResolvedMetadata } from "next";
import { Caveat } from "next/font/google";
import "./globals.css";
import ToastProvider from "@/components/providers/toaster-provider";
import AuthSessionProvider from "@/components/providers/session-provider";
import StoreProvider from "@/components/providers/redux-provider";
import Admin_Layout from "@/components/admin-layout";

const caveat = Caveat({
  subsets: ["latin"],
  weight: "700",
});

export async function generateMetadata(params: any, parent: ResolvedMetadata) {
  return {
    title: {
      default: "Food ordering",
    },
    description:
      "Enjoy the ease of ordering delicious pizza for delivery or carryout from a Papa Johns near you. Start tracking the speed of your delivery and earn rewards on your favorite pizza, breadsticks, wings and more!",
    keywords: "food, order, delivery, app",
  };
}
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <StoreProvider>
      <AuthSessionProvider>
        <html lang="en">
          <body className={caveat.className}>
            <ToastProvider />
            <Admin_Layout>{children}</Admin_Layout>
          </body>
        </html>
      </AuthSessionProvider>
    </StoreProvider>
  );
}
