

// ##########################
// UTILITIES

function getElementByIdByCollectionFromLocStorage(elementID, collectionName) {
    /**
     * Get a an object from a list in localStorage using an object ID to identify the right object.
     * 
     * :precondition: elementID must be a string
     * :precondition: collectionName must be a string
     * :precondition: localStorage must have a list named as the value of collectionName
     * :post-condition: will retrieve the appripriate list from storage, iterate through it and select the object with the provided ID
     * :post-condition: will return the object selected if found, else returns null     * 
     */
    let collectionList = JSON.parse(window.localStorage[collectionName]);
    for (let i = 0; i < collectionList.length; i++) {
        if (collectionList[i].ID === elementID) {
            return collectionList[i];
        }
    }
}

function getAssignmentDueDate() {
    /**
     * Gets a list of objects containing assignment ID's and their due date
     * 
     * :precondition: localStorage.assignmentList must exist
     * :post-condition: Will iterate through assignmentList and select each 
     *                  assignments ID and due date. This info will be stored in objects, and these in a list
     * :post-condition: will return a list of objects containing the assignment ids and due date
     */
    let assignments = JSON.parse(localStorage.assignmentList);
    let assignmentDueDateList = []
    assignments.forEach((assignment) => {
        assignmentDueDateList.push({
            'assID': assignment.ID,
            'dueDate': assignment.dueDate
        })
    })
    return assignmentDueDateList
}

function DateObject(list) {
    object = new Date(list[0], list[1], list[2]);
    return object
}


function getCollectionDetails(collectionName, detail) {
    /**
     * Gathers the desired property from all the objects in a list named as the value of collectionName, in local.storage
     * 
     * :precondition: collectionName must be a string
     * :precondition: detail must be a string
     * :precodnition: localStorage[collectionName] must exist
     * :post-condition: will iterate through localStorage[collectionName] and select the desired property from each object.
     * :post-condition: will return a list of strings
     */
    detailList = [];
    collection = JSON.parse(window.localStorage.getItem(collectionName));
    collection.forEach(function (item) {
        detailList.push(item[detail]);
    })
    return (detailList)
}


