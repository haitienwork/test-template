import { Hono } from 'hono';
import { mockProducts } from '../data/products';


const productRoutes = new Hono()

productRoutes.get('/', (c) => {
  const searchQuery = c.req.query()
  const searchParams = new URLSearchParams(searchQuery)
  const q = searchParams.get('q')
  const collection = searchParams.get('collection')
  const category = searchParams.get('category')
  const vendor = searchParams.get('vendor')

  if(q) {
    const suggestions = mockProducts.filter((product) => product.title.toLowerCase().includes(q?.toLowerCase() || '')).map(p => p.title)
    const products = mockProducts.filter((product) => product.title.toLowerCase().includes(q?.toLowerCase() || ''))
    return c.json({
      suggestions,
      products
    })
  }

  const randomCount = Math.floor(Math.random() * mockProducts.length) + 1
  const products = mockProducts.slice(0, randomCount)
  return c.json(products)
})

export default productRoutes
