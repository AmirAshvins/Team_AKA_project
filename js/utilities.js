

// ##########################
// UTILITIES

function getUrlQueries() {
    let urlQuery = decodeURI(window.location.search());
    let queries = urlQuery.split('?');
    delete queries[0];
    console.log("success");
    return queries;
}

function getElementByIdByCollectionFromLocStorage(elementID, collectionName) {
    let collectionList = JSON.parse(window.localStorage[collectionName]);
    for (let i = 0; i < collectionList.length; i++) {
        if (collectionList[i].ID === elementID) {
            return collectionList[i];
        }
    }
}

function getAssignmentDueDate() {
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
    detailList = [];
    collection = JSON.parse(window.localStorage.getItem(collectionName));
    collection.forEach(function (item) {
        detailList.push(item[detail]);
    })
    return (detailList)
}


