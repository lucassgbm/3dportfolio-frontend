"use client";
import Image from "next/image";
import SearchIcon from "./icons/search";
import Menu from "./menu";
import MenuIcon from "./icons/menu";
import { useState } from "react";
import CloseIcon from "./icons/close";

export default function Header(){

    const [openMenu, setOpenMenu] = useState(false);

    return (
        <>
            <div className="relative h-[90vh] w-full bg-[url('/imgs/1234.jpg')] bg-cover bg-center">
                <div className="absolute inset-0 bg-gradient-to-b from-black/95 from-15% via-black/75 via-30% to-black/70">

                    <div className="flex flex-row text-zinc-200">
                        <nav className="hidden sm:grid grid-cols-3 w-full h-[90px] justify-between gap-2 p-6 items-center">

                            <h1 className="text-lg">3D Portfólio</h1>
                            <Menu />
                            <div className="flex justify-end">
                                <button className="cursor-pointer" onClick={() => {}}>
                                    <SearchIcon />

                                </button>

                            </div>
                        </nav>

                            <div className="sm:hidden w-full flex flex-col">

                                <nav className="flex flex-row h-[90px] justify-between gap-2 p-6 items-center">

                                    <h1 className="text-lg">3D Portfólio</h1>
                                    
                                    <div className="flex justify-end">
                                        {!openMenu && (
                                            
                                            <button className="cursor-pointer" onClick={() => setOpenMenu(true)}>
                                                <MenuIcon />

                                            </button>
                                        )}
                                        {openMenu && (
                                            <button className="cursor-pointer" onClick={() => setOpenMenu(false)}>
                                                <CloseIcon />

                                            </button>
                                        )}
                                    </div>
                                </nav>
                                {openMenu && (
                                    <div className="absolute top-[90px] w-full p-4 bg-zinc-950">
                                        <Menu />
                                    </div>
                                )}
                            </div>
                    </div>
                    <div className="w-full h-full flex flex-col text-zinc-200 items-center justify-center">
                        <a href="#projects" className="flex flex-row items-center justify-center w-[150px] p-5 bg-white/10 border border-white text-white text-sm transition duration-300 hover:bg-white/20 hover:scale-105 hover:text-black rounded-full font-bold">
                            Ver Projetos
                        </a>

                    </div>
                </div>
            </div>
        
        </>
    )
}