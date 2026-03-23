import InnerLayout from "@/components/InnerLayout";
import ShopContent from "@/components/pages/ShopContent";

export const metadata = { title: "Shop — VUDU Energy" };

export default function ShopPage() {
  return (
    <InnerLayout>
      <ShopContent />
    </InnerLayout>
  );
}
