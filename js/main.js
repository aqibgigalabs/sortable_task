const datasetList = [
  { key: 'headline1', label: 'label 1', type: 'text' },
  { key: 'headline2', label: 'label 2', type: 'date' },
  { key: 'headline3', label: 'label 3', type: 'text' },
  { key: 'headline4', label: 'label 4', type: 'number' },
  { key: 'headline5', label: 'label 5', type: 'date' },
  { key: 'headline6', label: 'label 6', type: 'number' },
  { key: 'headline7', label: 'label 7', type: 'date' },
  { key: 'headline8', label: 'label 8', type: 'text' },
  { key: 'headline9', label: 'label 9', type: 'date' },
  { key: 'headline10', label: 'label 10', type: 'number' },
];
var dragSrcEl;


let appendLeftSideContiner = document.querySelector(
  '.left-side-card-container'
);

datasetList.forEach((element) => {
  const nodetemplete = addNode(element);
  appendLeftSideContiner.appendChild(nodetemplete);
});

let items = document.querySelectorAll(
  '.left-side-card-container .left-side-card'
);


items.forEach(function (item) {
  item.addEventListener('dragstart', handleDragStart);
});

// ----------------------------------- functions -------------------------- //


function saveData(e) {
  let items = document.querySelectorAll('.right-side-card-container .right-side-card');
  if (!items.length) return;

  const saveList = [];
  items.forEach((item, index) => {
    saveList.push({ index, key: item.dataset.key, label:  item.innerText, type:item.dataset.type });
  });
  console.log('Data List on Save ===>', saveList)
};

function addNode (item) {
  var div = document.createElement('div');
  var p = document.createElement('p');
  p.appendChild(document.createTextNode(item.key));
  div.classList = 'left-side-card';
  div.id = item.key;
  div.dataset.key = item.key;
  div.dataset.label = item.label;
  div.dataset.type = item.type;
  div.draggable = true;
  div.appendChild(p);
  return div;
};

function onChange (e) {
  const pID = e.target.id.split('input-')[1];

  const pheading = document.getElementById(pID);
  pheading.innerText = e.target.value;

  const divID = e.target.id.split('input-right-heading-')[1];
  const divheading = document.getElementById(divID);
  divheading.dataset.label = e.target.value;
};


function onClickEdit(e) {
  const inputExist = document.getElementById('input-' + e.target.id);
  if (inputExist) return;
  var input = document.createElement('input');
  input.type = 'text';
  input.id = 'input-' + e.target.id;
  input.value = e.target.innerHTML;
  input.name = e.target.innerHTML;
  input.addEventListener('change', onChange);
  e.target.appendChild(input);
}

function handleDragStartRight(e) {
  dragSrcEl = this;

  e.dataTransfer.effectAllowed = 'move';
  e.dataTransfer.setData('text/html', this.innerHTML);
}


function handleDropRight(e) {
  e.stopPropagation();
  if (!dragSrcEl) return 
  if (dragSrcEl !== this) {
    dragSrcEl.innerHTML = this.innerHTML;
    this.innerHTML = e.dataTransfer.getData('text/html');

    const p = document.getElementById(`right-heading-${dragSrcEl.id}`);
    p.addEventListener('dblclick', onClickEdit);
  }
  return false;
}

function handleDragOverRight(e) {
  if (e.preventDefault) {
    e.preventDefault();
  }

  return false;
}



function addRightNode (item) {
  var div = document.createElement('div');
  var p = document.createElement('p');
  p.id = `right-heading-${item.key}`;
  div.classList = 'right-side-card';
  div.id = item.key;
  div.dataset.key = item.key;
  div.dataset.label = item.label;
  div.dataset.type = item.type;
  div.draggable = true;
  p.appendChild(document.createTextNode(item.label));
  p.addEventListener('dblclick', onClickEdit);
  div.appendChild(p);
  div.addEventListener('dragstart', handleDragStartRight);
  div.addEventListener('dragover', handleDragOverRight);
  div.addEventListener('drop', handleDropRight);
  return div;
};

function handleDragOver(e) {
  if (e.preventDefault) {
    e.preventDefault();
  }

  return false;
}


function handleDragStart(e) {
  e.dataTransfer.effectAllowed = 'move';
  e.dataTransfer.setData('id', this.id);
  const data = datasetList.find((el) => el.key === this.id);
  e.dataTransfer.setData('payload', JSON.stringify(data));
}

function handleDrop(e) {
  e.stopPropagation();
  const data = e.dataTransfer.getData('payload');
  const appendRightSide = addRightNode(JSON.parse(data));
  const dropzone = event.target;
  dropzone.appendChild(appendRightSide);
  return false;
}