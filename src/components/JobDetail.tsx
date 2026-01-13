import { useNavigate } from "react-router-dom";
import { ChevronRight, ChevronLeft, Car, Edit2 } from "lucide-react";
import { type Job } from "../Type";
import { InfoItem } from "../components/SharedComponents";

interface JobDetailPageProps {
  job: Job;
}

export default function JobDetailPage({ job }: JobDetailPageProps) {
  const navigate = useNavigate();

  return (
    <div className="animate-in fade-in duration-300 p-6 min-h-screen bg-gray-50">
     
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-2 text-sm text-slate-500">
          <button
            onClick={() => navigate(-1)}
            className="w-8 h-8 rounded-full border bg-white flex items-center justify-center hover:bg-slate-50"
          >
            <ChevronLeft size={16} />
          </button>
          <span>สเตชั่น</span>
          <ChevronRight size={14} />
          <span className="text-slate-900 font-medium">
            รายละเอียด {job.registration}
          </span>
        </div>
        <button
      
          onClick={() => navigate(`/station/${job.id}`)}
          className="bg-blue-600 text-white px-5 py-2 rounded-lg text-sm font-medium shadow-sm hover:bg-blue-700 transition-all flex items-center gap-2"
        >
          เช็กสถานะรถ
        </button>
      </div>

  
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-8">
        <div className="flex justify-between items-start mb-8 border-b border-slate-100 pb-6">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 bg-slate-100 rounded-full flex items-center justify-center border border-slate-200">
              <Car size={28} className="text-slate-700" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-slate-900">{job.brand}</h1>
              <p className="text-slate-500 text-sm">
                {job.model} {job.year} {job.color}
              </p>
            </div>
          </div>
          <button className="border border-slate-200 px-4 py-1.5 rounded-full text-sm text-slate-600 hover:bg-slate-50 flex items-center gap-2">
            <Edit2 size={12} /> แก้ไขข้อมูล
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
  
          <div>
            <h3 className="font-bold text-slate-800 mb-4 text-base">
              รายละเอียดรถ
            </h3>
            <div className="space-y-1">
              <InfoItem label="ทะเบียนรถ" value={job.registration} />
              <InfoItem label="เลขตัวถัง" value={job.bagNumber} />
              <InfoItem label="ประเภทรถ" value={job.type} />
              <InfoItem label="ยี่ห้อ/แบรนด์" value={job.brand} />
              <InfoItem label="รุ่น" value={job.model} />
              <InfoItem label="ปี" value={job.year} />
              <InfoItem label="สี" value={job.color} />
            </div>
          </div>

          <div>
            <h3 className="font-bold text-slate-800 mb-4 text-base">
              รายละเอียดการซ่อม
            </h3>
            <div className="space-y-1">
              <InfoItem
                label="วันที่นำรถเข้า"
                value={new Date(job.startDate).toLocaleDateString("en-GB")}
              />
              <InfoItem
                label="กำหนดเสร็จ"
                value={new Date(job.estimatedEndDate).toLocaleDateString(
                  "en-GB"
                )}
              />
              <InfoItem
                label="ค่าเสียหายส่วนแรก"
                value={`฿ ${job.excessFee.toLocaleString()}`}
              />
              <InfoItem label="เจ้าหน้าที่รับรถ" value={job.receiver} />
              <InfoItem
                label="ประเภทการชำระ"
                value={job.paymentType === "Insurance" ? "ประกันภัย" : "เงินสด"}
              />
              {job.paymentType === "Insurance" && (
                <InfoItem label="บริษัทประกัน" value={job.insuranceCompany} />
              )}
            </div>
          </div>
       
          <div>
            <h3 className="font-bold text-slate-800 mb-4 text-base">
              รายละเอียดลูกค้า
            </h3>
            <div className="space-y-1">
              <InfoItem
                label="ชื่อ-นามสกุล"
                value={job.customerName || "ไม่ระบุ"}
              />
              <InfoItem
                label="เบอร์โทรศัพท์"
                value={job.customerPhone || "ไม่ระบุ"}
              />
              <InfoItem
                label="ที่อยู่"
                value={job.customerAddress || "ไม่ระบุ"}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
