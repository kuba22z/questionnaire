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
    error: Object as PropType<ApolloError>,
  },
});
</script>

<style scoped>

</style>