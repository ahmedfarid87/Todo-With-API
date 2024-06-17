let newTask = document.getElementById('newTask')
let btn =document.getElementById('btn')
let textContainer =document.getElementById('textContainer')
let loading =document.getElementById('loading')

btn.addEventListener('click', function(){
  let task={
    title:newTask.value,
    apiKey:"6670845860a208ee1fdbd745"
  }
  addTodo(task)
})

async function addTodo(task){
  let data = await fetch('https://todos.routemisr.com/api/v1/todos' ,{
    method: 'POST',
    body: JSON.stringify(task),
    headers:{'content-type':'application/json'}
  })
  let result = await data.json()
  if(result.message=='success'){
    getTodos()
    clearForm()
  }
  else{
    window.alert('write your task')
  }
}


async function getTodos(){
  loading.style.display ='block'
  textContainer.style.display ='none'
  let data = await fetch('https://todos.routemisr.com/api/v1/todos/6670845860a208ee1fdbd745')
  let result = await data.json()
  if(result.message=='success'){
    loading.style.display ='none'
      textContainer.style.display ='block'
    display(result.todos)
  }
  
}
getTodos()


function display(data){
  let cartona =``
  for(let i = 0 ; i<data.length ; i++){
    cartona +=`
            <div class="task my-3 px-4 py-2 d-flex justify-content-between w-75 m-auto shadow align-items-center  p-2 rounded-4 ${data[i].completed ? 'bg-danger' : '' }">
          <div>
            <p class="task-text m-0 p-0 ${data[i].completed ? 'text-decoration-line-through' : '' }">${data[i].title}</p>
          </div>
          <div>
            <button onclick="markComp('${data[i]._id}')" class="btn ${data[i].completed ? 'd-none' : '' }"><i class="fa-solid fa-circle-check"></i></button>
            <button onclick="deleteTodo('${data[i]._id}')" class="btn "><i class="fa-solid fa-trash"></i></button>
          </div>
        </div>
    `
  }
  textContainer.innerHTML = cartona
}


async function deleteTodo(id){
  let data = await fetch('https://todos.routemisr.com/api/v1/todos' ,{
    method: 'delete',
    body: JSON.stringify({todoId : id}),
    headers:{'content-type':'application/json'}
  })
  let result = await data.json()
  if(result.message=='success'){
    getTodos()
  }
}

function clearForm(){
  newTask.value =``
}


async function markComp(id){
  let data = await fetch('https://todos.routemisr.com/api/v1/todos' , {
    method: 'put',
    body: JSON.stringify({todoId : id}),
    headers:{'content-type':'application/json'}
  })
  let result = await data.json()
  if(result.message=='success'){
    getTodos()
  } 
}