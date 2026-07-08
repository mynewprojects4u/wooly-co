import { MetadataRoute } from 'next'
import { getAllProducts } from '@/lib/products'
 
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://wooly-co.netlify.app'
  
  const staticRoutes = [
    '',
    '/shop',
    '/faq',
    '/contact',
    '/terms',
    '/privacy',
    '/shipping',
    '/returns',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: route === '' ? 1 : 0.8,
  }))

  const allProducts = await getAllProducts();
  const productRoutes = allProducts.map((product) => ({
    url: `${baseUrl}/product/${product.id}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.9,
  }))

  return [...staticRoutes, ...productRoutes]
}
