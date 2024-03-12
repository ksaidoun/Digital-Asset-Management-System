class Task{
constructor(id, text, subtasks){
  this.id = id;
  this.text = text;
  this.subtasks = subtasks;
}

}

class Subtask{
  constructor(id, text, assets){
    this.id = id;
    this.text = text;
    this.assets = assets;
  }
  
  }


var tasks = [];

function addTask() {
  const taskInput = document.getElementById('taskInput');
  const taskText = taskInput.value.trim();
  if (taskText === '') return;
  var task = new Task(Date.now, taskText, []);
  /*const task = {
    id: Date.now(),
    text: taskText,
    subtasks: []
  };*/
  tasks.push(task);
  renderTasks();
  taskInput.value = '';
}

const taskInput = document.getElementById('taskInput');
const subtaskInput = document.getElementById('subtaskInput');
taskInput.addEventListener('keyup', function(event) {
  if (event.key === 'Enter') {
    addTask();
  }
});
subtaskInput.addEventListener('keyup', function(event) {
  if (event.key === 'Enter') {
    addSubtask();
  }
});

function renderTasks() {
  const taskList = document.getElementById('taskList');
  taskList.innerHTML = '';
  tasks.forEach(task => {
    const taskItem = document.createElement('li');
    const myDiv = document.createElement('div');
    myDiv.innerHTML = task.text;
    taskItem.appendChild(myDiv);
    const myButton = document.createElement('button');
    myButton.onclick = openModal(task.id);
    myButton.innerHTML = "Add Subtask";
    taskItem.appendChild(myButton);
    /*taskItem.innerHTML = `
      <div>${task.text}</div>
      <button onclick="openModal(${task.id})">Add Subtask</button>`
      //<ul id="subtaskList-${task.id}"></ul>
    ;*/
    /*task.subtasks.forEach(subtask => {
      const subtaskItem = document.createElement('li');
      subtaskItem.textContent = subtask.text;
      taskItem.querySelector(`#subtaskList-${task.id}`).appendChild(subtaskItem);
    });*/
    taskList.appendChild(taskItem);
  });
  //closeModal();
}

function getTask(taskId){
  var myTask = tasks.filter(task => task.id = taskId);
  if(myTask.length){
    return myTask[0];
  }
  return "ERROR";
}

function openModal(taskId) {
  var myTask = getTask(taskId);
  const subtaskList = document.getElementById('subtaskList');
  subtaskList.innerHTML = '';
myTask.subtasks.forEach((subtask) =>{
  console.log("HI");
  const listItem = document.createElement('li');
  listItem.innerHTML = subtask.text;
  subtaskList.appendChild(listItem);
}
    );
  document.getElementById('modal').style.display = 'block';
  document.getElementById('modal').dataset.taskId = taskId;
}

function closeModal() {
  document.getElementById('modal').style.display = 'none';
}

function addSubtask() {
  const taskId = document.getElementById('modal').dataset.taskId;
  const taskIndex = tasks.findIndex(task => task.id == taskId);
  if (taskIndex === -1) return;

  
  const subtaskText = subtaskInput.value.trim();
  if (subtaskText === '') return;

  const subtask = new Subtask(Date.now(), subtaskText, []);/*{
    id: Date.now(),
    text: subtaskText
  };*/
  tasks[taskIndex].subtasks.push(subtask);
  renderTasks();
  //openModal();
  subtaskInput.value = '';
}
