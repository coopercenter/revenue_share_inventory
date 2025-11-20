(function ($) {
    "use strict";
})(jQuery);

function tableSearch(){
    const searchTerm = document.getElementById('table-search').value.toLowerCase();
    const rows = document.querySelectorAll('#table-body tr');


    rows.forEach(row => {
        const text = row.textContent.toLowerCase();
        if (text.includes(searchTerm)){
            row.style.display = '';
        }
        else{
            row.style.display = 'none';
        }
    });

    correctColoring();

}

function localitySearch() {
    const searchTerm = document.getElementById('locality-checkbox').value.toLowerCase();
    const localityDropdown = document.getElementById('locality-dropdown');
    const checkboxItems = localityDropdown.querySelectorAll('li.locality-dropdown');
    
    checkboxItems.forEach(item => {
        const text = item.textContent.toLowerCase();
        
        if (text.includes(searchTerm)) {
            item.style.display = '';
        } else {
            item.style.display = 'none';
        }
    });
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
    var tr = document.getElementById("table-body").getElementsByTagName("tr");
    var checkedLocalities = new Set();
    var numChecked = 0;

    for(i = 0; i < checkedList.length; i++){
        if(checkedList[i].checked){
            numChecked += 1;
            var localityText = checkedList[i].parentElement.innerText.trim();
            checkedLocalities.add(localityText);
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
    }
    if (numChecked == 0){
        for( i = 0; i < tr.length; i++){
            tr[i].style.display = "";
        }
    }
    correctColoring();
}

function clearCheckboxes(){
    var list = document.getElementById("select_locality");
    var checkedList = list.getElementsByClassName("form-check-input");
    var tr = document.getElementById("data-table").getElementsByTagName("tr");

    for(i = 0; i < checkedList.length; i++){
        checkedList[i].checked = false;
    }
    
    for(i = 0; i < tr.length; i++){
        tr[i].style.display = "";
    }

    correctColoring();
}

function clearSearch(){
    input = document.getElementById("find-locality"); 
    input.value = "";
}

function sortTableRowsByColumn( table, columnIndex, ascending ) {
    const rows = Array.from( table.querySelectorAll( ':scope > tbody > tr' ) );
    rows.sort( ( x, y ) => {
    
        var xValue = x.cells[columnIndex].innerText;
        var yValue = y.cells[columnIndex].innerText;
        if(xValue == "N/A"){
            return ascending ? 1 : -1;
        }

        if(yValue == "N/A"){
            return ascending ? -1: 1;
        }
        

        if (columnIndex == 1){
            var xDate = new Date(xValue);
            var yDate = new Date(yValue);
            
            console.log(xDate.getTime());
            console.log(yDate);
            console.log(xDate > yDate);
    

            if (xDate > yDate){
                console.log('should be higher');
                return ascending ? -1: 1;
            }

            else if(yDate > xDate){
                return ascending ? 1: -1;
            }
            return 0;
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
    const rows = table.querySelectorAll('tbody tr'); //remove if highlights of column unwanted
    const ascending = !( 'sort' in th.dataset ) || th.dataset.sort != 'asc';

    sortTableRowsByColumn( table, thIndex, ascending );

    const allTh = table.querySelectorAll( ':scope > thead > tr > th' );
    for( let th2 of allTh ) {
        const arrow = th2.querySelector('.arrow');
        if (arrow){
            arrow.innerHTML = '&#11014';
        }
        delete th2.dataset['sort'];
        th2.classList.remove('highlight-column'); //remove if whole highlight is unwanted
    }


 
    th.dataset['sort'] = ascending ? 'asc' : 'desc'
    const arrow = th.querySelector('.arrow');
    if(arrow){
        arrow.innerHTML = ascending ? '&#11015;' : '&#11014;';
    }

    /*If highlighted column unwanted, remove rest of function*/
    rows.forEach(row => {
        row.querySelectorAll('td').forEach(cell => {
            cell.classList.remove('highlight-column');
        });
    });

    th.classList.add('higlight-column');
    rows.forEach(row => {
        row.children[thIndex].classList.add('highlight-column');
    });

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

// Update button text and style based on checkbox states
function updateToggleButton() {
  const checkboxes = document.querySelectorAll('.form-check-input');
  const toggleBtn = document.getElementById('toggle_checkboxes');
  const anyChecked = Array.from(checkboxes).some(cb => cb.checked);
  
  if (anyChecked) {
    toggleBtn.textContent = 'Deselect All';
    toggleBtn.className = 'btn btn-sm btn-danger';
  } else {
    toggleBtn.textContent = 'Select All';
    toggleBtn.className = 'btn btn-sm btn-success';
  }
}

function toggleCheckboxes(event) {
    event.stopPropagation();
    event.preventDefault();
    const checkboxes = document.querySelectorAll('.form-check-input');
    const anyChecked = Array.from(checkboxes).some(cb => cb.checked);
    
    checkboxes.forEach(cb => cb.checked = !anyChecked);
    updateToggleButton();
    updateTable(); 
}

document.addEventListener('DOMContentLoaded', function() {
  setTimeout(() => {
    const checkboxes = document.querySelectorAll('.form-check-input');
    checkboxes.forEach(cb => {
      cb.addEventListener('change', updateToggleButton);
    });
    
    eventListenerCheckboxes();
    correctColoring();
  }, 500);
});

document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('locality-checkbox').addEventListener('click', function(e) {
        e.stopPropagation();
    });

    // Optional: Clear search when dropdown is closed
    document.getElementById('select_locality').addEventListener('hidden.bs.dropdown', function() {
        const searchInput = document.getElementById('locality-checkbox');
        searchInput.value = '';
        
        // Show all items again
        const localityDropdown = document.getElementById('locality-dropdown');
        const checkboxItems = localityDropdown.querySelectorAll('li.locality-dropdown');
        checkboxItems.forEach(item => {
            item.style.display = '';
        });
    });
});