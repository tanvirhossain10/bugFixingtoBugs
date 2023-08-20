document.getElementById('issueInputForm').addEventListener('submit', submitIssue);

function submitIssue(e) {
  const getInputValue = id => document.getElementById(id).value;
  const description = getInputValue('issueDescription');
  const severity = getInputValue('issueSeverity');
  const assignedTo = getInputValue('issueAssignedTo');
  const id = Math.floor(Math.random() * 100000000) + '';
  const status = 'Open';

  const issue = { id, description, severity, assignedTo, status };
  let issues = [];
  if (localStorage.getItem('issues')) {
    issues = JSON.parse(localStorage.getItem('issues'));
  }
  issues.push(issue);
  console.log(issue)
  localStorage.setItem('issues', JSON.stringify(issues));

  document.getElementById('issueInputForm').reset();

  e.preventDefault();
  fetchIssues(id, description, severity, assignedTo, status, true);
}

const setStatusClosed = id => {
  const issues = JSON.parse(localStorage.getItem('issues'));

  const currentIssue = issues.find(issue => issue.id * 1 === id);
  console.log(currentIssue)
  //make status close to localStorage
  currentIssue.status = 'Closed';

  //make status clos from the dom
  document.getElementById(`statusClosed${id}`).innerText = `${currentIssue.status} `;
  //del tag using from the DOM
  document.getElementById(`dis${id}`).innerHTML = `<del style="color:red"><span style="color:black"> ${currentIssue.description}</span> </del>`;
  currentIssue.description = `<del style="color:red"> <span style="color:black"> ${currentIssue.description}</span> </del>`;
  localStorage.setItem('issues', JSON.stringify(issues));
}

const deleteIssue = id => {
  console.log(id)
  const issues = JSON.parse(localStorage.getItem('issues'));
  let arr = [issues];
  console.log(arr[0])
  const remainingIssues = issues.filter(issue => issue.id * 1 !== id)
  console.log(remainingIssues)
  //setting the new modified data in the local storage
  localStorage.setItem('issues', JSON.stringify(remainingIssues));
  const issueElement = document.getElementById(`remove${id}`);
  if (issueElement) {
    //removing or deleting particular data from the DOM
    issueElement.parentNode.removeChild(issueElement);

  }
}

const fetchIssues = (id, description, severity, assignedTo, status, t) => {
  if (t) {
    const issuesList = document.getElementById('issuesList');
    const div = document.createElement('div');
    div.innerHTML = `<div class="well" id="remove${id}">
    <h6>Issue ID: ${id} </h6>
    <p><span class="label label-info" id="statusClosed${id}"> ${status} </span></p>
    <h3 id="dis${id}"> ${description} </h3>
    <p><span class="glyphicon glyphicon-time"></span> ${severity}</p>
    <p><span class="glyphicon glyphicon-user"></span> ${assignedTo}</p>
    <a href="#" onclick="setStatusClosed(${id})" class="btn btn-warning">Close</a>
    <a href="#" onclick="deleteIssue(${id})" class="btn btn-danger">Delete</a>
    </div>`
    issuesList.appendChild(div);

  }
  // }
  else {
    const issues = JSON.parse(localStorage.getItem('issues'));
    // console.log(issues);
    const issuesList = document.getElementById('issuesList');
    // issuesList.innerHTML = '';

    for (var i = 0; i < issues.length; i++) {
      console.log(issues[i])
      const { id, description, severity, assignedTo, status } = issues[i];
      // issuesList.textContent = '';
      /*  const div = document.createElement('div');
       div.innerHTML = `<div class="well" id="remove${id}">
     <h6>Issue ID: ${id} </h6>
     <p><span class="label label-info"> ${status} </span></p>
     <h3> ${description} </h3>
     <p><span class="glyphicon glyphicon-time"></span> ${severity}</p>
     <p><span class="glyphicon glyphicon-user"></span> ${assignedTo}</p>
     <a href="#" onclick="setStatusClosed(${id})" class="btn btn-warning">Close</a>
     <a href="#" onclick="deleteIssue(${id})" class="btn btn-danger">Delete</a>
     </div>`
       issuesList.appendChild(div); */
      issuesList.innerHTML += `<div class="well" id="remove${id}">
                                  <h6>Issue ID: ${id} </h6>
                                  <p><span class="label label-info" id="statusClosed${id}"> ${status} </span></p>
                                  <h3 id="dis${id}"> ${description} </h3>
                                  <p><span class="glyphicon glyphicon-time"></span> ${severity}</p>
                                  <p><span class="glyphicon glyphicon-user"></span> ${assignedTo}</p>
                                  <a href="#" onclick="setStatusClosed(${id})" class="btn btn-warning">Close</a>
                                  <a href="#" onclick="deleteIssue(${id})" class="btn btn-danger">Delete</a>
                                  </div>`;
    }
  }
}