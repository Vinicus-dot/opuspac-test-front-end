import axios from 'axios';
import type { Product } from '@/models/Products';
export default class ProductService {
    private baseUrl: string = import.meta.env.VITE_URL_API_PRODUCTS + '/api/products';

    async getProducts(): Promise<Product[]> {
        try {
            const response = await axios.get(`${this.baseUrl}`);
            return response.data; 
        } catch (error) {
            throw new Error('Erro ao buscar produtos');
        }
    }
}