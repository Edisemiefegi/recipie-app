<template>
  <div class="w-screen h-screen">
    <div class="relative w-full h-full">
      <img class="object-cover w-full h-full" src="../assets/food.jpg" alt="" />
      <div class="absolute w-2/3 sm:w-2/4 top-32 left-10 flex gap-4 flex-col">
        <p class="font-bold text-3xl w-7 text-white">
          <span class="text-primary">Enjoy</span> Cooking
        </p>
        <div>
          <p class="text-white text-lg">
            Get delicious and detailed recipes on your phone
          </p>
          <p class="text-white text-lg">Treat your taste bud today</p>
        </div>

        <button
          @click="getStartedfunc"
          class="w-full sm:w-2/3 bg-white hover:bg-primary hover:text-white text-primary text-sm font-bold rounded-3xl p-2.5"
        >
          Get Started
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from "vue-router";

const router = useRouter();

const getStartedfunc = () => {
  router.push({ name: "Dashboard" });
  console.log("done");
};
</script>

<style></style>
