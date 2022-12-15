<template>
  <div>
  <h2>{{ question.text }}</h2>
  <div v-for="(answer, index) in question.answers">
    <input type="radio" :key="index" :id="index" :value="answer.nextNodeId" name="answer" v-model="value" />
    <label :for="index">{{ answer.text }}</label>
  </div>
  </div>
</template>

<script lang="ts">

import { defineComponent } from "vue";
import type {PropType} from "vue"
import type {  Question } from "@/utils/types";

export default defineComponent({
  name: "Questionnaire",
  props: {
    question: Object as PropType<Question>,
    pickedNextNodeId: Number
  },
  emits: ['update:pickedNextNodeId'],
  computed: {
    value: {
      get() {
        return this.pickedNextNodeId
      },
      set(value:number) {
        this.$emit('update:pickedNextNodeId', value)
      }
    }
  }
})

</script>


<style scoped>

</style>