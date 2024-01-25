<script setup>
import { defineProps } from 'vue';

const props = defineProps({
    cityName: String
})

</script>

<template>
    <div class="flex items-center gap-1.5 transition-colors dark:text-slate-200">
        <img src="../assets/icon/weather/location-blue.png" alt="" class="w-6">
        <h2 class="font-semibold">{{ cityName }}</h2>
    </div>
</template>