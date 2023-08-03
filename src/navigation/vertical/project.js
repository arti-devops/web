export default [
  { heading: 'Suivi & Evaluation' },
  {
    title: 'Absentéisme',
    icon: { icon: 'tabler-run' },
    children: [
      {
        title: 'Pointages',
        to: 'dashboards-checkins',
        action: 'read',
        subject: 'Dashboards',
      },
    ],
  },
  {
    title: 'Projets & Activités',
    icon: { icon: 'tabler-3d-cube-sphere' },
    children: [
      { title: 'Projets', to: 'apps-project-list', action: 'read', subject: 'Dashboards' },
      { title: 'Fiche Projet', to: { name: 'apps-project-view-id', params: { id: '5036' } }, disable: true, action: 'read', subject: 'Dashboards' },
    ],
  },
]
  