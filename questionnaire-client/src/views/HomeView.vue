<template>
  <form id="formQuestion" @submit.prevent="fetchNextQuestion(pickedNextNodeId)">
    <div v-if="error"> <GraphQLErrors :error="error"/></div>
    <div v-if="loading">Loading...</div>
    <div v-else-if="result">
      <div v-if="result.getQuestionNodeById.question">
        <h2>{{ result.getQuestionNodeById.question.text }}</h2>
        <div v-for="(item, index) in result.getQuestionNodeById.question.answers">
          <input type="radio" :key="index" :id="index" :value="item.nextNodeId" name="answer"
                 v-model="pickedNextNodeId" />
          <label :for="index">{{ item.text }}</label>
        </div>
      </div>
      <div v-else>
        {{ result.getQuestionNodeById.recommendation }}
      </div>
    </div>
    <input type="submit" value="next Question">
    <input type="button" id="back" @click="fetchPrevQuestion" value="previous Question" />
    <br>
    <input type="button" id="back" @click="fetchNextQuestion(1)" value="go to first Question" />

  </form>
</template>

<script lang="ts">
import { useCounterStore } from "@/stores/counter";
import gql from "graphql-tag";
import { useQuery } from "@vue/apollo-composable";
import GraphQLErrors from "@/components/GraphQLErrors.vue";

const QUESTION_NODE_BY_ID_QUERY = gql`
query GetQuestionNodeById($nodeId: Int!) {
  getQuestionNodeById(nodeId: $nodeId) {
    recommendation
    question {
        text
      answers {
        nextNodeId
        text
      }
    }
  }
}
`;

export default {
  name: "Home",
  components: { GraphQLErrors },
  setup() {
    const counter = useCounterStore();
    const { result, loading, error, fetchMore } = useQuery(QUESTION_NODE_BY_ID_QUERY, { "nodeId": 1 });
    const pickedNextNodeId = null;
    const nodeIdsPath = [1];

    const fetchNextQuestion = (nodeId: number) => {
      nodeIdsPath.push(nodeId);
      fetchMore({
          variables: { "nodeId": nodeId },
          updateQuery:
            (previousResult, { fetchMoreResult }) => {
              if (!fetchMoreResult) {
                return previousResult;
              }
              return fetchMoreResult;
            }
        }
      );
    };
    const fetchPrevQuestion = () => {
      nodeIdsPath.pop();
      fetchNextQuestion(nodeIdsPath[nodeIdsPath.length - 1]);
      nodeIdsPath.pop();
    };
    return {
      result,
      loading,
      error,
      counter,
      fetchNextQuestion,
      fetchPrevQuestion,
      pickedNextNodeId,
      nodeIdsPath
    };
  }
};
</script>

<style scoped>

</style>