import { diff as differ } from "deep-diff";

const isProduction = () => process.env.NODE_ENV === "production";
const isDevelopment = () => process.env.NODE_ENV === "development";

const dictionary = {
  E: {
    color: "#2196F3",
    text: "CHANGED:",
  },
  N: {
    color: "#4CAF50",
    text: "ADDED:",
  },
  D: {
    color: "#F44336",
    text: "DELETED:",
  },
  A: {
    color: "#2196F3",
    text: "ARRAY:",
  },
};

function style(kind) {
  return `color: ${dictionary[kind].color}; font-weight: bold`;
}

function render(diff) {
  const { kind, path, lhs, rhs, index, item } = diff;

  switch (kind) {
    case "E":
      return [path.join("."), lhs, "→", rhs];
    case "N":
      return [path.join("."), rhs];
    case "D":
      return [path.join(".")];
    case "A":
      return [`${path.join(".")}[${index}]`, item];
    default:
      return [];
  }
}

const withLogger = (reducer) => (state, action) => {
  const nextState = reducer(state, action);

  if (isDevelopment()) {
    const differences = differ(state, nextState) || [];

    console.groupCollapsed(
      `%c ${action.type}`,
      "color: gray; font-weight: lighter;"
    );
    if (differences.length) {
      console.groupCollapsed("diff");
      differences.forEach((element) => {
        const { kind } = element;
        const output = render(element);
        console.log(`%c ${dictionary[kind].text}`, style(kind), ...output);
      });
      console.groupEnd();
    }
    console.groupEnd();
  }

  return nextState;
};

export default withLogger;
