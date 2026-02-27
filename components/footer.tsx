import Image from "next/image";
import SearchIcon from "./icons/search";

export default function Footer(){
    return (
        <>
            <div className="relative h-[90px] bg-black w-full">
                <div className="absolute inset-0 ">

                    <div className="flex flex-col text-zinc-200">
                        <nav className="w-full grid grid-cols-1 sm:grid-cols-3 h-[90px] justify-between gap-2 p-6 items-center">
                        
                            <h1 className="text-lg">3D Portfólio</h1>
                            <ul className="flex flex-row gap-6">
                                <li className="cursor-pointer hover:underline">
                                    <a href="#about">
                                        Sobre mim
                                    </a>
                                </li>
                                <li className="cursor-pointer hover:underline">
                                    <a href="#projects">
                                        Meus projetos
                                    </a>
                                </li>
                                <li className="cursor-pointer hover:underline">Orçamento</li>
                                <li className="cursor-pointer hover:underline">Contato</li>
                            </ul>
                            <div className="flex justify-end">
                                
                            </div>
                            
                        </nav>
                    </div>
                </div>
            </div>
        
        </>
    )
}