const addbtn = document.querySelector(".addbtn");
const input = document.querySelector(".task-input");
const error = document.querySelector(".message");
const mark = document.querySelector(".task");
let Todos = [];

addbtn.addEventListener("click", function () {
  if (input.value.trim() == "") {
    error.textContent = "Fill The Input";
  } else if (input.value.length > 25) {
    error.textContent = "Dont DEPass 25 Character!";
  } else if (input.value.length < 3) {
    error.textContent = "Not Less Then 3 Character";
  } else if (input.value.trim() == "play") {
    error.textContent = "Play What?";
  } else {
    addTask();
    error.textContent = "";
    input.value = "";
    showTask();
  }
});

//  create a new task in array
function addTask() {
  let todo = {
    title: input.value.trim(),
    status: "Active",
  };
  Todos.push(todo);
  localStorage.setItem("todos", JSON.stringify(Todos));
  Todos = JSON.parse(localStorage.getItem("todos"));
}
Todos = JSON.parse(localStorage.getItem("todos"));

if (!localStorage.length) {
  localStorage.setItem("todos", "[]");
}

// add task to webpage
function showTask() {
  document.querySelector(".task > h1").textContent =
    Todos.length > 1
      ? `${Todos.length} Tasks To Do`
      : `${Todos.length} Task To Do`;

  let task = document
    .querySelectorAll(".task-body")
    .forEach((ele) => ele.remove());
  // for (let i = 0; i < Todos.length; i++) {
  //   mark.innerHTML += `
  //   <div class="task-body">
  //   <div class="task-title">
  //     <i class="fa-solid fa-check"></i>
  //     <h1>${Todos[i]}</h1>
  //   </div>
  //   <button><i class="fa fa-trash" aria-hidden="true"></i></button>
  // </div>
  //   `;
  // }
  Todos.forEach((ele, index) => {
    mark.innerHTML += `
       <div class="task-body">
       <div class="task-title">
         <i class="fa-solid fa-check ${ele.status}" onclick="chack(${index})"></i>
         <h1 class="${ele.status}">${ele.title}</h1>
       </div>
       <button><i class="fa fa-trash" onclick="removeTask(${index})" aria-hidden="true"></i></button>
     </div>
       `;
  });
}
showTask();

function chack(index) {
  Todos[index].status = "deactive";
  localStorage.setItem("todos", JSON.stringify(Todos));
  console.log(Todos);
  showTask();
}

function removeTask(index) {
  Todos.splice(index, 1);
  localStorage.setItem("todos", JSON.stringify(Todos));
  showTask();
}
