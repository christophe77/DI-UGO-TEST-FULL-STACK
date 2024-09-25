import { Outlet } from 'react-router-dom';
import Navigation from '../Navigation/Navigation';
import './Layout.css';

export default function Layout() {
	return (
		<>
			<Navigation />
			<div className="layout-container">
				<Outlet />
			</div>
		</>
	);
}
