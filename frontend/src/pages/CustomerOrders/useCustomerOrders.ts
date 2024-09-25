import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { getOrdersByCustomerId } from '../../api/customer';
import { Order } from '../../types/order';

const useCustomerOrders = () => {
	const [searchParams] = useSearchParams();
	const customerId = Number(searchParams.get('customerId') || 0);
	const lastname = searchParams.get('lastname') || "";
	const [orders, setOrders] = useState<Order[]>([]);
	const [sumOrders, setSumOrders] = useState<number>(0);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		if (customerId && customerId !== 0) {
			const fetchOrdersByCustomerId = async () => {
				setIsLoading(true);
				const customerOrders: Order[] = await getOrdersByCustomerId(customerId);
				if (Array.isArray(orders)) {
					const total = customerOrders.reduce(
						(amount, { price, quantity }) => amount + price * quantity,
						0,
					);
					setSumOrders(total);
					setOrders(customerOrders);
				} else {
					setSumOrders(0);
					setOrders([]);
				}
				setIsLoading(false);
			};
			fetchOrdersByCustomerId();
		}
	}, [customerId]);

	return {
		orders,
		lastname,
		sumOrders,
		isLoading,
	};
};
export default useCustomerOrders;
