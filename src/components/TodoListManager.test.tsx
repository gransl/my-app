import { fireEvent, render } from "@testing-library/react-native";
import React from "react";
import TodoListManager from "./TodoListManager";

describe("TodoListManager", () => {
  it("renders initial input and add button", () => {
    const { getByPlaceholderText, getByTestId } = render(<TodoListManager />);

    expect(getByPlaceholderText("Enter Todo")).toBeTruthy();
    expect(getByTestId("add-todo-button")).toBeTruthy();
  });

  // Add a test that:
  // 1) Types a todo into the input
  // 2) Presses the Add Todo button
  // 3) Verifies the todo text appears on the screen
  it("shows a todo on the screen when added", () => {
    // render
    const { getByPlaceholderText, getByTestId, getByText } = render(
      <TodoListManager />,
    );

    // get relevant components
    const input = getByPlaceholderText("Enter Todo");
    const button = getByTestId("add-todo-button");

    // make changes
    fireEvent.changeText(input, "Feed the Tortoise");
    fireEvent.press(button);

    // check value
    expect(getByText("Feed the Tortoise")).toBeTruthy();
  });

  // Add a test that:
  // 1) Adds a todo
  // 2) Presses the Remove button
  // 3) Verifies the todo text is removed from the screen
  it("removes a todo from the screen", () => {
    // render
    const { getByPlaceholderText, getByTestId, queryByText } = render(
      <TodoListManager />,
    );

    // get relevant components
    const input = getByPlaceholderText("Enter Todo");
    const addButton = getByTestId("add-todo-button");

    // make changes
    fireEvent.changeText(input, "Wash Dishes");
    fireEvent.press(addButton);

    //Find remove button
    const removeButton = getByTestId("remove-todo-button-Wash Dishes");

    fireEvent.press(removeButton);

    // check values
    expect(queryByText("Wash Dishes")).toBeNull();
  });
});
