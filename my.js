var input = document.getElementById("todo-input");
var inputList = document.getElementById("list");
var markAll = document.getElementById("mark-all");
var todoArr = [];
var filterStatus = "All";

inputList.addEventListener('click', function(e) {
  var el = e.target;
  var parent = el.parentElement

  if (el.classList.contains('todo-list__button')) {
    removeItem(parent.getAttribute('data-date'), parent);
    todoLength(filterStatus);
  }
});

inputList.addEventListener('dblclick', editItem);

markAll.addEventListener('change', function() {
  var isChecked = this.checked;
  var items = document.querySelectorAll('.todo-list__item');
  var inputs = inputList.querySelectorAll("input[type='checkbox']");

  todoArr.forEach(function(el) {
    el.completed = isChecked
  })
  
  for (var i = 0; i < items.length; ++i) {
    if (isChecked) {
      items[i].classList.add("is-checked");
    } else {
      items[i].classList.remove("is-checked");
    };
    inputs[i].checked = isChecked;
  }
});

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

  checkAllDisplay();

  todoLength(filterStatus)
});

function checkAllDisplay() {
  var checkAll = document.querySelector('.todo__toggle');
  var footer = document.querySelector('.todo__footer');

  if (todoArr.length >= 1) {
    checkAll.classList.add('active');
    footer.classList.add('active');
  } else {
    checkAll.classList.remove('active');
    footer.classList.remove('active');
  }
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

  checkBox.addEventListener('change', checkedItem)

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

    todoArr.forEach(function(element) {
      if (element.id == id) {
        element.name = val
      }
    })
  };

  if(el.classList.contains("todo-list__input")) {
    validLength(length, el, editFunc);
  }
}, true);

function checkedItem(e) {
  var parent = e.target.closest('.todo-list__item');
  var id = parent.getAttribute('data-date');

  if (e.target.checked) {
    parent.classList.add('is-checked');
  } else {
    parent.classList.remove('is-checked');
  }

  todoArr.forEach(function(element) {
    if (element.id == id) {
      element.completed = !element.completed;
    }
  })

  var checkArr = todoArr.filter(function(n) {
    return n.completed == true;
  })

  if (checkArr.length === todoArr.length) {
    markAll.checked = true;
  } else {
    markAll.checked = false;
  }

  todoLength(filterStatus);
}

function todoLength(status) {
  var lengthArea = document.querySelector('.todo-count');
  var completeTodo = todoArr.filter(function(n) {
    return n.completed == true;
  });
  var activeTodo = todoArr.filter(function(n) {
    return n.completed == false;
  });

  if (status === "Complete") {
    lengthArea.innerHTML = completeTodo.length + ' items';
  } else if (status === "Active") {
    lengthArea.innerHTML = activeTodo.length + ' items';
  } else {
    lengthArea.innerHTML = todoArr.length + ' items';
  }
}

var filterAction = document.querySelectorAll('.todo-filter__radio');

filterAction.forEach(function(el) {
  el.addEventListener('click', function() {
    filterStatus = el.value;
    todoLength(filterStatus);
    var item = document.querySelectorAll('.todo-list__item');
    var completeTodo = todoArr.filter(function(n) {
      return n.completed == true;
    });
    var activeTodo = todoArr.filter(function(n) {
      return n.completed == false;
    });

    item.forEach(function(item) {
      var id = item.getAttribute('data-date')
      item.classList.add('hidden')

      
      switch (filterStatus) {
        case 'Complete':
          completeTodo.forEach(function(element) {
            if (element.id == id) {
              item.classList.remove('hidden')
            }
          })
          break;
        case 'Active':
          activeTodo.forEach(function(element) {
            if (element.id == id) {
              item.classList.remove('hidden')
            }
          })
          break;
        default:
          item.classList.remove('hidden')
      }
    })
  })
})