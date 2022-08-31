// calling Local Storage
let instName = JSON.parse(localStorage.institution);
// calling inputs
let levelName = document.getElementById('levelName');
let institutions = document.getElementById('institutions');
let create = document.getElementById('create');
let temp;
let mood = 'create';
for (let i = 0; i < instName.length; i++) {
    institutions.innerHTML += `
    <option value="${instName[i].name}">${instName[i].name}</option>
    `;
}

let institutionSelected = document.getElementById('institutions').value;
// OPTION SELECTED FROM 
function selectedValue() {
    institutionSelected = institutions.value;
}
// create and local storage
let levelData;
if (localStorage.level != null) {
    levelData = JSON.parse(localStorage.level);
} else {
    levelData = [];
}
create.onclick = function() {

    let newObject = {
        level: levelName.value,
        institution: institutionSelected,
    }
    if (mood == 'create') {
        levelData.push(newObject);
        // insert db level:newObject.level 
    } else {
        levelData[temp] = newObject;
        mood = 'create';
        create.innerHTML = 'create';
    }
    localStorage.setItem('level', JSON.stringify(levelData))

    showData();
    clearData();
}

//show data

showData()

function showData() {
    document.getElementById('t_body').innerHTML = '';
    for (let i = 0; i < levelData.length; i++) {
        document.getElementById('t_body').innerHTML += `
                <tr>
                    <td>${i}</td>
                    <td>${levelData[i].level}</td>
                    <td>${levelData[i].institution}</td>
                    <td><button onclick="update(${i})" id="update">update</button></td>
                    <td><button onclick="deleteData(${i})" id="delete">delete</button></td>
                </tr>
        `
    }
    // showing delete all button if there is data
    let deleteAllData;
    if (levelData.length > 0) {
        deleteAllData = document.getElementById('deleteAll');
        deleteAllData.innerHTML = `
        <button onclick="deleteAll()">deleteAll (${levelData.length})</button>
        `
    } else {
        document.getElementById('deleteAll').innerHTML = '';
    }


}
showData();
// delete data
function deleteData(i) {
    levelData.splice(i, 1);
    localStorage.level = JSON.stringify(levelData);
    showData();
}


function deleteAll() {
    levelData.splice(0);
    localStorage.level = JSON.stringify(levelData);
    showData();
}

// update data
function update(i) {
    levelName.value = levelData[i].level;
    temp = i;
    mood = 'update';
    create.innerHTML = 'update';
}

//get search mode
let searchMode = 'level';
searchbtn = document.getElementById('search');

function getSearchMode(id) {
    if (id == 'searchLevel') {
        searchMode = 'level';
    } else {
        searchMode = 'institution';
    }
    searchbtn.placeholder = 'search by ' + searchMode;
    searchbtn.focus();
}


//search function
function searchdata(value) {
    document.getElementById('t_body').innerHTML = '';
    if (searchMode == 'level') {
        for (let i = 0; i < levelData.length; i++) {
            if (levelData[i].level.includes(value.toLowerCase())) {
                document.getElementById('t_body').innerHTML +=
                    `<tr>
                        <td>${i}</td>
                        <td>${levelData[i].level}</td>
                        <td>${levelData[i].institution}</td>
                        <td><button onclick="update(${i})" id="update">update</button></td>
                        <td><button onclick="deleteData(${i})" id="delete">delete</button></td>
                    </tr>
                
                `
            }
        }
    } else {
        for (let i = 0; i < levelData.length; i++) {
            if (levelData[i].institution.includes(value.toLowerCase(7))) {
                document.getElementById('t_body').innerHTML +=
                    `<tr>
                        <td>${i}</td>
                        <td>${levelData[i].level}</td>
                        <td>${levelData[i].institution}</td>
                        <td><button onclick="update(${i})" id="update">update</button></td>
                        <td><button onclick="deleteData(${i})" id="delete">delete</button></td>
                    </tr>
                
                `
            }
        }
    }

}

//clear data
function clearData() {
    levelName.value = '';
}