var input = document.getElementById("todo-input");
var inputList = document.getElementById("list");
var todoArr = [];

inputList.addEventListener('click', function(e) {
  var el = e.target;
  var parent = el.parentElement

  if (el.classList.contains('todo-list__button')) {
    removeItem(parent.getAttribute('data-date'), parent);
  }
});

inputList.addEventListener('dblclick', editItem);

input.addEventListener("keyup", function(e) {
  var val = input.value;
  var length = val.length;
  
  var newTodo = function() {
    var isEnter = e.keyCode === 13;
    if (isEnter) {
      renderTodo(val)
    }
  };

  validLength(length, input, newTodo);

  checkAllDisplay()
});

function checkAllDisplay() {
  var checkAll = document.querySelector('.todo__toggle')

  todoArr.length >= 1 ? checkAll.classList.add('active') : checkAll.classList.remove('active');
}

function validLength(length, item, func) {
  if (length < 3) {
    item.classList.add('error');
  } else if (length > 200) {
    item.value = val.substring(0, 200);
  } else {
    item.classList.remove('error');
    func();
  }
}

function renderTodo(item) {
  var todoProp = {
    id: Date.now(),
    name: item,
    completed: false
  };

  todoArr.push(todoProp);

  var listItem = document.createElement('li');
  listItem.classList.add('todo-list__item');
  listItem.setAttribute('data-date', todoProp.id);
  inputList.append(listItem);

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
  todoText.textContent = todoProp.name;
  viewBox.append(todoText);

  var todoInput = document.createElement('input');
  todoInput.classList.add('todo-list__input', 'hidden');
  todoInput.setAttribute('type', 'text');
  todoInput.value = item;
  viewBox.append(todoInput);
  
  var todoBtn = document.createElement('button');
  todoBtn.classList.add('todo-list__button');

  listItem.append(checkBoxWrap);
  listItem.append(viewBox);
  listItem.append(todoBtn);

  input.value = '';
}

function removeItem(id, el) {
  todoArr = todoArr.filter(function(item) {
    return item.id != id;
  });

  el.remove();
  checkAllDisplay();
}

function editItem(e) {
  var el = e.target;
  var next = el.nextSibling;

  if (el.classList.contains('todo-list__text')) {
    next.classList.remove('hidden');
    el.classList.add('hidden');
  }
}

document.addEventListener('blur', function(e){
  var el = e.target;
  var prev = el.previousSibling;
  var val = el.value;
  var length = val.length;
  var id = el.parentElement.parentElement.getAttribute('data-date');

  var editFunc = function() {
    prev.textContent = val;
    prev.classList.remove('hidden');
    el.classList.add('hidden');

    todoArr.forEach(function (element) {
      if (element.id == id) {
        element.name = val
      }
    })
  };

  if(el.classList.contains("todo-list__input")) {
    validLength(length, el, editFunc);
  }
});