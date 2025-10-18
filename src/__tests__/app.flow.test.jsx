import { render, screen, fireEvent } from "@testing-library/react";
import App from "../App";

// limpiar localStorage para no arrastrar datos entre tests
beforeEach(() => {
  Storage.prototype.getItem = jest.fn(() => null);
  Storage.prototype.setItem = jest.fn();
});

test("agrega, completa y borra una tarea", () => {
  render(<App />);

  const input = screen.getByPlaceholderText(/escribe una tarea/i);
  const btnAdd = screen.getByRole("button", { name: /agregar/i });

  // agrega
  fireEvent.change(input, { target: { value: "tarea x" } });
  fireEvent.click(btnAdd);
  expect(screen.getByText("tarea x")).toBeInTheDocument();

  // completa
  const checkbox = screen.getAllByRole("checkbox")[0];
  fireEvent.click(checkbox);
  expect(checkbox.checked).toBe(true);

  // borra
  const btnDelete = screen.getAllByRole("button", { name: /borrar/i })[0];
  fireEvent.click(btnDelete);
  expect(screen.queryByText("tarea x")).not.toBeInTheDocument();
});
