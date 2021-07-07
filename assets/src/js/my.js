
var input = document.getElementById("todo-input");
var inputList = document.getElementById("list");



inputList.addEventListener('click', removeItem);

inputList.addEventListener('dblclick', editItem);

input.addEventListener("keyup", function(e) {
  var isEnter = e.keyCode === 13
  var val = input.value;
  var length = val.length

  if (length < 3) {
    input.classList.add('error')
  } else if (length > 200) {
    input.value = val.substring(0, 200)
  } else {
    input.classList.remove('error')
    isEnter ? renderTodo(val) : false;
  }
});

function renderTodo(item) {
  var listItem = document.createElement('li');
  listItem.classList.add('todo-list__item');
  listItem.setAttribute('data-date', Date.now())
  inputList.append(listItem)

  var checkBoxWrap = document.createElement('div');
  checkBoxWrap.classList.add('todo-list__checkbox');

  var checkBoxLabel = document.createElement('label');
  checkBoxLabel.classList.add('checkbox');
  checkBoxWrap.append(checkBoxLabel);

  var checkBox = document.createElement('input');
  checkBox.classList.add('hidden');
  checkBox.setAttribute('type', 'checkbox');
  checkBoxLabel.append(checkBox);

  var checkBoxBtn = document.createElement('span');
  checkBoxBtn.classList.add('checkbox-btn');
  checkBoxLabel.append(checkBoxBtn);

  var viewBox = document.createElement('div');
  viewBox.classList.add('todo-list__view');

  var todoText = document.createElement('div');
  todoText.classList.add('todo-list__text');
  todoText.textContent = item;
  viewBox.append(todoText)

  var todoInput = document.createElement('input');
  todoInput.classList.add('todo-list__input', 'hidden');
  todoInput.setAttribute('type', 'text');
  todoInput.value = item;
  viewBox.append(todoInput);
  
  var todoBtn = document.createElement('button');
  todoBtn.classList.add('todo-list__button');
  todoBtn.innerHTML = '<i class="icon icon-close"></i>';

  listItem.append(checkBoxWrap);
  listItem.append(viewBox);
  listItem.append(todoBtn);

  input.value = '';
}

function removeItem(e) {
  var el = e.target

  if (el.classList.contains('todo-list__button')) {
    el.parentElement.remove();
  }
}

function editItem(e) {
  var el = e.target;
  var next = el.nextSibling;

  if (el.classList.contains('todo-list__text')) {
    next.classList.remove('hidden')
    el.classList.add('hidden')
  }
}

var todoInputs = document.querySelectorAll('.todo-list__input')

todoInputs.forEach(blurFunc);

function blurFunc(el) {
  el.addEventListener('blur', function () {
    var prev = this.previousSibling
    this.classList.add('hidden')
    prev.classList.remove('hidden')
  })
}