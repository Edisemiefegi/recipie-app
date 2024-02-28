<template>
  <nav class="w-full p-3 bg-primary-light flex justify-center items-center">
    <div class="mx-auto md:w-10/12 w-full flex justify-between">
      <p class="text-primary text-xl font-bold">
        Edi<span class="text-white">Recipes</span>
      </p>
      <div
        class="flex justify-between text-primary w-1/3 sm:w-1/6 text-sm font-medium"
      >
        <div class="relative">
          <button class="hover:underline" @click="toggledropdown">
            Filter
          </button>

          <div
            v-if="showcategory"
            class="absolute bg-white rounded shadow-md w-36"
          >
            <router-link
              @click="handlefilter(item)"
              v-for="item in filters"
              :key="item"
              to=""
              :class="
                activefilter === item.name
                  ? 'bg-gray-200 hover:bg-gray-0'
                  : 'bg-gray-50 hover:bg-gray-100'
              "
              class="block px-4 py-2 text-gray-800"
              >{{ item.name }}</router-link
            >
          </div>
        </div>

        <router-link to="" class="hover:underline cursor-pointer"
          >About</router-link
        >
      </div>
    </div>
  </nav>
</template>

<script setup>
import { computed, onMounted, ref, watch } from "vue";
import { useRoute, useRouter } from "vue-router";

const showcategory = ref(false);

const toggledropdown = () => {
  showcategory.value = !showcategory.value;
  // console.log(showcategory.value);
};

const route = useRoute();
const router = useRouter();

const filters = ref([
  { name: "Category" },
  { name: "Ingredient" },
  { name: "Area" },
]);

const handlefilter = (item) => {
  router.push({ query: { filter: item.name } });
  showcategory.value = !showcategory.value;

  // console.log(item);
};
// console.log(route.query.filter);

const activefilter = computed(() => route.query?.filter);

watch(
  activefilter,
  () => {
    if (!activefilter.value) {
      router.push({ query: { filter: filters.value[0].name } });
    }
  },
  { immediate: true }
);
</script>

<style></style>
