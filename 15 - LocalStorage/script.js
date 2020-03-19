const addItems = document.querySelector('.add-items');
const itemsList = document.querySelector('.plates');
const checkAllButton = document.querySelector(".check-all");
const deleteSelectedButton = document.querySelector(".delete-selected");
const deleteAllButton = document.querySelector(".delete-all");
const items = JSON.parse(localStorage.getItem("items")) || [];

function addItem(e) {
    e.preventDefault()

    const newItem = {
        text: this.item.value,
        done: false,
    }

    items.push(newItem);
    populateList(items, itemsList);
    localStorage.setItem("items", JSON.stringify(items));
    this.reset();
}

function populateList(plates = [], platesList) {
    let html = ""

    plates.map((plate, i) => {
        html += `
        <li>
            <input type="checkbox" id="plate-${i}" data-index="${i}" ${plate.done ? "checked" : ""}>
            <label for="plate-${i}">${plate.text}</label>
        </li>
        `;
    });

    platesList.innerHTML = html;
}

function toggleDone(e) {
    if (!e.target.matches("input")) {
        return;
    }
    items[e.target.dataset.index].done = !items[e.target.dataset.index].done;
    localStorage.setItem("items", JSON.stringify(items));
    populateList(items, itemsList);
}

function checkAll() {
    items.forEach(item => {
        item.done = true;
        localStorage.setItem("items", JSON.stringify(items));
    });
    populateList(items, itemsList);
}

function deleteAll() {
    items.length = 0;
    localStorage.clear();
    populateList(items, itemsList);
}

function deleteSelected() {
    const newItems = items.filter(item => item.done === false);
    items.length = 0;
    newItems.forEach(newItem => {
        items.push(newItem);
    });
    localStorage.setItem("items", JSON.stringify(items));
    populateList(items, itemsList);
}

addItems.addEventListener("submit", addItem);
itemsList.addEventListener("click", toggleDone);
checkAllButton.addEventListener("click", checkAll);
deleteSelectedButton.addEventListener("click", deleteSelected);
deleteAllButton.addEventListener("click", deleteAll);

populateList(items, itemsList)