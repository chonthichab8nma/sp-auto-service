import { useNavigate } from "react-router";
import { Search, ChevronDown, MoreVertical, ArrowUpDown } from "lucide-react";
import { type Job } from "../Type";

export default function Dashboard({ jobs }: { jobs: Job[] }) {
  const navigate = useNavigate();

  const getStatusStyle = (job: Job) => {
    if (job.isFinished) return "bg-green-100 text-green-700";
    if (job.currentStageIndex === 0) return "bg-blue-100 text-blue-700";
    if (job.currentStageIndex === 1) return "bg-orange-100 text-orange-700";
    return "bg-yellow-100 text-yellow-700";
  };

  return (
    <div className="bg-white min-h-screen p-6">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-slate-800 mb-1">สเตชั่น</h1>
        <p className="text-slate-500 text-sm">ระบุรายละเอียดการรับรถใหม่</p>
      </div>

      <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-6">
        <div className="relative w-full md:w-96">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-4 w-4 text-slate-400" />
          </div>
          <input
            type="text"
            className="block w-full pl-10 pr-3 py-2 border border-slate-200 rounded-lg leading-5 bg-white placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-blue-500 sm:text-sm"
            placeholder="ค้นหาทะเบียนรถ / เลขตัวถัง"
          />
        </div>

        <div className="flex gap-3 w-full md:w-auto">
          <button className="flex items-center justify-between px-4 py-2 border border-slate-200 rounded-lg text-sm text-slate-600 bg-white hover:bg-slate-50 min-w-35">
            <span>ประเภทรถ</span>
            <ChevronDown className="h-4 w-4 text-slate-400" />
          </button>
          <button className="flex items-center justify-between px-4 py-2 border border-slate-200 rounded-lg text-sm text-slate-600 bg-white hover:bg-slate-50 min-w-35">
            <span>สถานะ</span>
            <ChevronDown className="h-4 w-4 text-slate-400" />
          </button>
        </div>
      </div>

      <div className="overflow-x-auto rounded-lg border border-slate-200">
        <table className="min-w-full divide-y divide-slate-200">
          <thead className="bg-slate-50">
            <tr>
              <th
                scope="col"
                className="px-6 py-4 text-left text-sm font-medium text-slate-500 uppercase tracking-wider"
              >
                <div className="flex items-center gap-2 cursor-pointer">
                  ทะเบียนรถ <ArrowUpDown className="h-3 w-3" />
                </div>
              </th>
              <th
                scope="col"
                className="px-6 py-4 text-left text-sm font-medium text-slate-500 uppercase tracking-wider"
              >
                <div className="flex items-center gap-2 cursor-pointer">
                  ชื่อ-นามสกุล <ArrowUpDown className="h-3 w-3" />
                </div>
              </th>
              <th
                scope="col"
                className="px-6 py-4 text-left text-sm font-medium text-slate-500 uppercase tracking-wider"
              >
                เบอร์โทรศัพท์
              </th>
              <th
                scope="col"
                className="px-6 py-4 text-left text-sm font-medium text-slate-500 uppercase tracking-wider"
              >
                ประเภทรถ
              </th>
              <th
                scope="col"
                className="px-6 py-4 text-left text-sm font-medium text-slate-500 uppercase tracking-wider"
              >
                สถานะ
              </th>
              <th
                scope="col"
                className="px-6 py-4 text-left text-sm font-medium text-slate-500 uppercase tracking-wider"
              >
                <div className="flex items-center gap-2 cursor-pointer">
                  วันที่เข้าจอดซ่อม <ArrowUpDown className="h-3 w-3" />
                </div>
              </th>
              <th
                scope="col"
                className="px-6 py-4 text-left text-sm font-medium text-slate-500 uppercase tracking-wider"
              >
                <div className="flex items-center gap-2 cursor-pointer">
                  วันที่นัดรับรถ <ArrowUpDown className="h-3 w-3" />
                </div>
              </th>
              <th scope="col" className="relative px-6 py-3">
                <span className="sr-only">Edit</span>
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-slate-200">
            {jobs.length === 0 ? (
              <tr>
                <td
                  colSpan={8}
                  className="px-6 py-12 text-center text-slate-400"
                >
                  ไม่มีรายการรถในระบบ
                </td>
              </tr>
            ) : (
              jobs.map((job) => (
                <tr
                  key={job.id}
                  className="hover:bg-slate-50 transition-colors cursor-pointer"
                  onClick={() => navigate(`/job/${job.id}`)}
                >
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-slate-900">
                    {job.registration}
                  </td>

                  <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-900">
                    {job.customerName || "ไม่ระบุชื่อ"}
                  </td>

                  <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500">
                    {job.customerPhone || "-"}
                  </td>

                  <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-900">
                    {job.brand} {job.model}
                  </td>

                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <span
                      className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusStyle(
                        job
                      )}`}
                    >
                      {job.isFinished
                        ? "จบงานแล้ว"
                        : job.stages[job.currentStageIndex]?.name ||
                          "รอดำเนินการ"}
                    </span>
                  </td>

                  <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-900">
                    {new Date(job.startDate).toLocaleDateString("th-TH")}
                  </td>

                  <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-900">
                    {job.estimatedEndDate
                      ? new Date(job.estimatedEndDate).toLocaleDateString(
                          "th-TH"
                        )
                      : "-"}
                  </td>

                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button className="text-slate-400 hover:text-slate-600">
                      <MoreVertical className="h-5 w-5" />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
