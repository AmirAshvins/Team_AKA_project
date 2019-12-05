

// loads the assingments upon the page loading.

function loadAssignmentDetails(assignmentId) {
    let assignmentInstance = getElementByIdByCollectionFromLocStorage(assignmentId, 'assignmentList');
    let instructorInstance = getElementByIdByCollectionFromLocStorage(assignmentInstance.instructorID, 'instructorsList');
    document.getElementById('assignmentNameBox').innerHTML = assignmentInstance.name;
    document.getElementById('courseBox').innerHTML = assignmentInstance.course;
    document.getElementById('dueDateBox').innerHTML = assignmentInstance.dueDate;
    document.getElementById('dueTimeBox').innerHTML = assignmentInstance.dueTime;
    document.getElementById('d2lLinkBox').href = assignmentInstance.d2lLink;
    document.getElementById('instructionsBox').innerHTML = assignmentInstance.instructions;
    let currentUser = JSON.parse(sessionStorage.user);
    if (currentUser.completedAssignments.includes(assignmentId)) {
        document.getElementById('completeCheckBox').checked = "true";
    }
}

// handles the button for editing assingments.
function editButtonClickHandler() {
    sessionStorage.previousPage = "./details.html";
    window.location.href = "./addasignment.html";
}

// handles the button for the calendar page
function calendarButtonClickHandler() {
    sessionStorage.needsDetails = '';
    sessionStorage.previousPage = "./details.html";
    window.location.href = "./calendar.html"
}

// handles the button for list page.
function listButtonClickHandler() {
    sessionStorage.needsDetails = '';
    sessionStorage.previousPage = "./details.html";
    window.location.href = href = "./main.html";
}

function confirmCheckBox() {
    let CB = document.getElementById('completeCheckBox');
    if (CB.checked) {
        if (confirm("Are you sure you want to cross out the assginment")) {
            addToComplete(sessionStorage.needsDetails);
        }
    } else if (confirm("Are you sure you want to uncross the assginment") === true) {
        removeFromCompleted(sessionStorage.needsDetails);
    }
}


function addToComplete(assignmentID) {
    let currentUser = JSON.parse(sessionStorage.user);
    currentUser.completedAssignments.push(assignmentID);
    sendUserToDB(currentUser);
    sessionStorage.loadedUser = "false";
    sessionStorage.currentUser = JSON.stringify(user);
}

function removeFromCompleted(assignmentID) {
    let currentUser = JSON.parse(sessionStorage.user);
    let badIndex = currentUser.completedAssignments.indexOf(assignmentID);
    currentUser.completedAssignments.splice(badIndex, 1);
    sendUserToDB(currentUser);
    sessionStorage.loadedUser = "false";
    sessionStorage.currentUser = JSON.stringify(currentUser);
}

document.getElementById('completeCheckBox').onclick = confirmCheckBox;
document.getElementById('editButton').onclick = editButtonClickHandler;
document.getElementById('listButton').onclick = listButtonClickHandler;
loadAssignmentDetails(sessionStorage.needsDetails);