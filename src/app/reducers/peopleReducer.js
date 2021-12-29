import { ADD_PERSON, UPDATE_PERSON, DELETE_PERSON } from "../actions"

const initialPeople = {
    list: [
        {
        id: 1,
        firstName: "Eliot",
        lastName: "Shea",
        color: "red",
        },
        {
        id: 2,
        firstName: "Billy",
        lastName: "Lieblick",
        color: "blue",
        },
        {
            id: 3,
            firstName: "Marty",
            lastName: "Thompson",
            color: "green",
        },
        {
            id: 4,
            firstName: "Ryan",
            lastName: "DeLeo",
            color: "orange",
        },
        {
            id: 5,
            firstName: "Sam",
            lastName: "Rhea",
            color: "navy",
        }
    ],
    count: 5,
}
  

export const personReducer = (state = initialPeople, action) => {
    switch (action.type) {
        case ADD_PERSON:
            return {
                ...state,
                list: [...state.list,
                {
                    ...action.payload,
                    id: state.count + 1,
                }],
                count: state.count + 1,
            }
        case UPDATE_PERSON:
            break;
        case DELETE_PERSON:
            return {
                ...state,
                list: state.list.filter((x) => x.id === action.payload),
                count: state.count - 1
            }
        default:
            return state;
    }
}