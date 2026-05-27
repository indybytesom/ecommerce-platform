import Container from "@/components/ui/Container";
import FooterBrand from "./footer/FooterBrand";
import FooterLinks from "./footer/FooterLinks";
import FooterBottom from "./footer/FooterBottom";
import FooterTop from "./footer/FooterTop";

export default function Footer() {
  return (
    <footer className="border-t border-gray-200 bg-gray-50/80 backdrop-blur">
      <Container>
        {/* NEWSLETTER */}
        <div className="py-16">
          <FooterTop />
        </div>

        {/* MAIN FOOTER */}
        <div className="grid gap-16 py-16 lg:grid-cols-[1.2fr_1fr]">
          <FooterBrand />

          <FooterLinks />
        </div>

        {/* BOTTOM */}
        <div className="pb-10">
          <FooterBottom />
        </div>
      </Container>
    </footer>
  );
}
