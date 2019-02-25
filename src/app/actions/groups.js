import axios from 'axios';

//action dispatched to search groups based on text entered
//axios is used for making the api calls
export const searchGroups = (text) => {
    return dispatch => {
        return axios.post(`https://api.flickr.com/services/rest/?method=flickr.groups.search&api_key=daf19e272b75ab9efd60c760ff54b996&text=${text}&format=json&nojsoncallback=1`)
        .then((result) => {
            dispatch({
                type: "GROUPS_SEARCH",
                groups: result.data.groups.group
            })
        })
    }
}