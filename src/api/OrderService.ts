import type { Order } from '@/models/Order';
import axios from 'axios';

export default class OrderService {
    private baseUrl: string = import.meta.env.VITE_URL_API_ORDERS + '/api/orders';

    async getOrders(): Promise<Order[]> { 
        try {
            const token = localStorage.getItem('token');
            const response = await axios.get(`${this.baseUrl}`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            return response.data as Order[]; 
        } catch (error) {
            throw new Error('Erro ao buscar pedidos');
        }
    }
}
