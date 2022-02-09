
const addBtn = document.querySelector('#add');
const listTask = document.querySelector('#lecture-list ul');
const update = document.getElementById('update');
let taskName = document.getElementById('task');
let  select = document.getElementById('select-priority');
let priorityValue = select.options[select.selectedIndex];
let description = document.getElementById('description');



const displayData = () => {
    
   
    axios.get('https://infodev-server.herokuapp.com/api/todos').then(function(response){

    response.data.forEach(item => {
      
      
      if(item.completed === false) {
        listTask.innerHTML +=  `
        <li data-index = "${item._id}">
          <div>
              <h6 class="title"> ${item.name} <span class="ml-2 badge badge-info">${item.priority}</span></h6>
              <p class="description">${item.description}</p>
          </div>
          <div>
              <button class="btn btn-success"data-index= "${item._id}"><i class="fas fa-check"></i></i></button>
              <button class="btn btn-warning" data-index= "${item._id}"><i class="fas fa-pencil"></i></i></button>
              <button class="btn btn-danger" data-index= "${item._id}" ><i class="far fa-trash-alt"></i></button>
          </div>
        </li>`
      } else {
        const completeClass = 'strike';
        listTask.innerHTML +=  `
        <li>
          <div>
              <h6 class="title ${completeClass}"> ${item.name} <span class="ml-2 badge badge-info">${item.priority}</span></h6>
              <p class="description">${item.description}</p>
          </div>
        </li>`
      }
      
      const deleteBtn = document.querySelectorAll('.btn-danger');
      const completeTasks = document.querySelectorAll('.btn-success');
      const editBtns = document.querySelectorAll('.btn-warning');

     completeTasks.forEach((btn, i) => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
         let index = btn.getAttribute('data-index');
          updateComplete(index);
          
      })
    })
    
    editBtns.forEach((editBtn,i) => {
       
        editBtn.addEventListener('click', (e) => {
            e.preventDefault();
          const index = editBtn.getAttribute('data-index');
          
          const found = response.data.find(el => index === el._id);
          console.log(found.name);
          taskName.value = found.name;
          priorityValue.value = found.priority;
          description.value = found.description;
          update.addEventListener('click', (e) => {
                e.preventDefault();
                console.log(index);
                updateData(index);
              } ); 
          
            
         })
        
    })

   deleteBtn.forEach((delBtn, i) => {
           delBtn.addEventListener('click', (e) => {
             e.preventDefault();
             console.log(delBtn);
               const index = delBtn.getAttribute('data-index');
               deleteTask(index);
           })
         }) 
      
    });
    });
  listTask.innerHTML = '';
}

const updateComplete = (id) => {
 
  axios({
    method: 'put',
    url: `https://infodev-server.herokuapp.com/api/todos/${id}`,
    data: {
    completed: true,
  
    }
}).then(function (response) {
console.log(response);
displayData();
alert("Completed Successfully");
})
.catch(function (error) {
console.log(error);
});

}

  

function postData(e) {
  e.preventDefault();
  
  
   axios({
        method: 'post',
        url: 'https://infodev-server.herokuapp.com/api/todos',
        data: {
        completed: false,
        name: taskName.value,
        priority: priorityValue.value,
        description: description.value
        }
}).then(function (response) {
    console.log(response);
    displayData();
    alert("Added Successfully");
  })
  .catch(function (error) {
    console.log(error);
  });
  
  
}

addBtn.addEventListener('click', postData);
displayData();



const  deleteTask = (id) => {
  axios ({
    method:"delete",
    url: `https://infodev-server.herokuapp.com/api/todos/${id}`,
  }).then ((res) =>{
    console.log("Deleted");
    location.reload();
    alert("Deleted Successfully");
  }).catch((err) => {
    console.log("Error")
  });

  // displayData();

}

const editTask = () => {

  console.log("success");

  

}

// listTask.addEventListener('click', (e) => {
  
//   e.preventDefault();
//   if(e.target.className === "btn btn-warning") {
//   var targetLi = e.target.parentElement.parentElement;
    
//   }
//   taskName.value =  targetLi.children[0].children[0].childNodes[0].data;
//   description.value = targetLi.children[0].children[1].innerText;
//   priorityValue.value = targetLi.children[0].children[0].children[0].innerText;

//   const id= targetLi.getAttribute("data-index");

//   update.addEventListener('click', (e) => {
//     e.preventDefault();
//     updateData(id);
//   } );

  
// })

function updateData(id) {
 axios({
        method: 'put',
        url: `https://infodev-server.herokuapp.com/api/todos/${id}`,
        data: {
        completed: false,
        name: taskName.value,
        priority: priorityValue.value,
        description: description.value
        }
}).then(function (response) {
    console.log(response);
    location.reload();
    
})
  .catch(function (error) {
    console.log(error);
  });
  
 
}








  
    
  