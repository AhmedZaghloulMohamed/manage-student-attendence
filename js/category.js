// calling Local Storage
let institutionData = JSON.parse(localStorage.institution);
let levelData = JSON.parse(localStorage.level);

// 

// calling inputs
let category = document.getElementById('categoryName');
let institution = document.getElementById('institutions');
let level = document.getElementById('level');

//fill dropdown list from localstorage

for (let i = 0; i < institutionData.length; i++) {
    institution.innerHTML += `
    <option value="${institutionData[i].name}">${institutionData[i].name}</option>
    `;
}

for (let i = 0; i < levelData.length; i++) {
    level.innerHTML += `
    <option value="${levelData[i].level}">${levelData[i].level}</option>
    `;
}


// 
let categoryData;
if (localStorage.category != null) {
    categoryData = JSON.parse(localStorage.category);
} else {
    categoryData = [];
}
// create function
let craete = document.getElementById('create');
let mood = "create";
let temp;
create.onclick = function() {

    let newObject = {
        category: document.getElementById('categoryName').value,
        institution: document.getElementById('institutions').value,
        level: document.getElementById('level').value,
    }
    if (mood == 'update') {
        categoryData[temp] = newObject;
        document.getElementById('create').innerHTML = "create";
        mood = 'create';
    } else {
        categoryData.push(newObject);
    }
    localStorage.setItem('category', JSON.stringify(categoryData));


    showData();
    clearData();
}

// show data function
function showData() {
    document.getElementById('t_body').innerHTML = '';
    for (let i = 0; i < categoryData.length; i++) {
        document.getElementById('t_body').innerHTML += `
        <tr>
            <td>${i}</td>
            <td>${categoryData[i].category}</td>
            <td>${categoryData[i].level}</td>
            <td>${categoryData[i].institution}</td>
            <td><button onclick="updateData(${i})">Update</button></td>
            <td><button onclick="deleteData(${i})" id="delete">delete</button></td>
        </tr>
        `;
    }
    // showing delete all button if there is data
    if (categoryData.length > 0) {
        document.getElementById('deleteAll').innerHTML =
            `
            <button onclick="deleteAll()">delete All (${categoryData.length})</button>
            `
    } else {
        document.getElementById('deleteAll').innerHTML = '';
    }
}
showData();


//update data

function updateData(i) {
    category.value = categoryData[i].category;
    temp = i;
    mood = 'update';
    document.getElementById('create').innerHTML = "update";
}

//delete data

function deleteData(i) {
    categoryData.splice(i, 1);
    localStorage.category = JSON.stringify(categoryData);
    showData();
}

// delete All button
function deleteAll() {
    categoryData.splice(0);
    localStorage.category = JSON.stringify(categoryData);
    showData();
}

//clear data function if user click on createor update button
function clearData() {
    category.value = '';
}

//get search mood

let searchMood = 'category';
search = document.getElementById('search');

function getSearchMode(id) {
    if (id == 'searchCategory') {
        searchMood = 'category ';
    } else {
        searchMood = 'institution';
    }
    search.focus();
    search.placeholder = 'search by ' + searchMood;
}

//search

function searchdata(value) {
    if (searchMood == 'category') {
        document.getElementById('t_body').innerHTML = '';
        for (let i = 0; i < categoryData.length; i++) {
            if (categoryData[i].category.includes(value)) {
                document.getElementById('t_body').innerHTML += `
                <tr>
                    <td>${i}</td>
                    <td>${categoryData[i].category}</td>
                    <td>${categoryData[i].level}</td>
                    <td>${categoryData[i].institution}</td>
                    <td><button onclick="updateData(${i})">Update</button></td>
                    <td><button onclick="deleteData(${i})" id="delete">delete</button></td>
                </tr>
                `;
            }
        }
    } else {
        document.getElementById('t_body').innerHTML = '';
        for (let i = 0; i < categoryData.length; i++) {
            if (categoryData[i].institution.includes(value)) {
                document.getElementById('t_body').innerHTML += `
                <tr>
                    <td>${i}</td>
                    <td>${categoryData[i].category}</td>
                    <td>${categoryData[i].level}</td>
                    <td>${categoryData[i].institution}</td>
                    <td><button onclick="updateData(${i})">Update</button></td>
                    <td><button onclick="deleteData(${i})" id="delete">delete</button></td>
                </tr>
                `;
            }
        }
    }
}