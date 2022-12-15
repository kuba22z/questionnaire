<template>
  <div>
    <p v-for="item in error.graphQLErrors">{{item.message}}</p>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import type {PropType} from "vue"
import type { ApolloError } from "apollo-boost";

export default defineComponent( {
  name: "GraphQLErrors",
  props: {
    error: {
      type: Object as PropType<ApolloError>,
      required: true
    }
  },
});
</script>

<style scoped>

</style>