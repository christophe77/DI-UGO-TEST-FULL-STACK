import Paper from '@mui/material/Paper';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import Title from '../../components/Title/Title';
import Description from '../../components/Description/Description';
import LoadingSpinner from '../../components/LoadingSpinner/LoadingSpinner';
import { useSelector } from 'react-redux';
import type { RootState } from '../../store/store';
import './Customers.css';

export default function Customers() {
	const customers = useSelector((state: RootState) => state.customer.customers);
	const isLoading = useSelector(
		(state: RootState) => state.customer.customerStateIsLoading,
	);
	const paginationModel = { page: 0, pageSize: 5 };

	const columns: GridColDef[] = [
		{ field: 'customerId', headerName: 'Id', width: 100 },
		{
			field: 'title',
			headerName: 'Title',
			width: 110,
		},
		{ field: 'firstname', headerName: 'First name', width: 160 },
		{ field: 'lastname', headerName: 'Last name', width: 160 },
		{
			field: 'postalCode',
			headerName: 'Postal code',
			width: 160,
		},
		{ field: 'city', headerName: 'City', width: 130 },
		{ field: 'email', headerName: 'Email', width: 130 },
		{
			field: 'showOrder',
			headerName: '',
			width: 130,
			renderCell: (params) => {
				return <a href={`orders?customerId=${params.row.customerId}&lastname=${params.row.lastname}`}>Show orders</a>;
			},
		},
	];

	return (
		<>
			<Title title="Customers" />
			<Description description="Check out our happy customers" />
			<Paper sx={{ height: 400, width: '100%' }}>
				{isLoading && <LoadingSpinner />}
				{!isLoading && customers.length > 0 && (
					<DataGrid
						rows={customers}
						getRowId={(row) => row.customerId}
						columns={columns}
						disableColumnFilter
						disableColumnMenu
						disableColumnSorting
						disableColumnSelector
						disableColumnResize
						initialState={{ pagination: { paginationModel } }}
						pageSizeOptions={[5, 10]}
					/>
				)}
			</Paper>
		</>
	);
}
