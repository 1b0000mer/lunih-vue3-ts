const nav = [
  {
    component: 'CNavItem',
    name: 'DASHBOARD',
    to: '/management/dashboard',
    icon: 'cilSpeedometer'
  },
  {
    component: 'CNavTitle',
    name: 'CORE'
  },
  {
    component: 'CNavGroup',
    name: 'CATEGORIES',
    to: '/management/categories',
    icon: 'cilGrid',
    items: [
      {
        component: 'CNavItem',
        name: 'FACULTY',
        to: '/management/categories/faculty',
        icon: 'cilInstitution'
      },
      {
        component: 'CNavItem',
        name: 'INDUSTRY',
        to: '/management/categories/industry',
        icon: 'cilSitemap'
      },
      {
        component: 'CNavItem',
        name: 'PROGRAM',
        to: '/management/categories/program',
        icon: 'cilBook'
      }
    ]
  },
  {
    component: 'CNavGroup',
    name: 'USER_ACCOUNT',
    to: '/management/users',
    icon: 'cilGroup',
    items: [
      {
        component: 'CNavItem',
        name: 'STUDENT',
        to: '/management/users/student',
        icon: 'cilEducation'
      },
      {
        component: 'CNavItem',
        name: 'UNIVERSITY',
        to: '/management/users/university',
        icon: 'cilInstitution'
      },
      {
        component: 'CNavItem',
        name: 'COMPANY',
        to: '/management/users/company',
        icon: 'cilFactory'
      },
      {
        component: 'CNavItem',
        name: 'ADMIN',
        to: '/management/users/administrator',
        icon: 'cilUser'
      }
    ]
  },
  {
    component: 'CNavTitle',
    name: 'FUNCTIONS'
  },
  {
    component: 'CNavItem',
    name: 'APPROVE_STUDENT',
    to: '/management/users/student/approve',
    icon: 'cilCheck'
  }
]

export default nav
