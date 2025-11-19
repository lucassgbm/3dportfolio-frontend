import Image from "next/image";
import SearchIcon from "./icons/search";

export default function Header(){
    return (
        <>
            <div className="relative h-[90vh] w-full bg-[url('/imgs/1234.jpg')] bg-cover bg-center">
                <div className="absolute inset-0 bg-gradient-to-b from-black/95 from-15% via-black/75 via-30% to-black/70">

                    <div className="flex flex-row text-zinc-200">
                        <nav className="w-full grid grid-cols-3 h-[90px] justify-between gap-2 p-6 items-center">

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
                                <button>
                                    <SearchIcon />

                                </button>
                            </div>
                        </nav>
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