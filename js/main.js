
(function ($) {
    "use strict";
})(jQuery);

function myFunction() {
    // Declare variables
    clearCheckboxes();
    var input, filter, table, tr, td, i, txtValue;
    input = document.getElementById("myInput");
    filter = input.value.toUpperCase();
    table = document.getElementById("data-table");
    tr = table.getElementsByTagName("tr");
  
    // Loop through all table rows, and hide those who don't match the search query
    for (i = 0; i < tr.length; i++) {
        td = tr[i].getElementsByTagName("td")[0];
        if (td) {
            txtValue = td.title
            if (txtValue.toUpperCase().indexOf(filter) > -1) {
                tr[i].style.display = "";
            } else {
                tr[i].style.display = "none";
            }
        }
    }
    correctColoring();
}

function mySearchFunction(){
    var input = document.getElementById("mySearchInput");
    var filter = input.value.toUpperCase();
    var search_bar = document.getElementById("select_locality");
    var li = search_bar.getElementsByTagName("li");

    for (i = 0; i < li.length; i++){
        var textValue = li[i].innerText
        if(textValue){
            if (textValue.toUpperCase().indexOf(filter) > -1) {
                li[i].style.display = "";
            } else {
                li[i].style.display = "none";
            }
        }
    }
    correctColoring();
}

function eventListenerCheckboxes(){
    var list = document.getElementById("select_locality");
    var checked = list.getElementsByClassName("form-check-input");
    for(i = 0; i < checked.length; i++){
        checked[i].addEventListener('click', updateTable);
    }
}

function updateTable(){
    clearSearch();
    var list = document.getElementById("select_locality");
    var checkedList = list.getElementsByClassName("form-check-input");
    var tr = document.getElementById("data-table").getElementsByTagName("tr");
    var deselect_button = document.getElementById("deselect_checkboxes");
    var checkedLocalities = new Set();
    var numChecked = 0;

    for(i = 0; i < checkedList.length; i++){
        if(checkedList[i].checked){
            numChecked += 1;
            checkedLocalities.add(checkedList[i].parentElement.innerText.substring(1))
        }
    }
    if (numChecked != 0) {
        for( i = 0; i < tr.length; i++){
            var td = tr[i].getElementsByTagName("td")[0]
            if (td){
                if(checkedLocalities.has(td.innerText)){
                    tr[i].style.display = "";
                }
                else{
                    tr[i].style.display = "none";
                }
            }
        }
        deselect_button.style.display = "inline";
    }
    if (numChecked == 0){
        for( i = 0; i < tr.length; i++){
            tr[i].style.display = "";
        }
        deselect_button.style.display = "none";
    }
    correctColoring();
}

function clearCheckboxes(){
    var list = document.getElementById("select_locality");
    var checkedList = list.getElementsByClassName("form-check-input");
    var tr = document.getElementById("data-table").getElementsByTagName("tr");
    var deselect_button = document.getElementById("deselect_checkboxes");

    for(i = 0; i < checkedList.length; i++){
        checkedList[i].checked = false;
        tr[i].style.display = "";
    }

    deselect_button.style.display = "none";
    correctColoring();
}

function clearSearch(){
    input = document.getElementById("myInput");
    input.value = "";
}


function sortTableRowsByColumn( table, columnIndex, ascending ) {
    const rows = Array.from( table.querySelectorAll( ':scope > tbody > tr' ) );
    rows.sort( ( x, y ) => {
    
        var xValue = x.cells[columnIndex].title;
        var yValue = y.cells[columnIndex].title;

        if(xValue == ""){
            xValue = x.cells[columnIndex].innerText;
            yValue = y.cells[columnIndex].innerText;
        }

        if (columnIndex == 1){
            var xDate = new Date(xValue);
            var yDate = new Date(yValue);
            return ascending ? (xDate - yDate)  : ( yDate - xDate) ;
        }
        return ascending ? ( xValue.localeCompare(yValue) ) : ( yValue.localeCompare(xValue) );
    } );
    for( let row of rows ) {
        table.tBodies[0].appendChild( row );
    }
}

function onColumnHeaderClicked( ev ) {
    
    const th = ev.currentTarget;
    const table = th.closest( 'table' );
    const thIndex = Array.from( th.parentElement.children ).indexOf( th );

    const ascending = !( 'sort' in th.dataset ) || th.dataset.sort != 'asc';

    sortTableRowsByColumn( table, thIndex, ascending );

    const allTh = table.querySelectorAll( ':scope > thead > tr > th' );
    for( let th2 of allTh ) {
        th2.innerText = th2.innerText.split(/[∧∨]/)[0]
        delete th2.dataset['sort'];
    }
 
    th.dataset['sort'] = ascending ? 'asc' : 'desc'

    colind = th.innerText.indexOf('∧') || th.innerText.indexOf('∨')
    test = th.innerText.split(/[∧∨]/)
    columnName = test[0]
    if(columnName == ""){
        th.innerText = ascending ? th.innerText + " ∧" : th.innerText + " ∨";
    }
    else{
        th.innerText = ascending ? columnName + " ∧" : columnName + " ∨";
    }
    correctColoring();
}

function correctColoring(){
    var tr = document.getElementById("data-table").getElementsByTagName("tr");
    var shown_Tr = [];
    for(i = 0; i < tr.length; i++){
        if(tr[i].style.display != "none"){
            shown_Tr.push(tr[i]);
        }
    }
    for(i = 0; i < shown_Tr.length; i++){
        current_tr = shown_Tr[i];
        var td = current_tr.getElementsByTagName("td")[0]
        current_tr.classList.remove("oddtr");
        current_tr.classList.remove("eventr");
        if (td) {
            if(i % 2 == 1){
                current_tr.classList.add("oddtr");
            }
            else{
                current_tr.classList.add("eventr");
            }
        }
    }
}

eventListenerCheckboxes();
correctColoring();