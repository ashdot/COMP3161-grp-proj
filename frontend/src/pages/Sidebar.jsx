// import React from 'react';
// // 1. IMPORT VECTOR COMPONENTS FROM LUCIDE
// import { User, Calendar, Search, Settings, LogOut } from 'lucide-react';

// const Sidebar = ({ activeTab, setActiveTab }) => {
//   // 2. FIXED: Rearranged array order so Settings sits directly above Logout
//   const navItems = [
//     { name: 'My Courses', icon: User },
//     { name: 'Calendar', icon: Calendar },
//     { name: 'Course Search', icon: Search },
//     { name: 'Settings', icon: Settings }, // Renders 4th
//     { name: 'Logout', icon: LogOut }      // Renders last at the absolute bottom
//   ];

//   return (
//     <div
//       style={{
//         width: '72px',              
//         backgroundColor: '#4F46E5', 
//         padding: '24px 0',
//         display: 'flex',
//         flexDirection: 'column',
//         alignItems: 'center',       
//         gap: '20px',
//         fontFamily: 'Arial, sans-serif',
//         minHeight: '100vh',         
//         boxSizing: 'border-box'
//       }}
//     >
//       {/* ========================================================
//           PREMIUM VECTOR LOGO EMBED (STUDEX)
//          ======================================================== */}
//       <div
//         title="STUDEX Architecture" 
//         style={{
//           display: 'flex',
//           alignItems: 'center',
//           justifyContent: 'center',
//           width: '46px',
//           height: '46px',
//           backgroundColor: '#ffffff', 
//           borderRadius: '14px',       
//           marginBottom: '16px',       
//           boxShadow: '0 4px 12px rgba(0, 0, 0, 0.12)',
//           cursor: 'pointer',
//           transition: 'transform 0.2s ease'
//         }}
//         onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
//         onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
//       >
//         <svg 
//           width="28" 
//           height="28" 
//           viewBox="0 0 24 24" 
//           fill="none" 
//           stroke="#4F46E5" 
//           strokeWidth="2.5" 
//           strokeLinecap="round" 
//           strokeLinejoin="round"
//         >
//           <path d="M12 2L2 7l10 5 10-5-10-5z" fill="rgba(79, 70, 229, 0.1)" />
//           <path d="M6 10v4c0 3.3 2.7 6 6 6s6-2.7 6-6v-4" />
//         </svg>
//       </div>

//       {/* Dynamic Navigation Icons */}
//       {navItems.map((item) => {
//         const isActive = activeTab === item.name;
        
//         // FIXED: Checks for 'Settings' to apply the auto-margin push gap spacing
//         const isSettings = item.name === 'Settings';
        
//         // 3. RENDER ASSIGNED LUCIDE COMPONENT VARIABLE DYNAMICALLY
//         const IconComponent = item.icon;

//         return (
//           <div
//             key={item.name}
//             onClick={() => setActiveTab(item.name)}
//             title={item.name} 
//             style={{
//               display: 'flex',
//               alignItems: 'center',
//               justifyContent: 'center',
//               width: '44px',
//               height: '44px',
//               borderRadius: '12px',
//               cursor: 'pointer',
//               backgroundColor: isActive ? 'rgba(255, 255, 255, 0.15)' : 'transparent', 
              
//               // FIXED: Pushes 'Settings' AND 'Logout' down together as a unified block
//               marginTop: isSettings ? 'auto' : '0', 
              
//               transition: 'all 0.2s ease'
//             }}
//             onMouseEnter={(e) => {
//               if (!isActive) e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.08)';
//             }}
//             onMouseLeave={(e) => {
//               if (!isActive) e.currentTarget.style.backgroundColor = 'transparent';
//             }}
//           >
//             <IconComponent 
//               size={20} 
//               strokeWidth={isActive ? 2.5 : 2} 
//               color="#ffffff" 
//               style={{ opacity: isActive ? 1 : 0.7 }}
//             />
//           </div>
//         );
//       })}
//     </div>
//   );
// };

// export default Sidebar;

// 3am

import React from "react";
import {
  BookOpen, Calendar, Search, Settings, LogOut,
  LayoutDashboard, Users, BarChart2, GraduationCap, FileText
} from "lucide-react";
import { logout, getStoredUser } from "@/api";
import { useNavigate } from "react-router-dom";

const NAV = {
  student: [
    { name: "My Courses",    icon: BookOpen },
    { name: "Calendar",      icon: Calendar },
    { name: "Course Search", icon: Search },
    { name: "Settings",      icon: Settings },
  ],
  lecturer: [
    { name: "My Courses",    icon: BookOpen },
    { name: "Calendar",      icon: Calendar },
    { name: "Settings",      icon: Settings },
  ],
  admin: [
    { name: "Dashboard",     icon: LayoutDashboard },
    { name: "Courses",       icon: BookOpen },
    { name: "Users",         icon: Users },
    { name: "Reports",       icon: BarChart2 },
    { name: "Settings",      icon: Settings },
  ],
};

export default function Sidebar({ activeTab, setActiveTab }) {
  const navigate = useNavigate();
  const user = getStoredUser();
  const role = user?.accessLvl || "student";
  const items = NAV[role] || NAV.student;

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="flex w-[72px] shrink-0 flex-col items-center bg-indigo-600 py-6 min-h-screen">
      {/* Logo */}
      <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-[14px] bg-white shadow-md">
        <GraduationCap size={24} className="text-indigo-600" />
      </div>

      {/* Nav items */}
      <div className="flex flex-1 flex-col items-center gap-2">
        {items.map((item) => {
          const Icon = item.icon;
          const active = activeTab === item.name;
          return (
            <button
              key={item.name}
              title={item.name}
              onClick={() => setActiveTab(item.name)}
              className={`flex h-11 w-11 items-center justify-center rounded-xl transition-all ${
                active
                  ? "bg-white/20"
                  : "hover:bg-white/10"
              }`}
            >
              <Icon size={20} color="#fff" opacity={active ? 1 : 0.7} strokeWidth={active ? 2.5 : 2} />
            </button>
          );
        })}
      </div>

      {/* Logout */}
      <button
        title="Logout"
        onClick={handleLogout}
        className="flex h-11 w-11 items-center justify-center rounded-xl hover:bg-white/10 transition-all"
      >
        <LogOut size={20} color="#fff" opacity={0.7} />
      </button>
    </div>
  );
}