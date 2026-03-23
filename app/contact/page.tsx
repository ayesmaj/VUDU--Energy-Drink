import InnerLayout from "@/components/InnerLayout";
import ContactContent from "@/components/pages/ContactContent";

export const metadata = { title: "Contact — VUDU Energy" };

export default function ContactPage() {
  return (
    <InnerLayout>
      <ContactContent />
    </InnerLayout>
  );
}
