import { getProduct } from "@/lib/products";
import ProductClient from "./ProductClient";
import { notFound } from "next/navigation";
import { Metadata } from "next";

export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
  const product = await getProduct(params.id);
  if (!product) return { title: "Product Not Found | Wooly & Co." };
  
  return {
    title: `${product.name} | Wooly & Co.`,
    description: product.desc,
    openGraph: {
      title: `${product.name} | Wooly & Co.`,
      description: product.desc,
      url: `https://wooly-co.netlify.app/product/${product.id}`,
      images: [
        {
          url: product.imageUrl || `https://wooly-co.netlify.app/images/og-image.jpg`,
          width: 800,
          height: 600,
          alt: product.name,
        },
      ],
    },
  };
}

export default async function ProductPage({ params }: { params: { id: string } }) {
  const product = await getProduct(params.id);
  
  if (!product) {
    notFound();
  }

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    image: `https://wooly-co.netlify.app${product.imageUrl || ''}`,
    description: product.desc,
    offers: {
      '@type': 'Offer',
      price: product.price,
      priceCurrency: 'INR',
      availability: 'https://schema.org/InStock',
      url: `https://wooly-co.netlify.app/product/${product.id}`,
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: product.rating,
      reviewCount: Math.floor(Math.random() * 50) + 10,
    }
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ProductClient product={product} />
    </>
  );
}
