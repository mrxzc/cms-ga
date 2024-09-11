import React, { useState } from 'react'

// Define types for our data structure
type Brand = {
  brand: string
  quantity: number
}

type Category = {
  category: string
  totalItems: number
  brands: Brand[]
}

type ProductData = {
  totalItems: number
  details: Category[]
}

// Define props type for the component
type ProductListProps = {
  data: ProductData
}

const ProductList: React.FC<ProductListProps> = ({ data }) => {
  const [expandedCategories, setExpandedCategories] = useState<string[]>(['Proyektor'])

  const toggleCategory = (category: string) => {
    setExpandedCategories(prev => (prev.includes(category) ? prev.filter(c => c !== category) : [...prev, category]))
  }

  return (
    <div className="mx-auto bg-white overflow-hidden">
      <ul>
        {data.details.map((category, index) => (
          <li key={index} className="pb-2">
            <div className="flex rounded-lg">
              <p className="text-paragrah semibold-14 bg-[#f5f8fa] min-w-[105px] flex items-center justify-center text-center">
                {category.category}
              </p>
              <div
                className="flex justify-between min-w-[450px] items-center p-4 cursor-pointer bg-[#eff2f5] relative"
                onClick={() => toggleCategory(category.category)}
                onKeyDown={() => {}}
              >
                <p className="mr-2">{category.totalItems} Items</p>
                <div className="absolute right-4">
                  <svg
                    className={`w-4 h-4 transition-transform ${
                      expandedCategories.includes(category.category) ? 'transform rotate-180' : ''
                    }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>
            </div>
            {expandedCategories.includes(category.category) && category.brands.length > 0 && (
              <div className="flex justify-end ">
                <ul className="bg-[#eff2f5] p-4 w-[450px] ">
                  {category.brands.map((brand, brandIndex) => (
                    <li key={brandIndex} className="py-2 text-left border-b last:border-b-0">
                      ⚫ {brand.brand} : {brand.quantity} Items
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default ProductList
