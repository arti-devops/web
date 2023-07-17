export default [
  { heading: 'Inventaires' },
  {
    title: 'Devices',
    icon: { icon: 'tabler-layout-list' },
    children: [
      { title: 'Téléphones', to: 'apps-device-list' },
      { title: 'Imprimantes', to: 'apps-device-list-printers' },
      { title: 'Ordinateurs', to: 'apps-device-list-computers' },
    ],
  },
]
