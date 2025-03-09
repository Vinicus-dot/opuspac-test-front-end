<template>
  <div class="flex items-center justify-center my-4">
    <button 
      @click="prevPage" 
      :disabled="currentPage === 1"
      class="bg-blue-500 text-white px-4 py-2 rounded-md mr-2 disabled:bg-gray-300 disabled:cursor-not-allowed"
    >
      Anterior
    </button>
    <span class="text-gray-700">Página {{ currentPage }} de {{ totalPages }}</span>
    <button 
      @click="nextPage" 
      :disabled="currentPage === totalPages"
      class="bg-blue-500 text-white px-4 py-2 rounded-md ml-2 disabled:bg-gray-300 disabled:cursor-not-allowed"
    >
      Próxima
    </button>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed, watch } from 'vue';

export default defineComponent({
  name: 'Pagination',
  props: {
    totalItems: {
      type: Number,
      required: true
    },
    itemsPerPage: {
      type: Number,
      required: true
    },
    modelValue: {
      type: Number,
      required: true
    }
  },
  setup(props, { emit }) {
    const currentPage = ref(props.modelValue);

    watch(() => props.modelValue, (newValue) => {
      currentPage.value = newValue;
    });

    const totalPages = computed(() => {
      return Math.ceil(props.totalItems / props.itemsPerPage);
    });

    const prevPage = () => {
      if (currentPage.value > 1) {
        currentPage.value--;
        emit('update:modelValue', currentPage.value);
        emit('page-changed', currentPage.value);
      }
    };

    const nextPage = () => {
      if (currentPage.value < totalPages.value) {
        currentPage.value++;
        emit('update:modelValue', currentPage.value);
        emit('page-changed', currentPage.value);
      }
    };

    return {
      currentPage,
      totalPages,
      prevPage,
      nextPage
    };
  }
});
</script>

<style scoped>

</style>
