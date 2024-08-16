import IconHistory from '@assets/icons/IconHistory'
import IconHomeFill from '@assets/icons/IconHomeFill'
import IconNotification from '@assets/icons/IconNotification'
import IconUser from '@assets/icons/IconUser'

const MENU_HEADER = [
  {
    id: 'Home-01',
    name: 'Home',
    href: '/',
    icon: 'IconHomeFill',
    submenu: ['/booking-asset', '/room', '/schedule', '/schedule-room', '/meeting-room'],
  },
  {
    id: 'Notification-02',
    name: 'Notification',
    href: '/notification',
    icon: 'IconNotification',
    submenu: [],
  },
  {
    id: 'History-03',
    name: 'History',
    href: '/history',
    icon: 'IconHistory',
    submenu: [],
  },
  {
    id: 'Profile-04',
    name: 'Profile',
    href: '/profile',
    icon: 'IconUser',
    submenu: [],
  },
]

const ICON_MENU = {
  IconHomeFill: ({ color }: { color: string }) => <IconHomeFill className="w-6 h-6" color={color} />,
  IconNotification: ({ color }: { color: string }) => <IconNotification className="w-6 h-6" color={color} />,
  IconHistory: ({ color }: { color: string }) => <IconHistory className="w-6 h-6" color={color} />,
  IconUser: ({ color }: { color: string }) => <IconUser className="w-6 h-6" color={color} />,
}

export { ICON_MENU, MENU_HEADER }
