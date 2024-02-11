<script setup>
import { ref, defineEmits, watchEffect } from 'vue';

const emits = defineEmits(['setDarkModeToLocalStorage']);
const checkBox = ref(JSON.parse(localStorage.getItem('darkMode')))
watchEffect(() => {
    emits('setDarkModeToLocalStorage', checkBox.value)
    console.log('this is watchEffect from component DarkModeToggle')
})

</script>
<template>
    <label class="ui-switch">
      <input type="checkbox" v-model="checkBox"/>
      <div class="slider">
        <div class="circle"></div>
      </div>
    </label>
</template>
