import type { ListResponse } from '@/models/ListResponse';
import type { Order } from '@/models/Order';
import axios from 'axios';

export default class OrderService {
    private baseUrl: string = import.meta.env.VITE_URL_API_ORDERS + '/api/orders';

    async getOrders(pageNumber: number, pageSize: number): Promise<ListResponse<Order>> { 
        try {
            const token = localStorage.getItem('token');
            const response = await axios.get(`${this.baseUrl}`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                },
                params: {
                    pageNumber,
                    pageSize
                }
            });

            return response.data as ListResponse<Order>; 
        } catch (error) {
            throw new Error('Erro ao buscar pedidos');
        }
    }
}
