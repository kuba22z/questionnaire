export type Answer = {
  nextNodeId: number;
  text: string;
};
export type Question = {
  text: string;
  answers: Answer[];
};
