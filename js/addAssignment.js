/*
Code specific to add assignment page
*/

/* If addAssignment is redirected from details, it needs to load the edit functionalities.
this includes:
-changing the header label to the assignment name, and
-preloading the assignment details to the form.

editModeLoader changes the label, and calls a loadAssignmentDetails, which preloads the assignment details. 
 */
function editModeLoader(assignmentInstance) {
    /* 
    Load the page as an edit assignment page.

    :precondition: assignmentInstance must be an instance of Assignment.
    :post-condition: will change the header to the assignment name.
    :post-condition: will load the assignment details to the form
    */
    document.getElementById('headerText').innerHTML = "Edit: " + assignmentInstance.name;
    loadAssignmentDetails(assignmentInstance);
}


function loadAssignmentDetails(assignmentInstance) {
    /* 
    preload the assignment details to the form.

    :precondition: assignmentInstance must be an instance of Assignment.
    :post-condition: will load the assignment details to the form
    */
    document.getElementById('assignmentNameBox').value = assignmentInstance.name;
    document.getElementById('courseBox').value = assignmentInstance.course;
    document.getElementById('dueDateBox').value = assignmentInstance.dueDate;
    document.getElementById('dueTimeBox').value = assignmentInstance.dueTime;
    document.getElementById('d2lLinkBox').value = assignmentInstance.d2lLink;
    document.getElementById('instructionsBox').value = assignmentInstance.instructions;

}

// Build an instance of the assingment.

function assignmentClassBuilder() {
    /*
    build an assignment class instance with the form data.

    :precondition: the d2l link must have at least one number
    :post-condition: will gather the form details and build an assignment class instance
    */
    console.log(document.getElementById('dueTimeBox').value);
    let newAssignment = new assignment(
        document.getElementById('courseBox').value,
        document.getElementById('assignmentNameBox').value,
        document.getElementById('dueDateBox').value,
        document.getElementById('dueTimeBox').value,
        document.getElementById('d2lLinkBox').value,
        document.getElementById('instructionsBox').value
    );
    return newAssignment;
}

function submitOnClick() {
    /* 
    Handle the main submit button onclick

    post-condition: will click the form submit button.
    */
    document.getElementById('submitButton').click();
}

function submitInfo(event) {
    /* 
    Handle the form submit button onclick.

    :post-condition: Will get an assignment instance built
    :post-condition: will request confirmation from user to submit
    :post-condition: upon confirmation will submit the assignment to DB
    :post-condition: will print to console if sessionStorage.needsDetails does not exist
    */
    event.preventDefault();
    let assignmentInstance = assignmentClassBuilder();
    if (confirm("Please confirm the submission")) {
        sendAssignment(assignmentInstance);
        try {
            delete sessionStorage.needsDetails;
        } catch{
            console.log('needsdetails not present in sessionstorage');
        }
    } 
}

function backButtonClickHandler(){
    window.location = sessionStorage.previousPage;
}

/*
to be run immediately as the page is loaded.
*/

// prepare the autocomplete. must convert the list returned by getCollection Details to set and then back to list to discard duplicates.
autocomplete(document.getElementById("courseBox"), Array.from(new Set(getCollectionDetails("assignmentList", "course"))));

// set listener for form submition
document.getElementById('form').addEventListener('submit', submitInfo)

// set onclick handler for back button
document.getElementById('backButton').onclick = backButtonClickHandler;

// determine if the page needs to be loaded as an edit assignment page. If true, will call editModeLoader, the argument is an Assignment instance.
if (sessionStorage.needsDetails != undefined) {
    let assignmentInstance = getElementByIdByCollectionFromLocStorage(sessionStorage.needsDetails, 'assignmentList');
    editModeLoader(assignmentInstance);
}

