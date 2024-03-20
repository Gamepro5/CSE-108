function create_table(object) {
    let table = document.getElementById('resultTable');
    table.innerHTML = ``; /*delete table*/
    console.log(Object.keys(object).length)
    for (var i=0;i<Object.keys(object).length;i++) {
        var row = table.insertRow();
        row.insertCell().textContent = Object.keys(object)[i];
        row.insertCell().textContent = object[Object.keys(object)[i]];
    }
}

function deleteGrade(name) {
    const data =  {}    ;
    fetch('https://amhep.pythonanywhere.com/grades/' + name, {
    method: 'DELETE',
    headers: {
    'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
    })
    .then((response) => {
        showAlert('Success:' + JSON.stringify(response.json()));
    })
    .catch((error) => {
        console.error(error)
        showAlert('Error:' + error.toString());
    });
}

function create() {
    const data =  {"name": document.getElementById('name').value, "grade": document.getElementById('grade').value}    ;
    fetch('https://amhep.pythonanywhere.com/grades', {
    method: 'POST',
    headers: {
    'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
    })
    .then((response) => {
        showAlert('Success:' + JSON.stringify(response.json()));
    })
    .catch((error) => {
        console.error(error)
        showAlert('Error:' + error.toString());
    });
}

function edit() {
    const data =  {"grade": document.getElementById('grade').value}    ;
    fetch('https://amhep.pythonanywhere.com/grades/' + document.getElementById('name').value, {
    method: 'PUT',
    headers: {
    'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
    })
    .then((response) => {
        showAlert('Success:' + JSON.stringify(response.json()));
    })
    .catch((error) => {
        console.error(error)
        showAlert('Error:' + error.toString());
    });
}

function viewAll() {
    fetch('https://amhep.pythonanywhere.com/grades')
  .then((theResponseObject) => {
    return theResponseObject.json()
  })
  .then((myUsableData) => {
    console.log(myUsableData[Object.keys(myUsableData)[0]])
    create_table(myUsableData);
  })
  .catch((error) => {
    console.error(error)
    showAlert('Error:' + error.toString());
  });
}

function getGrade(name) {
    fetch('https://amhep.pythonanywhere.com/grades/' + name)
    .then((theResponseObject) => {
      return theResponseObject.json()
    })
    .then((myUsableData) => {
        console.log(myUsableData)
        create_table(myUsableData);
    })
    .catch((error) => {
        console.error(error)
        showAlert('Error:' + error.toString());
    });
}


viewAll();
