export default [
  { heading: 'Suivi & Evaluation' },
  { title: 'Homepage', to: 'apps-homepage', target: '_blank' },
  {
    title: 'Absentéisme',
    icon: { icon: 'tabler-run' },
    children: [
      {
        title: 'Pointages',
        to: 'dashboards-checkins',
      },
    ],
  },
  {
    title: 'Projets & Activités',
    icon: { icon: 'tabler-3d-cube-sphere' },
    children: [
      { title: 'Projets', to: 'apps-project-list' },
      { title: 'Fiche Projet', to: { name: 'apps-project-view-id', params: { id: '5036' } }, disable: true },
    ],
  },
]
  