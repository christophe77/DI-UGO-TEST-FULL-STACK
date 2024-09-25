import { lazy, LazyExoticComponent } from 'react';

type Route = {
	path: string;
	component: LazyExoticComponent<() => JSX.Element>;
};
const Home = lazy(() => import('./pages/Home/Home'));
const Customers = lazy(() => import('./pages/Customers/Customers'));
const Orders = lazy(() => import('./pages/CustomerOrders/CustomerOrders'));

export const routes: Route[] = [
	{ path: '/', component: Home },
	{ path: '/orders', component: Orders },
	{ path: '/customers', component: Customers },
];