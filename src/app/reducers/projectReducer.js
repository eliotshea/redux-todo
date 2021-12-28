import { UPDATE_PROJECT } from "../actions"

const initialProject = {
    name: "Project Name..."
}

export const projectReducer = (state = initialProject, action) => {
    switch (action.type) {
        case UPDATE_PROJECT:
            return action.payload;
        default:
            return state;
    }
}