import { todoApi } from "./todoApis.js";

/*
Given an Api, implement a todo app(features includes Add a todo, Change a todo Status, Delete Todo) in Vanilla JavaScript. 
FYI: You can add some css styles you want.
*/
const element = document.createElement("hr");
document.body.appendChild(element);

document.querySelector("#add").onclick = (e) => {
  //   //First to make sure user will enter task
  //   const val = document.querySelector("input").value;
  //   // todoApi.todos;
  //   const todo = document.querySelector("input").value;
  //   todoApi.addTodo(todo);
  const todo = document.querySelector("input");
  //input the value into addTodo function,
  todoApi
    .addTodo({ content: `${todo.value}`, isCompleted: false })
    .then((res) => {
      console.log(res);
    });

  todoApi.getAllTodos().then((res) => {
    console.log(res.todos);
  });

  show();

  e.preventDefault();
  //   // document.querySelector("#tasks").innerHTML += todoApi.getAllTodos;
  //   // todoApi.getAllTodos().then((result) => alert(result));
};

const todoList = document.querySelector(".todoList");
const uL = document.createElement("ul");
//need to create one function to show the list
const show = () => {
  uL.innerHTML = "";
  todoList.append(uL);
  todoApi.getAllTodos().then((res) => {
    console.log(res.todos);

    res.todos.map(({ content, isCompleted }, index) => {
      const li = document.createElement("li");
      const span = document.createElement("span");
      const deleteButton = document.createElement("button");

      uL.append(li);

      span.textContent = content;
      if (isCompleted) {
        span.style = "text-decoration:line-through;";
      }
      span.ondblclick = () => {
        mod(index);
      };
      deleteButton.textContent = "Delete";
      deleteButton.className = "btn";
      deleteButton.id = `${index}`;
      deleteButton.onclick = () => {
        del(index);
      };
      li.append(span);
      li.append(deleteButton);
    });
  });
};

show();

const del = (index) => {
  todoApi.delTodo(index).then((res) => {
    console.log(res);
    show();
  });
};

const mod = (index) => {
  todoApi.modTodo(index).then((res) => {
    console.log(res);
    show();
  });
};
//implement your app here
