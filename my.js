var input = document.getElementById("todo-input");
var inputList = document.getElementById("list");
var markAll = document.getElementById("mark-all");
var clearBtn = document.getElementById('todo-clear');
var checkAll = document.querySelector('.todo__toggle');
var footer = document.querySelector('.todo__footer');
var filterAction = document.querySelectorAll('.todo-filter__radio');
var sortAction = document.querySelectorAll('.todo-sort__radio');
var todoArr = [];
var filterStatus = "All";

markAll.addEventListener('change', function() {
  var isChecked = this.checked;
  var items = document.querySelectorAll('.todo-list__item');

  todoArr.forEach(function(el) {
    el.completed = isChecked;
  });

  for (var i = 0; i < items.length; ++i) {
    if (isChecked) {
      items[i].classList.add("is-checked");
    } else {
      items[i].classList.remove("is-checked");
    };
    var inputsTwo = items[i].getElementsByClassName('todo-check');
    inputsTwo[0].checked = isChecked;
  }
});

input.addEventListener("keyup", function(e) {
  var val = input.value;
  var length = val.length;
  
  var newTodo = function() {
    var isEnter = e.keyCode === 13;
    if (isEnter) {
      renderTodo(val);
      checkAllStatus();
    };
  };

  validLength(length, input, newTodo);

  checkAllDisplay();

  todoLength(filterStatus);
});

function checkAllDisplay() {
  if (todoArr.length >= 1) {
    checkAll.classList.add('active');
    footer.classList.add('active');
  } else {
    checkAll.classList.remove('active');
    footer.classList.remove('active');
  };
};

function validLength(length, item, func) {
  if (length < 3) {
    item.classList.add('error');
  } else if (length > 200) {
    item.value = val.substring(0, 200);
  } else {
    item.classList.remove('error');
    func();
  };
};

function renderTodo(item) {
  var todoProp = {
    id: Date.now(),
    name: item,
    completed: false
  };

  todoArr.push(todoProp);

  var listItem = document.createElement('li');
  listItem.classList.add('todo-list__item');
  listItem.id = todoProp.id;
  inputList.append(listItem);

  var checkBoxWrap = document.createElement('div');
  checkBoxWrap.classList.add('todo-list__checkbox');

  var checkBoxLabel = document.createElement('label');
  checkBoxLabel.classList.add('checkbox');
  checkBoxWrap.append(checkBoxLabel);

  var checkBox = document.createElement('input');
  checkBox.classList.add('hidden');
  checkBox.classList.add('todo-check');
  checkBox.setAttribute('type', 'checkbox');
  checkBoxLabel.append(checkBox);
  checkBox.addEventListener('change', checkedItem);

  var checkBoxBtn = document.createElement('span');
  checkBoxBtn.classList.add('checkbox-btn');
  checkBoxLabel.append(checkBoxBtn);

  var viewBox = document.createElement('div');
  viewBox.classList.add('todo-list__view');
  viewBox.addEventListener('dblclick', editItem);

  var todoText = document.createElement('div');
  todoText.classList.add('todo-list__text');
  todoText.textContent = todoProp.name;
  viewBox.append(todoText);

  var todoInput = document.createElement('input');
  todoInput.classList.add('todo-list__input', 'hidden');
  todoInput.setAttribute('type', 'text');
  todoInput.value = item;
  viewBox.append(todoInput);
  todoInput.addEventListener('blur', editEnd);
  todoInput.addEventListener('keyup', function() {
    if (this.value.length < 3) {
      todoInput.classList.add('error');
    } else if (this.value.length > 5) {
      todoInput.value = todoInput.value.substring(0, 5);
    } else {
      todoInput.classList.remove('error');
    };
  });
  
  var todoBtn = document.createElement('button');
  todoBtn.classList.add('todo-list__button');
  todoBtn.addEventListener('click', removeItem);

  listItem.append(checkBoxWrap);
  listItem.append(viewBox);
  listItem.append(todoBtn);

  input.value = ''; 
};

function removeItem(e) {
  var el = e.target;
  var parent = el.parentElement;
  var id = parent.id;
  todoArr = todoArr.filter(function(item) {
    return item.id != id;
  });

  checkAllStatus();
  parent.remove();
  checkAllDisplay();
  todoLength(filterStatus);
};

function editItem(e) {
  var el = e.target;
  var next = el.nextSibling;

  next.classList.remove('hidden');
  el.classList.add('hidden');
};

function editEnd(e) {
  var el = e.target;
  var prev = el.previousSibling;
  var val = el.value;
  var length = val.length;
  var id = el.parentElement.parentElement.id;

  var editFunc = function() {
    prev.textContent = val;
    prev.classList.remove('hidden');
    el.classList.add('hidden');

    todoArr.forEach(function(element) {
      if (element.id == id) {
        element.name = val;
      };
    });
  };

  validLength(length, el, editFunc);
};

function checkedItem(e) {
  var parent = e.target.closest('.todo-list__item');
  var id = parent.id;

  if (e.target.checked) {
    parent.classList.add('is-checked');
  } else {
    parent.classList.remove('is-checked');
  };

  todoArr.forEach(function(element) {
    if (element.id == id) {
      element.completed = !element.completed;
    };
  });

  checkAllStatus();
  filterFunc();
  todoLength(filterStatus);
};

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
  };
};

function checkAllStatus() {
  var checkArr = todoArr.filter(function(n) {
    return n.completed == true;
  })

  if (checkArr.length === todoArr.length) {
    markAll.checked = true;
    if (todoArr.length == 0) markAll.checked = false;
  } else {
    markAll.checked = false;
  };

  if (checkArr.length >= 1) {
    clearBtn.classList.add('active');
  } else {
    clearBtn.classList.remove('active');
  };
};

filterAction.forEach(function(el) {
  el.addEventListener('click', function() {
    filterStatus = el.value;
    todoLength(filterStatus);
    filterFunc();
  })
});

function filterFunc() {
  var items = document.querySelectorAll('.todo-list__item');
  var completeTodo = todoArr.filter(function(n) {
    return n.completed == true;
  });
  var activeTodo = todoArr.filter(function(n) {
    return n.completed == false;
  });

  items.forEach(function(item) {
    var id = item.id;
    item.classList.add('hidden');

    switch (filterStatus) {
      case 'Complete':
        completeTodo.forEach(function(element) {
          if (element.id == id) {
            item.classList.remove('hidden');
          };
        });
        break;
      case 'Active':
        activeTodo.forEach(function(element) {
          if (element.id == id) {
            item.classList.remove('hidden');
          };
        });
        break;
      default:
        item.classList.remove('hidden');
    };
  })
}

sortAction.forEach(function(el) {
  el.addEventListener('click', function() {
    var items = document.querySelectorAll('.todo-list__item');
    var itemsArr = Array.prototype.slice.call(items);

    itemsArr.sort(function(a, b) {
      var aName = a.textContent.toLowerCase();
      var bName = b.textContent.toLowerCase();
      var aDate = a.id;
      var bDate = b.id;

      if (el.value === 'Asc') {
        if (aName < bName) return -1;
        if (aName > bName) return 1;

        if (aName == bName) {
          if (aDate < bDate) return -1;
          if (aDate > bDate) return 1;
          return 0;
        }
      } else {
        if (aName < bName) return 1;
        if (aName > bName) return -1;

        if (aName == bName) {
          if (aDate < bDate) return 1;
          if (aDate > bDate) return -1;
          return 0;
        };
      };
    });

    itemsArr.forEach(function(item) {
      inputList.appendChild(item);
    });
  });
});

clearBtn.addEventListener('click', clearFunc);

function clearFunc() {
  var items = document.querySelectorAll('.todo-list__item');

  items.forEach(function(el) {
    var id = el.id;

    if (el.classList.contains("is-checked")) {
      el.remove();

      todoArr = todoArr.filter(function(item) {
        return item.id != id;
      });
    };
  });

  checkAllDisplay();
  todoLength(filterStatus);
};