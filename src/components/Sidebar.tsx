import { PanelLeft, Folder, LogOut } from "lucide-react";
import { Link } from "react-router-dom";

interface SidebarProps {
  onLogout: () => void;
  activePath: string;
  isCollapsed: boolean;
  onToggle: () => void;
}

export default function Sidebar({
  onLogout,
  activePath,
  isCollapsed,
  onToggle,
}: SidebarProps) {
  return (
    <aside
      className={`bg-white border-r border-gray-200 flex flex-col h-screen transition-all duration-300 ease-in-out shrink-0 ${
        isCollapsed ? "w-20" : "w-64"
      }`}
    >
      <div
        className={`p-6 flex items-center ${
          isCollapsed ? "justify-center" : "justify-between"
        }`}
      >
        {!isCollapsed && (
          <div className="w-8 h-8 bg-black rounded flex items-center justify-center text-white font-bold italic text-sm">
            SP
          </div>
        )}
        <button
          onClick={onToggle}
          className="text-gray-400 hover:text-gray-600 transition-colors p-1"
        >
          <PanelLeft size={20} />
        </button>
      </div>

      <nav className="flex-1 px-4 space-y-1 overflow-x-hidden">
        <Link
          to="/create"
          className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors ${
            isCollapsed ? "justify-center" : ""
          } ${
            activePath === "/create"
              ? "text-blue-600 bg-blue-50 font-medium"
              : "text-gray-600 hover:bg-gray-50"
          }`}
        >
          <span className="text-xl leading-none">+</span>

          {!isCollapsed && (
            <span className="whitespace-nowrap">รับรถเข้าจอดซ่อม</span>
          )}
        </Link>

        <Link
          to="/"
          className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors ${
            isCollapsed ? "justify-center" : ""
          } ${
            activePath === "/"
              ? "text-blue-600 bg-blue-50 font-medium"
              : "text-gray-600 hover:bg-gray-50"
          }`}
        >
          <Folder size={18} />
          {!isCollapsed && <span className="whitespace-nowrap">แดชบอร์ด</span>}
        </Link>

        <Link
          to="/stations"
          className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors ${
            isCollapsed ? "justify-center" : ""
          } ${
            activePath === "/stations"
              ? "text-blue-600 bg-blue-50 font-medium"
              : "text-gray-600 hover:bg-gray-50"
          }`}
        >
          <Folder size={18} />
          {!isCollapsed && <span className="whitespace-nowrap">สเตชั่น</span>}
        </Link>
      </nav>

      <div className="p-4 border-t border-gray-100 mt-auto">
        <div
          className={`flex items-center gap-3 ${
            isCollapsed ? "justify-center" : ""
          }`}
        >
          <div className="w-10 h-10 rounded-full bg-gray-100 shrink-0 flex items-center justify-center text-gray-500 font-bold text-xs border border-gray-200">
            TT
          </div>

          {!isCollapsed && (
            <>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-bold text-gray-800 truncate">
                  Teach Tichan
                </p>
                <p className="text-[10px] text-gray-400 truncate uppercase tracking-wider">
                  superadmin
                </p>
              </div>
              <button
                onClick={onLogout}
                className="text-gray-400 hover:text-red-500 transition-colors"
              >
                <LogOut size={16} />
              </button>
            </>
          )}
        </div>

        {isCollapsed && (
          <button
            onClick={onLogout}
            className="w-full mt-4 flex justify-center text-gray-400 hover:text-red-500"
          >
            <LogOut size={16} />
          </button>
        )}
      </div>
    </aside>
  );
}
