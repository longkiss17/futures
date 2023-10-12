import { ref, isRef, isReactive, unref, watchEffect } from "vue";
import fetchError from "./fetchError";
import axios from "./axios";

export default function useFetch(url, params = {}, postData = {}, method = "get", fn = null) {
  const data = ref(null);
  const error = ref(null);

  async function doFetch() {
    data.value = null;
    error.value = null;

    await axios({
      url: url,
      params: params,
      method: method,
      data: postData,
    })
      .then((response) => {
        let results = response.data;
        if (fn) results = fn(results);
        data.value = results;
      })
      .catch((err) => {
        fetchError(err);
        error.value = err;
      });
  }

  if (isRef(url) || isReactive(params) || isReactive(postData)) {
    watchEffect(doFetch);
  } else {
    doFetch();
  }

  return { data, error };
}
