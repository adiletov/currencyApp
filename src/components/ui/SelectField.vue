<template>
  <select @change="selectHandler">
    <option
        v-for="{id, name} in options"
        :value="id"
        :selected="value === id"
        :key="id"
    >{{ name }}
    </option>
  </select>
</template>

<script setup>
const {options, value} = defineProps(['options', 'value'])
const emit = defineEmits(['onChange'])

const selectHandler = (e) => emit('onChange', e)
</script>
