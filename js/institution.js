let Name = document.getElementById('insName');
let id = document.getElementById('insId');
let create = document.getElementById('create');


// mode
let mood = "create";
let temp;
// function create
let instData;
if (localStorage.institution != null) {
    instData = JSON.parse(localStorage.institution);
} else {
    instData = [];
}
create.onclick = function() {
    let newObject = {
            name: Name.value.toLowerCase(),
            id: id.value,
        }
        // create new institution or uddate insitution data
    if (mood == "create") {
        instData.push(newObject);

    } else {
        instData[temp] = newObject;
        mood = 'create';
        create.innerHTML = 'create';
    }
    localStorage.setItem('institution', JSON.stringify(instData));

    clearData()
    showData()
}


//local storage
//clear inputs
function clearData() {
    Name.value = '';
    id.value = '';
}
// read data


function showData() {
    document.getElementById('t_body').innerHTML = '';
    for (let i = 0; i < instData.length; i++) {
        document.getElementById('t_body').innerHTML += `
            <tr>
                <td>${i}</td>
                <td>${instData[i].id}</td>
                <td>${instData[i].name}</td>
                <td><button onclick="update(${i})" id="update">update</button></td>
                <td><button onclick="deleteData(${i})" id="delete">delete</button></td>
            </tr>
            `;
    }

    // to show deleteAll button
    // where there is data
    let deleteAll = document.getElementById('deleteAll');
    if (instData.length > 0) {
        deleteAll.innerHTML = `
        <button onclick="deleteAll()">delete all (${instData.length})</button>
        `;

    } else {
        deleteAll.innerHTML = '';
    }

}
showData()


// delete

function deleteData(i) {
    instData.splice(i, 1);
    localStorage.institution = JSON.stringify(instData);
    showData();
}



// delete all function
function deleteAll() {
    instData.splice(0);
    localStorage.institution = JSON.stringify(instData);
    showData();
}

// update

function update(i) {
    Name.value = instData[i].name;
    id.value = instData[i].id;
    create.innerHTML = "update";
    mood = "update";
    temp = i;
    scroll({
        top: 0,
        behavior: 'smooth',
    })

}
// search



let searchMode = 'name';

function getSearchMode(id) {
    let searchbtn = document.getElementById('search');
    if (id == 'searchName') {
        searchMode = 'name';
    } else {
        searchMode = 'id';
    }
    searchbtn.placeholder = 'search by ' + searchMode;
    searchbtn.focus();
}

// search data 

function searchdata(value) {
    document.getElementById('t_body').innerHTML = '';
    if (searchMode == 'name') {
        for (let i = 0; i < instData.length; i++) {
            if (instData[i].name.includes(value.toLowerCase())) {
                document.getElementById('t_body').innerHTML += `
                <tr>
                    <td>${i}</td>
                    <td>${instData[i].id}</td>
                    <td>${instData[i].name}</td>
                    <td><button onclick="update(${i})" id="update">update</button></td>
                    <td><button onclick="deleteData(${i})" id="delete">delete</button></td>
                </tr>
                `
            }
        }
    } else {
        for (let i = 0; i < instData.length; i++) {
            if (instData[i].id.includes(value)) {
                document.getElementById('t_body').innerHTML += `
                <tr>
                    <td>${i}</td>
                    <td>${instData[i].id}</td>
                    <td>${instData[i].name}</td>
                    <td><button onclick="update(${i})" id="update">update</button></td>
                    <td><button onclick="deleteData(${i})" id="delete">delete</button></td>
                </tr>
                `
            }
        }

    }

}
// clean data