const listContainer = document.getElementById("list-container");
const inputBox = document.getElementById("input-box");
const Submitbutton = document.getElementById("submit-button");
const messageBox = document.getElementById("hidden");

function addTask() {
  if (inputBox.value == "") {
    messageBox.id = "alert";
  } else {
    messageBox.id = "hidden";
    const li = document.createElement("li");
    li.innerHTML = inputBox.value;
    listContainer.appendChild(li);

    const deleteIcon = document.createElement("i");
    deleteIcon.className = "fa-solid fa-trash-can";
    li.appendChild(deleteIcon);

    const editIcon = document.createElement("i");
    editIcon.className = "fa-solid fa-pen";
    li.appendChild(editIcon);
    inputBox.value = "";
  }
  saveTasks();
}

function saveTasks() {
  localStorage.setItem("tasks", listContainer.innerHTML);
}

function editTask(li) {
  const inputEdit = document.createElement("input");
  const trashIcon = document.createElement("i");
  trashIcon.className = "fa-solid fa-trash-can";

  const editIcon = document.createElement("i");
  editIcon.className = "fa-solid fa-pen";

  inputEdit.value = li.innerText;
  inputEdit.maxLength = 35;
  li.innerHTML = "";
  li.appendChild(inputEdit);
  li.appendChild(trashIcon);
  li.appendChild(editIcon);

  inputEdit.addEventListener("keyup", function (e) {
    if (e.key === "Enter") {
      li.innerHTML = inputEdit.value;
      li.appendChild(trashIcon);
      li.appendChild(editIcon);
      saveTasks();
    }
  });

  inputEdit.addEventListener("blur", function () {
    li.innerHTML = inputEdit.value;
    li.appendChild(trashIcon);
    li.appendChild(editIcon);
    saveTasks();
  });

  inputEdit.focus();
}

listContainer.addEventListener("click", function (e) {
  if (e.target.tagName === "LI") {
    e.target.classList.toggle("checked");
  } else if (e.target.className === "fa-solid fa-trash-can") {
    e.target.parentElement.remove();
  } else if (e.target.className === "fa-solid fa-pen") {
    editTask(e.target.parentElement);
  }
  saveTasks();
});

Submitbutton.addEventListener("click", addTask);

inputBox.addEventListener("keyup", function (e) {
  if (e.key === "Enter") {
    addTask();
  }
});

listContainer.innerHTML = localStorage.getItem("tasks");
