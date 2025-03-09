<template>
  <div>
    <NavBar />
    <div class="min-h-screen bg-gray-100 py-8 px-4 sm:px-6 lg:px-8">
      <div class="max-w-6xl mx-auto">
        <h1 class="text-3xl font-bold text-gray-900 mb-6">Lista de Pedidos</h1>
        <div class="bg-white shadow-md rounded-lg overflow-hidden">
          <table v-if="orders.length > 0" class="min-w-full divide-y divide-gray-200">
            <thead class="bg-gray-50">
              <tr>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Mensagem</th>
              </tr>
            </thead>
            <tbody class="bg-white divide-y divide-gray-200">
              <tr v-for="order in orders" :key="order.Id" class="hover:bg-gray-50">
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{{ order.Id }}</td>
                <td class="px-6 py-4 whitespace-normal text-sm text-gray-500">{{ order.Message }}</td>
              </tr>
            </tbody>
          </table>
          <div v-else class="p-6 text-center">
            <p class="text-gray-500 text-lg">Nenhum pedido de serviço encontrado.</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import OrdersService from '@/api/OrderService';
import NavBar from '@/components/NavBar.vue';
import type { Order } from '@/models/Order';
import { useToast } from 'vue-toastification';

export default {
  name: 'Orders',
  components: {
    NavBar
  },
  data() {
    return {
      orders: [] as Order[]
    }
  },
  created() {
    this.loadOrders();
  },
  methods: {
    async loadOrders() {
      try {
        const orderService = new OrdersService();
        this.orders = await orderService.getOrders();
      } catch (error) {
        const toast = useToast()
        toast.error('Erro ao carregar pedidos');
      }
    }
  }
};
</script>

<style scoped>

</style>
