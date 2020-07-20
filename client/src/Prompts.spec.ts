import "@testing-library/jest-dom/extend-expect";

import { render, fireEvent } from "@testing-library/svelte";

import Component from "./Prompts.svelte";

test("can render component", () => {
  const { getByText } = render(Component, { name: "Prompts" });
  expect(getByText("Hello World!")).toBeInTheDocument();
});
