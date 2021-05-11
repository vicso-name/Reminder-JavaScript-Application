const chooseCathegory = document.getElementById('choose-cathegory');
const categoryWrapper = document.getElementById('category-wrapper');
const listCathegoryItem = document.querySelectorAll('.list__cathegory-item');
const addListBtn = document.getElementById('add_list');
const clearList = document.getElementById('clear-list');
const listArray = JSON.parse(localStorage.getItem('listArray')) || [];

function listCreator(){

    let itemsArray = JSON.parse(localStorage.getItem('listArray'));
    let listItemContent = "";
    for (item in itemsArray) {
        listItemContent +=
            '<div class="list-item">'+
            '<div data-item="'+item+'" title="Click for marking the task complete" class="list-item__content">'
            +itemsArray[item]+
            '</div>'+
            '<div title="Remove this item" class="remover">'+
            '<i class="far fa-trash-alt"></i>'+
            '</div>'+
            '</div>'+
            '</div>';
    }
    document.getElementById("list-item__wrapper").innerHTML = listItemContent;
}

addListBtn.addEventListener('click', function(){

    let addListFieldValue = document.getElementById('add-list__field').value;
    const retrievedData = localStorage.getItem("favoriteItems");
    let checkForMatches = JSON.parse(localStorage.getItem('listArray'));

    if(checkForMatches !== null && checkForMatches.includes(addListFieldValue)){
        alert("Come up with something original;")
    }else{

        listArray.push(addListFieldValue);
        localStorage.setItem('listArray', JSON.stringify(listArray));
        listCreator();
    }

});

window.addEventListener('load', listCreator())


/*** Clear List Button ***/

clearList.addEventListener('click', function(){
    localStorage.clear();
    document.getElementById("list-item__wrapper").innerHTML = "";
});


/*** Remove Item from List ***/

window.onload = function(){
    let removeItem = document.querySelectorAll('.remover');

    removeItem.forEach(item=>{
        item.addEventListener('click', function(){
            this.closest('.list-item').style.display='none';
            let dataItem =  this.getAttribute('data-item');
            let existingEntries = JSON.parse(localStorage.getItem('listArray'));
            existingEntries.splice(dataItem, 1)
            localStorage.setItem("listArray",JSON.stringify(existingEntries));
            let completArray = JSON.parse(localStorage.getItem('completArray'));
            completArray.splice(dataItem, 1)
            localStorage.setItem("completArray",JSON.stringify(completArray));
        });
    
    });  
}


/*** Mark as Complete ***/

let markComplet = document.querySelectorAll('.list-item__content');
const completArray = JSON.parse(localStorage.getItem('completArray')) || [];

markComplet.forEach(item=>{

    item.addEventListener('click', function(){
        let dataItem =  this.getAttribute('data-item');
        completArray.push(dataItem);
        localStorage.setItem('completArray', JSON.stringify(completArray));
        addCompletLine();
    });

    function addCompletLine(){
        let dataItem =  item.getAttribute('data-item');
        if(completArray.includes(String(dataItem))){
            item.classList.add('active')
        }
    }
    
    window.addEventListener('load', addCompletLine())
    
});





