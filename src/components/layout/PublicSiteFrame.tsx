import type { ReactNode } from "react";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import type { FooterSocialInput } from "@/content/footer";

export function PublicSiteFrame({
  children,
  siteName,
  tagline,
  phone,
  email,
  social,
}: {
  children: ReactNode;
  siteName: string;
  tagline: string;
  phone: string;
  email: string;
  social?: FooterSocialInput;
}) {
  return (
    <>
      <Header />
      <main className="bg-warm-ivory pt-[72px]">{children}</main>
      <Footer siteName={siteName} tagline={tagline} phone={phone} email={email} social={social} />
    </>
  );
}
