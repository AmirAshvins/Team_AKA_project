
function loadList() {
    /**
     * Load the assignments to the DOM in the form of a list
     * 
     * :precondition: localStorage.assignmentList must exist
     * :post-condition: will build all the list rows needed to represent all the assignments in localStorage.assignmentList
     * :post-condition: will mark all completed assignments
     */
    let parsedAssignmentList = JSON.parse(window.localStorage.assignmentList)
    for (let i = 0; i < parsedAssignmentList.length; i++) {
        buildListRow(parsedAssignmentList[i]);
    }
    markCompletedAssignments();
}

function markCompletedAssignments() {
    /**
     * Mark all completed assignments
     * 
     * :precondition: sessionStorage.currentUser must exist
     * :precondition: sessionStorage.currentUser must contain a property named completedAssignments
     * :post-condition: will add the class name "strikethrough" to every completed assignment in the list
     */
    let user = JSON.parse(sessionStorage.currentUser);
    for (assignment of user.completedAssignments) {
        let assignmentRowDOM = document.getElementById(assignment);
        if (assignmentRowDOM != null) {
            for (childrenDOM of assignmentRowDOM.children) {
                childrenDOM.className = "strikethrough " + childrenDOM.className;
            }
            assignmentRowDOM.className = "strikethrough " + assignmentRowDOM.className;
        }
    }
}

function onListItemClick(clickedItem) {
    /**
     * Handle the onclick event for a list item
     * 
     * :post-condition: will set sessionStorage.needsDetails as the ID of the list item clicked
     * :post-condition: will set sessionStorage.previousPage as "./main.html"
     * :post-condition: will redirect to details.html
     */
    sessionStorage.setItem("needsDetails", clickedItem.id);
    sessionStorage.setItem("previousPage", './main.html');
    window.location.href = "./details.html";
}

function addButtonClickHandler(){
     /**
     * Handle the onclick event for add button
     * 
     * :post-condition: will set sessionStorage.previousPage as "./main.html"
     * :post-condition: will redirect to addassignment.html
     */
    sessionStorage.previousPage = './main.html';
    location = './addassignment.html'
}

function onPageLoad() {
    /**
     * Will dynamcally load all the appropriate items of the DOM
     * 
     * To run immediately upon page load
     * 
     * :post-condition: will check the sessionStorage.assignmentsLoaded flag. This flag will be false if:
     *                  -the user first logs in
     *                  -the assignments collection in firestore has been updated
     * :post-condition: will wait for the sessionStorage.assignmentsLoaded and sessionStorage.loadedUser flags to be "true"
     * :post-condition: will change the header of the page to be "{username}'s list"
     * :post-condition: will reset the list container
     * :post-condition: will load the assignment list rows
     * :post-condition: will delete past assignments
     */
    if (sessionStorage.assignmentsLoaded != 'true') {
        loadAssignmentsToStorage();
    }

    let waiter = setInterval(() => {
        if (allLoaded()) {
            document.getElementById("headerText").innerHTML = JSON.parse(sessionStorage.currentUser).name + "'s List";
            resetListContainer();
            loadList();
            deletePassedAssignments();
            clearInterval(waiter);
        }
    }, 20);
}

function allLoaded() {
    /**
     * Assess if the assignments and user have been loaded
     * 
     * :post-condition: will assess if sessionStorage.assignmentsLoaded == "true" and sessionStorage.loadedUser == "true"
     * :post-condition: will return a boolean
     */
    return sessionStorage.assignmentsLoaded == "true" && sessionStorage.loadedUser == "true"
}




firebase.auth().onAuthStateChanged((authUser) => {
    /**
     * Handle onAuthStateChanged event
     * 
     * :post-condition: will create a new User instance
     * :post-condition: will set sessionStorage.loadedUser as false
     * :post-condition: will store currentUser in sessionStorage
     */
    var currentUser = new user(authUser.uid, authUser.displayName)
    sessionStorage.loadedUser = false;
    sessionStorage.currentUser = JSON.stringify(currentUser)
});

// statements to be executed immediately
document.getElementById('addButton').onclick = addButtonClickHandler;
sessionStorage.assignmentsLoaded = 'false';
delete sessionStorage.needsDetails;
onPageLoad();