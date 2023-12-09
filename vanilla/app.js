//DOM-элементы
const todoList = document.querySelector (".todoList")

//слушатель события
document.addEventListener("DOMContentLoaded", getTodos);


function getTodos(){
  let todos;
  if (localStorage.getItem("todos")===null){
    todos=[];
  }else{
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  todos.forEach(function(todo){
    const todoDiv=document.createElement("div");
    todoDiv.classList.add("todo");

    const newTodo = document.createElement("li");
    newTodo.classList.add("todo-item");
    newTodo.innerText = todo;
    todoDiv.appendChild(newTodo);

    const completedButton = document.createElement("button");
    completedButton.innerText = "Выполнить";
    completedButton.classList.add("completed-btn");
    todoDiv.appendChild(completedButton);

    const trashButton = document.createElement("button");
    trashButton.innerText = "Удалить";
    trashButton.classList.add("trash-btn");
    todoDiv.appendChild(trashButton);

    todoList.appendChild(todoDiv);
  });
}

//DOM-элементы (обычно вверх поднимают)
const todoInput = document.querySelector(".todo-input");
const todoButton =document.querySelector(".todo-button");

//слушатели событий (тоже вверху должен быть)
todoButton.addEventListener("click",addTodo);

//функционал на добавление кнопки
function addTodo(e){
  //остановка чего?
  e.preventDefault();
  //создаем элемент div и добавляем класс todo
  const todoDiv = document.createElement("div");
  todoDiv.classList.add("todo");
  //создаем лист
  const newTodo = document.createElement("li");
  newTodo.innerText = todoInput.value;
  //сохраниение задачи в saveLocalStorage
  saveLocalTodos(todoInput.value);


  newTodo.classList.add("todo-item");
  todoDiv.appendChild(newTodo);
  todoInput.value = "";
  //кнопка: выполнить задачу
  const completedButton = document.createElement("button");
  completedButton.innerHTML = "Выполнить &#10008";
  completedButton.classList.add("complete-btn");
  todoDiv.appendChild(completedButton);
  //кнопка: удалить задачу
  const trashButton = document.createElement("button");
  trashButton.innerHTML = "удалить &#10008";
  trashButton.classList.add("trash-btn");
  todoDiv.appendChild(trashButton);
  //
  todoList.appendChild(todoDiv);
}

//создаем функцию, которая будет принимать задачу и сохранять ее в localStorage
function saveLocalTodos(todo){
  let todos;
  if (localStorage.getItem("todos") === null){
    todos =[];
  }else{
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  todos.push(todo);
  localStorage.setItem("todos", JSON.stringify(todos));
}

//вешаем событие на элемент (чтобы не добавлять на каждую кнопку слушателей событий)
function eventTodo(e) {
  const item=e.target;

  if(item.classList[0] === "trash-btn"){
    const todo = item.parentElement;
    removeLocalTodos(todo);
    todo.remove();
    }
    if (item.classList[0] === "complete-btn"){
      const todo = item.parentElement;
      todo.classList/toggle("completed");
      console.log(todo);
    }
}

//функция для проверки задачи
function removeLocalTodos(todo) {
  let todos;
  if ( localStorage.getItem("todos") === null){
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  const todoIndex = todo.children[0].innerText;
  todos.splice(todos.indexOf(todoIndex),1);
  localStorage.setItem("todos", JSON.stringify(todos));
}

//DOM-элементы (обычно вверх поднимают)
const filterOption = document.querySelector(".todo-filter")

//слушатеьль события
filterOption.addEventListener("click", filterTodo);

//функция фильтер
function filterTodo(e) {
  const todos = todoList.childNodes;
  todos.forEach(function(todo){
    switch(e.target.value) {
      case "all":
        todo.style.display = "flex";
        break;
        case "completed":
          if (todo.classList.contains("completed")){
            todo.style.display = "flex";
          } else {
            todo.style.display = "none";
          }
          break;
          case "uncompleted":
            if (!todo.classList.contains("completed")){
              todo.style.display = "flex";
            } else {
              todo.style.display = "none";
            }
    }
  })
}



//блок users

//DOM-элементы (обычно вверх поднимают)
const userButton = document.querySelector(".user-button");
const userList = document.querySelector(".userList");
//слушатель
userButton.addEventListener("click", getRandomUsers);

//функция на получение рандомных пользователей
function getRandomUsers(){
  fetch ("https://jsonplaceholder.typicode.com/users?_limit=10")
  .then((response) => response.json())
  .then((date) => {
    const users = date;
    users.forEach(function (user) {
      //создаем div
      const userDiv = document.createElement("div");
      userDiv.classList.add("user");
      //создаем лист li-строку
      const newUser = document.createElement("li");
      newUser.innerText = user.name;
      newUser.classList.add("user-item");
      userDiv.appendChild(newUser);
      //добавляем пользователя в готовый лист
      userList.appendChild(userDiv);
    })
  })
}