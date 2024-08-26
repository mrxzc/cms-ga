'use client'

import IconChevronBottom from '@assets/icons/IconChevronBottom'
import IconDot from '@assets/icons/IconDot'
import { ICON_MENU } from '@utils/list'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React, { useState } from 'react'

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

  const isMenuItemActive = (item: any): boolean => {
    return pathname === item.href
  }

  const isSubMenuActive = (subItem: any): boolean => {
    return (
      pathname === subItem.href ||
      (subItem.submenu && subItem.submenu.some((childSubItem: any) => isMenuItemActive(childSubItem)))
    )
  }

  const isAnySubMenuOrChildActive = (item: any): boolean => {
    if (item.submenu) {
      return item.submenu.some((subItem: any) => {
        return isSubMenuActive(subItem)
      })
    }
    return false
  }

  const toggleSubMenu = (submenuId: string) => {
    // Jika submenu yang sama diklik, tutup. Jika tidak, buka submenu yang sesuai.
    setActiveSubMenuId(prev => (prev === submenuId ? null : submenuId))

    // Pastikan submenu terbuka saat diklik
    if (submenuId !== activeSubMenuId) {
      setIsSubMenuOpen(true)
    }
  }

  const onChildSubMenuClick = () => {
    // Tidak perlu mengubah activeSubMenuId saat child submenu diklik
    // Kita hanya perlu memastikan submenu tetap terbuka
    setIsSubMenuOpen(true)
  }

  return (
    <div key={index}>
      <div
        onKeyDown={() => {}}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onClick={() => item.submenu && toggleSubMenu(item.id)}
      >
        <Link href={item.href}>
          <li
            onKeyDown={() => {}}
            className={`
                text-sm font-semibold my-1 py-2 px-3 flex flex-row items-center 
                ${
                  isMenuItemActive(item) || isAnySubMenuOrChildActive(item)
                    ? 'bg-menuColor rounded-lg text-teksActive'
                    : 'text-teksBlack'
                } 
                ${isHovering ? 'bg-menuColor rounded-lg text-teksActive' : ''} 
              `}
          >
            <div className="mr-2">
              <ListMenu
                color={isMenuItemActive(item) || isAnySubMenuOrChildActive(item) || isHovering ? '#235696' : '#0A0A0A'}
              />
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
        <ul className="submenu ">
          {item.submenu.map((subItem: any, subIndex: string) => (
            <React.Fragment key={subIndex}>
              <li
                className={`
                    text-sm py-1 my-1 px-3 flex flex-row items-center 
                    ${isSubMenuActive(subItem) ? 'bg-menuColor rounded-lg text-teksActive' : 'text-teksBlack'} 
                  `}
                  onKeyDown={() => {}}
              >
                <Link href={subItem.href}>
                  <div className="flex flex-row gap-2 items-center">
                    <IconDot color={isSubMenuActive(subItem) ? '#235696' : '#0A0A0A'} />
                    {subItem.name}
                  </div>
                </Link>
                {subItem.submenu && subItem.submenu.length > 0 && (
                  <IconChevronBottom
                    className={`ml-auto transition-transform duration-300 ${isSubMenuOpen ? 'rotate-180' : ''}`}
                  />
                )}
              </li>

              {/* Child Submenu (jika ada) */}
              {subItem.submenu && subItem.submenu.length > 0 && (
                <ul className={`submenu ml-4 ${activeSubMenuId === item.id ? 'block' : 'hidden'}`}>
                  {subItem.submenu.map((childSubItem: any, childSubIndex: string) => (
                    <li
                    onKeyDown={() => {}}
                      key={childSubIndex}
                      className={`text-sm py-1 my-1 px-3 flex flex-row items-center ${
                        pathname === childSubItem.href ? 'bg-menuColor rounded-lg text-teksActive' : 'text-teksBlack'
                      }`}
                      onClick={onChildSubMenuClick}
                    >
                      <Link href={childSubItem.href}>
                        <div className="flex flex-row gap-2 items-center">
                          <IconDot color={pathname === childSubItem.href ? '#235696' : '#0A0A0A'} />
                          {childSubItem.name}
                        </div>
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </React.Fragment>
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
