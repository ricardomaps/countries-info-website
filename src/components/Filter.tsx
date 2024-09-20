"use client"
import { useState, useRef, useEffect } from "react";
import { useSearchParams, usePathname, useRouter } from "next/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons"

export default function Filter({ className }) {
    const options = ["Africa", "America", "Asia", "Europe", "Oceania"];
    const [isOpen, setIsOpen] = useState(false);
    const [selectedOption, setSelectedOption] = useState(null);
    const dropdownRef = useRef(null);

    const router = useRouter();
    const pathname = usePathname();
    const params = useSearchParams();

    const toggleDropdown = () => {
        setIsOpen((prev) => !prev);
    };

    const handleOptionClick = (option) => {
        const newParams = new URLSearchParams(params);
        newParams.set("region", option);
        router.replace(`${pathname}?${newParams.toString()}`)

        setSelectedOption(option);
        setIsOpen(false);
    };

    const handleClickOutside = (event) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
            setIsOpen(false);
        }
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <div ref={dropdownRef} className="w-56 relative inline-block shadow-md">
            <button 
                onClick={toggleDropdown} 
                className="w-full h-full bg-skin-card flex justify-between items-center text-skin-base text-sm px-6 py-4 rounded"
            >
                <span>{selectedOption || 'Filter by Region'}</span>
                <FontAwesomeIcon icon={faChevronDown}/>
            </button>
            {isOpen && (
                <div className="absolute left-0 mt-1 w-full bg-white border border-gray-300 rounded shadow-lg z-10">
                    {options.map((option, index) => (
                        <div 
                            key={index} 
                            className="px-4 py-2 hover:bg-blue-500 hover:text-white cursor-pointer"
                            onClick={() => handleOptionClick(option)}
                        >
                            {option}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};
