// calling Local Storage

let categoryData = JSON.parse(localStorage.category);
let institutionData = JSON.parse(localStorage.institution);
let levelData = JSON.parse(localStorage.level);



// filling category data list
for (let i = 0; i < categoryData.length; i++) {
    document.getElementById('category').innerHTML += `
    <option value="${categoryData[i].category}">${categoryData[i].category}</option>
    `;
}

// filling institution data list
for (let i = 0; i < institutionData.length; i++) {
    document.getElementById('institutions').innerHTML += `
    <option value="${institutionData[i].name}">${institutionData[i].name}</option>
    `;
}

// filling level data list
for (let i = 0; i < levelData.length; i++) {
    document.getElementById('level').innerHTML += `
    <option value="${levelData[i].level}">${levelData[i].level}</option>
    `;
}

// make create function
let create = document.getElementById('create');
let subjectData;
if (localStorage.subject != null) {
    subjectData = JSON.parse(localStorage.subject);
} else {
    subjectData = [];
}

let temp;
let mood = 'create';
create.onclick = function() {
    let newObject = {
        subject: document.getElementById('subjectName').value,
        category: document.getElementById('category').value,
        institution: document.getElementById('institutions').value,
        level: document.getElementById('level').value,
    }
    if (mood == 'create') {
        subjectData.push(newObject);
    } else {
        subjectData[temp] = newObject;
        mood = 'create';
        document.getElementById('create').innerHTML = 'create';
    }
    localStorage.setItem('subject', JSON.stringify(subjectData));

    showData();
    clearData();
}
showData();


// show DAta

function showData() {
    document.getElementById('t_body').innerHTML = '';
    for (let i = 0; i < subjectData.length; i++) {
        document.getElementById('t_body').innerHTML += `
        <tr>
            <td>${i}</td>
            <td>${subjectData[i].subject}</td>
            <td>${subjectData[i].level}</td>
            <td>${subjectData[i].category}</td>
            <td>${subjectData[i].institution}</td>
            <td><button id="update" onclick="updateData(${i})">update</button></td>
            <td><button id="delete" onclick="deleteData(${i})">delete</button></td>
        </tr>
        `;
    }
    if (subjectData.length > 0) {
        document.getElementById('deleteAll').innerHTML = `
        <button onclick="deleteAll()">delete all (${subjectData.length})</button>
        `;
    } else {
        document.getElementById('deleteAll').innerHTML = '';
    }
}
showData();
// function delete
function deleteData(i) {
    subjectData.splice(i, 1);
    localStorage.subject = JSON.stringify(subjectData);
    showData();
}

//delete All

function deleteAll() {
    subjectData.splice(0);
    localStorage.subject = JSON.stringify(subjectData);
    showData();
}

// update data
function updateData(i) {
    document.getElementById('subjectName').value = subjectData[i].subject;
    mood = 'update';
    document.getElementById('create').innerHTML = 'update';
    temp = i;
}


function clearData() {
    document.getElementById('subjectName').value = '';
}

//get search mood

let searchMood = 'subject';
search = document.getElementById('search');

function getSearchMode(id) {
    if (id == 'searchSubject') {
        searchMood = 'subject';
    } else {
        searchMood = 'level';
    }
    search.focus();
    search.value = '';
    search.placeholder = 'search by ' + searchMood;
    showData();
}

//search

function searchdata(value) {
    if (searchMood == 'subject') {
        document.getElementById('t_body').innerHTML = '';
        for (let i = 0; i < subjectData.length; i++) {
            if (subjectData[i].subject.includes(value)) {
                document.getElementById('t_body').innerHTML += `
                <tr>
                <td>${i}</td>
                <td>${subjectData[i].subject}</td>
                <td>${subjectData[i].level}</td>
                <td>${subjectData[i].category}</td>
                <td>${subjectData[i].institution}</td>
                <td><button id="update" onclick="updateData(${i})">update</button></td>
                <td><button id="delete" onclick="deleteData(${i})">delete</button></td>
                </tr>
                `;
            }
        }
    } else {
        document.getElementById('t_body').innerHTML = '';
        for (let i = 0; i < subjectData.length; i++) {
            if (subjectData[i].level.includes(value)) {
                document.getElementById('t_body').innerHTML += `
                <tr>
                <td>${i}</td>
                <td>${subjectData[i].subject}</td>
                <td>${subjectData[i].level}</td>
                <td>${subjectData[i].category}</td>
                <td>${subjectData[i].institution}</td>
                <td><button id="update" onclick="updateData(${i})">update</button></td>
                <td><button id="delete" onclick="deleteData(${i})">delete</button></td>
                </tr>
                `;
            }
        }
    }
}