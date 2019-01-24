var addButton=document.getElementById('add');
var inputTask=document.getElementById('new-task');
var unfinTasks=document.getElementById('unfinished-tasks');
var finTasks=document.getElementById('finished-tasks');

function createNewElement(task, finished) {
    var listItem=document.createElement('li');
    var checkbox=document.createElement('button');

    if(finished){
        checkbox.className="material-icons checkbox";
        checkbox.innerHTML="<i class='material-icons'>check_box</i>";
    }else {
        checkbox.className="material-icons checkbox";
    checkbox.innerHTML="<i class='material-icons'>check_box_outline_blank</i>";
    }
    
    var label=document.createElement('label');
    label.innerText=task;
    var input=document.createElement('input');
    input.type="text";
    var editButton=document.createElement('button');
    editButton.className="material-icons edit";
    editButton.innerHTML="<i class='material-icons'>edit</i>";
    var deleteButton=document.createElement('button');
    deleteButton.className="material-icons delete";
    deleteButton.innerHTML="<i class='material-icons'>delete</i>";

    listItem.appendChild(checkbox);
    listItem.appendChild(label);
    listItem.appendChild(input);
    listItem.appendChild(deleteButton);
    listItem.appendChild(editButton);
    

    return listItem;
}

function addTask(){
    if(inputTask.value){
        var listItem=createNewElement(inputTask.value, false);
        unfinTasks.appendChild(listItem);
        bindTaskEvents(listItem,finTask);
        inputTask.value="";
    }
    save();
}
addButton.onclick=addTask;

function deleteTask(){
var listItem=this.parentNode;
var ul=listItem.parentNode;
ul.removeChild(listItem);
save();
}
function editTask(){
    var editButton=this;
    var listItem=this.parentNode;
    var label=listItem.querySelector('label');
    var input=listItem.querySelector('input[type=text]');
    
    var containsClass=listItem.classList.contains('editMode');

    if(containsClass) {
        label.innerText=input.value;
        editButton.className="material-icons edit";
        editButton.innerHTML="<i class='material-icons'>edit</i>";
        save();

    }else{
        input.value=label.innerText;
        editButton.className="material-icons save";
        editButton.innerHTML="<i class='material-icons'>save</i>";
    }
    listItem.classList.toggle('editMode');

}
function finTask() {
    var listItem=this.parentNode;
    var checkbox=listItem.querySelector('button.checkbox');
    checkbox.className="material-icons checkbox";
    checkbox.innerHTML="<i class='material-icons'>check_box</i>";
    
    finTasks.appendChild(listItem);
    bindTaskEvents(listItem,unfinTask);
    save();


}
function unfinTask(){
    var listItem=this.parentNode;
    var checkbox=listItem.querySelector('button.checkbox');
    checkbox.className="material-icons checkbox";
    checkbox.innerHTML="<i class='material-icons'>check_box_outline_blank</i>";

    
    unfinTasks.appendChild(listItem);
    bindTaskEvents(listItem, finTask);
    save();
}

function bindTaskEvents(listItem,checkboxEvent){
    var checkbox=listItem.querySelector('button.checkbox');
    var editButton=listItem.querySelector('button.edit');
    var deleteButton=listItem.querySelector('button.delete');

    checkbox.onclick=checkboxEvent;
    editButton.onclick=editTask;
    deleteButton.onclick=deleteTask;

}

function save(){
    var unfinTasksArr=[];
    for(var i=0; i<unfinTasks.children.length; i++){
        unfinTasksArr.push(unfinTasks.children[i].getElementsByTagName('label')[0].innerText);
    }

    var finTasksArr=[];
    for(var i=0; i<finTasks.children.length; i++){
        finTasksArr.push(finTasks.children[i].getElementsByTagName('label')[0].innerText);
    }
   
    localStorage.removeItem('todo');

        localStorage.setItem('todo', JSON.stringify({
            unfinTasks:unfinTasksArr,
            finTasks:finTasksArr
        }));
        
    
    }

    
function load(){
    return JSON.parse(localStorage.getItem('todo'));
}
var data=load();
for(var i=0; i<data.unfinTasks.length; i++){
    var listItem=createNewElement(data.unfinTasks[i], false);
    unfinTasks.appendChild(listItem);
    bindTaskEvents(listItem, finTask);
}
for(var i=0; i<data.finTasks.length; i++){
    var listItem=createNewElement(data.finTasks[i], true);
    finTasks.appendChild(listItem);
    bindTaskEvents(listItem, unfinTask);
}

