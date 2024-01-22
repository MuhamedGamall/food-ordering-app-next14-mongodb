import type { ResolvedMetadata } from "next";
import { Poppins, Roboto } from "next/font/google";
import "./globals.css";
import ToastProvider from "@/components/providers/toaster-provider";
import AuthSessionProvider from "@/components/providers/session-provider";
import StoreProvider from "@/components/providers/redux-provider";
import Admin_Layout from "@/components/admin-layout";
import Footer from "@/components/footer";

const poppins = Roboto({
  subsets: ["latin"],
  weight: "400",
});

export async function generateMetadata() {
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
          <body className={poppins.className}>
            <ToastProvider />
            <Admin_Layout>
              {children}
              <Footer />
              
            </Admin_Layout>
          </body>
        </html>
      </AuthSessionProvider>
    </StoreProvider>
  );
}
