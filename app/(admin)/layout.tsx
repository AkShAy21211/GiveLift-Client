"use client";
import React, { useState } from "react";
import {
  Menu,
  X,
  Home,
  Users,
  AlertCircle,
  LogOut,
  Shield,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { persistor, RootState } from "@/store/store";
import { useDispatch, useSelector } from "react-redux";
import { logoutAction } from "@/store/authSlice";
import { toast } from "sonner";
import { ROLES } from "@/lib/types";
import { logoutHandler } from "@/lib/api/auth";
import { useRouter } from 'next/navigation';

// Types
interface NavItem {
  name: string;
  href: string;
  icon: React.ReactNode;
  gradient: string;
}

interface AdminLayoutProps {
  children: React.ReactNode;
}

interface DesktopSidebarProps {
  navItems: NavItem[];
  currentPath: string;
  role: string;
  logout: () => void;
  onNavClick: (href: string) => void;
}

interface MobileSidebarContentProps extends DesktopSidebarProps {
  isOpen: boolean;
  role: string;
  onClose: () => void;
  logout: () => void;
}

// Desktop Sidebar Component
const DesktopSidebar: React.FC<DesktopSidebarProps> = ({
  navItems,
  currentPath,
  logout,
  onNavClick,
}) => (
  <div className="hidden lg:flex lg:flex-shrink-0">
    <div className="flex w-72 flex-col bg-gradient-to-b from-slate-900 to-slate-800 shadow-2xl">
      {/* Logo Section */}
      <div className="flex h-20 flex-shrink-0 items-center px-6 border-b border-slate-700">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center">
            <Shield className="h-6 w-6 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-white">Givelift</h1>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="flex flex-1 flex-col overflow-y-auto py-6">
        <nav className="flex-1 space-y-2 px-4">
          {navItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              onClick={() => onNavClick(item.href)}
              className={`group flex items-center rounded-xl px-4 py-3 text-sm font-medium transition-all duration-200 ${
                currentPath === item.href
                  ? `bg-gradient-to-r ${item.gradient} text-white shadow-lg transform scale-[1.02]`
                  : "text-slate-300 hover:bg-slate-700/50 hover:text-white hover:scale-[1.01]"
              }`}
            >
              <span className="mr-4 flex-shrink-0">{item.icon}</span>
              <span className="flex-1">{item.name}</span>
              {currentPath === item.href && (
                <div className="w-2 h-2 bg-white rounded-full opacity-80" />
              )}
            </Link>
          ))}
        </nav>

        {/* User Section */}
        <div className="px-4 pt-6 border-t border-slate-700">
          {/* <div className="flex items-center space-x-3 p-4 rounded-xl bg-slate-700/50 mb-4">
            <Avatar className="w-10 h-10">
              <AvatarFallback className="bg-gradient-to-br from-green-500 to-green-600 text-white font-medium text-sm">
                AU
              </AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <p className="text-sm font-medium text-white">Admin User</p>
              <p className="text-xs text-slate-400">System Administrator</p>
            </div>
            <ChevronDown className="h-4 w-4 text-slate-400" />
          </div> */}

          <Button
            onClick={logout}
            variant="ghost"
            className="w-full justify-start text-slate-300 hover:text-white hover:bg-red-500/20 transition-colors"
          >
            <LogOut className="mr-3 h-5 w-5" />
            Logout
          </Button>
        </div>
      </div>
    </div>
  </div>
);

// Mobile Sidebar Component
const MobileSidebar: React.FC<MobileSidebarContentProps> = ({
  isOpen,
  onClose,
  logout,
  navItems,
  currentPath,
  onNavClick,
}) => (
  <div
    className={`fixed inset-0 z-50 ${isOpen ? "block" : "hidden"} lg:hidden`}
  >
    <div className="fixed inset-0 bg-black/50" onClick={onClose} />
    <div className="fixed left-0 top-0 h-full w-72 bg-gradient-to-b from-slate-900 to-slate-800 shadow-2xl">
      {/* Logo Section */}
      <div className="flex h-20 items-center justify-between px-6 border-b border-slate-700">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center">
            <Shield className="h-6 w-6 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-white">Givelift</h1>
          </div>
        </div>
        <Button
          variant="ghost"
          size="icon"
          onClick={onClose}
          className="text-slate-400 hover:text-white"
        >
          <X className="h-6 w-6" />
        </Button>
      </div>

      {/* Navigation */}
      <div className="flex flex-1 flex-col overflow-y-auto py-6">
        <nav className="flex-1 space-y-2 px-4">
          {navItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              onClick={() => onNavClick(item.href)}
              className={`group flex items-center rounded-xl px-4 py-3 text-sm font-medium transition-all duration-200 ${
                currentPath === item.href
                  ? `bg-gradient-to-r ${item.gradient} text-white shadow-lg`
                  : "text-slate-300 hover:bg-slate-700/50 hover:text-white"
              }`}
            >
              <span className="mr-4 flex-shrink-0">{item.icon}</span>
              <span className="flex-1">{item.name}</span>
              {currentPath === item.href && (
                <div className="w-2 h-2 bg-white rounded-full opacity-80" />
              )}
            </Link>
          ))}
        </nav>

        {/* User Section */}
        <div className="px-4 pt-6 border-t border-slate-700">
          {/* <div className="flex items-center space-x-3 p-4 rounded-xl bg-slate-700/50 mb-4">
            <Avatar className="w-10 h-10">
              <AvatarFallback className="bg-gradient-to-br from-green-500 to-green-600 text-white font-medium text-sm">
                AU
              </AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <p className="text-sm font-medium text-white">Admin User</p>
              <p className="text-xs text-slate-400">System Administrator</p>
            </div>
          </div> */}

          <Button
            onClick={logout}
            variant="ghost"
            className="w-full justify-start text-slate-300 hover:text-white hover:bg-red-500/20 transition-colors"
          >
            <LogOut className="mr-3 h-5 w-5" />
            Logout
          </Button>
        </div>
      </div>
    </div>
  </div>
);

const AdminLayout: React.FC<AdminLayoutProps> = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(false);
  const [currentPath, setCurrentPath] = useState<string>("/admin");
  const dispatch = useDispatch();
  const router = useRouter();
  const role = useSelector((state: RootState) => state.auth?.role) || "";

  const handleLogout = async () => {
    try {
      await logoutHandler();

      dispatch(logoutAction());
      persistor.purge();
      localStorage.removeItem("auth");
      router.push("/login");
    } catch (error) {
      console.log(error);

      toast.error("Something went wrong");
    }
  };
  const state_coordinator_nav: NavItem[] = [
    {
      name: "Dashboard",
      href: "/state/dashboard",
      icon: <Home className="h-5 w-5" />,
      gradient: "from-blue-500 to-blue-600",
    },
    // {
    //   name: "Disasters",
    //   href: "/state/disasters",
    //   icon: <AlertCircle className="h-5 w-5" />,
    //   gradient: "from-red-500 to-red-600",
    // },
    {
      name: "District Coordinators",
      href: "/state/coordinators",
      icon: <Users className="h-5 w-5" />,
      gradient: "from-green-500 to-green-600",
    },
    // {
    //   name: "Users",
    //   href: "/admin/users",
    //   icon: <Users className="h-5 w-5" />,
    //   gradient: "from-green-500 to-green-600",
    // },
    // {
    //   name: "Settings",
    //   href: "/state/settings",
    //   icon: <Settings className="h-5 w-5" />,
    //   gradient: "from-purple-500 to-purple-600",
    // },
  ];

  const district_coordinator_nav: NavItem[] = [
    {
      name: "Dashboard",
      href: "/district/dashboard",
      icon: <Home className="h-5 w-5" />,
      gradient: "from-blue-500 to-blue-600",
    },
    {
      name: "Report Disaster",
      href: "/district/report-disaster",
      icon: <AlertCircle className="h-5 w-5" />,
      gradient: "from-red-500 to-red-600",
    },
    // {
    //   name: "Users",
    //   href: "/admin/users",
    //   icon: <Users className="h-5 w-5" />,
    //   gradient: "from-green-500 to-green-600",
    // },
    // {
    //   name: "Settings",
    //   href: "/state/settings",
    //   icon: <Settings className="h-5 w-5" />,
    //   gradient: "from-purple-500 to-purple-600",
    // },
  ];

  const navItems =
    role === ROLES.STATE_COORDINATOR
      ? state_coordinator_nav
      : district_coordinator_nav;
  const handleNavClick = (href: string): void => {
    setCurrentPath(href);
    setSidebarOpen(false);
  };

  return (
    <div className="flex h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Desktop Sidebar */}
      <DesktopSidebar
        role={role}
        logout={handleLogout}
        navItems={navItems}
        currentPath={currentPath}
        onNavClick={handleNavClick}
      />

      {/* Mobile Sidebar */}
      <MobileSidebar
        role={role}
        logout={handleLogout}
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        navItems={navItems}
        currentPath={currentPath}
        onNavClick={handleNavClick}
      />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Header */}
        <header className="sticky top-0 z-40 flex h-16 flex-shrink-0 items-center justify-between border-b border-slate-200 bg-white/80 backdrop-blur-md px-4 shadow-md lg:justify-end">
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden"
            onClick={() => setSidebarOpen(true)}
          >
            <Menu className="h-6 w-6" />
          </Button>

          {/* Header Actions */}
          <div className="flex items-center space-x-4">
            {/* <Button variant="ghost" size="icon">
              <Search className="h-5 w-5" />
            </Button>

            <Button variant="ghost" size="icon" className="relative">
              <Bell className="h-5 w-5" />
              <Badge
                variant="destructive"
                className="absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 flex items-center justify-center text-[10px]"
              >
                3
              </Badge>
            </Button> */}

            {/* <div className="flex items-center space-x-3 pl-4 border-l border-slate-200">
              <Avatar className="w-8 h-8">
                <AvatarFallback className="bg-gradient-to-br from-green-500 to-green-600 text-white font-medium text-sm">
                  AU
                </AvatarFallback>
              </Avatar>
              <div className="hidden sm:block text-right">
                <div className="text-sm font-medium text-slate-700">
                  Admin User
                </div>
                <div className="text-xs text-slate-500">
                  System Administrator
                </div>
              </div>
              <ChevronDown className="h-4 w-4 text-slate-400" />
            </div> */}
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto p-6">{children}</main>
      </div>
    </div>
  );
};

export default AdminLayout;
