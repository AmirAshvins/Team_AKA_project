class assignment {
    constructor(course, assignmentName, dueDate, D2LLink, instructions, additionalInstructions, instructorID) {
        this.course = course;
        this.name = assignmentName;
        this.dueDate = dueDate;
        this.D2LLink = D2LLink;
        this.ID = null;
        this.instructions = instructions;
        this.additionalInstructions = additionalInstructions;
        this.instructorID = instructorID;
    }

    setID() {
        let assignmentID = '';
        for (let i = 0; i < this.D2LLink.length; i++) {
            if (!isNaN(this.D2LLink[i])) {
                assignmentID += this.D2LLink[i];
            }
        }
        if (assignmentID != '') {
            this.ID = assignmentID;
        }
        else {
            console.log('Cannot create ID. Empty D2L link');
        }
    }

    IDinDB(collectionName, ID) {
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
}

class instructor {
    constructor(instructorName, instructorEmail) {
        this.ID = null;
        this.name = instructorName;
        this.email = instructorEmail;
    }

    setID() {
        let instructorID = ''
        for (let i = 0; i < this.email.length(); i++) {
            if (email[i] != '@') {
                instructorID += this.email[i];
            }
            else {
                this.ID = instructorID;
            }

            if (instructorID === '') {
                console.log('Cannot create instructor ID')
            }
        }
    }
}