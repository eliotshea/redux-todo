import { ADD_ITEM, UPDATE_ITEM, DELETE_ITEM } from "../actions"

var itemId = 1;

export const ItemStatuses = {
    Todo: "TODO",
    InProgress: "INPROGRESS",
    Done: "DONE"
}

const initialItems = [
    { 
      id: itemId++,
      name: "Do Work",
      estimatedHours: 5,
      currentHours: 0,
      assignedTo: 1,
      status: ItemStatuses.Todo
    },
    { 
      id: itemId++,
      name: "Die",
      estimatedHours: 1,
      currentHours: 0,
      assignedTo: 2,
      status: ItemStatuses.Todo
    },
    { 
        id: itemId++,
        name: "Shit",
        estimatedHours: 1,
        currentHours: 0,
        assignedTo: null,
        status: ItemStatuses.Todo
    }
  ]

export const itemReducer = (state = initialItems, action) => {
    switch (action.type) {
        case ADD_ITEM:
            
            return [...state, {
                id: itemId++,
                ...action.payload,
                
            }] 
        case UPDATE_ITEM:
            return state.map((x) => {
                if(x.id === action.payload.id){
                    return {
                        id: x.id,
                        ...action.payload.item
                    }
                } else {
                    return x;
                }
            });
        case DELETE_ITEM:
            return state.filter((x) => x.id !== action.payload)
        default:
            return state;
    }
}