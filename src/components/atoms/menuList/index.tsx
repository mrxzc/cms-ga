'use client'

import { ListInterface } from '@interfaces/listInterfaces'
import { ICON_MENU } from '@utils/list'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'

export function MenuList({ item, index }: Readonly<ListInterface>) {
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
            pathname === item.href ? 'bg-menuColor rounded-lg text-teksActive' : 'text-teksBlack'
          } text-base font-semibold my-1 py-2 px-3 hover:bg-menuColor hover:rounded-lg hover:text-teksActive flex flex-row items-center`}
        >
          <div className="mr-2">
            <ListMenu color={pathname === item.href || isHovering ? '#235696' : '#0A0A0A'} />
          </div>
          {item.name}
        </li>
      </Link>
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
