import axios from 'axios';
import type { Product } from '@/models/Products';

export default class ProductService {
    private baseUrl: string = import.meta.env.VITE_URL_API_PRODUCTS + '/api/products';

    async getProducts(): Promise<Product[]> {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.get(`${this.baseUrl}`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            return response.data; 
        } catch (error: any) {
            throw new Error('Erro ao buscar produtos'+ error.response.data.Message);
        }
    }
}