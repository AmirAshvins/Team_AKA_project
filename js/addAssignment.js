// When page of edit assingment is called, it preloads the assingment details
function editModeLoader(assignmentInstance) {
    changeLabelsToEdit(assignmentInstance);
    loadAssignmentDetails(assignmentInstance);
}

function loadAssignmentDetails(assignmentInstance) {
    document.getElementById('assignmentNameBox').value = assignmentInstance.name;
    document.getElementById('courseBox').value = assignmentInstance.course;
    document.getElementById('dueDateBox').value = assignmentInstance.dueDate;
    document.getElementById('dueTimeBox').value = assignmentInstance.dueTime;
    document.getElementById('d2lLinkBox').value = assignmentInstance.d2lLink;
    document.getElementById('instructionsBox').value = assignmentInstance.instructions;
    
}

// changes the label of the page
function changeLabelsToEdit(assignmentInstance) {
    document.getElementById('headerText').innerHTML = "Edit: " + assignmentInstance.name;
}


// Build an instance of the assingment.

function assignmentClassBuilder(instructorID) {
    console.log(document.getElementById('dueTimeBox').value);
    let newAssignment = new assignment(
        document.getElementById('courseBox').value,
        document.getElementById('assignmentNameBox').value,
        document.getElementById('dueDateBox').value,
        document.getElementById('dueTimeBox').value,
        document.getElementById('d2lLinkBox').value,
        document.getElementById('instructionsBox').value,
        instructorID
    );
    return newAssignment;
}


// handles the event when the submit button is clicked.

function submitOnClick() {
    document.getElementById('submitButton').click();
}

function submitInfo(event) {
    event.preventDefault();
    let assignmentInstance = assignmentClassBuilder();
    if (confirm("Please confirm the submission")) {
        sendAssignment(assignmentInstance);
    try {
        delete sessionStorage.needsDetails;
    } catch{
        console.log('find me');
    }
    }else{
        return false
    }
    // sendAssignment(assignmentInstance);
    // sendInstructor(instructorInstance);   
    // try {
    //     delete sessionStorage.needsDetails;
    // } catch{
    //     console.log('find me');
    // }
}

/*
on page load
*/

autocomplete(document.getElementById("courseBox"), getCollectionDetails("assignmentList", "course"));
// autocomplete(document.getElementById("instructorNameBox"), getCollectionDetails("instructorsList", "name"));
// autocomplete(document.getElementById("instructorEmailBox"), getCollectionDetails("instructorsList", "email"));
document.getElementById('form').addEventListener('submit', submitInfo)

if (sessionStorage.needsDetails != undefined) {
    let assignmentInstance = getElementByIdByCollectionFromLocStorage(sessionStorage.needsDetails, 'assignmentList');
    // let instructorInstance = getElementByIdByCollectionFromLocStorage(assignmentInstance.instructorID, 'instructorsList');
    editModeLoader(assignmentInstance);
}