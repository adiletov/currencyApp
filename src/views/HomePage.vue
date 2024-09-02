<template>
  <table cellpadding="10">
    <tbody>
    <tr>
      <th>{{ CURRENCY_LABEL[defaultCurrency] }}</th>
      <th v-for="{name} in currencyDataList" :key="name">{{ CURRENCY_LABEL[name] }}</th>
    </tr>
    <tr>
      <td>1</td>
      <td v-for="{name, value} in currencyDataList" :key="name">{{ value.toFixed(2) }}</td>
    </tr>
    </tbody>
  </table>
</template>

<script setup>
import {useStore} from "vuex";
import {computed, onMounted} from "vue";
import {CURRENCY_LABEL} from "@/constants";

const store = useStore()
const currencyDataList = computed(() => store.getters.currencyDataList)
const defaultCurrency = computed(() => store.getters.defaultCurrency)

onMounted(() => {
  store.dispatch('getCurrency');
})
</script>
