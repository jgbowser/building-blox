const todos = ["walk the dog", "take out the trash", "do the dishes"];

const addTodoInput = document.getElementById("todo-input");
const addTodoButton = document.getElementById("add-todo-btn");
const todoList = document.getElementById("todos-list");

for (const todo of todos) {
  todoList.append(renderTodoInReadMode(todo));
}

addTodoInput.addEventListener("keyup", (event) => {
  if (event.target.value.length >= 3) {
    addTodoButton.removeAttribute("disabled");
  } else {
    addTodoButton.setAttribute("disabled", true);
  }
});

addTodoInput.addEventListener("keydown", (event) => {
  if (event.key === "Enter" && event.target.value.length >= 3) {
    addTodo();
  }
});

addTodoButton.addEventListener("click", addTodo);

function renderTodoInReadMode(todo) {
  const todoItem = document.createElement("li");
  const todoDescription = document.createElement("span");
  const doneBtn = document.createElement("button");
  todoDescription.textContent = todo;
  todoDescription.addEventListener("dblclick", () => {
    const todoIndex = todos.indexOf(todo);

    todoList.replaceChild(
      renderTodoInEditMode(todo),
      todoList.childNodes[todoIndex]
    );
  });
  doneBtn.textContent = "Done";
  doneBtn.addEventListener("click", () => {
    removeTodo(todoItem);
  });

  todoItem.append(todoDescription);
  todoItem.append(doneBtn);

  return todoItem;
}

function renderTodoInEditMode(todo) {
  const todoIndex = todos.indexOf(todo);
  const todoItem = document.createElement("li");
  const todoInput = document.createElement("input");
  todoInput.value = todo;
  todoInput.type = "text";
  todoItem.append(todoInput);

  const saveBtn = document.createElement("button");
  saveBtn.textContent = "Save";
  saveBtn.addEventListener("click", () => {
    updateTodo(todoIndex, todoInput.value);
  });
  todoItem.append(saveBtn);

  const cancelBtn = document.createElement("button");
  cancelBtn.textContent = "Cancel";
  cancelBtn.addEventListener("click", () => {
    todoList.replaceChild(
      renderTodoInReadMode(todo),
      todoList.childNodes[todoIndex]
    );
  });
  todoItem.append(cancelBtn);

  return todoItem;
}

function addTodo() {
  const todo = addTodoInput.value;
  todos.push(todo);
  todoList.append(renderTodoInReadMode(todo));
  addTodoInput.value = "";
  addTodoButton.setAttribute("disabled", true);
}

function removeTodo(todo) {
  const todoIndex = todos.indexOf(todo);
  todos.splice(todoIndex, 1);
  todo.remove();
}

function updateTodo(todoIndex, newTodo) {
  todos[todoIndex] = newTodo;
  todoList.replaceChild(
    renderTodoInReadMode(newTodo),
    todoList.childNodes[todoIndex]
  );
}
