<template>
  <main class="h-fit w-screen bg-primary-light border">
    <div v-if="recipie">
      <div class="h-[330px] w-full">
        <img
          :src="recipie.strMealThumb"
          class="w-full h-full object-cover rounded-b-3xl relative"
          alt=""
        />
      </div>
      <div
        class="w-96 bg-white p-5 text-primary text-center rounded-lg absolute top-72 -translate-x-2/4 left-1/2"
      >
        <p class="font-bold text-xl">{{ recipie.strMeal }}</p>
        <p>{{ recipie.strArea }}</p>
      </div>
      <div class="">
        <div class="w-3/4 mx-auto py-20 flex gap-5 flex-col">
          <div class="flex flex-wrap gap-2">
            <div v-for="(ingredient, i) in ingredients" :key="i">
              <p class="list-disc bg-primary p-2 text-white text-sm rounded-lg">
                {{ ingredient }}
              </p>
            </div>
          </div>
          <div
            class="border text-center w-full h-[300px] max-w-lg border-black"
          >
            <iframe
              class="h-full w-full"
              frameborder="0"
              allowfullscreen
              :src="formatYoutubeStr(recipie.strYoutube)"
            ></iframe>
          </div>
          <div class="bg-white w-full p-5 px-8 flex flex-col gap-5">
            <p class="font-bold text-primary text-lg">instructions :</p>
            <p class="text-primary text-sm leading-relaxed text-justify">
              {{ recipie.strInstructions }}
            </p>
          </div>
        </div>
      </div>
    </div>
    <div v-else>Something went wrong</div>
  </main>
</template>

<script setup>
import { onMounted, ref } from "vue";
import axios from "axios";
import { useRoute } from "vue-router";

const route = useRoute();

const recipie = ref(null);
const ingredients = ref([]);

const getrecipeData = async () => {
  try {
    const id = route.params.id;

    console.log(id);

    const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`;

    const res = await axios.get(url);
    // console.log(res, "receipe");

    const data = res.data?.meals;
    console.log(data);

    recipie.value = data[0];
    console.log(recipie.value);
    getIngredients();

    console.log("DATA", recipie.value, recipie.value.name);
  } catch (error) {
    console.log(error);
  } finally {
    // console.log("gotten api");
  }
};

const formatYoutubeStr = (url) => {
  const base = "https://www.youtube.com/embed";

  const key = url.split("=")[1];

  return `${base}/${key}`;
};

const getIngredients = () => {
  Object.keys(recipie.value).map((key) => {
    if (!key.includes("strIngredient")) return;

    const ingredient = recipie.value[key];
    if (ingredient) {
      ingredients.value.push(ingredient);
    }
  });
};

onMounted(() => {
  getrecipeData();
});
</script>

<style></style>
