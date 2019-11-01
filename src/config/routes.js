import HomePage from '@/pages/HomePage';
import BlankLayout from '@/layouts/BlankLayout';
import Details from '../pages/Details';

const routerConfig = [
  {
    path: '/',
    component: BlankLayout,
    children: [
      { path: '/zhzs/:id', component: Details },
      {
        path: '/',
        component: HomePage,
      },
    ],
  },
];

export default routerConfig;
