import { ref, isRef, unref, watchEffect } from "vue";
import fetchError from "./fetchError";
import axios from "./axios";

export default async function useFetchAsync(url, params = {}, postData = {}, method = "get", headers = {}) {
  const data = ref(null);
  const error = ref(null);

  return axios({
    url: url,
    params: params,
    method: method,
    data: postData,
    headers: headers,
  })
    .then((response) => {
      data.value = response.data;
      return { data, error };
    })
    .catch((err) => {
      fetchError(err);
      error.value = err;

      return { data, error };
    });
}
