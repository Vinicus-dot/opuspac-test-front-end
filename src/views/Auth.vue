<template>
  <div class="min-h-screen bg-gradient-to-br from-indigo-50 to-white flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
    <div class="max-w-md w-full space-y-8 bg-white p-8 rounded-xl shadow-lg">
      <div>
        <h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900 tracking-tight">
          {{ isLogin ? 'Login' : 'Criar conta' }}
        </h2>
      </div>

      <form class="mt-8 space-y-6" @submit.prevent="handleSubmit">
        <div v-if="!isLogin" class="rounded-md">
          <label for="name" class="block text-sm font-medium text-gray-700">
            Nome
          </label>
          <div class="mt-1">
            <input
              id="name"
              v-model="form.name"
              type="text"
              required
              class="appearance-none relative block w-full px-3 py-2 border border-gray-300 rounded-lg placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition duration-200"
            />
          </div>
        </div>

        <div>
          <label for="email" class="block text-sm font-medium text-gray-700">
            Email
          </label>
          <div class="mt-1">
            <input
              id="email"
              v-model="form.email"
              type="email"
              required
              class="appearance-none relative block w-full px-3 py-2 border border-gray-300 rounded-lg placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition duration-200"
            />
          </div>
        </div>

        <div>
          <label for="password" class="block text-sm font-medium text-gray-700">
            Senha
          </label>
          <div class="mt-1">
            <input
              id="password"
              v-model="form.password"
              type="password"
              required
              class="appearance-none relative block w-full px-3 py-2 border border-gray-300 rounded-lg placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition duration-200"
            />
          </div>
        </div>

        <div>
          <button
            type="submit"
            class="group relative w-full flex justify-center py-3 px-4 border border-transparent rounded-lg text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-200 transform hover:scale-[1.02]"
          >
            {{ isLogin ? 'Entrar' : 'Registrar' }}
          </button>
        </div>
      </form>

      <div class="mt-6">
        <button
          @click="isLogin = !isLogin"
          class="w-full text-center text-sm text-indigo-600 hover:text-indigo-700 font-medium transition duration-200"
        >
          {{ isLogin ? 'Criar nova conta' : 'Já possui conta? Faça login' }}
        </button>
      </div>

      <div class="mt-4">
        <router-link
          to="/"
          class="w-full flex justify-center text-sm text-gray-500 hover:text-gray-700 font-medium transition duration-200"
        >
          Home
        </router-link>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, reactive } from 'vue'
import AuthService from '@/api/AuthService'
import { useToast } from 'vue-toastification';
import { useRouter } from 'vue-router';
export default defineComponent({
  name: 'Auth',
  setup() {
    const authService = new AuthService()
    const isLogin = ref(true)
    const form = reactive({
      email: '',
      password: '',
      name: ''
    })
    const router = useRouter(); 

    const handleSubmit = async () => {
      const toast = useToast()
      if (!form.email.trim()) {
        toast.error('O email é obrigatório')
        return
      }

      if (!form.password.trim()) {
        toast.error('A senha é obrigatória')
        return
      }

      if (!isLogin.value && !form.name.trim()) {
        toast.error('O nome é obrigatório')
        return
      }

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      if (!emailRegex.test(form.email)) {
        toast.error('Por favor, insira um email válido')
        return
      }

      try {
        if (isLogin.value) {
            await authService.login(form.email, form.password)
            toast.success('Login realizado com sucesso')
            await new Promise(resolve => setTimeout(resolve, 2000));
            router.push('/products') 
        } else {
          await authService.register(form.email, form.password, form.name)
          toast.success('Registro realizado com sucesso')
          await new Promise(resolve => setTimeout(resolve, 1000));
          form.email = ''
          form.password = ''
          form.name = ''
          isLogin.value = true
        }
        
      } catch (error: any) {
        toast.error(error.message)
      }
    }

    return {
      isLogin,
      form,
      handleSubmit
    }
  }
})
</script>

<style scoped>
.from-indigo-50 {
  --tw-gradient-from: #eef2ff;
  --tw-gradient-stops: var(--tw-gradient-from), var(--tw-gradient-to, rgb(238 242 255 / 0));
}

input:-webkit-autofill,
input:-webkit-autofill:hover,
input:-webkit-autofill:focus {
  -webkit-box-shadow: 0 0 0px 1000px white inset;
  transition: background-color 5000s ease-in-out 0s;
}
</style>
