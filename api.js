// const { default: axios } = require("axios");

const addBtn = document.querySelector('#success');
const listTask = document.getElementById('lecture-list');

const displayData = () => {
    
   
    axios.get('https://infodev-server.herokuapp.com/api/todos').then(function(response){

    response.data.forEach(item => {
      //console.log(item._id);
      if(item.completed === false) {
        listTask.innerHTML +=  `<ul>
        <li>
          <div>
              <h6 class="title"> ${item.name} <span class="ml-2 badge badge-info">${item.priority}</span></h6>
              <p class="description">${item.description}</p>
          </div>
          <div>
              <button class="btn btn-success"data-index= "${item._id}"><i class="fas fa-check"></i></i></button>
              <button class="btn btn-warning" data-index= "${item._id}"><i class="fas fa-pencil"></i></i></button>
              <button class="btn btn-danger" data-index= "${item._id}" ><i class="far fa-trash-alt"></i></button>
          </div>
        </li>
        </ul>`
      } else {
        const completeClass = 'strike';
        listTask.innerHTML +=  `<ul>
        <li>
          <div>
              <h6 class="title ${completeClass}"> ${item.name} <span class="ml-2 badge badge-info">${item.priority}</span></h6>
              <p class="description">${item.description}</p>
          </div>
        </li>
        </ul>`
      }
      
      const deleteBtn = document.querySelectorAll('.btn-danger');
      // const editBtn = document.querySelectorAll('.btn-warning');



      // editBtn.forEach((delBtn, i) => {
      //   delBtn.addEventListener('click', () => {
      //     console.log(delBtn);
      //       const index = delBtn.getAttribute('data-index');
      //       console.log(index);
      //       deleteTask(index);
      //   })
      // })
      
         deleteBtn.forEach((delBtn, i) => {
           delBtn.addEventListener('click', () => {
             console.log(delBtn);
               const index = delBtn.getAttribute('data-index');
               console.log(index);
               deleteTask(index);
           })
         })
      
    });
    });


    // handleDel();
    
}


function postData(e) {
  e.preventDefault();
    const taskName = document.getElementById('task').value;
    const select = document.getElementById('select-priority');
    const priorityValue = select.options[select.selectedIndex].value;
    const description = document.getElementById('description').value;
   
    axios({
        method: 'post',
        url: 'https://infodev-server.herokuapp.com/api/todos',
        data: {
        completed: false,
        name: taskName,
        priority: priorityValue,
        description: description
        }
}).then(function (response) {
    console.log(response);
    displayData();
    alert("Added Successfully");
  })
  .catch(function (error) {
    console.log(error);
  });
  
  // location.reload();
}

addBtn.addEventListener('click', postData);
displayData();



function deleteTask(id) {
  axios ({
    method:"delete",
    url: `https://infodev-server.herokuapp.com/api/todos/${id}`,
  }).then ((res) =>{
    console.log("Deleted");
    alert("Deleted Successfully");
  }).catch((err) => {
    console.log("Error")
  });

  displayData();

}

//   })  
// }
   
  
//     axios.get('https://infodev-server.herokuapp.com/api/todos').then(function(response){

//         response.data.forEach(item => {
         

          
//         })
          
        
//     })
    
// }


  
    
  