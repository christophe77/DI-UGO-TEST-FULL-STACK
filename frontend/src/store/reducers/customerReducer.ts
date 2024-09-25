import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { Customer } from '../../types/customer';

interface CustomerState {
	customerStateIsLoading : boolean;
	customers: Customer[];
}

const initialState = { customers: [], customerStateIsLoading: true } as CustomerState;

const customerSlice = createSlice({
	name: 'customer',
	initialState,
	reducers: {
		setCustomers(state, action: PayloadAction<Customer[]>) {
			state.customers = action.payload;
		},
		setCustomerStateIsLoading(state, action: PayloadAction<boolean>) {
			state.customerStateIsLoading = action.payload;
		},
	},
});

export const { setCustomers, setCustomerStateIsLoading } = customerSlice.actions;
export default customerSlice.reducer;
