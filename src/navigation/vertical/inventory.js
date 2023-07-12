export default [
  { heading: 'Devices Inventory' },
  {
    title: 'Devices',
    icon: { icon: 'tabler-layout-list' },
    children: [
      { title: 'IP Phones', to: 'apps-device-list' },
      { title: 'Printers', to: 'apps-device-list-printers' },
    ],
  },
]
