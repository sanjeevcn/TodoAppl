let itemList = document.getElementById("item-list")
let createField = document.getElementById("create-field")
let createForm = document.getElementById("create-form")


function itemTemplate(item) {
  return `<li class="list-group-item list-group-item-action d-flex align-items-center justify-content-between">
    <span class="item-text">${item.text}</span>
    <div>
      <button data-id="${item._id}" class="edit-me btn btn-secondary btn-sm mr-1">Edit</button>
      <button data-id="${item._id}" class="delete-me btn btn-danger btn-sm">Delete</button>
    </div>
  </li>`
}

let listItem = items.map(function(item) {
  return itemTemplate(item)
}).join('')

itemList.insertAdjacentHTML("beforeend", listItem)

createForm.addEventListener("submit", function(e) {
  e.preventDefault()
  axios.post('create-item', {
    text: createField.value
  }).then(function(response) {
    //create the html for new item
    itemList.insertAdjacentHTML("beforeend", itemTemplate(response.data))
    createField.value = ""
    createField.focus()
  }).catch(function() {
    console.log('Please try again later')
  })
})

document.addEventListener("click", function(e) {
  if (e.target.classList.contains("delete-me")) {
    if (confirm("Are you sure you want to delete this item?")) {
      axios.post('delete-item', {
        id: e.target.getAttribute("data-id")
      }).then(function() {
        //Do something interesting here in the next video
        e.target.parentElement.parentElement.remove()
      }).catch(function() {
        console.log('Please try again later')
      })
    }
  }

  if (e.target.classList.contains("edit-me")) {
    let userInput = prompt("Enter your desired new text", e.target.parentElement.parentElement.querySelector(".item-text").innerHTML)
    console.log(userInput)

    if (userInput) {
      axios.post('update-item', {
        text: userInput,
        id: e.target.getAttribute("data-id")
      }).then(function() {
        //Do something interesting here in the next video
        e.target.parentElement.parentElement.querySelector(".item-text").innerHTML = userInput
      }).catch(function() {
        console.log('Please try again later')
      })
    }
  }
})