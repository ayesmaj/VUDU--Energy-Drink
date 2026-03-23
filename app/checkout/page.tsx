import InnerLayout from "@/components/InnerLayout";
import CheckoutContent from "@/components/pages/CheckoutContent";

export const metadata = { title: "Checkout — VUDU Energy" };

export default function CheckoutPage() {
  return (
    <InnerLayout>
      <CheckoutContent />
    </InnerLayout>
  );
}
