import Paper from '@mui/material/Paper';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import Title from '../../components/Title/Title';
import Description from '../../components/Description/Description';
import LoadingSpinner from '../../components/LoadingSpinner/LoadingSpinner';
import BackButton from '../../components/BackButton/BackButton';
import useCustomerOrders from './useCustomerOrders';
import './CustomerOrders.css';

export default function CustomerOrders() {
	const { orders, lastname, sumOrders, isLoading } = useCustomerOrders();

	const paginationModel = { page: 0, pageSize: 5 };

	const columns: GridColDef[] = [
		{
			field: 'last_name',
			headerName: 'Last name',
			width: 100,
			renderCell: () => lastname,
		},
		{
			field: 'purchaseIdentifier',
			headerName: 'Purchase identifier',
			width: 110,
		},
		{ field: 'productId', headerName: 'Product id', width: 160 },
		{ field: 'quantity', headerName: 'Quantity', width: 160 },
		{
			field: 'price',
			headerName: 'Price',
			width: 160,
			valueGetter: (_value, row) => {
				return `${row.price || '0'} ${row.currency || ''}`;
			},
		},
		{ field: 'date', headerName: 'Date', width: 130 },
	];

	function CustomFooter() {
		return (
			<p className="datagrid-footer">
				Total : <b>{sumOrders}eur</b>
			</p>
		);
	}

	return (
		<>
			<Title title="Orders" />
			<Description description={`Customer : ${lastname}`} />
			<BackButton link="/customers" />
			<Paper sx={{ height: 400, width: '100%' }}>
				{isLoading && <LoadingSpinner />}
				{!isLoading && orders?.length > 0 && (
					<DataGrid
						rows={orders}
						getRowId={(row) => row.purchaseIdentifier}
						columns={columns}
						disableColumnFilter
						disableColumnMenu
						disableColumnSorting
						disableColumnSelector
						disableColumnResize
						initialState={{ pagination: { paginationModel } }}
						pageSizeOptions={[5, 10]}
						slots={{
							footer: CustomFooter,
						}}
					/>
				)}
			</Paper>
		</>
	);
}
