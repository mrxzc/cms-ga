import React, { useState, useEffect, useCallback } from 'react'
import SelectInput from '@components/atoms/Form/Select'
import IconDelete from '@assets/icons/IconDelete'
import IconEditing from '@assets/icons/IconEditing'

export interface BrandData {
  name: string
  stock: number
  isActive: boolean
}

interface BrandManagementProps {
  initialBrands?: BrandData[]
  onAddBrand?: (newBrand: BrandData) => void
  onUpdateBrand?: (updatedBrand: BrandData, index: number) => void
  onDeleteBrand?: (index: number) => void
  selectOptions: { value: string; label: string }[]
  onUpdateSelectOptions?: (newOptions: { value: string; label: string }[]) => void // Callback to update selectOptions in the parent
}

const AddWithTable: React.FC<BrandManagementProps> = ({
  initialBrands = [],
  onAddBrand,
  onUpdateBrand,
  onDeleteBrand,
  selectOptions,
  onUpdateSelectOptions,
}) => {
  const [brands, setBrands] = useState<BrandData[]>(initialBrands)
  const [selectedOption, setSelectedOption] = useState<any>(null)

  const handleAddBrand = () => {
    if (selectedOption) {
      const newBrand: BrandData = {
        name: selectedOption.value,
        stock: 0,
        isActive: true,
      }
      setBrands([...brands, newBrand])
      setSelectedOption(null)

      // Update selectOptions di parent component menggunakan callback
      if (onUpdateSelectOptions) {
        onUpdateSelectOptions(selectOptions.filter((option: any) => option.value !== selectedOption.value))
      }

      // Tambahkan input stock baru untuk brand yang ditambahkan
      setStockInputs(prev => ({ ...prev, [brands.length]: 0 }))

      if (onAddBrand) {
        onAddBrand(newBrand)
      }
    }
  }

  const handleDeleteBrand = (index: number) => {
    const deletedBrand = brands[index]
    const updatedBrands = brands.filter((_, i) => i !== index)
    setBrands(updatedBrands)

    // Hapus input stock yang terkait dengan brand yang dihapus
    const newStockInputs = { ...stockInputs }
    delete newStockInputs[index]
    setStockInputs(newStockInputs)

    if (onDeleteBrand) {
      onDeleteBrand(index)
    }

    // Tambahkan kembali opsi yang dihapus ke selectOptions di parent component
    if (onUpdateSelectOptions) {
      onUpdateSelectOptions([...selectOptions, { value: deletedBrand.name, label: deletedBrand.name }])
    }
  }

  const handleSelectChange = (selectedOption: any) => {
    setSelectedOption(selectedOption)
  }

  const handleToggleActive = (index: number) => {
    const updatedBrands = [...brands]
    updatedBrands[index].isActive = !updatedBrands[index].isActive
    setBrands(updatedBrands)

    if (onUpdateBrand) {
      onUpdateBrand(updatedBrands[index], index)
    }
  }

  // State untuk menyimpan nilai input stock dari setiap brand
  const [stockInputs, setStockInputs] = useState<Record<number, number>>(
    brands.reduce((acc, brand, index) => ({ ...acc, [index]: brand.stock }), {})
  )

  // Fungsi untuk menangani perubahan nilai input stock
  const handleStockInputChange = (index: number, event: React.ChangeEvent<HTMLInputElement>) => {
    const newStock = parseInt(event.target.value) || 0
    setStockInputs(prev => ({ ...prev, [index]: newStock }))
  }

  const memoizedOnUpdateBrand = useCallback(
    (updatedBrand: BrandData, index: number) => {
      if (onUpdateBrand) {
        onUpdateBrand(updatedBrand, index)
      }
    },
    [onUpdateBrand]
  )

  useEffect(() => {
    const updatedBrands = brands.map((brand, index) => ({
      ...brand,
      stock: stockInputs[index] || 0,
    }))
    setBrands(updatedBrands)

    updatedBrands.forEach((updatedBrand, index) => {
      memoizedOnUpdateBrand(updatedBrand, index)
    })
  }, [stockInputs, memoizedOnUpdateBrand])

  return (
    <div>
      {/* Formulir Penambahan Brand */}
      <div className="flex ">
        <SelectInput
          options={selectOptions}
          value={selectedOption}
          onChange={handleSelectChange}
          isSearchable
          placeholder="Tambah Brand"
          className="w-full mr-2"
        />
        <button
          className="bg-white hover:bg-[#95c3fa] hover:cursor-pointer text-[#235696] border border-[#235696] font-bold w-[100px] h-[38px] rounded-lg"
          onClick={handleAddBrand}
          disabled={!selectedOption}
        >
          + Add
        </button>
      </div>

      {/* Tabel Data Brand */}
      <div className="overflow-y-auto max-h-[250px] mt-1">
        <table className="w-full max-w-[850px] border-collapse rounded-lg">
          <thead className="bg-[#f5f5f5]">
            <tr>
              <th className="border p-2 min-w-[450px]">Data Brand</th> {/* Tambahkan min-w-[450px] */}
              <th className="border p-2">Stock</th>
              <th className="border p-2">Active</th>
              <th className="border p-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {brands.map(brand => (
              <tr key={brand.name}>
                {' '}
                {/* Gunakan brand.name sebagai key */}
                <td className="border p-2">{brand.name}</td>
                <td className="border p-2 text-center">
                  <input
                    type="number"
                    className="border border-gray-300 rounded px-2 py-1 text-center w-16"
                    value={stockInputs[brands.indexOf(brand)] || ''}
                    onChange={e => handleStockInputChange(brands.indexOf(brand), e)}
                  />
                  <span className="text-gray-500 ml-1">Qty</span>
                </td>
                <td className="border p-2 text-center">
                  <label className="switch">
                    <input
                      type="checkbox"
                      checked={brand.isActive}
                      onChange={() => handleToggleActive(brands.indexOf(brand))}
                    />
                    <span className="slider round" />
                  </label>
                </td>
                <td className="border p-2 text-center items-center justify-center ">
                  <button className="text-blue-500 hover:underline mr-2" type="button">
                    <IconEditing color="#235696" />
                  </button>
                  <button
                    className="text-red-500 hover:underline"
                    onClick={() => handleDeleteBrand(brands.indexOf(brand))}
                    type="button"
                  >
                    <IconDelete />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default AddWithTable
