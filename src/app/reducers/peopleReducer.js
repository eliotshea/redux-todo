import { ADD_PERSON, UPDATE_PERSON, DELETE_PERSON } from "../actions"

var peopleId = 1;
const initialPeople = [
    {
      id: peopleId++,
      firstName: "Eliot",
      lastName: "Shea",
      color: "red",
    },
    {
      id: peopleId++,
      firstName: "Billy",
      lastName: "Lieblick",
      color: "blue",
    },
    {
        id: peopleId++,
        firstName: "Marty",
        lastName: "Thompson",
        color: "green",
    },
    {
        id: peopleId++,
        firstName: "Ryan",
        lastName: "DeLeo",
        color: "orange",
    },
    {
        id: peopleId++,
        firstName: "Sam",
        lastName: "Rhea",
        color: "navy",
    }
]
  

export const personReducer = (state = initialPeople, action) => {
    switch (action.type) {
        case ADD_PERSON:
            return [...state, action.payload]
        case UPDATE_PERSON:
            break;
        case DELETE_PERSON:
            return state.filter((x) => x.id === action.payload)
        default:
            return state;
    }
}