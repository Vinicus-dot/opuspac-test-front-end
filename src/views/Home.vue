<script setup lang="ts">
import NavBar from '@/components/NavBar.vue';
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const isAuthenticated = ref(false);

const checkAuth = () => {
  const token = localStorage.getItem('token');
  isAuthenticated.value = !!token;
};

onMounted(() => {
  checkAuth();
});

const features = ref([
  {
    title: 'Gerenciamento de Produtos',
    description: 'Crie e gerencie seus produtos de forma simples e eficiente.',
    icon: '📦',
    route: '/products'
  },
  {
    title: 'Ordens de Serviço',
    description: 'Acompanhe todas as ordens de serviço processadas em tempo real.',
    icon: '📋',
    route: '/orders'
  },
  {
    title: 'Autenticação Segura',
    description: 'Sistema seguro de autenticação com JWT para proteger seus dados.',
    icon: '🔒',
    route: '/auth'
  }
]);

const navigateTo = (route: string) => {
  router.push(route);
};
</script>

<template>
  <div class="min-h-screen bg-gray-50">
    <NavBar />
    
    <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <!-- Hero Section -->
      <div class="text-center mb-16">
        <h1 class="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
          Sistema de Gerenciamento Integrado
        </h1>
        <p class="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
          Plataforma completa para gerenciamento de produtos e ordens de serviço com 
          microsserviços integrados via RabbitMQ.
        </p>
      </div>

      <!-- Features Grid -->
      <div class="grid md:grid-cols-3 gap-8 mt-12">
        <div 
          v-for="feature in features" 
          :key="feature.title"
          @click="navigateTo(feature.route)"
          class="bg-white rounded-lg p-8 shadow-lg hover:shadow-xl transition-shadow duration-300 cursor-pointer"
        >
          <div class="text-4xl mb-4">{{ feature.icon }}</div>
          <h3 class="text-xl font-semibold text-gray-900 mb-3">
            {{ feature.title }}
          </h3>
          <p class="text-gray-600">
            {{ feature.description }}
          </p>
        </div>
      </div>

      <!-- Call to Action -->
      <div v-if="!isAuthenticated" class="mt-16 text-center">
        <p class="text-lg text-gray-600 mb-6">
          Comece agora mesmo a utilizar nossa plataforma
        </p>
        <button 
          @click="navigateTo('/auth')"
          class="bg-blue-600 text-white px-8 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors duration-200"
        >
          Fazer Login
        </button>
      </div>
    </main>
  </div>
</template>

<style scoped>
.grid {
  opacity: 0;
  animation: fadeIn 0.6s ease-out forwards;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
