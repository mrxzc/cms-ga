'use client'

import IconChevronBottom from '@assets/icons/IconChevronBottom'
import { ICON_MENU } from '@utils/list'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'

export interface ListInterface {
  index: number
  item: any
  id?: string
  name?: string
  href?: string
  icon?: keyof typeof ICON_MENU
  submenu?: ListInterface[]
}

export function MenuList({ item, index }: Readonly<ListInterface>) {
  const pathname = usePathname()
  const ListMenu = ICON_MENU[item.icon as keyof typeof ICON_MENU]
  const [activeSubMenuId, setActiveSubMenuId] = useState<string | null>(null)

  const toggleSubMenu = (submenuId: string) => {
    setActiveSubMenuId(prev => (prev === submenuId ? null : submenuId))
  }

  const [isHovering, setIsHovering] = useState(false)
  const [isSubMenuOpen, setIsSubMenuOpen] = useState(false)

  const handleMouseEnter = () => {
    setIsHovering(true)
    if (item.submenu) {
      setIsSubMenuOpen(true)
    }
  }

  const handleMouseLeave = () => {
    setIsHovering(false)
    if (item.submenu) {
      setIsSubMenuOpen(false)
    }
  }

  const isActive = (item: any): boolean => {
    if (pathname === item.href) return true
    if (item.submenu) {
      return item.submenu.some((subItem: any) => isActive(subItem))
    }
    return false
  }

  return (
    <div key={index}>
      <div
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onKeyDown={() => {}}
        onClick={() => item.submenu && toggleSubMenu(item.id)}
      >
        <Link href={item.href}>
          <li
            className={`
              text-sm font-semibold my-1 py-2 px-3 flex flex-row items-center 
              ${isActive(item) ? 'bg-menuColor rounded-lg text-teksActive' : 'text-teksBlack'} 
              ${isHovering ? 'bg-menuColor rounded-lg text-teksActive' : ''} 
            `}
          >
            <div className="mr-2">
              <ListMenu color={isActive(item) || isHovering ? '#235696' : '#0A0A0A'} />
            </div>
            {item.name}
            {item.submenu && item.submenu.length > 0 && (
              <IconChevronBottom
                className={`ml-auto transition-transform duration-300 ${isSubMenuOpen ? 'rotate-180' : ''}`}
              />
            )}
          </li>
        </Link>
      </div>

      {/* Submenu */}
      {item.submenu && item.submenu.length > 0 && activeSubMenuId === item.id && (
        <ul className="submenu">
          {item.submenu.map((subItem: any, subIndex: number) => (
            <li
              key={subIndex}
              className={`
                text-sm py-1 font-semibold my-1 px-3 flex flex-row items-center 
                ${pathname === subItem.href ? 'bg-menuColor rounded-lg text-teksActive' : 'text-teksBlack'} 
              `} // Hanya terapkan gaya active jika pathname cocok dengan subItem.href
            >
              <Link href={subItem.href}>● {subItem.name}</Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export function MenuNav({ item, index }: Readonly<ListInterface>) {
  const pathname = usePathname()
  const ListMenu = ICON_MENU[item.icon as keyof typeof ICON_MENU]

  const [isHovering, setIsHovering] = useState(false)

  return (
    <div key={index}>
      <Link href={item.href}>
        <li
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => setIsHovering(false)}
          className={`${
            pathname === item.href ? ' rounded-lg text-[#235696]' : 'text-teksBlack'
          } text-[10px] font-semibold my-1 py-2 px-3 hover:rounded-lg hover:text-[#235696] flex flex-col justify-center items-center`}
        >
          <div className="mb-2">
            <ListMenu color={pathname === item.href || isHovering ? '#235696' : '#0A0A0A'} />
          </div>
          {item.name}
        </li>
      </Link>
    </div>
  )
}
