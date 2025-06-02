"use client";

import Link from 'next/link';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation'; // For redirecting after logout
import { Home, PlusCircle, QrCode, Share2, Settings, LogOut } from 'lucide-react'; // Using lucide-react icons

export default function Navbar() {
  const { logout } = useAuth();
  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.push('/login'); // Redirect to login page after logout
  };

  const navItems = [
    { href: '/dashboard', label: 'Dashboard', icon: Home },
    { href: '/add-link', label: 'Add Link', icon: PlusCircle },
    { href: '/scan-qr', label: 'Scan QR', icon: QrCode },
    { href: '/share', label: 'Share', icon: Share2 },
    { href: '/settings', label: 'Settings', icon: Settings },
  ];

  return (
    <nav className="bg-gray-800 text-white w-64 min-h-screen p-4 flex flex-col justify-between">
      <div>
        <div className="text-2xl font-bold mb-10 ml-2">LinkQR</div>
        <ul>
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <li key={item.href} className="mb-2">
                <Link href={item.href} className="flex items-center p-2 hover:bg-gray-700 rounded-md transition-colors">
                  <Icon size={20} className="mr-3" />
                  {item.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
      <div>
        <button
          onClick={handleLogout}
          className="flex items-center w-full p-2 bg-red-600 hover:bg-red-700 rounded-md transition-colors text-left"
        >
          <LogOut size={20} className="mr-3" />
          Logout
        </button>
      </div>
    </nav>
  );
}
