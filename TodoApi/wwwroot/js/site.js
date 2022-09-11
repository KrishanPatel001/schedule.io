const uri = 'api/todoitems';
let todos = [];

function getItems() {
  fetch(uri)
    .then(response => response.json())
    .then(data => _displayItems(data))
    .catch(error => console.error('Unable to get items.', error));
}

var addPrior=document.getElementById("add-priority");
var editPrior=document.getElementById("edit-priority");
addPrior.addEventListener("change",sliderValue);
editPrior.addEventListener("change",sliderValue);
function sliderValue(){
    var addP = addPrior.value;
    var editP = editPrior.value;
    document.getElementById('range-value').innerText=addP;
    document.getElementById('range-edit').innerText=editP;
}

function addItem() {
  const addNameTextbox = document.getElementById('add-name');
  const addPersonTextbox = document.getElementById('add-person');
  const addPrioritySlider = document.getElementById('add-priority');
  

  const item = {
    status: 'Not started',
    name: addNameTextbox.value.trim(),
    personAssigned: addPersonTextbox.value.trim(),
    priority: addPrioritySlider.value.trim()
  };

  fetch(uri, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(item)
  })
    .then(response => response.json())
    .then(() => {
      getItems();
      addNameTextbox.value = '';
      addPersonTextbox.value = '';
    })
    .catch(error => console.error('Unable to add item.', error));
}

function deleteItem(id) {
  fetch(`${uri}/${id}`, {
    method: 'DELETE'
  })
  .then(() => getItems())
  .catch(error => console.error('Unable to delete item.', error));
}

function displayEditForm(id) {
  const item = todos.find(item => item.id === id);
  
  document.getElementById('edit-name').value = item.name;
  document.getElementById('edit-person').value = item.personAssigned;
  document.getElementById('edit-id').value = item.id;
  document.getElementById('editForm').style.display = 'block';
}

function updateItem() {
  const itemId = document.getElementById('edit-id').value;
  const statusRadios = document.getElementsByName('edit-status');
  let stat = '';
  for(i=0; i < statusRadios.length; i++){
    if(statusRadios[i].checked){
      stat = statusRadios[i].value;
    }
  }
  
    const item = {
    id: parseInt(itemId, 10),
    status: stat,
    name: document.getElementById('edit-name').value.trim(),
    personAssigned: document.getElementById('edit-person').value.trim(),
    priority: document.getElementById('edit-priority').value
  };

  fetch(`${uri}/${itemId}`, {
    method: 'PUT',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(item)
  })
  .then(() => getItems())
  .catch(error => console.error('Unable to update item.', error));

  closeInput();

  return false;
}

function closeInput() {
  document.getElementById('editForm').style.display = 'none';
}

function _displayCount(itemCount) {
  const name = (itemCount === 1) ? 'to-do' : 'to-dos';

  document.getElementById('counter').innerText = `${itemCount} ${name}`;
}

function _displayItems(data) {
  const tBody = document.getElementById('todos');
  tBody.innerHTML = '';

  _displayCount(data.length);

  const button = document.createElement('button');

  data.forEach(item => {
    let statusRadio = document.createElement('p');
    statusRadio.textContent = item.status;

    let editButton = button.cloneNode(false);
    editButton.innerText = 'Edit';
    editButton.setAttribute('onclick', `displayEditForm(${item.id})`);

    let deleteButton = button.cloneNode(false);
    deleteButton.innerText = 'Delete';
    deleteButton.setAttribute('onclick', `deleteItem(${item.id})`);

    let tr = tBody.insertRow();
    
    let td1 = tr.insertCell(0);
    td1.appendChild(statusRadio);

    let td2 = tr.insertCell(1);
    let textNode1 = document.createTextNode(item.name);
    td2.appendChild(textNode1);
    
    let td3 = tr.insertCell(2);
    let textNode2 = document.createTextNode(item.personAssigned);
    td3.appendChild(textNode2);

    let td4 = tr.insertCell(3);
    let textNode3 = document.createTextNode(item.priority);
    td4.appendChild(textNode3);

    let td5 = tr.insertCell(4);
    td5.appendChild(editButton);

    let td6 = tr.insertCell(5);
    td6.appendChild(deleteButton);
  });

  todos = data;
}