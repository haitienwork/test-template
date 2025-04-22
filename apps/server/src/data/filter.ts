import { mockProducts } from './products'

const collectionsOptions = [
  {
    name: 'Automated Collection',
    value: 'auto',
    count: 6,
  },
  {
    name: 'Homepage',
    value: 'homepage',
    count: 12,
  },
  {
    name: 'Hydrogen',
    value: 'hydrogen',
    count: 3,
  },
]

const categoryOptions = [
  {
    name: 'Snowboards',
    value: 'snowboards',
    count: 14,
  },
  {
    name: 'Accessories',
    value: 'accessories',
    count: 8,
  },
  {
    name: 'Apparel',
    value: 'apparel',
    count: 22,
  },
]

const filters = [
  {
    name: 'Collection',
    type: 'checkbox',
    options: collectionsOptions,
  },
  {
    name: 'Category',
    type: 'checkbox',
    options: categoryOptions,
  },
  {
    name: 'Vendor',
    type: 'checkbox',
    options: []
  }
]