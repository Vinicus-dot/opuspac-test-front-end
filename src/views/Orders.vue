<template>
  <div>
    <NavBar />
    <div class="min-h-screen bg-gray-100 py-8 px-4 sm:px-6 lg:px-8">
      <div class="max-w-6xl mx-auto">
        <h1 class="text-3xl font-bold text-gray-900 mb-6">Lista de Pedidos</h1>
        <div class="bg-white shadow-md rounded-lg overflow-hidden">
          <table v-if="orders.data.length > 0" class="min-w-full divide-y divide-gray-200">
            <thead class="bg-gray-50">
              <tr>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Mensagem</th>
              </tr>
            </thead>
            <tbody class="bg-white divide-y divide-gray-200">
              <tr v-for="order in orders.data" :key="order.id" class="hover:bg-gray-50">
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{{ order.id }}</td>
                <td class="px-6 py-4 whitespace-normal text-sm text-gray-500">{{ order.message }}</td>
              </tr>
            </tbody>
          </table>
          <div v-else class="p-6 text-center">
            <p class="text-gray-500 text-lg">Nenhum pedido de serviço encontrado.</p>
          </div>
          <Pagination 
            v-if="orders.total > orders.pageSize"
            :total-items="orders.total"
            :items-per-page="orders.pageSize"
            :modelValue="orders.pageNumber"
            @update:modelValue="handlePageChange"
            class="mt-4"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import OrdersService from '@/api/OrderService';
import NavBar from '@/components/NavBar.vue';
import Pagination from '@/components/Pagination.vue';
import type { Order } from '@/models/Order';
import type { ListResponse } from '@/models/ListResponse';
import { useToast } from 'vue-toastification';
import { defineComponent, ref, onMounted } from 'vue';

export default defineComponent({
  name: 'Orders',
  components: {
    NavBar,
    Pagination
  },
  setup() {
    const orders = ref<ListResponse<Order>>({
      data: [],
      total: 0,
      pageNumber: 1,
      pageSize: 10
    });
    const toast = useToast();

    const loadOrders = async (page: number = 1) => {
      try {
        const orderService = new OrdersService();
        const response = await orderService.getOrders(page, orders.value.pageSize);
        orders.value = {
          data: [...response.data],
          total: response.total,
          pageSize: response.pageSize || 10,
          pageNumber: page
        };
      } catch (error: any) {
        toast.error('Erro ao carregar pedidos');
      }
    };

    const handlePageChange = async (page: number) => {
      if (page !== orders.value.pageNumber) {
        await loadOrders(page);
      }
    };

    onMounted(() => {
      loadOrders();
    });

    return {
      orders,
      loadOrders,
      handlePageChange
    };
  },
  computed: {
    totalPages() {
      return Math.ceil(this.orders.total / this.orders.pageSize);
    }
  }
});
</script>

<style scoped>

</style>
