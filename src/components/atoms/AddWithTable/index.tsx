import React, { useEffect, useState } from 'react'

import SelectInput from '@components/atoms/Form/Select'
import IconDelete from '@assets/icons/IconDelete'
import IconEditing from '@assets/icons/IconEditing'
import IconAlertDelete from '@assets/icons/IconAlertDelete'
import TextInput from '../Form/TextInput'
import { Modal } from '../ModalCustom'

export interface BrandData {
  name: string
  stock: number
  isActive: boolean
}

interface BrandManagementProps {
  initialBrands?: BrandData[]
  selectOptions: { value: string; label: string }[]
  onAddBrand?: (newBrand: BrandData) => void
  onUpdateBrand?: (updatedBrand: BrandData, index: number) => void
  onDeleteBrand?: (index: number) => void
  onUpdateSelectOptions?: (newOptions: { value: string; label: string }[]) => void
  onBrandsChange?: (brands: BrandData[]) => void
}

const AddWithTable: React.FC<BrandManagementProps> = ({
  initialBrands = [],
  selectOptions,
  onAddBrand,
  onUpdateBrand,
  onDeleteBrand,
  onUpdateSelectOptions,
  onBrandsChange,
}) => {
  const [brands, setBrands] = useState<BrandData[]>(initialBrands)
  const [selectedOption, setSelectedOption] = useState<any>(null)
  const [isModalDeleteOpen, setIsModalDeleteOpen] = useState(false)
  const [isModalEditOpen, setIsModalEditOpen] = useState(false)
  const [brandToDelete, setBrandToDelete] = useState<number | null>(null)

  const [editIndex, setEditIndex] = useState<number | null>(null)
  const [newStock, setNewStock] = useState<number>(0)
  const [newIsActive, setNewIsActive] = useState<boolean>(true)
  const [newName, setNewName] = useState<string>('')

  useEffect(() => {
    setBrands(initialBrands)
  }, [initialBrands])

  // Handle adding a new brand
  const handleAddBrand = () => {
    if (selectedOption) {
      const newBrand: BrandData = {
        name: selectedOption.value,
        stock: newStock,
        isActive: newIsActive,
      }
      const updatedBrands = [...brands, newBrand]
      setBrands(updatedBrands)
      setSelectedOption(null)
      setNewStock(0)
      setNewIsActive(true)

      // Send updated brands to parent
      onBrandsChange?.(updatedBrands)

      // Update selectOptions in the parent component
      onUpdateSelectOptions?.(selectOptions.filter(option => option.value !== selectedOption.value))

      // Trigger callback for adding a new brand
      onAddBrand?.(newBrand)
    }
  }

  const handleUpdateBrand = (index: number, updatedBrand: BrandData) => {
    const updatedBrands = [...brands]
    updatedBrands[index] = updatedBrand
    setBrands(updatedBrands)

    // Trigger callback for updating brand
    onUpdateBrand?.(updatedBrand, index)
    onBrandsChange?.(updatedBrands)
  }

  // Handle deleting a brand with confirmation
  const confirmDeleteBrand = (index: number) => {
    setBrandToDelete(index)
    setIsModalDeleteOpen(true)
  }

  const handleDeleteBrand = () => {
    if (brandToDelete === null) return

    const deletedBrand = brands[brandToDelete]
    const updatedBrands = brands.filter((_, i) => i !== brandToDelete)
    setBrands(updatedBrands)
    setIsModalDeleteOpen(false)

    // Send updated brands to parent
    onBrandsChange?.(updatedBrands)

    // Trigger delete callback
    onDeleteBrand?.(brandToDelete)

    // Add deleted option back to selectOptions
    onUpdateSelectOptions?.([...selectOptions, { value: deletedBrand.name, label: deletedBrand.name }])
  }

  // Handle brand selection change
  const handleSelectChange = (selectedOption: any) => {
    setSelectedOption(selectedOption)
  }

  // Handle toggling brand active state
  const handleToggleActive = (index: number) => {
    const updatedBrand = { ...brands[index], isActive: !brands[index].isActive }
    handleUpdateBrand(index, updatedBrand)
  }

  // Handle stock changes
  const handleStockChange = (index: number, stock: number) => {
    const updatedBrand = { ...brands[index], stock }
    handleUpdateBrand(index, updatedBrand)
  }

  // Handle opening edit modal
  const openEditModal = (index: number) => {
    const brandToEdit = brands[index]
    setNewName(brandToEdit.name)
    setEditIndex(index)
    setIsModalEditOpen(true)
  }

  const handleCloseModal = () => {
    setIsModalDeleteOpen(false)
    setIsModalEditOpen(false)
    setEditIndex(null)
    setBrandToDelete(null)
  }

  const handleEditBrand = () => {
    if (editIndex !== null) {
      const updatedBrand = {
        ...brands[editIndex],
        name: newName,
      }

      handleUpdateBrand(editIndex, updatedBrand)
      handleCloseModal()
    }
  }

  useEffect(() => {
    if (editIndex !== null && !selectedOption) {
      // Only update if editing and no selected option
      const brandToEdit = brands[editIndex]
      setNewName(brandToEdit.name)
    }
  }, [editIndex, selectedOption])

  return (
    <div>
      {/* Form Add Brand */}
      <div className="flex">
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
          type="button"
        >
          + Add
        </button>
      </div>

      {/* Brand Table */}
      <div className="overflow-y-auto max-h-[250px] mt-1 hide-scrollbar">
        <table className="w-full max-w-[850px] border-collapse rounded-lg">
          <thead className="bg-[#f5f5f5]">
            <tr>
              <th className="border p-2 min-w-[450px]">Data Brand</th>
              <th className="border p-2">Stock</th>
              <th className="border p-2">Active</th>
              <th className="border p-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {brands.map((brand, index) => (
              <tr key={brand.name}>
                <td className="border p-2">{brand.name}</td>
                <td className="border p-2 text-center">
                  <input
                    type="number"
                    className="border border-gray-300 rounded px-2 py-1 text-center w-16"
                    value={brand.stock || ''}
                    onChange={e => handleStockChange(index, parseInt(e.target.value) || 0)}
                  />
                </td>
                <td className="border p-2 text-center">
                  <label className="switch">
                    <input
                      type="checkbox"
                      className="toggle toggle-accent"
                      checked={brand.isActive}
                      onChange={() => handleToggleActive(index)}
                    />
                    <span className="slider round" />
                  </label>
                </td>
                <td className="border p-2 text-center">
                  <button
                    className="text-blue-500 hover:underline mr-2"
                    onClick={() => openEditModal(index)}
                    type="button"
                  >
                    <IconEditing color="#235696" />
                  </button>
                  <button
                    className="text-red-500 hover:underline"
                    onClick={() => confirmDeleteBrand(index)}
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

      {/* Delete Confirmation Modal */}
      <Modal isOpen={isModalDeleteOpen} backdropDismiss backdropClick={handleCloseModal} isFloating={true}>
        <div className="p-4 bg-white rounded relative flex flex-col items-center">
          <IconAlertDelete />
          <h2 className="text-heading m semibold-21 mb-2">Hapus Data</h2>
          <p className="text-paragraph regular-14 text-[#717171] mb-4">Apakah anda yakin ingin menghapus data ini?</p>
          <div className="flex justify-center gap-4 items-end">
            <button
              className="bg-white border-[#ea394b] border text-[#ea394b] w-full min-w-[180px] max-h-[45px] px-12 py-3 rounded-md text-heading xs semibold-16"
              type="button"
              onClick={handleCloseModal}
            >
              Batal
            </button>
            <button
              className="bg-[#ea394b] text-white w-full min-w-[180px] max-h-[45px] px-12 py-3 rounded-md text-heading xs semibold-16"
              type="button"
              onClick={handleDeleteBrand}
            >
              Ya, Hapus
            </button>
          </div>
        </div>
      </Modal>

      {/* Edit Brand Modal */}
      <Modal isOpen={isModalEditOpen} backdropDismiss backdropClick={handleCloseModal} isFloating={true}>
        <div className="p-4 bg-white rounded relative flex flex-col items-center">
          <h2 className="text-heading m semibold-21 mb-2">Edit Brand Asset</h2>
          <TextInput
            type="text"
            placeholder="Enter new brand name"
            value={newName}
            onChange={e => setNewName(e.target.value)}
            className="mb-2"
          />
          <div className="flex justify-center gap-4 items-center">
            <button
              className="bg-[#e5f2fc] text-[#235696] w-full min-w-[180px] max-h-[45px] px-12 py-3 rounded-md text-heading xs semibold-16"
              type="button"
              onClick={handleCloseModal}
            >
              Cancel
            </button>
            <button
              className="bg-[#235696] text-white w-full min-w-[180px] max-h-[45px] px-12 py-3 rounded-md text-heading xs semibold-16"
              type="button"
              onClick={handleEditBrand}
            >
              Submit
            </button>
          </div>
        </div>
      </Modal>
    </div>
  )
}

export default AddWithTable
