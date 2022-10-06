import * as XLSX from "xlsx";
export function ExportToExcel(data, name) {
  console.log("====================================");
  console.log("data", data);
  console.log("====================================");
  const worksheet = XLSX.utils.json_to_sheet(data);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "Dates");
  XLSX.writeFile(workbook, name + ".xlsx");
}
