import { ProductDatas } from "@/app/utils/ProductData";
import ProductDetailClient from "./product-detail-client";
import Link from "next/link";

interface ProductDetailPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function ProductDetailPage({ params }: ProductDetailPageProps) {
  const { id } = await params;
  const productId = parseInt(id);
  const product = ProductDatas.find((p) => p.id === productId);

  if (!product) {
    return (
      <div className="mx-4 md:mx-12 max-w-screen-xl lg:mx-auto min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-2xl mb-4 text-[rgba(var(--color-foreground),1)]">
            Product not found
          </p>
          <Link href="/shop" className="text-[rgba(var(--color-foreground),0.7)] hover:underline">
            Back to Shop
          </Link>
        </div>
      </div>
    );
  }

  return <ProductDetailClient product={product} />;
}