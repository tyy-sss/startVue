import { ElMessage, ElMessageBox } from "element-plus";
const handleClose = () => {
  ElMessageBox.confirm("确定关闭", {
    confirmButtonText: "确定",
    cancelButtonText: "取消",
  })
    .then(() => {
    })
    .catch(() => {})
};
export { handleClose };
