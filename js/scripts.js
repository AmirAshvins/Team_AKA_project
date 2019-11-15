// #####################
// FIREBASE CONFIG

// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyA_-CQ7oIjLIeTU8B05p8lD-UbOJ9MXm_Y",
    authDomain: "team-aka.firebaseapp.com",
    databaseURL: "https://team-aka.firebaseio.com",
    projectId: "team-aka",
    storageBucket: "team-aka.appspot.com",
    messagingSenderId: "192089508874",
    appId: "1:192089508874:web:15181dc2fc7a40725ce3f3"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
var db = firebase.firestore();

function loadAssignmentsToStorage() {
    db.collection("assignments").get().then(function (assignmentsQuery) {
        let assignmentList = [];
        assignmentsQuery.forEach(function (doc) {
            assignmentDetails = doc.data();
            newAssignment = new assignment(assignmentDetails['course'], assignmentDetails['name'], assignmentDetails['dueDate'],
            assignmentDetails['dueTime'], assignmentDetails['d2lLink'], assignmentDetails['instructions'], 
            assignmentDetails['additionalInformation'], assignmentDetails['instructorID']);
            assignmentList.push(newAssignment);
        });
        window.localStorage.setItem("list", JSON.stringify(assignmentList));
        console.log(JSON.parse(window.localStorage.getItem('list')));
        window.localStorage.assignmentsLoaded = true;
    });
}

function loadInstructorsToStorage(){
    db.collection("instructors").get().then(function (instructorsQuery) {
        let instructorsList = [];
        instructorsQuery.forEach(function (doc) {
            instructorsDetails = doc.data();
            newInstructor = new instructor(instructorsDetails['name'], instructorsDetails['email']);
            instructorsList.push(newInstructor);
        });
        window.localStorage.setItem("instructorsList", JSON.stringify(instructorsList));
        console.log(JSON.parse(window.localStorage.getItem('instructorsList')));
        window.localStorage.instructorsLoaded = true;
    });
}


function IDinDB(collectionName, ID) {
    db.collection(collectionName).doc(ID).get()
        .then(function (docSnapshot) {
            if (docSnapshot.exists) {
                db.collection(collectionName).doc(ID).onSnapshot(function (doc) {
                    console.log("Exists.");
                    return true;
                });
            } else {
                console.log("Doesn't exist.");
                return false;
            }
        });
}

class assignment {
    constructor(course, assignmentName, dueDate, dueTime, d2lLink, instructions, additionalInformation, instructorID) {
        this.course = course;
        this.name = assignmentName;
        this.dueDate = dueDate;
        this.dueTime = dueTime;
        this.d2lLink = d2lLink;
        this.ID = 'ass';
        this.instructions = instructions;
        this.additionalInformation = additionalInformation;
        this.instructorID = '';
        for (let i = 0; i < this.d2lLink.length; i++) {
            if (!isNaN(this.d2lLink[i])) {
                this.ID += this.d2lLink[i];
            }
        }
    }
}

class instructor {
    constructor(instructorName, instructorEmail) {
        this.ID = '';
        this.name = instructorName;
        this.email = instructorEmail;
        for (let i = 0; i < this.email.length; i++) {
            if (this.email[i] != '@') {
                this.ID += this.email[i];
            } else {
                break;
            }
        }
    }
}

// ##########################
// UTILITIES

function getUrlQueries() {
    let urlQuery = decodeURI(window.location.search());
    let queries = urlQuery.split('?');
    delete queries[0];
    console.log("success");
    return queries;
}

function loadAssignmentDetails(assignmentId){
    let assignmentInstance = getElementByIdByCollectionFromLocStorage(assignmentId, 'assignmentList');
    let instructorInstance = getElementByIdByCollectionFromLocStorage(assignmentInstance.instructorID, 'instructorsList');
    document.getElementById('assignmentNameBox').innerHTML = assignmentInstance.name;
    document.getElementById('courseBox').innerHTML = assignmentInstance.course;
    document.getElementById('dueDateBox').innerHTML = assignmentInstance.dueDate;
    document.getElementById('dueTimeBox').innerHTML = assignmentInstance.dueTime;
    document.getElementById('d2lLinkBox').href = assignmentInstance.d2lLink;
    document.getElementById('instructorNameBox').innerHTML = instructorInstance.name;
    document.getElementById('instructorEmailBox').innerHTML = instructorInstance.email;
    document.getElementById('instructionsBox').innerHTML = assignmentInstance.instructions;
    document.getElementById('additionalInformationBox').innerHTML = assignmentInstance.additionalInformation;
}

function getElementByIdByCollectionFromLocStorage(elementID, collectionName){
    let collectionList = JSON.parse(window.localStorage[collectionName]);
    for (let i=0; i < collectionList.length; i++){
        if (collectionList[i].ID === elementID){
            return collectionList[i];
        }else{
            console.log("i'm a stupid machine");
        }
    }
}


