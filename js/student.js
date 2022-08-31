// calling Local Storage
let subjectData = JSON.parse(localStorage.subject);
let categoryData = JSON.parse(localStorage.category);
let institutionData = JSON.parse(localStorage.institution);
let levelData = JSON.parse(localStorage.level);
console.log(subjectData, categoryData, institutionData, levelData);
// filling subject data list
for (let i = 0; i < subjectData.length; i++) {
    document.getElementById('subject').innerHTML += `
    <option value="${subjectData[i].subject}">${subjectData[i].subject}</option>
    `;
}

// filling category data list
for (let i = 0; i < categoryData.length; i++) {
    document.getElementById('category').innerHTML += `
    <option value="${categoryData[i].category}">${categoryData[i].category}</option>
    `;
}

// // filling institution data list
for (let i = 0; i < institutionData.length; i++) {
    document.getElementById('institutions').innerHTML += `
    <option value="${institutionData[i].name}">${institutionData[i].name}</option>
    `;
}

// // filling level data list
for (let i = 0; i < levelData.length; i++) {
    document.getElementById('level').innerHTML += `
    <option value="${levelData[i].level}">${levelData[i].level}</option>
    `;
}

// make create function
let create = document.getElementById('create');

let studentData;
if (localStorage.subject != null) {
    studentData = JSON.parse(localStorage.student);
} else {
    studentData = [];
}

let temp;
let mood = 'create';
create.onclick = function() {
    let newObject = {
        name: document.getElementById('StudentName').value.toLowerCase(),
        id: document.getElementById('StudentId').value,
        phone: document.getElementById('StudentPhone').value,
        email: document.getElementById('StudentEmail').value,
        pass: document.getElementById('StudentPass').value,
        subject: document.getElementById('subject').value,
        category: document.getElementById('category').value,
        institution: document.getElementById('institutions').value,
        level: document.getElementById('level').value,
    }
    if (mood == 'create') {
        studentData.push(newObject);
    } else {
        studentData[temp] = newObject;
        mood = 'create';
        document.getElementById('create').innerHTML = 'create';
    }
    localStorage.setItem('student', JSON.stringify(studentData));

    showData();
    clearData();
}

// showData();
// console.log(studentData);



function showData() {
    document.getElementById('t_body').innerHTML = '';
    for (let i = 0; i < studentData.length; i++) {
        document.getElementById('t_body').innerHTML += `
        <tr>
            <td>${i}</td>
            <td>${studentData[i].name}</td>
            <td>${studentData[i].id}</td>
            <td>${studentData[i].phone}</td>
            <td>${studentData[i].email}</td>
            <td>${studentData[i].pass}</td>
            <td>${studentData[i].subject}</td>
            <td>${studentData[i].category}</td>
            <td>${studentData[i].level}</td>
            <td>${studentData[i].institution}</td>
            <td><button id="update" onclick="updateData(${i})">update</button></td>
            <td><button id="delete" onclick="deleteData(${i})">delete</button></td>
        </tr>
        `;
    }
    if (studentData.length > 0) {
        document.getElementById('deleteAll').innerHTML = `
        <button onclick="deleteAll()">delete all (${studentData.length})</button>
        `;
    } else {
        document.getElementById('deleteAll').innerHTML = '';
    }
}
showData();
// function delete
function deleteData(i) {
    studentData.splice(i, 1);
    localStorage.student = JSON.stringify(studentData);
    showData();
}

//delete All

function deleteAll() {
    studentData.splice(0);
    localStorage.student = JSON.stringify(studentData);
    showData();
}
// update data
function updateData(i) {
    document.getElementById('StudentName').value = studentData[i].name;
    document.getElementById('StudentId').value = studentData[i].id;
    document.getElementById('StudentPhone').value = studentData[i].phone;
    document.getElementById('StudentEmail').value = studentData[i].email;
    document.getElementById('StudentPass').value = studentData[i].pass;
    mood = 'update';
    document.getElementById('create').innerHTML = 'update';
    temp = i;
}


function clearData() {
    document.getElementById('StudentName').value = '';
    document.getElementById('StudentId').value = '';
    document.getElementById('StudentPhone').value = '';
    document.getElementById('StudentEmail').value = '';
    document.getElementById('StudentPass').value = '';
}
//get search mood
let searchMood = 'Name';
search = document.getElementById('search');

function getSearchMode(id) {
    if (id == 'Name') {
        searchMood = 'Name';
    } else {
        searchMood = 'Id';
    }
    search.focus();
    search.value = '';
    search.placeholder = 'search by ' + searchMood;
    showData();
}

//search

function searchdata(value) {
    if (searchMood == 'Name') {
        document.getElementById('t_body').innerHTML = '';
        for (let i = 0; i < studentData.length; i++) {
            if (studentData[i].name.includes(value.toLowerCase())) {
                document.getElementById('t_body').innerHTML += `
            <tr>
                <td>${i}</td>
                <td>${studentData[i].name}</td>
                <td>${studentData[i].id}</td>
                <td>${studentData[i].phone}</td>
                <td>${studentData[i].email}</td>
                <td>${studentData[i].pass}</td>
                <td>${studentData[i].subject}</td>
                <td>${studentData[i].category}</td>
                <td>${studentData[i].level}</td>
                <td>${studentData[i].institution}</td>
                <td><button id="update" onclick="updateData(${i})">update</button></td>
                <td><button id="delete" onclick="deleteData(${i})">delete</button></td>
            </tr>
            `;
            }
        }
    } else {
        document.getElementById('t_body').innerHTML = '';
        for (let i = 0; i < studentData.length; i++) {
            if (studentData[i].id.includes(value)) {
                document.getElementById('t_body').innerHTML += `
                <tr>
                    <td>${i}</td>
                    <td>${studentData[i].name}</td>
                    <td>${studentData[i].id}</td>
                    <td>${studentData[i].phone}</td>
                    <td>${studentData[i].email}</td>
                    <td>${studentData[i].pass}</td>
                    <td>${studentData[i].subject}</td>
                    <td>${studentData[i].category}</td>
                    <td>${studentData[i].level}</td>
                    <td>${studentData[i].institution}</td>
                    <td><button id="update" onclick="updateData(${i})">update</button></td>
                    <td><button id="delete" onclick="deleteData(${i})">delete</button></td>
                </tr>
                `;
            }
        }
    }
}