import { ADD_ITEM, UPDATE_ITEM, DELETE_ITEM, MOVE_ITEM } from "../actions"

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
      status: ItemStatuses.Todo,
      priority: 1,
    },
    { 
      id: itemId++,
      name: "More work",
      estimatedHours: 1,
      currentHours: 0,
      assignedTo: 2,
      status: ItemStatuses.Todo,
      priority: 2,
    },
    { 
        id: itemId++,
        name: "Stuff",
        estimatedHours: 1,
        currentHours: 0,
        assignedTo: null,
        status: ItemStatuses.Todo,
        priority: 3,
    }
  ]
function statusToIndex(status) {
    switch(status) {
        case ItemStatuses.Todo:
            return 0;
        case ItemStatuses.InProgress:
            return 1;
        case ItemStatuses.Done:
            return 2;
    }
}

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
        case MOVE_ITEM:
            var newItem = action.payload.item;
            var oldItem = state.find(x => x.id === newItem.id);
            
            //get 3 arrays containing all the elements of each status
            var statuses = [ItemStatuses.Todo, ItemStatuses.InProgress, ItemStatuses.Done];
            var eachColumn = statuses.map((status) => {
                return state.filter((x) => x.status === status).sort((a, b) => a.priority - b.priority);
            });

            var index = statusToIndex(newItem.status);
            eachColumn[statusToIndex(oldItem.status)] = eachColumn[statusToIndex(oldItem.status)].filter((x) => x.id !== oldItem.id);

            eachColumn[index] = eachColumn[index].filter((x) => x.id !== oldItem.id);
            eachColumn[index].splice(newItem.priority - 1, 0, newItem);

            eachColumn.forEach(column => {
                column.forEach((item, index) => {
                    item.priority = index + 1;
                })
            });
            return [...eachColumn[0], ...eachColumn[1], ...eachColumn[2]];
        default:
            return state;
    }
}