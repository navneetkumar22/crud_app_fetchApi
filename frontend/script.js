const tableBody = document.getElementById("tbody");
const heading = document.getElementById("heading");
const createButton = document.getElementById("btn");


// function to fetch all users
heading.addEventListener("click", fetchUsers);
function fetchUsers() {
    fetch("https://crupappfetchapi-production.up.railway.app/getUsers")
        .then(response => { return response.json() })
        .then((data) => { return data.users })
        .then((newUser) => {
            tableBody.innerHTML = "";
            newUser.forEach(element => {
                tableBody.innerHTML +=
                `<tr class="userview">
                   <td class="name">${element.name}</td>
                   <td class="email">${element.email}</td>
                   <td><button class="edit-btn" id="${element._id}" onclick="handleEdit(this)">Edit</button></td>
                   <td><button class="delete-btn" id="${element._id}" onclick="handleDelete(this)">Delete</button></td>
                </tr>`
            })
        })
        .catch();
}

// creating a new user
createButton.addEventListener("click", createNewUser);
function createNewUser() {
    fetch("https://crupappfetchapi-production.up.railway.app/create", {
        method: "POST",
        headers: {
            "content-Type": "application/json"
        },
        body: JSON.stringify({
            "name": document.getElementById("name").value,
            "email": document.getElementById("email").value
        })
    })
        .then((resp) => { return resp.json() })
        .then((response) => {
            alert(`${response.message}`);
            document.getElementById("name").value = "";
            document.getElementById("email").value = "";
            fetchUsers(); // to reload table
        })
        .catch();
}

//editing a user
function handleEdit(element) {
    fetch("https://crupappfetchapi-production.up.railway.app/editUser", {
        method: "PUT",
        headers: {
            "content-Type": "application/json"
        },
        body: JSON.stringify({
            "_id": element.id,
            "name": prompt("Enter new name"),
            "email": prompt("Enter new email")
        })
    })
        .then((resp) => { return resp.json() })
        .then((response) => {
            alert(`${response.message}`);
            fetchUsers();
        })
}

//deleting a user
function handleDelete(item) {
    fetch(`https://crupappfetchapi-production.up.railway.app/deleteUser/${item.id}`, {
        method: "DELETE",
        headers: {
            "content-Type": "application/json"
        },
    })
        .then((resp) => { return resp.json() })
        .then((response) => {
            alert(`${response.message}`);
            fetchUsers();
        })
}





