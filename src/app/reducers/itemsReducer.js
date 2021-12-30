import { ADD_ITEM, UPDATE_ITEM, DELETE_ITEM, MOVE_ITEM } from "../actions"

export const ItemStatuses = {
    Todo: "TODO",
    InProgress: "INPROGRESS",
    Done: "DONE"
}

const initialItems = {
    list: [
    { 
      id: 1,
      name: "Do Work",
      estimatedHours: 5,
      currentHours: 0,
      assignedTo: 1,
      status: ItemStatuses.Todo,
      priority: 1,
    },
    { 
      id: 2,
      name: "More work",
      estimatedHours: 1,
      currentHours: 0,
      assignedTo: 2,
      status: ItemStatuses.Todo,
      priority: 2,
    },
    { 
        id: 3,
        name: "Stuff",
        estimatedHours: 1,
        currentHours: 0,
        assignedTo: null,
        status: ItemStatuses.Todo,
        priority: 3,
    }
  ],
  count: 3
}
function statusToIndex(status) {
    switch(status) {
        case ItemStatuses.Todo:
            return 0;
        case ItemStatuses.InProgress:
            return 1;
        case ItemStatuses.Done:
            return 2;
        default:
            return undefined;
    }
}

export const itemReducer = (state = initialItems, action) => {
    switch (action.type) {
        case ADD_ITEM:
            return {
                ...state,
                list: [...state.list, {
                id: state.count + 1,
                ...action.payload,
                }],
                count: state.count + 1
            }
        case UPDATE_ITEM:
            return {
                ...state,
                list: state.list.map((x) => {
                    if(x.id === action.payload.id){
                        return {
                            id: x.id,
                            ...action.payload.item
                        }
                    } else {
                        return x;
                    }
                })
            };
        case DELETE_ITEM:
            return {
                ...state,
                list: state.list.filter((x) => x.id !== action.payload)
            }
        case MOVE_ITEM:
            var newItem = action.payload.item;
            console.log(state.list);
            var oldItem = state.list.find(x => x.id === newItem.id);
            
            //get 3 arrays containing all the elements of each status
            var statuses = [ItemStatuses.Todo, ItemStatuses.InProgress, ItemStatuses.Done];
            var eachColumn = statuses.map((status) => {
                return state.list.filter((x) => x.status === status).sort((a, b) => a.priority - b.priority);
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
            return {
                ...state,
                list: [...eachColumn[0], ...eachColumn[1], ...eachColumn[2]]
            };
        default:
            return state;
    }
}