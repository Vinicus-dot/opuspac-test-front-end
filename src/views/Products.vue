<template>
  <div class="min-h-screen bg-gray-50">
    <NavBar />
    <div class="max-w-7xl mx-auto p-6">
      <h1 class="text-3xl font-bold mb-6 text-gray-800 border-b pb-2">Lista de Produtos</h1>
      <button @click="openModal" class="bg-blue-500 text-white px-4 py-2 rounded-md">Novo Produto</button>
      <NewProduct 
        :isOpen="isModalOpen"
        @close="closeModal"
        @created="createProduct"
        :isCreated="isCreated"
        />
      <div v-if="products.data.length > 0" class="mt-4 bg-white rounded-lg shadow-md overflow-hidden">
        <table class="w-full border-collapse">
          <thead>
            <tr>
              <th class="border-b bg-gray-100 p-4 font-semibold text-left text-gray-700">ID</th>
              <th class="border-b bg-gray-100 p-4 font-semibold text-left text-gray-700">Nome</th>
              <th class="border-b bg-gray-100 p-4 font-semibold text-left text-gray-700">Descrição</th>
              <th class="border-b bg-gray-100 p-4 font-semibold text-left text-gray-700">Preço</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="product in products.data" 
                :key="product.id"
                class="hover:bg-blue-50 transition-colors duration-150">
            <td class="border-b border-gray-200 p-4">{{ product.id }}</td>
            <td class="border-b border-gray-200 p-4 font-medium">{{ product.name }}</td>
            <td class="border-b border-gray-200 p-4 text-gray-600">{{ product.description }}</td>
            <td class="border-b border-gray-200 p-4 font-medium text-green-600">
                R$ {{ product.price ? product.price.toFixed(2) : '0.00' }}
            </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div v-else
           class="mt-4 p-6 bg-white rounded-lg shadow-md text-center text-gray-600">
        Nenhum produto encontrado.
      </div>

      <!-- Add Pagination component -->
      <Pagination
        v-if="products.total > products.pageSize"
        :total-items="products.total"
        :items-per-page="products.pageSize"
        :modelValue="products.pageNumber"
        @update:modelValue="handlePageChange"
        class="mt-4"
      />
    </div>
  </div>
</template>

<script lang="ts">
import ProductService from '@/api/ProductService';
import { defineComponent, ref, onMounted, watch } from 'vue';
import NavBar from '@/components/NavBar.vue';
import NewProduct from '@/components/NewProduct.vue';
import Pagination from '@/components/Pagination.vue';
import type { Product } from '@/models/Products';
import type { ListResponse } from '@/models/ListResponse';
import { useToast } from 'vue-toastification';

export default defineComponent({
  name: 'Products',
  components: {
    NavBar,
    NewProduct,
    Pagination
  },
  setup() {
    const products = ref<ListResponse<Product>>({
      data: [],
      total: 0,
      pageNumber: 1,
      pageSize: 10
    });
    const isModalOpen = ref(false);
    const isCreated = ref(false);
    const toast = useToast();

    const loadProducts = async (page: number = 1) => {
      try {
        const productService = new ProductService();
        const response = await productService.getProducts(page, products.value.pageSize);
        
        products.value = {
          data: [...response.data], 
          total: response.total,
          pageSize: response.pageSize || 10,
          pageNumber: page
        };   
      } catch (error: any) {
        toast.error('Erro ao carregar produtos: ' + error.message);
      }
    };

    const openModal = () => {
      isModalOpen.value = true;
    };

    const closeModal = () => {
      isModalOpen.value = false;
    };

    const createProduct = () => {
      isCreated.value = !isCreated.value;
    };

    const handlePageChange = async (page: number) => {
      if (page !== products.value.pageNumber) {
        await loadProducts(page);
      }
    };

    watch(isCreated, () => {
      loadProducts(1);
    });

    onMounted(() => {
      loadProducts();
    });

    return {
      products,
      isModalOpen,
      isCreated,
      openModal,
      closeModal,
      createProduct,
      loadProducts,
      handlePageChange
    };
  },
  computed: {
    totalPages() {
      return Math.ceil(this.products.total / this.products.pageSize);
    }
  }
});
</script>

<style scoped>
.min-h-screen {
  min-height: 100vh;
}

table {
  border-spacing: 0;
}

th, td {
  white-space: nowrap;
}

td {
  vertical-align: middle;
}

tbody tr:last-child td {
  border-bottom: none;
}
</style>
