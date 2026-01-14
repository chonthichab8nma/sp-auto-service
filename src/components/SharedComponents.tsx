// import React, { useState } from "react";
// import type {Job } from "../Type";

// interface FormInputProps {
//   label: string;
//   value: string | number;
//   onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
//   name?: string;
//   type?: string;
//   disabled?: boolean;
// }

// export const FormInput = ({
//   label,
//   value,
//   onChange,
//   name,
//   type = "text",
//   disabled = false,
// }: FormInputProps) => (
//   <div className="flex flex-col gap-1.5 mb-3">
//     <label className="text-sm text-slate-500 font-light">{label}</label>
//     <input
//       type={type}
//       name={name}
//       value={value}
//       onChange={onChange}
//       disabled={disabled}
//       placeholder="พิมพ์ทะเบียนรถ หรือ เลขตัวถัง..."
//       className="border border-slate-200 rounded-lg px-3 py-2 text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white disabled:bg-slate-50 transition-all"
//     />
//   </div>
// );

// export const SearchCarList = () => {
//   const [searchTerm, setSearchTerm] = useState<string>("");

//   const filteredData = MOCK_CARS.filter((item) => {
//     const query = searchTerm.toLowerCase().replace(/\s+/g, "");

//     const plate = item.plate.toLowerCase().replace(/\s+/g, "");
//     const chassis = item.chassis.toLowerCase();

//     return plate.includes(query) || chassis.includes(query);
//   });

//   return (
//     <div className="max-w-md mx-auto p-6 bg-slate-50 min-h-screen rounded-xl">
//       <h2 className="text-xl font-bold text-slate-800 mb-4">ค้นหาข้อมูลรถ</h2>

//       <FormInput
//         label="ทะเบียนรถ / เลขตัวถัง"
//         value={searchTerm}
//         onChange={(e) => setSearchTerm(e.target.value)}
//       />

//       <div className="mt-4 flex flex-col gap-2">
//         {filteredData.length > 0 ? (
//           filteredData.map((item) => (
//             <div
//               key={item.id}
//               className="p-3 bg-white border border-slate-200 rounded-lg shadow-sm hover:border-blue-300 transition-colors cursor-pointer group"
//             >
//               <div className="flex justify-between items-start">
//                 <div>
//                   <p className="text-slate-900 font-bold text-lg">
//                     {item.plate}
//                   </p>
//                   <p className="text-slate-500 text-sm">{item.brand}</p>
//                 </div>
//                 <span className="text-xs bg-slate-100 text-slate-500 px-2 py-1 rounded font-mono">
//                   {item.chassis}
//                 </span>
//               </div>
//             </div>
//           ))
//         ) : (
//           <div className="text-center py-8 text-slate-400 bg-white rounded-lg border border-dashed border-slate-200">
//             ไม่พบข้อมูลที่ตรงกับ "{searchTerm}"
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default SearchCarList;
