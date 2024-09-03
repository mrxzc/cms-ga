import IconAccountManagement from '@assets/icons/IconAccountManagement'
import IconBookingAsset from '@assets/icons/IconBookingAsset'
import IconBuildingManagement from '@assets/icons/IconBuildingManagement'
import IconCalendar from '@assets/icons/IconCalendar'
import IconHomeFill from '@assets/icons/IconHomeFill'
import IconMasterData from '@assets/icons/IconMasterData'
import IconMonitorPesan from '@assets/icons/IconMonitorPesan'
import IconUserManagement from '@assets/icons/IconPerformance'
import IconUser from '@assets/icons/IconUser'

const MENU_HEADER = [
  {
    id: '1',
    name: 'Dashboard',
    href: '/',
    icon: 'IconHomeFill',
    submenu: [],
  },
  {
    id: '2',
    name: 'Booking Asset Data',
    href: '',
    icon: 'IconManagement',
    submenu: [
      {
        id: '2.1',
        name: 'Room Data',
        href: '/management/room',
        submenu: [],
      },
      {
        id: '2.2',
        name: 'Pods Data',
        href: '/management/pods',
        submenu: [],
      },
      {
        id: '2.3',
        name: 'Ballroom Data',
        href: '/management/ballroom',
        submenu: [],
      },
      {
        id: '2.4',
        name: 'Vehicle Data',
        href: '/management/vehicle',
        submenu: [],
      },
      {
        id: '2.5',
        name: 'Form BAST',
        href: '/management/form-bast',
        submenu: [],
      },
      {
        id: '2.6',
        name: 'Asset Data',
        href: '/management/asset',
        submenu: [],
      },
      {
        id: '2.7',
        name: 'Manpower Data',
        href: '/management/manpower',
        submenu: [],
      },
      {
        id: '2.8',
        name: 'Time limit Management',
        href: '/management/time-limit-management',
        submenu: [],
      },
      {
        id: '2.9',
        name: 'Approval Bucket',
        href: '/management/approval-bucket',
        submenu: [],
      },
      {
        id: '2.10',
        name: 'Pengembalian Barang',
        href: '/management/product-return',
        submenu: [],
      },
    ],
  },
  {
    id: '3',
    name: 'Building Management',
    href: '',
    icon: 'IconBuilding',
    submenu: [
      {
        id: '3.1',
        name: 'Building Maintenance',
        href: '',
        submenu: [
          {
            id: '3.1.1',
            name: 'Pengajuan Perbaikan',
            href: '/building-management/maintenance/repair-asset',
          },
          {
            id: '3.1.2',
            name: 'Report Kondisi Cabang',
            href: '/building-management/maintenance/report-condition',
          },
        ],
      },
      {
        id: '3.2',
        name: 'EHS',
        href: '',
        submenu: [
          {
            id: '3.2.1',
            name: 'Waste Management',
            href: '/building-management/EHS/waste-management',
          },
          {
            id: '3.2.2',
            name: 'Penggunaan Air',
            href: '/building-management/EHS/water-management',
          },
          {
            id: '3.2.3',
            name: 'Penggunaan BBM',
            href: '/building-management/EHS/fuel-management',
          },
          {
            id: '3.2.4',
            name: 'Penggunaan Listrik',
            href: '/building-management/EHS/electricity-management',
          },
        ],
      },
      {
        id: '3.3',
        name: 'Security Guard',
        href: '',
        submenu: [
          {
            id: '3.3.1',
            name: 'ManpowerSG',
            href: '/building-management/security-guard/manpower-sg',
          },
          {
            id: '3.3.2',
            name: 'SOI',
            href: '/building-management/security-guard/soi',
          },
        ],
      },
      {
        id: '3.4',
        name: 'Cleaning Service',
        href: '',
        submenu: [
          {
            id: '3.4.1',
            name: 'Manpower CS',
            href: '/building-management/cleaning-service/manpower-cs',
          },
          {
            id: '3.4.2',
            name: 'PenilaianCS',
            href: '/building-management/cleaning-service/rating-cs',
          },
        ],
      },
      {
        id: '3.5',
        name: 'Time Limit Management',
        href: '/building-management/time-limit-management',
        submenu: [],
      },
    ],
  },
  {
    id: '4',
    name: 'Monitoring Pesan',
    href: '',
    icon: 'IconMonitorPesan',
    submenu: [
      {
        id: '4.1',
        name: 'Booking Asset',
        href: '/monitoring-pesan/booking',
        submenu: [],
      },
      {
        id: '4.2',
        name: 'Building Maintenance',
        href: '/monitoring-pesan/maintenance',
        submenu: [],
      },
    ],
  },
  {
    id: '5',
    name: 'Calendar of Event',
    href: '/calendar-event',
    icon: 'IconCalendar',
    submenu: [],
  },
  {
    id: '6',
    name: 'Master Data',
    href: '',
    icon: 'IconMasterData',
    submenu: [
      {
        id: '6.1',
        name: 'Manage Lokasi',
        href: '/master/location',
        submenu: [],
      },
      {
        id: '6.2',
        name: 'Manage Room',
        href: '',
        submenu: [
          {
            id: '6.2.1',
            name: 'Manage Lantai Ruangan',
            href: '/master/room-floor',
          },
          {
            id: '6.2.2',
            name: 'Manage Kapasitas Ruangan',
            href: '/master/room-capacity',
          },
          {
            id: '6.2.3',
            name: 'Manage Fasilitas Ruangan',
            href: '/master/room-facility',
          },
        ],
      },
      {
        id: '6.3',
        name: 'Manage Building',
        href: '',
        submenu: [
          {
            id: '6.3.1',
            name: 'Manage Kondisi Cabang',
            href: '/master/building-condition',
          },
          {
            id: '6.3.2',
            name: 'Manage Penilaian',
            href: '/master/building-rating',
          },
        ],
      },
      {
        id: '6.4',
        name: 'Manage Vehicle',
        href: '',
        submenu: [
          {
            id: '6.4.1',
            name: 'Manage Brand Mobil',
            href: '/master/car-brand',
          },
          {
            id: '6.4.2',
            name: 'Manage Tipe Mobil',
            href: '/master/car-type',
          },
          {
            id: '6.4.3',
            name: 'Manage Bahan Bakar',
            href: '/master/fuel',
          },
        ],
      },
      {
        id: '6.5',
        name: 'Manage Year',
        href: '/master/year',
        submenu: [],
      },
      {
        id: '6.6',
        name: 'Manage Konten Menu',
        href: '/master/konten-menu',
        submenu: [],
      },
    ],
  },
  {
    id: '7',
    name: 'Account Management',
    href: '',
    icon: 'IconAccountManagement',
    submenu: [
      {
        id: '7.1',
        name: 'User Management',
        href: '/account-management/user',
        submenu: [],
      },
      {
        id: '7.2',
        name: 'Role Management',
        href: '/account-management/role',
        submenu: [],
      },
    ],
  },
  {
    id: '8',
    name: 'User Management',
    href: '',
    icon: 'IconUserManagement',
    submenu: [
      {
        id: '8.1',
        name: 'List User',
        href: '/user-management',
        submenu: [],
      },
      {
        id: '8.2',
        name: 'Verification Request',
        href: '/user-management/verification',
        submenu: [],
      },
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
  IconUserManagement: ({ color }: { color: string }) => <IconUserManagement className="w-6 h-6" color={color} />,
}

export { ICON_MENU, MENU_HEADER }
