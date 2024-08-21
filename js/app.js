const addListBtn = document.getElementById('add_list');
const clearList = document.getElementById('clear-list');
const listWrapper = document.getElementById("list-item__wrapper");

// Utility function to get or initialize the list from localStorage
const getListArray = () => JSON.parse(localStorage.getItem('listArray')) || [];

// Utility function to save the list back to localStorage
const saveListArray = (listArray) => localStorage.setItem('listArray', JSON.stringify(listArray));

// Add list item event
addListBtn.addEventListener('click', () => {
    const listArray = getListArray();
    const addListFieldValue = document.getElementById('add-list__field').value.trim();

    if (!addListFieldValue) {
        alert("Please enter a value.");
        return;
    }

    if (listArray.includes(addListFieldValue)) {
        alert("Come up with something original!");
    } else {
        listArray.push(addListFieldValue);
        saveListArray(listArray);
        listCreator();        
    }
});

// Function to create list items in the DOM
const listCreator = () => {
    const itemsArray = getListArray();
    listWrapper.innerHTML = ""; // Clear the list before recreating it

    itemsArray.forEach((item, index) => {
        const listItem = document.createElement('div');
        listItem.classList.add('list-item');

        const content = document.createElement('div');
        content.classList.add('list-item__content');
        content.setAttribute('data-item', index);
        content.setAttribute('title', "Click for marking the task complete");
        content.textContent = item;

        const remover = document.createElement('div');
        remover.classList.add('remover');
        remover.setAttribute('title', "Remove this item");
        remover.innerHTML = '<i class="far fa-trash-alt"></i>';
        
        listItem.appendChild(content);
        listItem.appendChild(remover);
        listWrapper.appendChild(listItem);
    });
};

// Load list on page load
window.addEventListener('load', () => listCreator());

// Clear the entire list
clearList.addEventListener('click', () => {
    localStorage.removeItem('listArray');
    listWrapper.innerHTML = "";
});

// Event delegation for removing items
listWrapper.addEventListener('click', (e) => {
    if (e.target.closest('.remover')) {
        const itemDiv = e.target.closest('.list-item');
        const dataItemIndex = itemDiv.querySelector('.list-item__content').getAttribute('data-item');
        const listArray = getListArray();
        
        listArray.splice(dataItemIndex, 1); // Remove the item from array
        saveListArray(listArray);
        listCreator(); // Rebuild the list
    }

    // Handle marking item as complete
    if (e.target.closest('.list-item__content')) {
        const contentDiv = e.target.closest('.list-item__content');
        contentDiv.classList.toggle('completed');
    }
});
