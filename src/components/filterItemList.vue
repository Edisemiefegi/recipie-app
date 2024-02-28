<template>
  <div class="flex flex-col gap-3">
    <div>
      <p class="text-primary font-medium text-lg">{{ activeFilter }}</p>
    </div>
    <div class="gap-2 flex overflow-x-scroll hide-scrollbar">
      <div v-for="(item, i) in filterData" :key="i">
        <button
          @click="selectActive(item)"
          :class="
            activeFilterItem === item.name
              ? 'bg-primary text-white'
              : 'bg-none text-primary'
          "
          class="border border-primary w-fit px-4 p-2 whitespace-nowrap rounded-3xl text-sm font-semibold"
        >
          {{ item?.name }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, ref, defineProps, defineEmits, watch, onMounted } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();

const emit = defineEmits(["select"]);

const activeFilterItem = ref(null);

const props = defineProps({
  filterData: {
    type: Array,
    default: () => [],
  },
});

const watchfilterData = computed(() => props.filterData);

const activeFilter = computed(() => route.query.filter);

console.log(props.filterData, "filteritem");

const selectActive = (item) => {
  activeFilterItem.value = item.name;
  console.log(activeFilterItem.value);
  emit("select", item.name);
};

watch(watchfilterData, () => {
  if (props.filterData.length) {
    activeFilterItem.value = props.filterData[0].name;
  }
});
</script>

<style>
.hide-scrollbar::-webkit-scrollbar {
  display: none; /* For Webkit browsers (Chrome, Safari) */
}
</style>
