import { notFound } from "next/navigation";
import InnerLayout from "@/components/InnerLayout";
import FlavorDetailContent from "@/components/pages/FlavorDetailContent";
import { FLAVORS } from "@/lib/utils";

export function generateStaticParams() {
  return FLAVORS.map((f) => ({ flavor: f.id }));
}

export async function generateMetadata({ params }: { params: Promise<{ flavor: string }> }) {
  const { flavor } = await params;
  const f = FLAVORS.find((x) => x.id === flavor);
  return { title: f ? `${f.name} — VUDU Energy` : "VUDU Energy" };
}

export default async function FlavorPage({ params }: { params: Promise<{ flavor: string }> }) {
  const { flavor } = await params;
  const f = FLAVORS.find((x) => x.id === flavor);
  if (!f) notFound();
  return (
    <InnerLayout>
      <FlavorDetailContent flavor={f} />
    </InnerLayout>
  );
}
