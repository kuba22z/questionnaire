import { createApp, h, provide } from "vue";
import { createPinia } from "pinia";

import App from "./App.vue";
import router from "./router";

import "./assets/main.css";
import { DefaultApolloClient } from "@vue/apollo-composable";
import { ApolloClient } from "apollo-client";
import { createHttpLink } from "apollo-link-http";
import { InMemoryCache } from "apollo-cache-inmemory";

const httpLink = createHttpLink({
  // You should use an absolute URL here
  uri: "http://localhost:4000/",
});

// Cache implementation
const cache = new InMemoryCache();

const apolloClient = new ApolloClient({
  cache,
  link: httpLink,
});

const app = createApp({
  setup() {
    provide(DefaultApolloClient, apolloClient);
  },

  render: () => h(App),
});
app.use(createPinia());
app.use(router);
app.mount("#app");
