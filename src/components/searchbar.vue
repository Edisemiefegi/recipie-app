<template>
  <div class="w-full sm:w-2/5 flex border border-primary rounded-3xl p-2">
    <input
      type="text"
      name=""
      id=""
      @keyup.enter="Search"
      @input="emit('searchInput', $event.target.value)"
      placeholder="search.."
      class="outline-none px-7 w-3/4 text-sm placeholder:text-primary-light"
    />
    <div class="w-2/12">
      <i class="pi pi-search text-primary text-end" @click="Search"></i>
    </div>
  </div>
</template>

<script setup>
import { ref, defineEmits } from "vue";

const emit = defineEmits(["onSearch", "searchInput"]);

const Search = () => {
  emit("onSearch");
};
</script>

<style></style>
