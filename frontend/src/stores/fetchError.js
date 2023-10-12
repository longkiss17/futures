import { ElMessage } from "element-plus";

export default function fetchError(err) {
  if (err.response.status === 401) {
    localStorage.setItem("redirectUrl", location.href);
    location.href = `${window.config.apiUrl}/authenticate`;
  } else if (err.response.status === 403) {
    location.href = "/auth";
  } else {
    ElMessage.error(err.message + " " + err.response.data.path);
  }
}
