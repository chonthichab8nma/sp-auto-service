
import type { Job } from "../Type";

export const filterData = (data: Job[], searchTerm: string): Job[] => {
 
  const query = searchTerm.toLowerCase().replace(/\s+/g, "");


  if (!data || data.length === 0) {
    console.warn("ไม่มีข้อมูลส่งเข้ามาใน filterData (data เป็น array ว่าง)");
    return [];
  }


  if (query.length === 1) { 
    console.log("กำลังค้นหาคำว่า:", query);
    console.log("หน้าตาข้อมูลจริง (ตัวแรก):", data[0]); 
    console.log("มี registration ไหม?:", data[0].registration);
    console.log("มี customerName ไหม?:", data[0].customerName);
  }


  if (!query) return data;

  return data.filter((item) => {
 
    const reg = (item.registration || "").toLowerCase().replace(/\s+/g, "");
    const name = (item.customerName || "").toLowerCase().replace(/\s+/g, "");
    const brand = (item.brand || "").toLowerCase().replace(/\s+/g, "");
    const model = (item.model || "").toLowerCase().replace(/\s+/g, "");
    const bag = (item.bagNumber || "").toLowerCase().replace(/\s+/g, "");

    return (
      reg.includes(query) ||
      name.includes(query) ||
      brand.includes(query) ||
      model.includes(query) ||
      bag.includes(query)
    );
  });
};