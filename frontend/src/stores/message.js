import { ElMessage, ElMessageBox } from "element-plus";
import { useRouter, useRoute } from "vue-router";
const router = useRouter();

export default function message(type, title, fn, options) {
  if (type === "cancel") {
    ElMessageBox({
      title: `${title} 취소`,
      message: "정말 취소 하시겠습니까?",
      showCancelButton: true,
      confirmButtonText: "네",
      cancelButtonText: "아니요",
      beforeClose: (action, instance, done) => {
        if (action === "confirm") {
          fn();
          done();
        } else {
          done();
        }
      },
    });
  } else if (type === "success") {
    ElMessage({
      type: "success",
      message: title,
      duration: 1000,
    });
  }
}
