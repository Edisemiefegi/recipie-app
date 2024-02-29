<template>
  <main class="w-full min-h-screen max-w-screen-lg sm:max-w-full">
    <navbar />

    <section class="md:w-10/12 mx-auto flex flex-col mt-10 gap-4 py-10 px-4">
      <div class="flex flex-col sm:flex-row gap-6 justify-between">
        <p class="text-sm md:text-2xl sm:text-xl font-semibold">
          What do you want to cook today?
        </p>
        <searchbarVue
          @searchInput="searchText = $event"
          @onSearch="searchMeal"
        />
      </div>
      <filterItemList
        :class="searchText !== '' ? 'hidden' : 'visible'"
        :filterData="filterData"
        @select="getrecipeData($event)"
      />

      <div>
        <div
          v-if="(filterOptions = true)"
          class="grid grid-cols-1 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 gap-4"
        >
          <foodcard
            :recipeDetails="receipe"
            v-for="receipe in recipeDetails"
            :key="receipe"
          />
        </div>
        <div v-if="!load && recipeDetails == null">
          <p class="font-medium text-xl text-center">
            Result not found Please search by the name of the food!
          </p>
        </div>
        <div v-if="load">
          <loadercard />
        </div>
      </div>
    </section>

    <footersection />
  </main>
</template>

<script setup>
import loadercard from "../components/loadercard.vue";
import foodcard from "../components/foodcard.vue";
import footersection from "../components/footersection.vue";
import navbar from "../components/navbar.vue";
import searchbarVue from "../components/searchbar.vue";
import filterItemList from "../components/filterItemList.vue";

import { onMounted, ref, computed, watch } from "vue";
import axios from "axios";
import { useRoute, useRouter } from "vue-router";

const route = useRoute();
const router = useRouter();

const activeFilter = computed(() => route.query.filter);
const filterOptions = ref(false);
const filterData = ref([]);
const recipeDetails = ref([]);
const searchText = ref("");
const load = ref(false);

console.log(recipeDetails.value);

const filterType = ref({
  Category: "c",
  Ingredient: "i",
  Area: "a",
});

const getFilterData = async () => {
  try {
    let type = filterType.value[activeFilter.value];

    const url = `https://www.themealdb.com/api/json/v1/1/list.php?${type}=list`;

    const res = await axios.get(url);

    const data = res.data?.meals;
    console.log("DATA", data);
    if (!data || !data.length) return;

    filterData.value = data?.map((item) => {
      const itemName = `str${activeFilter.value}`; //eg strCategory or strArea
      const name = item[itemName]; // item.strCategory or item.strIngredient

      return {
        name,
      };
    });

    if (filterData.value.length) {
      const firstFilterItem = filterData.value[0].name;
      getrecipeData(firstFilterItem);
    }
    // console.log(filterData.value);
  } catch (error) {
    console.log(error);
  } finally {
    console.log("gotten api");
  }
};

const getrecipeData = async (activeItem) => {
  try {
    let type = filterType.value[activeFilter.value];

    const url = `https://www.themealdb.com/api/json/v1/1/filter.php?${type}=${activeItem}`;

    const res = await axios.get(url);
    // console.log(res, "receipe");

    const data = res.data?.meals;
    console.log("DATA", data);

    recipeDetails.value = data;
  } catch (error) {
    console.log(error);
  } finally {
    // console.log("gotten api");s
  }
};

const searchMeal = async () => {
  if (searchText.value.trim()) {
    load.value = true;
    try {
      const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchText.value}`;

      console.log(searchText.value, "search");

      const res = await axios.get(url);

      console.log(res.data);

      recipeDetails.value = res.data.meals;
      load.value = false;
    } catch (error) {
      console.log(error);
    } finally {
      console.log("finally");
    }
  }
};

watch(activeFilter, () => {
  getFilterData();
});

watch(searchText, () => {
  if (searchText.value.trim() == "") {
    getFilterData();
  }
});

onMounted(() => {
  getFilterData();
});
</script>

<style></style>
