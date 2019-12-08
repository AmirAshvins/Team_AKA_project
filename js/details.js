

function loadAssignmentDetails(assignmentId) {
    /*
    Load assignment details to DOM.

    :precondition: assignmentID must be a string
    :precondition: assignmentID must be present in localStorage assignmentList
    :post0condition: will get the assignment instance from storage and load the details to the DOM
     */
    let assignmentInstance = getElementByIdByCollectionFromLocStorage(assignmentId, 'assignmentList');
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

function editButtonClickHandler() {
    /**
     * Handle the edit button onclick
     * 
     * :post-condition: will set the details.html page as back redirect (previousPage) in sessionstorage
     * :post-condition: will redirect to addassignment.html
     */
    sessionStorage.previousPage = "./details.html";
    window.location.href = "./addassignment.html";
}




function listButtonClickHandler() {
    /**
    * Handle the edit button onclick
    * 
    * :post-condition: will set the details.html page as back redirect (previousPage) in sessionstorage
    * :post-condition: will redirect to main.html
    * :post-condition: will delete sessionStorage.needsDetails
    */
    delete sessionStorage.needsDetails;
    sessionStorage.needsDetails = '';
    sessionStorage.previousPage = "./details.html";
    window.location.href = href = "./main.html";
}

function completedCheckBoxClickHandler() {
    /**
    * Handle the completeCheckBox onclick
    * 
    * :post-condition: will determine if the box has been checked or unchecked
    * :post-condition: will promt user to confirm
    * :post-condition: will either add or remove the assignment ID from sessionStorage.comepletedAssignments list
    */
    let CB = document.getElementById('completeCheckBox');
    if (CB.checked) {
        if (confirm("Are you sure you want to cross out the assginment")) {
            addToComplete(sessionStorage.needsDetails);
        } else {
            CB.checked = false;
        }
    } else {
        if (confirm("Are you sure you want to uncross the assginment") === true) {
            removeFromCompleted(sessionStorage.needsDetails);
        }else {
            CB.checked = true
        }
    }
}


function addToComplete(assignmentID) {
    /**
     * Add assignment to the completed list in sessionStorage
     * 
     * :precondition: assignmentID must be a string.
     * :precondition: sessionStorage.user must exist
     * :post-conditon: will add the assignment to session
     */
    let currentUser = JSON.parse(sessionStorage.currentUser);
    currentUser.completedAssignments.push(assignmentID);
    sendUserToDB(currentUser);
    sessionStorage.loadedUser = "false";
    sessionStorage.currentUser = JSON.stringify(currentUser);
}

function removeFromCompleted(assignmentID) {
    let currentUser = JSON.parse(sessionStorage.user);
    let badIndex = currentUser.completedAssignments.indexOf(assignmentID);
    currentUser.completedAssignments.splice(badIndex, 1);
    sendUserToDB(currentUser);
    sessionStorage.loadedUser = "false";
    sessionStorage.currentUser = JSON.stringify(currentUser);
}

document.getElementById('completeCheckBox').onclick = completedCheckBoxClickHandler;
document.getElementById('editButton').onclick = editButtonClickHandler;
document.getElementById('listButton').onclick = listButtonClickHandler;
loadAssignmentDetails(sessionStorage.needsDetails);