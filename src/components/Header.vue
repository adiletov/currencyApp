<template>
  <header class="container header">
    <nav class="header__nav">
      <ul>
        <li>
          <router-link to="/">Main</router-link>
        </li>
        <li>
          <router-link to="/convert">Convert</router-link>
        </li>
        <li>
          <SelectField
              @onChange="changeDefaultCurrency"
              :value="selectedCurrency"
              :options="currencyList"/>
        </li>
      </ul>
    </nav>
  </header>
</template>

<script setup>
import SelectField from "./ui/SelectField.vue";
import {useStore} from "vuex";
import {computed} from "vue";
import {SET_DEFAULT_CURRENCY} from "../store/modules/types";
const store = useStore()
const currencyList = computed(() => store.getters.currencyList);
const selectedCurrency = computed(() => store.getters.defaultCurrency);

function changeDefaultCurrency(e) {
  store.commit(SET_DEFAULT_CURRENCY, e.target.value);
}
</script>
