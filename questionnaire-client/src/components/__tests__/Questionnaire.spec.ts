import { describe, it, expect } from "vitest";

import { mount } from "@vue/test-utils";
import Questionnaire from "../Questionnaire.vue";

describe("Questionnaire", () => {
  it("renders properly", () => {
    const wrapper = mount(Questionnaire, {
      props: {
        question: {
          text: "What is your favorite color?",
          answers: [
            { text: "green", nextNodeId: 2 },
            { text: "blue", nextNodeId: 3 },
          ],
        },
        pickedNextNodeId: 1,
      },
    });
    expect(wrapper.text()).toContain("What is your favorite color?");
    expect(wrapper.text()).toContain("green");
    expect(wrapper.text()).toContain("blue");
  });
});
