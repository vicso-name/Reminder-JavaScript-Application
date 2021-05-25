const addListBtn = document.getElementById('add_list');
const clearList = document.getElementById('clear-list');

addListBtn.addEventListener('click', function(){
    
    const listArray = JSON.parse(localStorage.getItem('listArray')) || [];
    const addListFieldValue = document.getElementById('add-list__field').value;    
    const checkingMatches = JSON.parse(localStorage.getItem('listArray'));

    if(checkingMatches !== null && checkingMatches.includes(addListFieldValue)){
        alert("Come up with something original;")
    }else{

        listArray.push(addListFieldValue);
        localStorage.setItem('listArray', JSON.stringify(listArray));
        listCreator();        
    }

});


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



window.addEventListener('load', listCreator())


/*** Clear List Button ***/

clearList.addEventListener('click', function(){
    localStorage.clear();
    document.getElementById("list-item__wrapper").innerHTML = "";
});


/*** Remove Item from List ***/

    let removeItem = document.querySelectorAll('.remover');

    removeItem.forEach(item=>{
        item.addEventListener('click', function(){
            this.closest('.list-item').remove();
            let dataItem =  this.getAttribute('data-item');
            let existingEntries = JSON.parse(localStorage.getItem('listArray'));
            existingEntries.splice(dataItem, 1)
            localStorage.setItem("listArray",JSON.stringify(existingEntries));
            let completArray = JSON.parse(localStorage.getItem('completArray'));
            completArray.splice(dataItem, 1)
            localStorage.setItem("completArray",JSON.stringify(completArray));
        });
    
    }); 














