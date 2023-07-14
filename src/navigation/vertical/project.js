export default [
  { heading: 'Suivi & Evaluation' },
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
    ],
  },
]
  