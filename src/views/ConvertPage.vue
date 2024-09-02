<template>
  <div class="convert-card">
    <SelectField
        @onChange="onChangeCurrency"
        id="firstCur"
        :value="selectedFirstCur"
        :options="currencyList"/>
    <label>
      <input
          :value="firstFieldVal"
          type="number"
          placeholder="0.00"
          @input="changeFieldHandler"
      >
    </label>
    <hr>
    <SelectField
        @onChange="onChangeCurrency"
        :value="selectedSecondCur"
        id="secondCur"
        :options="currencyList"/>
    <label>
      <input
          :value="secondFieldVal"
          type="number"
          placeholder="0.00"
          @input="(e) => changeFieldHandler(e, true)"
      >
    </label>
  </div>
</template>

<script setup>
import SelectField from '@/components/ui/SelectField.vue'
import {useStore} from "vuex";
import {computed, onMounted, reactive, ref, watch} from "vue";

const store = useStore()
const currencyList = computed(() => store.getters.currencyList);
const defaultCurrency = computed(() => store.getters.defaultCurrency);
const currencyData = computed(() => store.getters.currencyData);

const firstFieldVal = ref();
const secondFieldVal = ref();

const selectedFirstCur = ref()
const selectedSecondCur = ref(currencyList.value[0].id)


const onChangeCurrency = (e) => {
  const value = e.target.value;
  const id = e.target.id;
  if (id === 'firstCur') {
    selectedFirstCur.value = value;
  } else {
    selectedSecondCur.value = value;
  }
}


const changeFieldHandler = (e, isSecondWatch) => {
  const value = e.target.value;
  if (isSecondWatch) {
    secondFieldVal.value = value;
    const secondCur = currencyData.value[`${selectedSecondCur.value}-${selectedFirstCur.value}`];
    const curVal = value * (secondCur || 1)
    firstFieldVal.value = curVal === 0 ? null : curVal;
  } else {
    firstFieldVal.value = value;
    const firstCur = currencyData.value[`${selectedFirstCur.value}-${selectedSecondCur.value}`];
    const curVal = value * (firstCur || 1)
    secondFieldVal.value = curVal === 0 ? null : curVal;
  }
}

watch(selectedFirstCur, () => {
  const secondCur = currencyData.value[`${selectedSecondCur.value}-${selectedFirstCur.value}`];
  firstFieldVal.value = secondFieldVal.value * (secondCur ?? 1)
})

watch(selectedSecondCur, () => {
  const firstCur = currencyData.value[`${selectedFirstCur.value}-${selectedSecondCur.value}`];
  secondFieldVal.value = firstFieldVal.value * (firstCur ?? 1)
})

onMounted(() => {
  selectedFirstCur.value = defaultCurrency.value;
})

</script>

