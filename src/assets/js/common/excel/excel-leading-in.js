// excel 文件导入
import XLSX from "xlsx";

// 按照二进制读取文件
const readFile = (file) => {
  return new Promise((resolve) => {
    let reader = new FileReader();
    reader.readAsBinaryString(file);
    reader.onload = (e) => {
      resolve(e.target.result);
    };
  });
};

const excelLeadingIn = (data, character) => {
  let workbook = XLSX.read(data, { type: "binary" });
  //拿到第一个sheet表的数据，把第一个表格的数据转换成JSON数据
  const worksheet = workbook.Sheets[workbook.SheetNames[0]];
  data = XLSX.utils.sheet_to_json(worksheet);
  //把读取出来的数据变成最后可以传递给服务器的数据
  let list = [];
  data.forEach((item) => {
    let obj = {};
    for (let key in character) {
      if (!character.hasOwnProperty(key)) break;
      let v = character[key];
      const text = v.text;
      const type = v.type;
      v = item[text] || "";
      type === "string" ? (v = String(v)) : null;
      type === "number" ? (v = Number(v)) : null;
      obj[key] = v;
    }
    list.push(obj);
  });
  //得要预处理的数据，把数据处理后传入后端。
  console.log(list, "得到要处理的数据");
  return list;
};

export { readFile, excelLeadingIn };
