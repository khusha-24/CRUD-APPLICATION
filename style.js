var selectedRow=null;
function showAlert(message,className){
    const div=document.createElement("div");
    div.className =`alert alert-${className}`;

    div.appendChild(document.createTextNode(message));
    const container = document.querySelector(".container");
    const main = document.querySelector(".main");
    container.insertBefore(div, main);

    setTimeout(()=> document.querySelector(".alert").remove(),3000);
}

function clearFields(){
    document.querySelector("#Firstname").value="";
    document.querySelector("#Lastname").value="";
    document.querySelector("#rollno").value="";
}

document.querySelector("#student-form").addEventListener("submit",(e)=>{
    e.preventDefault();

    //get form values
    const Firstname=document.querySelector("#Firstname").value;
    const Lastname=document.querySelector("#Lastname").value;
    const rollno=document.querySelector("#rollno").value;

    if(Firstname == "" || Lastname == "" || rollno == "")
    {
        showAlert("Please fill in allfields", "danger")
    }
    else{
        if(selectedRow == null){
            const list= document.querySelector("#student-list");
            const row=document.createElement("tr");

            row.innerHTML=`
             <td>${Firstname}</td>
             <td>${Lastname}</td>
             <td>${rollno}</td>
             <td>
             <a href="#" class="btn btn-warning btn-sm edit ">Edit</a>
             <a href="#" class="btn btn-danger btn-sm delete">Delete</a>
            `;
            list.appendChild(row);
            selectedRow=null;
            showAlert("Student Data Added" , "success")
        }
    
    else{
        selectedRow.children[0].textContent=Firstname;
        selectedRow.children[1].textContent=Lastname;
        selectedRow.children[2].textContent=rollno;
        selectedRow=null;
        showAlert("Student info Edited","info");
    }
    clearFields();
}
});

//edit

document.querySelector("#student-list").addEventListener("click",(e)=>{
    target=e.target;
    if(target.classList.contains("edit")){
        selectedRow=target.parentElement.parentElement;
        document.querySelector("#Firstname").value=  selectedRow.children[0].textContent;
        document.querySelector("#Lastname").value=  selectedRow.children[1].textContent;
        document.querySelector("#rollno").value=  selectedRow.children[2].textContent;
    }
})


document.querySelector("#student-list").addEventListener("click",(e)=>{
    target=e.target;
    if(target.classList.contains("delete")){
        target.parentElement.parentElement.remove();
        showAlert("Student Data Deleted ", "danger");
    }
})