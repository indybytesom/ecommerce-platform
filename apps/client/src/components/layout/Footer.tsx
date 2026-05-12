import Container from "@/components/ui/Container";
import FooterBrand from "./footer/FooterBrand";
import FooterLinks from "./footer/FooterLinks";
import FooterBottom from "./footer/FooterBottom";

export default function Footer() {
  return (
    <footer className="border-t bg-gray-50 py-16">
      <Container>
        <div className="grid gap-12 md:grid-cols-[1fr_auto]">
          <FooterBrand />
          <FooterLinks />
        </div>

        <div className="mt-12">
          <FooterBottom />
        </div>
      </Container>
    </footer>
  );
}