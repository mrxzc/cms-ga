'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import IconChevronBottom from '@assets/icons/IconChevronBottom'
import IconDot from '@assets/icons/IconDot'
import { ICON_MENU } from '@utils/list'

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

  const [isHovering, setIsHovering] = useState(false)
  const [openSubmenus, setOpenSubmenus] = useState<Set<string>>(new Set())

  const handleMouseEnter = () => {
    setIsHovering(true)
  }

  const handleMouseLeave = () => {
    setIsHovering(false)
  }

  const isActive = (item: any): boolean => {
    if (pathname === item.href) return true
    if (item.submenu) {
      return item.submenu.some((subItem: any) => isActive(subItem))
    }
    return false
  }

  const isSubMenuActive = (subItem: any): boolean => {
    return (
      pathname === subItem.href || (subItem.submenu && subItem.submenu.some((child: any) => isSubMenuActive(child)))
    )
  }

  const toggleSubMenu = (submenuId: string) => {
    setOpenSubmenus(prev => {
      const newSet = new Set(prev)
      if (newSet.has(submenuId)) {
        newSet.delete(submenuId)
      } else {
        newSet.add(submenuId)
      }
      return newSet
    })
  }

  const isSubmenuOpen = (submenuId: string) => {
    return openSubmenus.has(submenuId)
  }

  return (
    <div key={index}>
      <div
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onClick={() => item.submenu && toggleSubMenu(item.id)}
        onKeyDown={() => {}}
      >
        <Link href={item.href || '#'}>
          <li
            className={`text-sm font-semibold my-1 py-2 px-3 flex flex-row items-center ${
              isActive(item) || isSubMenuActive(item) ? 'bg-menuColor rounded-lg text-teksActive' : 'text-teksBlack'
            } ${isHovering ? 'bg-menuColor rounded-lg text-teksActive' : ''}`}
            onKeyDown={() => {}}
          >
            <div className="mr-2">
              <ListMenu color={isActive(item) || isSubMenuActive(item) || isHovering ? '#235696' : '#0A0A0A'} />
            </div>
            {item.name}
            {item.submenu && item.submenu.length > 0 && (
              <IconChevronBottom
                className={`ml-auto transition-transform duration-300 ${isSubmenuOpen(item.id) ? 'rotate-180' : ''}`}
              />
            )}
          </li>
        </Link>
      </div>

      {item.submenu && item.submenu.length > 0 && isSubmenuOpen(item.id) && (
        <ul className="submenu ml-4">
          {item.submenu.map((subItem: any, subIndex: number) => (
            <React.Fragment key={subIndex}>
              <li
                className={`text-sm py-1 my-1 px-3 flex flex-row items-center ${
                  isSubMenuActive(subItem) ? 'bg-menuColor rounded-lg text-teksActive' : 'text-teksBlack'
                }`}
                onClick={() => subItem.submenu && toggleSubMenu(subItem.id)}
                onKeyDown={() => {}}
              >
                <Link href={subItem.href || '#'}>
                  <div className="flex flex-row gap-2 items-center">
                    <IconDot color={isSubMenuActive(subItem) ? '#235696' : '#0A0A0A'} />
                    {subItem.name}
                  </div>
                </Link>
                {subItem.submenu && subItem.submenu.length > 0 && (
                  <IconChevronBottom
                    className={`ml-auto transition-transform duration-300 ${
                      isSubmenuOpen(subItem.id) ? 'rotate-180' : ''
                    }`}
                  />
                )}
              </li>

              {subItem.submenu && subItem.submenu.length > 0 && isSubmenuOpen(subItem.id) && (
                <ul className="submenu ml-4">
                  {subItem.submenu.map((childSubItem: any, childSubIndex: number) => (
                    <React.Fragment key={childSubIndex}>
                      <li
                        className={`text-sm py-1 my-1 px-3 flex flex-row items-center ${
                          pathname === childSubItem.href ? 'bg-menuColor rounded-lg text-teksActive' : 'text-teksBlack'
                        }`}
                        onClick={() => childSubItem.submenu && toggleSubMenu(childSubItem.id)}
                        onKeyDown={() => {}}
                      >
                        <Link href={childSubItem.href || '#'}>
                          <div className="flex flex-row gap-2 items-center">
                            <IconDot color={pathname === childSubItem.href ? '#235696' : '#0A0A0A'} />
                            {childSubItem.name}
                          </div>
                        </Link>
                        {childSubItem.submenu && childSubItem.submenu.length > 0 && (
                          <IconChevronBottom
                            className={`ml-auto transition-transform duration-300 ${
                              isSubmenuOpen(childSubItem.id) ? 'rotate-180' : ''
                            }`}
                          />
                        )}
                      </li>

                      {childSubItem.submenu && childSubItem.submenu.length > 0 && isSubmenuOpen(childSubItem.id) && (
                        <ul className="submenu ml-4">
                          {childSubItem.submenu.map((grandChildSubItem: any, grandChildSubIndex: number) => (
                            <li
                              key={grandChildSubIndex}
                              className={`text-sm py-1 my-1 px-3 ${
                                pathname === grandChildSubItem.href
                                  ? 'bg-menuColor rounded-lg text-teksActive'
                                  : 'text-teksBlack'
                              }`}
                              onKeyDown={() => {}}
                            >
                              <Link href={grandChildSubItem.href || '#'}>
                                <div className="flex flex-row gap-2 items-center">
                                  <IconDot color={pathname === grandChildSubItem.href ? '#235696' : '#0A0A0A'} />
                                  {grandChildSubItem.name}
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
