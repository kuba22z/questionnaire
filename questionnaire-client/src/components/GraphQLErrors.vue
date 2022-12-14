<template>
  <div>
    <p v-for="item in $props.error.graphQLErrors">{{item.message}}</p>
  </div>
</template>

<script lang="ts">
import { ApolloError } from "apollo-boost";

export default {
  name: "GraphQLErrors",
  props: {
    error:  ApolloError
  }
};
</script>

<style scoped>

</style>