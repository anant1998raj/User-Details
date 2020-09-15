
 showtask();
 let addtaskinput =  document.getElementById("addtaskinput");
 let addtaskbtn = document.getElementById("addtaskbtn");

 let firstname = document.getElementById("txtFirstName");
let lastname = document.getElementById("txtLastName");
 let superHeroName = document.getElementById("txtSuperName");
 let email = document.getElementById("txtEmail");
 let gender = document.getElementById("txtGender");
 let age = document.getElementById("txtAge");
 var accounting=[];
 addtaskbtn.addEventListener("click", function(){
    if (firstname.value =="" || age.value == ""   || lastname.value == "" || superHeroName.value == "" || email.value == "" || gender.value == "" ){
        return ;
    }
    let data ={"firstname":firstname.value,"age":age.value,"lastname":lastname.value, "superHeroName":superHeroName.value,"email":email.value, "gender":gender.value};

    //  addtaskinputval = data;
  
     let webtask = localStorage.getItem("localtask");
     if(webtask == null){
        accounting = [];
        
     }
     else{
        accounting = JSON.parse(webtask);
     } 
    accounting.push(data); 
     localStorage.setItem("localtask", JSON.stringify(accounting));
     
 });
function showtask(){
    let webtask = localStorage.getItem("localtask");
    if(webtask == null){
        taskObj = [];
    }
    else{
       taskObj = JSON.parse(webtask);
       
    }
    let html ="<tr><th></th><th onclick='sortTable(0)'><b>#</b></th><th onclick='sortTable(1)'><b>FirstName</b></th><th onclick='sortTable(2)'><b>LastName</b></th><th onclick='sortTable(3)'><b>SuperHeroName</b></th><th><b>Email</b></th><th><b>Gender</b></th><th onclick='sortTable(4)'><b>Age</b></th></tr>";
    
    
    for (var i = 0; i < taskObj.length; i++) {
        
        html += "<tr>";
        html += "<td><input type='checkbox' name='name1' /></td>";
        html += "<td>" + i + "</td>";
        html += "<td>" + taskObj[i].firstname + "</td>";
        html += "<td>" + taskObj[i].lastname + "</td>";
        html += "<td>" + taskObj[i].superHeroName + "</td>";
        html += "<td>" + taskObj[i].email + "</td>";
        html += "<td>" + taskObj[i].gender + "</td>";
        html += "<td>" + taskObj[i].age + "</td>";
        html += "</tr>";
        document.getElementById("addedtasklist").innerHTML=html;
        

    }
}

// delete @ checkbox
function deleteRow() {
    try {


        let webtask = localStorage.getItem("localtask");
        if(webtask == null){
            taskObj2 = [];
        }
        else{
           taskObj2 = JSON.parse(webtask);
           
        }


    var table = document.getElementById("addedtasklist");
    var rowCount = table.rows.length;

    for(var i=0; i<rowCount; i++) {
        var row = table.rows[i];
        var chkbox = row.cells[0].childNodes[0];
        if(null != chkbox && true == chkbox.checked) {
           
            taskObj2.splice(row.cells[1].innerHTML, 1)
         
        }
    }

    localStorage.setItem("localtask", JSON.stringify(taskObj2));
    showtask();

    }catch(e) {
        alert(e);
    }
}

//sort
  function sortTable(n) {
    var table, rows, switching, i, x, y, shouldSwitch, dir, switchcount = 0;
    table = document.getElementById("addedtasklist");
    switching = true;
    dir = "asc";
    while (switching) {
      switching = false;
      rows = table.rows;
      for (i = 1; i < (rows.length - 1); i++) {
        shouldSwitch = false;
        x = rows[i].getElementsByTagName("TD")[n];
        y = rows[i + 1].getElementsByTagName("TD")[n];
        if (dir == "asc") {
          if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
            shouldSwitch = true;
            break;
          }
        } else if (dir == "desc") {
          if (x.innerHTML.toLowerCase() < y.innerHTML.toLowerCase()) {
            shouldSwitch = true;
            break;
          }
        }
      }
      if (shouldSwitch) {
        rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
        switching = true;
        switchcount ++;
      } else {
        if (switchcount == 0 && dir == "asc") {
          dir = "desc";
          switching = true;
        }
      }
    }
  }

  //Search

  function searchTable() {
    var input, filter, found, table, tr, td, i, j;
    input = document.getElementById("myInput");
    filter = input.value.toUpperCase();
    table = document.getElementById("addedtasklist");
    tr = table.getElementsByTagName("tr");
    for (i = 0; i < tr.length; i++) {
        td = tr[i].getElementsByTagName("td");
        for (j = 0; j < td.length; j++) {
            if (td[j].innerHTML.toUpperCase().indexOf(filter) > -1) {
                found = true;
            }
        }
        if (found) {
            tr[i].style.display = "";
            found = false;
        } else {
            tr[i].style.display = "none";
        }
    }
}


