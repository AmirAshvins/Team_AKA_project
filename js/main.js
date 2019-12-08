// loads the list based on the assignments inside the database
function loadList() {
    let parsedAssignmentList = JSON.parse(window.localStorage.assignmentList)
    for (let i = 0; i < parsedAssignmentList.length; i++) {
        buildListRow(parsedAssignmentList[i]);
    }
    markCompletedAssignments();
}

function markCompletedAssignments() {
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

// handels the redirection to the details page.
function onListItemClick(clickedItem) {
    sessionStorage.setItem("needsDetails", clickedItem.id);
    sessionStorage.setItem("previousPage", './main.html');
    window.location.href = "./details.html";
}

// handles the when the assingments are completed
function onCompletedClick() {
    console.log("Clicked!");
    console.log('Hello');
}

function addButtonClickHandler(){
    sessionStorage.previousPage = './main.html';
    location = './addassignment.html'
}

// handles the events on pageload
function onPageLoad() {
    if (sessionStorage.assignmentsLoaded != 'true') {
        loadAssignmentsToStorage();
    }

    let waiter = setInterval(() => {
        if (allLoaded()) {
            document.getElementById("headerText").innerHTML = JSON.parse(sessionStorage.currentUser).name + "'s List";
            resetListContainer();
            loadList();
            getAssignmentDueDate();
            deletePassedAssignments();
            clearInterval(waiter);
        }
    }, 20);
}

function allLoaded() {
    return sessionStorage.assignmentsLoaded == "true" && sessionStorage.loadedUser == "true"
}




firebase.auth().onAuthStateChanged((authUser) => {
    var currentUser = new user(authUser.uid, authUser.displayName)
    sessionStorage.loadedUser = false;
    sessionStorage.currentUser = JSON.stringify(currentUser)
});

document.getElementById('addButton').onclick = addButtonClickHandler;
sessionStorage.assignmentsLoaded = 'false';
delete sessionStorage.needsDetails;

onPageLoad();