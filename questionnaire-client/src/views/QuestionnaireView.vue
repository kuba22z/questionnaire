<template>
<form>
  <button>{{counter.count}}</button>
</form>
</template>

<script>
import {useCounterStore} from "@/stores/counter";

export default {
  name: "Questionnaire",
  setup() {
    const counter = useCounterStore();
    return {counter}
  }
}
</script>

<style scoped>

</style>