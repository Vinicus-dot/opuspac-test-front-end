<template>
  <div v-if="isOpen" class="modal-overlay">
    <div class="modal-content">
      <h2 class="text-2xl font-bold mb-4">Criar Novo Produto</h2>
      
      <form @submit.prevent="handleSubmit">
        <div class="form-group">
          <label for="name">Nome:</label>
          <input 
            type="text" 
            id="name" 
            v-model="product.name" 
            required
          >
        </div>

        <div class="form-group">
          <label for="price">Preço:</label>
          <input 
            type="number" 
            id="price" 
            v-model="product.price" 
            min="0"
            required
          >
        </div>

        <div class="form-group">
          <label for="description">Descrição:</label>
          <textarea 
            id="description" 
            v-model="product.description"
          ></textarea>
        </div>

        <div class="modal-buttons">
          <button type="submit">Salvar</button>
          <button type="button" @click="closeModal">Cancelar</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import ProductService from '@/api/ProductService'
import { useToast } from 'vue-toastification';

interface Product {
  name: string;
  price: number;
  description: string;
}

export default defineComponent({
  name: 'NewProduct',
  props: {
    isOpen: {
      type: Boolean,
      required: true
    },
    isCreated: {
      type: Boolean,
      required: true
    }
  },
  emits: ['close','created'],
  setup(props, { emit }) {
    const productService = new ProductService()
    const toast = useToast()
    const product = ref<Product>({
      name: '',
      price: 0,
      description: ''
    })

    const handleSubmit = async () => {
      if (product.value.price < 0) {
        toast.error('O preço não pode ser menor que 0')
        return
      }
      
      try {
        const createdProduct = await productService.createProduct(product.value)
        emit('created', createdProduct)
        closeModal()
        toast.success('Produto criado com sucesso')
      } catch (error) {
        toast.error('Erro ao criar produto: ' + (error instanceof Error ? error.message : 'Erro desconhecido'))
      }
    }

    const closeModal = () => {
      product.value = {
        name: '',
        price: 0,
        description: ''
      }
      emit('close')
    }

    return {
      product,
      handleSubmit,
      closeModal
    }
  }
})
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.6);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  backdrop-filter: blur(4px);
}

.modal-content {
  background-color: white;
  padding: 2.5rem;
  border-radius: 12px;
  width: 90%;
  max-width: 500px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
  animation: modalFadeIn 0.3s ease-out;
}

@keyframes modalFadeIn {
  from {
    opacity: 0;
    transform: translateY(-20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.form-group {
  margin-bottom: 1.5rem;
}

.form-group label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 500;
  color: #333;
}

.form-group input,
.form-group textarea {
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #e0e0e0;
  border-radius: 6px;
  font-size: 1rem;
  transition: border-color 0.2s, box-shadow 0.2s;
}

.form-group input:focus,
.form-group textarea:focus {
  outline: none;
  border-color: #4CAF50;
  box-shadow: 0 0 0 3px rgba(76, 175, 80, 0.1);
}

.modal-buttons {
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
  margin-top: 2rem;
}

button {
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-weight: 500;
  transition: transform 0.1s, background-color 0.2s;
}

button:hover {
  transform: translateY(-1px);
}

button:active {
  transform: translateY(0);
}

button[type="submit"] {
  background-color: #4CAF50;
  color: white;
}

button[type="submit"]:hover {
  background-color: #45a049;
}

button[type="button"] {
  background-color: #f44336;
  color: white;
}

button[type="button"]:hover {
  background-color: #e53935;
}
</style>
