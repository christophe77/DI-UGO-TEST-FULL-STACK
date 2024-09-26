import React, { Suspense, useEffect } from 'react';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { getCustomers } from './api/customer';
import { routes } from './routes';
import { setCustomers, setCustomerStateIsLoading } from './store/reducers/customerReducer';
import Layout from './components/Layout/Layout';
import LoadingSpinner from './components/LoadingSpinner/LoadingSpinner';
import { Customer } from './types/customer';
import './App.css';

function App() {
	const dispatch = useDispatch();

	useEffect(() => {
		const fetchCustomers = async () => {
			const customers: Customer[] = await getCustomers();
			dispatch(setCustomers(customers));
			dispatch(setCustomerStateIsLoading(false));
		};
		dispatch(setCustomerStateIsLoading(true));
		fetchCustomers();
	}, []);

	return (
		<BrowserRouter>
			<Routes>
				<Route element={<Layout />}>
					{routes.map(({ path, component: Component }) => (
						<Route
							key={path}
							path={path}
							element={
								<Suspense fallback={<LoadingSpinner />}>
									<Component />
								</Suspense>
							}
						/>
					))}
				</Route>
			</Routes>
		</BrowserRouter>
	);
}

export default App;
