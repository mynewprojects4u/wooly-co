import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Checkout | Wooly & Co.",
};

export default function CheckoutLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
