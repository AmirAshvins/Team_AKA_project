
/* 
 
CLASS DEFINITIONS

*/

/*

The Assignment class represents an assignment.

It takes the following parameters:
-course : string
-assignmentName : string
-dueDate : string
-dueTime : string
-d2lLink : string
-instructions :string
-additionalInformation : string
-ID : string

The ID will be created from the numbers present in the d2lLink

 */
class assignment {
    constructor(course, assignmentName, dueDate, dueTime, d2lLink, instructions, additionalInformation) {
        this.course = course;
        this.name = assignmentName;
        this.dueDate = dueDate;
        this.dueTime = dueTime;
        this.d2lLink = d2lLink;
        this.ID = 'ass';
        this.instructions = instructions;
        for (let i = 0; i < this.d2lLink.length; i++) {
            if (!isNaN(this.d2lLink[i])) {
                this.ID += this.d2lLink[i];
            }
        }
    }
}


/*
The User class represents a user

The stored parameters are:]
-ID : alphanumerical
-name : string
-completedAssignments : list of assignment IDs

Upon instantiation, it will asses if user exists. If the user exists, it will query for completedAssignments. 
Else, it will send the new user to DB.

methods: 
-getCompletedAssignments. Will query the DB for a list of assignment IDs that represent completed assignments


*/
class user {
    constructor(userID, userName) {
        this.ID = userID;
        this.name = userName;
        this.completedAssignments = [];
        db.collection('users').doc(this.ID).get().then((doc) => {
            if (doc.exists) {
                this.getCompletedAssignments()
            } else {
                sendUserToDB(this);
                sessionStorage.loadedUser = true;
            }
        });
    }

    getCompletedAssignments() {
        db.collection('users').doc(this.ID).get().then((doc) => {
            this.completedAssignments = doc.data().completedAssignments;
            sessionStorage.user = JSON.stringify(this);
            sessionStorage.loadedUser = true;
        }).catch((err) => {
            console.log('error while loading completed assignments', err)
        });
    }
}
