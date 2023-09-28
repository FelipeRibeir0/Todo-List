const listContainer = document.getElementById("list-container");
const inputBox = document.getElementById("input-box");
const Submitbutton = document.getElementById("submit-button");

function addTask() {
  if (inputBox.value == "") {
    alert("É necessário que você escreva algo.");
  } else {
    let li = document.createElement("li");
    li.innerHTML = inputBox.value;
    listContainer.appendChild(li);
    inputBox.value = "";
    let span = document.createElement("span");
    span.innerHTML = "\u00d7";
    li.appendChild(span);
  }
  saveTasks();
}

function saveTasks() {
  localStorage.setItem("tasks", listContainer.innerHTML);
}

listContainer.addEventListener("click", function (e) {
  if (e.target.tagName === "LI") {
    e.target.classList.toggle("checked");
  } else if (e.target.tagName === "SPAN") {
    console.log(e.target.parentElement);
    e.target.parentElement.remove();
  }
  saveTasks();
});

Submitbutton.addEventListener("click", addTask);

inputBox.addEventListener("keyup", function (event) {
  if (event.key === "Enter") {
    addTask();
  }
});

listContainer.innerHTML = localStorage.getItem("tasks");
