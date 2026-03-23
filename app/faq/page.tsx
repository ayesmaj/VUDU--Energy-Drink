import InnerLayout from "@/components/InnerLayout";
import FaqContent from "@/components/pages/FaqContent";

export const metadata = { title: "FAQ — VUDU Energy" };

export default function FaqPage() {
  return (
    <InnerLayout>
      <FaqContent />
    </InnerLayout>
  );
}
