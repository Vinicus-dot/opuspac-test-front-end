<template>
  <nav class="bg-gray-800 p-4 shadow-lg">
    <div class="container mx-auto flex justify-between items-center">
      <div class="text-white text-xl font-bold hover:text-gray-300 transition-colors duration-200">Ocuspac Teste</div>
      <div>
        <ul class="flex space-x-6">
          <li>
            <router-link 
              to="/" 
              class="text-gray-300 hover:text-white transition-colors duration-200 font-medium px-3 py-2 rounded-md hover:bg-gray-700"
            >
              Home
            </router-link>
          </li>
          <li v-if="isAuthenticated">
            <router-link 
              to="/orders" 
              class="text-gray-300 hover:text-white transition-colors duration-200 font-medium px-3 py-2 rounded-md hover:bg-gray-700"
            >
              Orders
            </router-link>
          </li>
          <li v-if="isAuthenticated">
            <router-link 
              to="/products" 
              class="text-gray-300 hover:text-white transition-colors duration-200 font-medium px-3 py-2 rounded-md hover:bg-gray-700"
            >
              Produtos
            </router-link>
          </li>
          <li v-if="!isAuthenticated">
            <router-link 
              to="/auth" 
              class="text-gray-300 hover:text-white transition-colors duration-200 font-medium px-3 py-2 rounded-md hover:bg-gray-700"
            >
              Login
            </router-link>
          </li>
          <li v-if="isAuthenticated">
            <router-link 
              to="/auth" 
              class="text-gray-300 hover:text-white transition-colors duration-200 font-medium px-3 py-2 rounded-md hover:bg-gray-700"
              @click.prevent="logout"
            >
              Logout
            </router-link>
          </li>
          
        </ul>
      </div>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const isAuthenticated = computed(() => {
  return !!localStorage.getItem('token')
})

const logout = () => {
  localStorage.removeItem('token');
}
</script>

<style scoped>
.router-link-active {
  color: white;
  background-color: rgb(55, 65, 81);
}
</style>
