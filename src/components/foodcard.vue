<template>
  <div>
    <div
      class="flex flex-col rounded-xl w-full gap-2 p-3 shadow-lg flex-shrink-0"
    >
      <div class="w-full h-40" @click="getItemRecipie">
        <img
          :src="props.recipeDetails.strMealThumb"
          class="object-cover h-full w-full rounded-md cursor-pointer"
          alt=""
        />
      </div>
      <p class="font-medium text-sm cursor-pointer" @click="getItemRecipie">
        {{ recipeDetails.strMeal }}
      </p>
      <p class="text-xs text-primary">{{ randomeTime() }}min</p>
    </div>
  </div>
</template>

<script setup>
import { defineProps, defineEmits } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();

const emit = defineEmits(["recipieId"]);

const props = defineProps({
  recipeDetails: {
    type: Object,
    default: () => [],
  },
});

const getItemRecipie = () => {
  router.push({
    name: "Recipie",
    params: { id: `${props.recipeDetails.idMeal}` },
  });
  emit("recipieId");
};

const randomeTime = (start = 5, end = 30) => {
  return Math.floor(Math.random() * (end - start)) + start;
};
</script>

<style></style>
