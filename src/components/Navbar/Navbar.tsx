import React, { useState, useEffect } from 'react';
import Logo from '@/assets/Logo.svg';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, DropdownMenuSeparator } from '../ui/dropdown-menu';
import { Button } from '../ui/button';
import { FaUser, FaHeart, FaCog, FaSignOutAlt } from "react-icons/fa";
import { CiGlobe } from "react-icons/ci";
import { IoIosArrowDown } from "react-icons/io";
import { HiMenu } from "react-icons/hi";
import { NavbarProps } from './types';
import { useNavigate } from 'react-router-dom';
import { logOut, getProfile, switchRole } from '@/services/authService';
import { User } from 'lucide-react';

const Navbar: React.FC<NavbarProps> = ({ className, onUserButtonClick }) => {
    const [userAvatar, setUserAvatar] = useState<string>('');
    const [userInitials, setUserInitials] = useState<string>('');
    const [userName, setUserName] = useState<string>('');
    const [userRole, setUserRole] = useState<'host' | 'guest'>('guest');

    const navigate = useNavigate();

    useEffect(() => {
        const loadUserProfile = async () => {
            if (localStorage.getItem('firstName')) {
                try {
                    const profileResponse = await getProfile();
                    const userProfile = profileResponse?.user;

                    if (userProfile) {
                        const profile = userProfile.profile || {};
                        setUserAvatar(profile.avatar_url || '');

                        const role = userProfile.role || 'guest';
                        setUserRole(role);

                        const firstName = profile.first_name || localStorage.getItem('firstName') || '';
                        const lastName = profile.last_name || '';
                        const initials = `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase();
                        setUserInitials(initials);
                        setUserName(firstName);
                    }
                } catch (error) {
                    console.error('Ошибка при загрузке профиля:', error);
                    const firstName = localStorage.getItem('firstName') || '';
                    setUserInitials(firstName.charAt(0).toUpperCase());
                    setUserName(firstName);
                }
            }
        };

        loadUserProfile();
    }, []);

    const handleUserClick = () => {
        if (onUserButtonClick) {
            onUserButtonClick();
        }
    };

    const renderUserAvatar = () => {
        if (userAvatar) {
            return (
                <div className="relative">
                    <img
                        src={userAvatar}
                        alt="User Avatar"
                        className="w-8 h-8 rounded-full object-cover border-2 border-white shadow-sm"
                    />
                    <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></div>
                </div>
            );
        } else if (userInitials) {
            return (
                <div className="relative">
                    <div className="w-8 h-8 bg-gradient-to-br from-rose-400 via-pink-500 to-purple-600 rounded-full flex items-center justify-center text-white text-sm font-semibold shadow-lg ring-2 ring-white">
                        {userInitials}
                    </div>
                    <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></div>
                </div>
            );
        } else {
            return (
                <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
                    <User className="w-5 h-5 text-gray-600" />
                </div>
            );
        }
    };

    return (
        <nav className={`flex justify-between items-center w-full py-4 px-6 bg-white border-b border-gray-100 ${className || ''}`}>
            {/* Logo */}
            <div className="flex-shrink-0">
                <img onClick={() => navigate("/")} src={Logo} alt="Company Logo" className="h-8 cursor-pointer" />
            </div>

            {/* Navigation Menu */}
            <div className="hidden md:block">
                {userRole === 'host' ? (
                    <ul className="flex items-center gap-8 text-sm font-medium text-gray-700">
                        <li>
                            <button
                                onClick={() => navigate("/host/dashboard")}
                                className="hover:text-gray-900 transition-colors duration-200 py-2 border-b-2 border-transparent hover:border-gray-300"
                            >
                                Панель управления
                            </button>
                        </li>
                        <li>
                            <button
                                onClick={() => navigate("/host/calendar")}
                                className="hover:text-gray-900 transition-colors duration-200 py-2 border-b-2 border-transparent hover:border-gray-300"
                            >
                                Календарь
                            </button>
                        </li>
                        <li>
                            <button
                                onClick={() => navigate("/host/listings")}
                                className="hover:text-gray-900 transition-colors duration-200 py-2 border-b-2 border-transparent hover:border-gray-300"
                            >
                                Мои объявления
                            </button>
                        </li>
                        <li>
                            <button
                                onClick={() => navigate("/host/messages")}
                                className="hover:text-gray-900 transition-colors duration-200 py-2 border-b-2 border-transparent hover:border-gray-300"
                            >
                                Сообщения
                            </button>
                        </li>
                    </ul>
                ) : (
                    <ul className="flex items-center gap-8 text-sm font-medium text-gray-700">
                        <li>
                            <button
                                onClick={() => navigate("/search")}
                                className="hover:text-gray-900 transition-colors duration-200 py-2 border-b-2 border-transparent hover:border-gray-300"
                            >
                                Жильё
                            </button>
                        </li>
                        <li>
                            <button
                                onClick={() => navigate("/experiences")}
                                className="hover:text-gray-900 transition-colors duration-200 py-2 border-b-2 border-transparent hover:border-gray-300"
                            >
                                Впечатления
                            </button>
                        </li>
                        <li>
                            <button
                                onClick={() => navigate("/online-experiences")}
                                className="hover:text-gray-900 transition-colors duration-200 py-2 border-b-2 border-transparent hover:border-gray-300"
                            >
                                Онлайн-впечатления
                            </button>
                        </li>
                    </ul>
                )}
            </div>


            <div className="flex items-center gap-3">
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button
                            variant="ghost"
                            className="flex items-center gap-2 px-3 py-2 rounded-full hover:bg-gray-50 transition-all duration-200 text-sm font-medium text-gray-700"
                        >
                            <CiGlobe className="w-4 h-4" />
                            <span className="hidden sm:inline">EN</span>
                            <IoIosArrowDown className="w-3 h-3" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent
                        align="end"
                        className="w-48 mt-2 bg-white rounded-xl shadow-lg border border-gray-200 py-2"
                    >
                        <DropdownMenuItem className="px-4 py-2 hover:bg-gray-50 cursor-pointer text-sm">
                            English
                        </DropdownMenuItem>
                        <DropdownMenuItem className="px-4 py-2 hover:bg-gray-50 cursor-pointer text-sm">
                            Русский
                        </DropdownMenuItem>
                        <DropdownMenuItem className="px-4 py-2 hover:bg-gray-50 cursor-pointer text-sm">
                            O'zbekcha
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>

                {/* User Menu */}
                {localStorage.getItem('firstName') ? (
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button
                                variant="ghost"
                                className="flex items-center gap-3 px-2 py-1.5 rounded-full border border-gray-300 hover:shadow-md transition-all duration-200 bg-white"
                            >
                                <HiMenu className="w-4 h-4 text-gray-600" />
                                {renderUserAvatar()}
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent
                            align="end"
                            className="w-60 mt-2 bg-white rounded-xl shadow-xl border border-gray-200 py-2"
                        >
                            <div className="px-4 py-3">
                                <div className="flex items-center gap-3">
                                    {renderUserAvatar()}
                                    <div>
                                        <p className="font-semibold text-gray-900">{userName}</p>
                                    </div>
                                </div>
                            </div>
                            <DropdownMenuSeparator className="my-1" />
                            <DropdownMenuItem
                                onClick={() => navigate("/profile")}
                                className="px-4 py-3 hover:bg-gray-50 cursor-pointer flex items-center gap-3"
                            >
                                <FaUser className="w-4 h-4 text-gray-500" />
                                <span className="text-sm">Профиль</span>
                            </DropdownMenuItem>
                            <DropdownMenuItem className="px-4 py-3 hover:bg-gray-50 cursor-pointer flex items-center gap-3">
                                <FaHeart className="w-4 h-4 text-gray-500" />
                                <span className="text-sm">Избранное</span>
                            </DropdownMenuItem>
                            <DropdownMenuItem
                                onClick={async () => {
                                    const newRole = userRole === 'host' ? 'guest' : 'host';
                                    try {
                                        await switchRole(newRole);
                                        window.location.reload();
                                    } catch (e) {
                                        console.error('Ошибка при смене роли:', e.message);
                                    }
                                }}
                                className="px-4 py-3 hover:bg-gray-50 cursor-pointer flex items-center gap-3"
                            >
                                <FaHeart className="w-4 h-4 text-gray-500" />
                                <span className="text-sm">
                                    Сменить на {userRole === 'host' ? 'guest' : 'host'}
                                </span>
                            </DropdownMenuItem>

                            {/* <DropdownMenuItem className="px-4 py-3 hover:bg-gray-50 cursor-pointer flex items-center gap-3">
                                <FaCog className="w-4 h-4 text-gray-500" />
                                <span className="text-sm">Настройки</span>
                            </DropdownMenuItem> */}
                            <DropdownMenuSeparator className="my-1" />
                            <DropdownMenuItem
                                onClick={async () => {
                                    try {
                                        await logOut();
                                    } catch (e) {
                                        console.warn("Ошибка при логауте, продолжаем локально.");
                                    } finally {
                                        localStorage.removeItem('token');
                                        localStorage.removeItem('firstName');
                                        window.location.href = '/';
                                    }
                                }}
                                className="px-4 py-3 hover:bg-gray-50 cursor-pointer flex items-center gap-3 text-red-600"
                            >
                                <FaSignOutAlt className="w-4 h-4" />
                                <span className="text-sm">Выйти</span>
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                ) : (
                    <Button
                        onClick={handleUserClick}
                        variant="ghost"
                        className="flex items-center gap-3 px-2 py-1.5 rounded-full border border-gray-300 hover:shadow-md transition-all duration-200 bg-white"
                    >
                        <HiMenu className="w-4 h-4 text-gray-600" />
                        <div className="w-8 h-8 bg-gray-500 rounded-full flex items-center justify-center">
                            <User className="w-5 h-5 text-white" />
                        </div>
                    </Button>
                )}
            </div>
        </nav>
    );
};

export default Navbar;