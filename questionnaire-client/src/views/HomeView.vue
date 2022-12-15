<template>
  <form id="formQuestion" @submit.prevent="fetchNextQuestion(pickedNextNodeId)">
    <div v-if="error"> <GraphQLErrors :error="error"/></div>
    <div v-if="loading">Loading...</div>
    <div v-else-if="result">
      <div v-if="result.getQuestionNodeById.question">
          <Questionnaire :question="result.getQuestionNodeById.question" v-model:picked-next-node-id="pickedNextNodeId"/>
      </div>
      <div v-else>
        Our recommendation: {{ result.getQuestionNodeById.recommendation }}
      </div>

      <div>
      <input type="submit" value="next Question">
      <input type="button" id="back" @click="fetchPrevQuestion" value="previous Question" />
      <br>
      <input type="button" id="back" @click="fetchNextQuestion(1)" value="go to first Question" />
      </div>
    </div>
    <div v-else>Problems establishing a connection</div>

  </form>
</template>

<script lang="ts">
import gql from "graphql-tag";
import { useQuery } from "@vue/apollo-composable";
import GraphQLErrors from "@/components/GraphQLErrors.vue";
import Questionnaire from "@/components/Questionnaire.vue";
import { defineComponent } from "vue";

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

export default defineComponent({
  name: "Home",
  components: { Questionnaire, GraphQLErrors },
  setup() {
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
      fetchNextQuestion,
      fetchPrevQuestion,
      pickedNextNodeId,
      nodeIdsPath
    };
  },
});
</script>

<style scoped>

</style>