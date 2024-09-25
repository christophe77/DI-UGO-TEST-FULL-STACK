import { Customer } from '../types/customer';
import { Order } from '../types/order';
import { baseUrl } from './config';

export async function getCustomers() {
	try {
		const response = await fetch(`${baseUrl}/customers`);
		const customers: Customer[] = await response.json();
		return customers;
	} catch {
		return [];
	}
}
export async function getOrdersByCustomerId(cid: number) {
	try {
		const response = await fetch(`${baseUrl}/customers/${cid}/orders`);
		const orders: Order[] = await response.json();
		return orders;
	} catch {
		return [];
	}
}
