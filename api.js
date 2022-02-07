
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
              <button class="btn btn-success"><i class="fas fa-check"></i></i></button>
              <button class="btn btn-warning"><i class="fas fa-pencil"></i></i></button>
              <button class="btn btn-danger"><i class="far fa-trash-alt"></i></button>
          </div>
        </li>
        </ul>`
      } else {
        const completeClass = 'strike';
        listTask.innerHTML =  `<ul>
        <li>
          <div>
              <h6 class="title ${completeClass}"> ${item.name} <span class="ml-2 badge badge-info">${item.priority}</span></h6>
              <p class="description">${item.description}</p>
          </div>
        </li>
        </ul>`
      }
      
    });
    });
    
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
  })
  .catch(function (error) {
    console.log(error);
  });
  displayData();
window.location.reload();
}

addBtn.addEventListener('click', postData);
displayData();
  
    
  