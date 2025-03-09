import axios from 'axios';
import type { Product } from '@/models/Products';
import type { ListResponse } from '@/models/ListResponse';

export default class ProductService {
    private baseUrl: string = import.meta.env.VITE_URL_API_PRODUCTS + '/api/products';

    async getProducts(pageNumber: number, pageSize: number): Promise<ListResponse<Product>> {
        try {
            console.log('valores',pageNumber, pageSize)
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
            return response.data as ListResponse<Product>; 
        } catch (error: any) {
            throw new Error('Erro ao buscar produtos: ' + error.response?.data?.Message || 'Erro desconhecido');
        }
    }

    async createProduct(product: {
        name: string;
        price: number;
        description: string;
    }) {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.post(`${this.baseUrl}`, product, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            if (response.status !== 201) {
                throw new Error('Erro ao criar produto');
            }

        } catch (error: any) {
            throw new Error('Erro ao criar produto: ' + error.response?.data?.Message || 'Erro desconhecido');
        }
    }
}