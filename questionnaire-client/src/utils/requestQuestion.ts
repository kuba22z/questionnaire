import type { UseQueryReturn } from "@vue/apollo-composable";
import gql from "graphql-tag";
import { useQuery } from "@vue/apollo-composable";
import type { DocumentNode } from "graphql/language";

export class RequestQuestion {
  nodeIdsContainer: number[];
  response: UseQueryReturn<any, {}>;
  QUESTION_NODE_BY_ID_QUERY: DocumentNode = gql`
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

  constructor(variables: { nodeId: number }) {
    this.nodeIdsContainer = [variables.nodeId];
    this.response = useQuery<{ nodeId: number }>(
      this.QUESTION_NODE_BY_ID_QUERY,
      variables
    );
  }

  fetchNext = (nodeId: number | null) => {
    if (nodeId !== null) {
      this.nodeIdsContainer.push(nodeId);
      this.fetchMore(nodeId);
    } else {
      alert("Error: Please select an option");
    }
  };

  fetchMore = (nodeId: number) => {
    this.response.fetchMore({
      variables: { nodeId: nodeId },
      updateQuery: (previousResult, { fetchMoreResult }) => {
        if (!fetchMoreResult) {
          return previousResult;
        }
        return fetchMoreResult;
      },
    });
  };

  fetchPrev = () => {
    if (this.nodeIdsContainer.length > 1) {
      this.nodeIdsContainer.pop();
      this.fetchMore(this.nodeIdsContainer[this.nodeIdsContainer.length - 1]);
    } else {
      alert("Error: There is no previous Question");
    }
  };
}
