import IconAccountManagement from '@assets/icons/IconAccountManagement'
import IconBookingAsset from '@assets/icons/IconBookingAsset'
import IconBuildingManagement from '@assets/icons/IconBuildingManagement'
import IconCalendar from '@assets/icons/IconCalendar'
import IconHomeFill from '@assets/icons/IconHomeFill'
import IconMasterData from '@assets/icons/IconMasterData'
import IconMonitorPesan from '@assets/icons/IconMonitorPesan'
import IconUser from '@assets/icons/IconUser'

const MENU_HEADER = [
  {
    id: 'Dashboard-01',
    name: 'Dashboard',
    href: '/',
    icon: 'IconHomeFill',
    submenu: ['/booking-asset', '/room', '/schedule', '/schedule-room', '/meeting-room'],
  },
  {
    id: 'BookingAsset-02',
    name: 'Booking Asset Data',
    href: '/management',
    icon: 'IconManagement',
    submenu: ['/management/asset', '/management/vehicle', '/management/manpower'],
  },
  {
    id: 'BuildingManagement-03',
    name: 'Building Management',
    href: '/management',
    icon: 'IconBuilding',
    submenu: ['/management/asset', '/management/vehicle', '/management/manpower'],
  },
  {
    id: 'MonitoringPesan-04',
    name: 'Monitoring Pesan',
    href: '/management',
    icon: 'IconMonitorPesan',
    submenu: ['/management/asset', '/management/vehicle', '/management/manpower'],
  },
  {
    id: 'CalendarEvent-05',
    name: 'Calendar of Event',
    href: '/management',
    icon: 'IconCalendar',
    submenu: ['/management/asset', '/management/vehicle', '/management/manpower'],
  },
  {
    id: 'MasterData-06',
    name: 'Master Data',
    href: '/management',
    icon: 'IconMasterData',
    submenu: ['/management/asset', '/management/vehicle', '/management/manpower'],
  },
  {
    id: 'AccountManagement-07',
    name: 'Account Management',
    href: '/management',
    icon: 'IconAccountManagement',
    submenu: ['/management/asset', '/management/vehicle', '/management/manpower'],
  },
]

const ICON_MENU = {
  IconHomeFill: ({ color }: { color: string }) => <IconHomeFill className="w-6 h-6" color={color} />,
  IconUser: ({ color }: { color: string }) => <IconUser className="w-6 h-6" color={color} />,
  IconManagement: ({ color }: { color: string }) => <IconBookingAsset className="w-6 h-6" color={color} />,
  IconBooking: ({ color }: { color: string }) => <IconBookingAsset className="w-6 h-6" color={color} />,
  IconBuilding: ({ color }: { color: string }) => <IconBuildingManagement className="w-6 h-6" color={color} />,
  IconMonitorPesan: ({ color }: { color: string }) => <IconMonitorPesan className="w-6 h-6" color={color} />,
  IconCalendar: ({ color }: { color: string }) => <IconCalendar className="w-6 h-6" color={color} />,
  IconMasterData: ({ color }: { color: string }) => <IconMasterData className="w-6 h-6" color={color} />,
  IconAccountManagement: ({ color }: { color: string }) => <IconAccountManagement className="w-6 h-6" color={color} />,
}

export { ICON_MENU, MENU_HEADER }
