import axios from "axios";
import { apiConfig } from "../config/config";

const instance = axios.create({
  baseURL: `http://${apiConfig.host}:${apiConfig.port}`,
  withCredentials: true,
});

const brewery = (store) => (next) => (action) => {
  if (action.type === "FETCH_BREWERIES") {
    instance
      .get("/brewery")
      .then((response) => {
        if (response.status === 200) {
          const breweries = response.data.data;
          store.dispatch({
            type: "SAVE_BREWERIES",
            breweries,
          });
        }
      })
      .catch((error) => {
        console.log(error);
        store.dispatch({
          type: "ERROR",
          message: "Une erreur est survenue.",
        });
      });
  } else if (action.type === "ADD_BREWERY") {
    const formData = new FormData();

    formData
      .append("title", action.title)
      .append("image", action.image)
      .append("phone", action.phone)
      .append("address", action.address)
      .append("lat", action.lat)
      .append("lon", action.lon)
      .append("categories", action.categories)
      .append("description", action.description);

    instance
      .post("/brewery", formData)
      .then((response) => {
        console.log(response.status);
      })
      .catch((error) => {
        console.log(error);
      });
  } else if (action.type === "DELETE_BREWERY") {
    instance
      .delete(`/brewery/${action.breweryId}`)
      .then((response) => {
        store.dispatch({
          type: "PENDING",
          message: null,
        });
        if (response.status === 200) {
          store.dispatch({
            type: "INFO",
            message: "Brasserie supprimée",
          });
        }
      })
      .catch((error) => {
        console.log(error);
        const { status } = error.response;

        if (status === 401) {
          store.dispatch({
            type: "ERROR",
            message: "Action non autorisée",
          });
        } else if (status === 404) {
          store.dispatch({
            type: "ERROR",
            message: "La brasserie n'a pas été trouvée",
          });
        } else {
          store.dispatch({
            type: "ERROR",
            message: "Une erreur est survenue",
          });
        }
      });
  }

  next(action);
};

export default brewery;
