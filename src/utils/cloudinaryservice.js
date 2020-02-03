import axios from "axios";

const cloudinaryservice = axios.create({
  baseURL: "http://localhost:5000/api"
  // withCredentials: true // => you might need this when having the users in the app
});

const errorHandler = err => {
  // console.error(err);
  throw err;
};

export default {
  cloudinaryservice,

  handleUpload(theFile) {
    // console.log('file in cloudinaryservice: ', theFile)
    return cloudinaryservice
      .post("/upload", theFile)
      .then(res => res.data)
      .catch(errorHandler);
  },

  saveNewThing(newThing) {
    // console.log('new thing is: ', newThing)
    return cloudinaryservice
      .post("/things/create", newThing)
      .then(res => res.data)
      .catch(errorHandler);
  }
};
