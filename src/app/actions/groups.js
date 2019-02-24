import axios from 'axios';

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