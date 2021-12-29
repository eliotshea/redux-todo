//ITEMS
export const ADD_ITEM = "ADD_ITEM";
export const addItem = (item) => ({
    type: ADD_ITEM,
    payload: item
});

export const DELETE_ITEM = "DELETE_ITEM";
export const deleteItem = (id) => ({
    type: DELETE_ITEM,
    payload: id
});

export const UPDATE_ITEM = "UPDATE_ITEM";
export const updateItem = (id, item) => ({
    type: UPDATE_ITEM,
    payload: {
        id: id,
        item: item
    }
});

export const MOVE_ITEM = "MOVE_ITEM";
export const moveItem = (id, item) => ({
    type: MOVE_ITEM,
    payload: {
        id: id,
        item: item
    }
})


//PEOPLE
export const ADD_PERSON = "ADD_PERSON";
export const addPerson = (item) => ({
    type: ADD_PERSON,
    payload: item
})

export const DELETE_PERSON = "DELETE_PERSON";
export const deletePerson = (id) => ({
    type: DELETE_PERSON,
    payload: id
})

export const UPDATE_PERSON = "UPDATE_PERSON";
export const updatePerson = (id, person) => ({
    type: ADD_PERSON,
    payload: {
        id: id,
        person: person
    }
})

//PROJECT
export const UPDATE_PROJECT =  "UPDATE_PROJECT";
export const updateProject = (project) => ({
    type: UPDATE_PROJECT,
    payload: project
});
