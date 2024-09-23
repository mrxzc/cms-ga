export const dataRoom = {
  room_capacity: {
    total_rooms: 100,
    booked_rooms: 24,
    available_rooms: 76,
  },
  meeting_room_status: {
    total_meeting_rooms: 24,
    booked: 8,
    available: 16,
  },
  floor_stock: [
    {
      floor_name: 'Lantai 1',
      available_rooms: '1/2',
      rooms: [
        {
          room_name: 'Pods A',
          status: 'Available',
        },
        {
          room_name: 'Pods B',
          status: 'Booked',
        },
      ],
    },
    {
      floor_name: 'Lantai 2',
      available_rooms: '1/2',
      rooms: [
        {
          room_name: 'Pods A',
          status: 'Available',
        },
        {
          room_name: 'Pods B',
          status: 'Booked',
        },
      ],
    },
    {
      floor_name: 'Lantai 3',
      available_rooms: '1/2',
    },
    {
      floor_name: 'Lantai 4',
      available_rooms: '1/2',
    },
    {
      floor_name: 'Lantai 5',
      available_rooms: '1/2',
    },
    {
      floor_name: 'Lantai 6',
      available_rooms: '1/2',
    },
    {
      floor_name: 'Lantai 7',
      available_rooms: '1/2',
    },
  ],
}
