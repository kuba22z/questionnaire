<template>
  <div id="container">
    <h1>Welcome to the smartphone-selector</h1>
    <div id="form-container">
      <form id="formQuestion" @submit.prevent="fetchNextQuestion(pickedNextNodeId)">
        <div v-if="error">
          <GraphQLErrors :error="error" />
        </div>
        <div v-if="loading">Loading...</div>
        <div v-else-if="result">
          <div v-if="result.getQuestionNodeById.question" id="questionnaire-container">
            <Questionnaire :question="result.getQuestionNodeById.question"
                           v-model:picked-next-node-id="pickedNextNodeId" />
          </div>
          <div v-else>
            Our recommendation: {{ result.getQuestionNodeById.recommendation }}
          </div>

          <div id="inputs">
            <input type="submit" id="input" v-if="result.getQuestionNodeById.question"
                   :disabled="disallowNextQuestion(result.getQuestionNodeById.question.answers,pickedNextNodeId)"
                   value="next Question">
            <input type="button" id="input"
                   @click="fetchPrevQuestion" value="previous Question" />
            <input type="button" id="input" @click="fetchNextQuestion(1)" value="go to first Question" />
          </div>
        </div>
        <div v-else>Problems establishing a connection</div>
      </form>
    </div>
  </div>
</template>

<script lang="ts">
import GraphQLErrors from "@/components/GraphQLErrors.vue";
import Questionnaire from "@/components/Questionnaire.vue";
import { defineComponent } from "vue";
import type { Answer } from "@/utils/types";
import { RequestQuestion } from "@/utils/requestQuestion";


export default defineComponent({
  name: "Home",
  components: { Questionnaire, GraphQLErrors },
  setup() {

    const requestQuestion= new RequestQuestion({"nodeId":1},[1])

    return {
      result: requestQuestion.response.result,
      loading: requestQuestion.response.loading,
      error:requestQuestion.response.error,
      fetchNextQuestion: requestQuestion.fetchNext,
      fetchPrevQuestion: requestQuestion.fetchPrev,
      nodeIdsContainer: requestQuestion.nodeIdsContainer
    };
  },
  methods: {
    disallowNextQuestion(answers: Answer[] | undefined, pickedNextNodeId: number): boolean {
      return answers ? !answers.some(answer => answer.nextNodeId === pickedNextNodeId) : true;
    }
  },
  data() {
    return {
      pickedNextNodeId: null
    };
  }
});
</script>

<style scoped>
#container {
  border: 3px solid green;
}

#questionnaire-container {
  margin: 20px;
}

input {
  height: 40px;
  margin-top: 20px;
}

#form-container {
  margin: 50px
}
</style>