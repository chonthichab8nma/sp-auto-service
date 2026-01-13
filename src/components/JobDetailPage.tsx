import { useNavigate } from "react-router-dom";
import { ChevronLeft, CarFront } from "lucide-react";

import { type Job } from "../Type";

interface JobDetailPageProps {
  job: Job;
  onUpdate: (job: Job) => void;
  
}

const RowItem = ({
  label,
  value,
}: {
  label: string;
  value: React.ReactNode;
}) => (
  <div className="flex items-start py-1">
    <span className="w-40 text-slate-400 font-light text-sm">{label}</span>
    <span className="flex-1 text-slate-900 font-medium text-sm">
      {value || "-"}
    </span>
  </div>
);

const StackItem = ({
  label,
  value,
}: {
  label: string;
  value: React.ReactNode;
}) => (
  <div className="flex flex-col gap-1">
    <span className="text-slate-400 font-light text-sm">{label}</span>
    <span className="text-slate-900 font-medium text-base">{value || "-"}</span>
  </div>
);

const Section = ({
  title,
  subtitle,
  children,
  hasBorder = true,
}: {
  title: string;
  subtitle: string;
  children: React.ReactNode;
  hasBorder?: boolean;
}) => (
  <div
    className={`flex flex-col md:flex-row py-8 ${
      hasBorder ? "border-b border-gray-100" : ""
    }`}
  >
    <div className="w-full md:w-1/3 mb-6 md:mb-0">
      <h3 className="font-bold text-slate-800 text-base">{title}</h3>
      <p className="text-slate-400 text-sm mt-1">{subtitle}</p>
    </div>
    <div className="w-full md:w-2/3">{children}</div>
  </div>
);

export default function JobDetailPage({ job }: JobDetailPageProps) {
  const navigate = useNavigate();

  return (
    <div className="animate-in fade-in duration-300 p-6 min-h-screen bg-gray-50 font-sans">
 
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">

        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate(-1)}
            className="w-9 h-9 rounded-full border border-gray-200 bg-white flex items-center justify-center hover:bg-slate-50 text-slate-500 transition-colors"
          >
            <ChevronLeft size={18} />
          </button>

          {/* Mockup Stepper (Visual Only to match screenshot) */}
          {/* <div className="flex items-center gap-2 text-sm">
            <div className="flex items-center gap-1 text-green-600 font-medium">
              <div className="w-5 h-5 rounded-full bg-green-600 text-white flex items-center justify-center text-[10px]">
                <Check size={12} />
              </div>
              เคลม
            </div>
            <ChevronRight size={14} className="text-gray-300" />
            <div className="flex items-center gap-1 text-blue-600 font-medium">
              <div className="w-5 h-5 rounded-full bg-blue-600 text-white flex items-center justify-center text-[10px]">
                2
              </div>
              ซ่อม
            </div>
            <ChevronRight size={14} className="text-gray-300" />
            <div className="flex items-center gap-1 text-gray-400">
              <div className="w-5 h-5 rounded-full border border-gray-300 flex items-center justify-center text-[10px]">
                3
              </div>
              ตั้งเบิก
            </div>
          </div> */}
        </div>

        <button
          onClick={() => navigate(`/station/${job.id}`)}
          className="bg-blue-600 text-white px-6 py-2 rounded-lg text-sm font-medium shadow-sm hover:bg-blue-700 transition-all"
        >
          เช็กสถานะรถ
        </button>
      </div>


      <div className="mb-6 pl-1 text-slate-500 text-sm flex items-center gap-2">
        <span>สเตชั่น</span>
        <span className="text-gray-300">/</span>
        <span className="text-slate-900 font-medium">
          รายละเอียด {job.registration}
        </span>
      </div>

      <div className="bg-white shadow-sm border border-slate-200 px-8 py-2">
        <Section title="รายละเอียดรถ" subtitle="ข้อมูลรถ">
          <div className="space-y-3">
            <div className=" flex items-center justify-between ">
              <div className="flex items-center gap-2.5">
                <div className="flex justify-between items-center py-8 ">
                  <div className="flex items-center gap-5">
                    <div className="w-12 h-12 flex items-center justify-center">
                      <CarFront
                        size={40}
                        className="text-slate-800"
                        strokeWidth={1.5}
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <h1 className="text-lg font-bold text-slate-900">
                    {job.brand}
                  </h1>
                  <p className="text-slate-400 text-sm">
                    {job.model} {job.year} {job.type}{" "}
                    {job.color === "e:HEV" ? "e:HEV" : ""}
                  </p>
                </div>
              </div>

              <button className="border border-slate-200 px-4 py-2 rounded-lg text-sm text-slate-600 hover:bg-slate-50 flex items-center gap-2 transition-colors">
                แก้ไขข้อมูล
              </button>
            </div>
            <RowItem label="ทะเบียนรถ" value={job.registration} />
            <RowItem label="เลขตัวถัง" value={job.bagNumber} />{" "}
            <RowItem label="ประเภทรถ" value={job.type} />
            <RowItem label="ยี่ห้อ/แบรนด์" value={job.brand} />
            <RowItem label="รุ่น" value={job.model} />
            <RowItem label="ปี" value={job.year} />
            <RowItem label="สี" value={job.color} />
          </div>
        </Section>

        <Section title="รายละเอียดการซ่อม" subtitle="ข้อมูลการซ่อม">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-y-6 gap-x-8">
            <StackItem
              label="วันที่นำรถเข้าจอดซ่อม"
              value={new Date(job.startDate).toLocaleDateString("en-GB")}
            />
            <StackItem
              label="กำหนดซ่อมเสร็จ/นัดรับรถ"
              value={new Date(job.estimatedEndDate).toLocaleDateString("en-GB")}
            />
            <StackItem
              label="ค่าความเสียหายส่วนแรก"
              value={`฿ ${job.excessFee.toLocaleString()}`}
            />
            <StackItem label="เจ้าหน้าที่รับรถ" value={job.receiver} />
          </div>
        </Section>

        <Section title="รายละเอียดลูกค้า" subtitle="ข้อมูลลูกค้า">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-y-6 gap-x-8">
            <StackItem
              label="ชื่อ-นามสกุล"
              value={job.customerName || "ไม่ระบุ"}
            />
            <StackItem
              label="เบอร์โทรศัพท์"
              value={job.customerPhone || "ไม่ระบุ"}
            />
            <div className="md:col-span-2">
              <StackItem
                label="ที่อยู่"
                value={job.customerAddress || "ไม่ระบุ"}
              />
            </div>
          </div>
        </Section>

        <Section
          title="รายละเอียดการชำระเงิน"
          subtitle="ข้อมูลการชำระเงิน"
          hasBorder={false}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-y-6 gap-x-8">
            <StackItem
              label="ประเภทการชำระเงิน"
              value={
                job.paymentType === "Insurance" ? "ประกันภัย (เคลม)" : "เงินสด"
              }
            />
            <StackItem
              label="ชื่อบริษัทประกันภัย"
              value={job.insuranceCompany || "-"}
            />
          </div>
        </Section>
      </div>
    </div>
  );
}
