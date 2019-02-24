let initialState = {
    groups: [],
    photos: [],
    pages: 0
}

const mainReducer = (state=initialState, action) => {
    switch(action.type){
        case "GROUPS_SEARCH":
        return {
            ...state,
            groups: action.groups
        }
        break;
        case "PHOTOS_SEARCH":
        return {
            ...state,
            photos: action.photos,
            pages: action.pages
        }
        break;
    }
    return state;
}

export default mainReducer