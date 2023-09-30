const listContainer = document.getElementById("list-container");
const inputBox = document.getElementById("input-box");
const Submitbutton = document.getElementById("submit-button");

const messageBox = document.getElementById("hidden");
const message = document.getElementById("message");
const messageIcon = document.getElementById("messageIcon");

function addTask() {
  if (inputBox.value.trim() == "" || inputBox.value.trim() == " ") {
    showAlert();
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
  }

  inputBox.value = "";
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

  const backupText = li.innerText;
  inputEdit.value = li.innerText;
  inputEdit.maxLength = 35;
  li.innerHTML = "";
  li.appendChild(inputEdit);
  li.appendChild(trashIcon);
  li.appendChild(editIcon);

  function updateItem() {
    if (inputEdit.value.trim() !== "") {
      li.innerHTML = inputEdit.value;
      console.log("hidden it!");
      messageBox.id = "hidden";
    } else {
      li.innerHTML = backupText;
      console.log("show it!!");
      showAlert();
    }

    li.appendChild(trashIcon);
    li.appendChild(editIcon);
    saveTasks();
  }

  inputEdit.addEventListener("keydown", function (e) {
    if (e.key === " " && inputEdit.value.endsWith(" ")) {
      e.preventDefault();
    }
  });

  inputEdit.addEventListener("keyup", function (e) {
    if (e.key === "Enter") {
      updateItem();
    }
  });

  inputEdit.addEventListener("blur", function () {
    updateItem();
  });

  inputEdit.focus();
}

function showAlert() {
  messageBox.id = "alert";
  message.innerText = "É necessário que você escreva algo";
  messageIcon.className = "fa-solid fa-circle-exclamation";
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

inputBox.addEventListener("keydown", function (e) {
  if (e.key === " " && inputBox.value.endsWith(" ")) {
    e.preventDefault();
  }
});

listContainer.innerHTML = localStorage.getItem("tasks");
