import type { Order } from '@/models/Order';
import axios from 'axios';

export default class OrderService {
    private baseUrl: string = import.meta.env.VITE_URL_API_ORDERS + '/api/orders';

    async getOrders(): Promise<Order[]> { 
        try {
            const response = await axios.get(`${this.baseUrl}`);
            console.log('response', this.baseUrl);
            return response.data as Order[]; 
        } catch (error) {
            throw new Error('Erro ao buscar pedidos');
        }
    }
}
