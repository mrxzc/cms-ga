'use client'

import useNamePage from '@hooks/useNamePage'
import { MenuList } from '@components/atoms/menuList'
import { MENU_HEADER } from '@utils/list'
import { pageWithlist } from '@utils/regex'
import LogoutButton from '@components/atoms/logoutButton'

export default function Menu() {
  const pageName = useNamePage()

  if (!pageWithlist.test(pageName)) {
    return null
  }

  return (
    <ul className="bg-primary h-screen hidden md:block shadow-[0px_0px_20px_0px_#00000024] overflow-y-auto hide-scrollbar">
      <div className="py-6 px-3 items-center flex-col w-[240px] z-[999]">
        {MENU_HEADER.map((item, index) => (
          <MenuList key={item.id} item={item} index={index} />
        ))}
      </div>
      <LogoutButton />
    </ul>
  )
}
