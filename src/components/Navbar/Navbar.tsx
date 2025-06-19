import React from 'react';
import Logo from '@/assets/Logo.svg';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '../ui/dropdown-menu';
import { Button } from '../ui/button';
import { FaRegCircleUser } from "react-icons/fa6";
import { CiGlobe } from "react-icons/ci";
import { IoIosArrowDown } from "react-icons/io";
import { NavbarProps } from './types';

const Navbar: React.FC<NavbarProps> = ({ className, onUserButtonClick }) => {
    const handleUserClick = () => {
        if (onUserButtonClick) {
            onUserButtonClick();
        }
    };

    return (
        <nav className={`flex justify-between items-center w-full py-4 ${className || ''}`}>
            <div>
                <img src={Logo} alt="Company Logo" className="h-8" />
            </div>

            <div>
                <ul className="flex items-center gap-6 text-[14px] leading-5 font-medium">
                    <li>
                        <a href="#" className="hover:text-blue-600 transition-colors">
                            Menu 1
                        </a>
                    </li>
                    <li>
                        <a href="#" className="hover:text-blue-600 transition-colors">
                            Menu 2
                        </a>
                    </li>
                    <li>
                        <a href="#" className="hover:text-blue-600 transition-colors">
                            Menu 3
                        </a>
                    </li>
                    <li>
                        <a href="#" className="hover:text-blue-600 transition-colors">
                            Menu 4
                        </a>
                    </li>
                </ul>
            </div>

            <div className="flex items-center gap-3">
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button
                            variant="ghost"
                            className="flex items-center gap-1 focus:outline-none hover:bg-gray-100"
                        >
                            <CiGlobe className="w-5 h-5" />
                            <span className="font-medium text-[16px]">English</span>
                            <IoIosArrowDown className="w-4 h-4" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuItem>English</DropdownMenuItem>
                        <DropdownMenuItem>Русский</DropdownMenuItem>
                        <DropdownMenuItem>O'zbekcha</DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>

                <Button
                    onClick={handleUserClick}
                    variant="outline"
                    className="rounded-[10px] border border-[#DFDFDF] py-[14px] px-[40px] flex items-center gap-3 hover:bg-gray-50 transition-colors"
                >
                    <FaRegCircleUser className="w-5 h-5" />
                    <span className='font-medium text-[16px]'>Alex</span>
                </Button>
            </div>
        </nav>
    );
};

export default Navbar;