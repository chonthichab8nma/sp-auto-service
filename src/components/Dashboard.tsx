import { useNavigate } from "react-router";
import { useState, useMemo, useRef, useEffect } from "react";
import {
  ArrowUpDown,
  Calendar,
  Car,
  CheckCircle2,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  FileText,
  MoreVertical,
  Receipt,
  Search,
  Wrench,
  Check,
} from "lucide-react";
import { type Job } from "../Type";
import { filterData } from "../hook/useSearch";
import { CAR_TYPES } from "../data";

export default function Dashboard({ jobs }: { jobs: Job[] }) {
  const navigate = useNavigate();

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCarType, setSelectedCarType] = useState("ทั้งหมด");
  const [isTypeDropdownOpen, setIsTypeDropdownOpen] = useState(false);

  const displayJobs = useMemo(() => {
    let data = filterData(jobs, searchTerm);

    if (selectedCarType !== "ทั้งหมด") {
      data = data.filter((job) => job.type === selectedCarType);
    }

    return data;
  }, [jobs, searchTerm, selectedCarType]);

  const handleSearchAction = () => {
    console.log("User submitted search:", searchTerm);
    if (document.activeElement instanceof HTMLElement) {
      document.activeElement.blur();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearchAction();
    }
  };

  const dropdownRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsTypeDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const getStatusStyle = (job: Job) => {
    if (job.isFinished) {
      return {
        label: "เสร็จสิ้น",
        className: "bg-emerald-50 text-emerald-600",
      };
    }
    if (job.currentStageIndex === 0) {
      return { label: "เคลม", className: "bg-blue-50 text-blue-600" };
    }
    if (job.currentStageIndex === 1) {
      return { label: "ซ่อม", className: "bg-orange-50 text-orange-600" };
    }
    return { label: "ตั้งเบิก", className: "bg-amber-50 text-amber-600" };
  };

  const totalJobs = jobs.length;
  const claimJobs = jobs.filter(
    (j) => !j.isFinished && j.currentStageIndex === 0
  ).length;
  const repairJobs = jobs.filter(
    (j) => !j.isFinished && j.currentStageIndex === 1
  ).length;
  const billingJobs = jobs.filter(
    (j) => !j.isFinished && j.currentStageIndex === 2
  ).length;
  const finishedJobs = jobs.filter((j) => j.isFinished).length;

  const summaryCards = [
    {
      label: "รถทั้งหมด",
      value: totalJobs,
      icon: Car,
      bg: "bg-blue-50",
      border: "border-blue-100",
      iconColor: "text-blue-600",
    },
    {
      label: "ขั้นตอนเคลม",
      value: claimJobs,
      icon: FileText,
      bg: "bg-rose-50",
      border: "border-rose-100",
      iconColor: "text-rose-500",
    },
    {
      label: "ขั้นตอนซ่อม",
      value: repairJobs,
      icon: Wrench,
      bg: "bg-orange-50",
      border: "border-orange-100",
      iconColor: "text-orange-500",
    },
    {
      label: "ขั้นตอนตั้งเบิก",
      value: billingJobs,
      icon: Receipt,
      bg: "bg-amber-50",
      border: "border-amber-100",
      iconColor: "text-amber-500",
    },
    {
      label: "รถที่เสร็จสิ้น",
      value: finishedJobs,
      icon: CheckCircle2,
      bg: "bg-emerald-50",
      border: "border-emerald-100",
      iconColor: "text-emerald-600",
    },
  ];

  return (
    <div className="flex flex-col gap-5 p-2">
      <section className="bg-white rounded-2xl shadow-sm border border-gray-100 px-8 py-6">
        <h1 className="text-[22px] font-semibold text-slate-800">แดชบอร์ด</h1>
      </section>

      <section className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 flex flex-col gap-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-end">
          <div className="lg:col-span-3">
            <label className="text-sm font-semibold text-slate-700 block mb-2">
              ค้นหา
            </label>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
              <input
                type="text"
                className="w-full pl-10 pr-4 py-2.5 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all"
                placeholder="ค้นหาทะเบียนรถ / ชื่อลูกค้า"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onKeyDown={handleKeyDown}
              />
            </div>
          </div>

          <div className="lg:col-span-3 relative" ref={dropdownRef}>
            <label className="text-sm font-semibold text-slate-700 block mb-2">
              ประเภทรถ
            </label>
            <button
              onClick={() => setIsTypeDropdownOpen(!isTypeDropdownOpen)}
              className={`w-full flex items-center justify-between border rounded-xl px-4 py-2.5 text-sm transition-colors ${
                isTypeDropdownOpen
                  ? "border-blue-500 bg-blue-50/50 text-blue-700"
                  : "border-slate-200 bg-white text-slate-600 hover:bg-slate-50"
              }`}
            >
              <span>{selectedCarType}</span>
              <ChevronDown
                className={`h-4 w-4 text-slate-400 transition-transform duration-200 ${
                  isTypeDropdownOpen ? "rotate-180" : ""
                }`}
              />
            </button>

            {isTypeDropdownOpen && (
              <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-slate-100 rounded-xl shadow-lg z-50 overflow-hidden py-1 animate-in fade-in zoom-in-95 duration-200">
                <button
                  onClick={() => {
                    setSelectedCarType("ทั้งหมด");
                    setIsTypeDropdownOpen(false);
                  }}
                  className="w-full px-4 py-2.5 text-left text-sm hover:bg-slate-50 text-slate-600 flex items-center justify-between"
                >
                  <span>ทั้งหมด</span>
                  {selectedCarType === "ทั้งหมด" && (
                    <Check className="h-4 w-4 text-blue-600" />
                  )}
                </button>
                {CAR_TYPES.map((type) => (
                  <button
                    key={type}
                    onClick={() => {
                      setSelectedCarType(type);
                      setIsTypeDropdownOpen(false);
                    }}
                    className="w-full px-4 py-2.5 text-left text-sm hover:bg-slate-50 text-slate-600 flex items-center justify-between"
                  >
                    <span>{type}</span>
                    {selectedCarType === type && (
                      <Check className="h-4 w-4 text-blue-600" />
                    )}
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="lg:col-span-4">
            <label className="text-sm font-semibold text-slate-700 block mb-2">
              เลือกวันที่
            </label>
            <button className="w-full flex items-center justify-between border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-600 bg-white hover:bg-slate-50 transition-colors">
              <span>10/10/2025 - 11/10/2025</span>
              <Calendar className="h-4 w-4 text-slate-400" />
            </button>
          </div>

          <div className="lg:col-span-2">
            <button
              onClick={handleSearchAction}
              className="w-full flex items-center justify-center gap-2 rounded-xl bg-[#435EBE] hover:bg-[#3950a3] text-white text-sm font-medium px-4 py-2.5 transition-all shadow-md shadow-blue-500/20"
            >
              <Search className="h-4 w-4" />
              ค้นหา
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 xl:grid-cols-5 gap-5">
          {summaryCards.map((card) => {
            const Icon = card.icon;
            return (
              <div
                key={card.label}
                className="flex items-center gap-4 border border-slate-100 rounded-2xl bg-white p-4 shadow-sm hover:shadow-md transition-shadow"
              >
                <div
                  className={`flex items-center justify-center rounded-xl ${card.bg} h-12 w-12 shrink-0`}
                >
                  <Icon className={`h-6 w-6 ${card.iconColor}`} />
                </div>
                <div className="min-w-0">
                  <p className="text-[13px] font-medium text-slate-500 truncate">
                    {card.label}
                  </p>
                  <p className="text-[20px] font-bold text-slate-800 leading-none mt-1">
                    {card.value}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
        
        <div>
          <h2 className="text-[17px] font-semibold text-slate-800 mb-5">
            รายการรถในอู่
          </h2>
          <div className="overflow-hidden border border-slate-100 rounded-2xl">
            <table className="min-w-full divide-y divide-slate-100">
              <thead className="bg-[#F9FAFB]">
                <tr>
                  {[
                    "ทะเบียนรถ",
                    "ชื่อ-นามสกุล",
                    "เบอร์โทรศัพท์",
                    "ประเภทรถ",
                    "สถานะ",
                    "วันที่นำรถเข้าจอดซ่อม",
                    "วันที่นัดรับรถ",
                  ].map((head, idx) => (
                    <th
                      key={head}
                      className={`px-5 py-4 text-left text-[13px] font-semibold text-slate-500 uppercase tracking-wider`}
                    >
                      <div className="flex items-center gap-1.5 cursor-pointer hover:text-slate-700 transition-colors">
                        {head}{" "}
                        {(idx === 0 || idx === 1 || idx === 5 || idx === 6) && (
                          <ArrowUpDown className="h-3.5 w-3.5" />
                        )}
                      </div>
                    </th>
                  ))}
                  <th className="px-5 py-4"></th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-slate-50">
                {displayJobs.length === 0 ? (
                  <tr>
                    <td
                      colSpan={8}
                      className="px-6 py-20 text-center text-slate-400 font-medium"
                    >
                      ไม่มีรายการรถในระบบ
                    </td>
                  </tr>
                ) : (
                  displayJobs.map((job) => {
                    const status = getStatusStyle(job);
                    return (
                      <tr
                        key={job.id}
                        className="hover:bg-slate-50/80 transition-colors cursor-pointer group"
                        onClick={() => navigate(`/job/${job.id}`)}
                      >
                        <td className="px-5 py-4 text-[14px] font-medium text-slate-700">
                          {job.registration}
                        </td>
                        <td className="px-5 py-4 text-[14px] text-slate-600">
                          {job.customerName || "-"}
                        </td>
                        <td className="px-5 py-4 text-[14px] text-slate-600">
                          {job.customerPhone || "-"}
                        </td>
                        <td className="px-5 py-4 text-[14px] text-slate-600">
                          {job.type || `${job.brand} ${job.model}`}
                        </td>
                        <td className="px-5 py-4">
                          <span
                            className={`inline-flex items-center px-3 py-1 rounded-full text-[12px] font-semibold ${status.className}`}
                          >
                            {status.label}
                          </span>
                        </td>
                        <td className="px-5 py-4 text-[14px] text-slate-600">
                          {new Date(job.startDate).toLocaleDateString("th-TH")}
                        </td>
                        <td className="px-5 py-4 text-[14px] text-slate-600">
                          {job.estimatedEndDate
                            ? new Date(job.estimatedEndDate).toLocaleDateString(
                                "th-TH"
                              )
                            : "-"}
                        </td>
                        <td className="px-5 py-4 text-right">
                          <button className="p-1.5 rounded-full text-slate-400 hover:bg-white hover:text-slate-600 transition-all border border-transparent hover:border-slate-100">
                            <MoreVertical className="h-4 w-4" />
                          </button>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </div>

        <div className="flex items-center justify-center gap-2 mt-4">
          <button className="p-2 text-slate-400 hover:text-slate-600 disabled:opacity-30">
            <ChevronsLeft size={18} />
          </button>
          <button className="p-2 text-slate-400 hover:text-slate-600 disabled:opacity-30">
            <ChevronLeft size={18} />
          </button>
          <div className="flex items-center gap-1.5 mx-2">
            {[1, 2, 3, 4, 5, "...", 16].map((p, i) => (
              <button
                key={i}
                className={`w-9 h-9 rounded-[10px] text-sm font-medium transition-all border ${
                  p === 2
                    ? "bg-[#F0F5FF] text-blue-600 border-blue-100"
                    : "bg-white text-slate-500 border-slate-100 hover:bg-slate-50"
                }`}
              >
                {p}
              </button>
            ))}
          </div>
          <button className="p-2 text-slate-400 hover:text-slate-600">
            <ChevronRight size={18} />
          </button>
          <button className="p-2 text-slate-400 hover:text-slate-600">
            <ChevronsRight size={18} />
          </button>
        </div>
      </section>
    </div>
  );
}
