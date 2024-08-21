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
    submenu: [],
  },
  {
    id: 'BookingAsset-02',
    name: 'Booking Asset Data',
    href: '/management',
    icon: 'IconManagement',
    submenu: [
      { id: 'RoomData-01', name: 'Room Data', href: '/management/room' },
      { id: 'PodsData-02', name: 'Pods Data', href: '/management/pods' },
      { id: 'BallroomData-03', name: 'Ballroom Data', href: '/management/ballroom' },
      { id: 'VehicleData-04', name: 'Vehicle Data', href: '/management/vehicle' },
      { id: 'FormBAST-05', name: 'Form BAST', href: '/management/form-bast' },
      { id: 'AssetData-06', name: 'Asset Data', href: '/management/asset' },
      { id: 'ManpowerData-07', name: 'Manpower Data', href: '/management/manpower' },
      { id: 'TimeLimitManagement-08', name: 'Time limit Management', href: '/management/time-limit-management' },
    ],
  },
  {
    id: 'BuildingManagement-03',
    name: 'Building Management',
    href: '/building-management',
    icon: 'IconBuilding',
    submenu: [],
  },
  {
    id: 'MonitoringPesan-04',
    name: 'Monitoring Pesan',
    href: '/monitoring-pesan',
    icon: 'IconMonitorPesan',
    submenu: [
      { id: 'BookingAsset-01', name: 'Booking Asset', href: '/monitoring-pesan/booking' },
      { id: 'BuildingMaintenance-02', name: 'Building Maintenance', href: '/monitoring-pesan/maintenance' },
    ],
  },
  {
    id: 'CalendarEvent-05',
    name: 'Calendar of Event',
    href: '/calendar-event',
    icon: 'IconCalendar',
    submenu: [],
  },
  {
    id: 'MasterData-06',
    name: 'Master Data',
    href: '/master/location',
    icon: 'IconMasterData',
    submenu: [
      { id: 'ManageLokasi-01', name: 'Manage Lokasi', href: '/master/location' },
      { id: 'ManageRoom-02', name: 'Manage Room', href: '/master/room-facility' },
      { id: 'ManageBuilding-03', name: 'Manage Building', href: '/master/building' },
      { id: 'ManageVehicle-04', name: 'Manage Vehicle', href: '/master/fuel' },
      { id: 'ManageYear-05', name: 'Manage Year', href: '/master/year' },
      { id: 'ManageKontenMenu-06', name: 'Manage Konten Menu', href: '/master/konten-menu' },
    ],
  },
  {
    id: 'AccountManagement-07',
    name: 'Account Management',
    href: '/account-management',
    icon: 'IconAccountManagement',
    submenu: [
      { id: 'UserManagement-01', name: 'User Management', href: '/account-management/user' },
      { id: 'RoleManagement-02', name: 'Role Management', href: '/account-management/role' },
    ],
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
