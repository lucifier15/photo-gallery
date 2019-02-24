import axios from 'axios';

//action to get all photos for a group via group id
export const searchPoolPhotos = (groupId,per_page,page) => {
    return dispatch => {
        return axios.post(`https://api.flickr.com/services/rest/?method=flickr.groups.pools.getPhotos&api_key=daf19e272b75ab9efd60c760ff54b996&
            group_id=${groupId}&per_page=${per_page}&page=${page}&format=json&nojsoncallback=1`)
        .then((result) => {
            console.log(result.data.photos.pages)
            dispatch({
                type: "PHOTOS_SEARCH",
                photos: result.data.photos.photo,
                pages: result
            })
        })
    }
}

//function to get likes for a photo
export const getPhotoLikes = (photoId) => {
    return dispatch => {
        return axios.post(`https://api.flickr.com/services/rest/?method=flickr.photos.getFavorites&api_key=daf19e272b75ab9efd60c760ff54b996&photo_id=${photoId}&format=json&nojsoncallback=1`)
        .then((favs)=>{
            return favs.data.photo.person.length
        })
    }
}

//function to get comments for a photo
export const getPhotoComments = (photoId) => {
    return dispatch => {
        return axios.post(`https://api.flickr.com/services/rest/?method=flickr.photos.getInfo&api_key=daf19e272b75ab9efd60c760ff54b996&photo_id=${photoId}&format=json&nojsoncallback=1`)
        .then((info)=>{
            return info.data.photo.comments._content
        })
    }
}
