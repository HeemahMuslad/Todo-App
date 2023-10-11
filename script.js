let todoArray = JSON.parse(localStorage.getItem("todoArray")) || [];
document.querySelector(".js-add-button").addEventListener("click", addTodo);
let list;
let check_box = [];

function renderTodoList() {
  let result = "";
  todoArray.forEach((todoObject) => {
    const { name, dueDate } = todoObject;

    list = `
          <input type="checkbox" class="js-checkbox" />
           <div>${name}</div>
          <div>${dueDate}</div>
          <button class="btn-delete js-delete-btn " >Delete</button>
         `;
    result += list;
  });
  document.querySelector(".todoList").innerHTML = result;
  document.querySelectorAll(".js-delete-btn").forEach((deleteButton, index) => {
    deleteButton.addEventListener("click", () => {
      todoArray.splice(index, 1);
      renderTodoList();
      saveToStorage();
    });
  });
  document.querySelectorAll(".js-checkbox").forEach((checkbox, index) => {
    checkbox.addEventListener("change", () => {
      check_box.push(todoArray[index]);
      renderCheckedTodo();
      todoArray.splice(index, 1);
      renderTodoList();
      saveToStorage();
    });
  });

  saveToStorage();
}
function renderCheckedTodo() {
  let result = "Completed Task:";
  checked = document.querySelector(".js-checker");
  let checkedHTML;
  check_box.forEach((checkedItem, index) => {
    checkedHTML = ` <div class="completed-task">
          <input type="checkbox" checked/>
     <p> ${checkedItem.name} </p> <p>${checkedItem.dueDate}</p>
         <p></p>

     </div>`;
    result += checkedHTML;
    checked.innerHTML = result;
  });
}
function addTodo() {
  let inputElement = document.querySelector(".js-input-todo");
  let name = inputElement.value;
  let dueDateElement = document.querySelector(".js-due-date-input");
  let dueDate = dueDateElement.value;
  todoArray.push({ name, dueDate });
  inputElement.value = "";
  renderTodoList();
  saveToStorage();
}
function saveToStorage() {
  localStorage.setItem("todoArray", JSON.stringify(todoArray));
}
