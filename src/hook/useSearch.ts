import type { Job } from "../Type";

export const filterData = (
  data: Job[],
  searchTerm: string,
  selectedCarType: string = "ทั้งหมด",
  startDate?: string,
  endDate?: string,
  selectedStatus: string = "ทั้งหมด"
): Job[] => {
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

  return data.filter((item) => {
    const reg = (item.registration || "").toLowerCase().replace(/\s+/g, "");
    const name = (item.customerName || "").toLowerCase().replace(/\s+/g, "");
    const brand = (item.brand || "").toLowerCase().replace(/\s+/g, "");
    const model = (item.model || "").toLowerCase().replace(/\s+/g, "");
    const bag = (item.bagNumber || "").toLowerCase().replace(/\s+/g, "");

    const matchesSearch =
      !query ||
      reg.includes(query) ||
      name.includes(query) ||
      brand.includes(query) ||
      model.includes(query) ||
      bag.includes(query);
    const matchesType =
      selectedCarType === "ทั้งหมด" || item.type === selectedCarType;

    const currentStatusName = item.isFinished
      ? "เสร็จสิ้น"
      : item.stages[item.currentStageIndex]?.name || "";

    const matchesStatus =
      selectedStatus === "ทั้งหมด" || currentStatusName === selectedStatus;

    let matchesDate = true;
    if (startDate || endDate) {
      const startJob = new Date(item.startDate).getTime();

      const endJob = item.estimatedEndDate
        ? new Date(item.estimatedEndDate).getTime()
        : startJob;

      if (startDate) {
        const filterStart = new Date(startDate).setHours(0, 0, 0, 0);

        if (endJob < filterStart) matchesDate = false;
      }

      if (endDate) {
        const filterEnd = new Date(endDate).setHours(23, 59, 59, 999);

        if (endJob > filterEnd) matchesDate = false;
      }
    }
    return matchesSearch && matchesType && matchesDate && matchesStatus;
  });
};
