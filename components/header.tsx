"use client";
import Image from "next/image";
import SearchIcon from "./icons/search";
import Menu from "./menu";
import MenuIcon from "./icons/menu";
import { useEffect, useState } from "react";
import CloseIcon from "./icons/close";
import { Splide, SplideSlide } from '@splidejs/react-splide';
import '@splidejs/react-splide/css';
import Link from "next/link";

export default function Header(){

    const [scrolled, setScrolled] = useState(false);
    const [openMenu, setOpenMenu] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 400);
        };

        window.addEventListener("scroll", handleScroll);

        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const banners = [
    {
      id: 1,
      name: "Banner 1",
      image: "/imgs/banners/banner1.jpeg",
      text_color: "text-orange-400",
      link: "#",
      cta: "Olhar portfólio"
    },
    {
      id: 2,
      name: "Banner 2",
      image: "/imgs/banners/banner2.jpg",
      text_color: "text-orange-400",
      link: "#",
      cta: "Ver mais"
    },
    {
      id: 3,
      name: "Banner 3",
      image: "/imgs/banners/banner3.png",
      text_color: "text-orange-400",
      link: "#",
      cta: "Olhar portfólio"
    }]

    return (
        <>
            <div className="relative w-full">
                <div className="">

                    <div className={`w-full fixed flex flex-row text-sm text-zinc-200 border-b-[1px] border-white/30 z-50 transition-all duration-300 ${scrolled ? "bg-zinc-900" : "bg-transparent"}`}>
                        <nav className="hidden sm:grid grid-cols-3 w-full h-[60px] justify-between gap-2 px-6 items-center">

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
                    {/* <div className="relative w-full h-[300px] top-[60px] bg-zinc-900 flex flex-col text-zinc-200 items-center justify-center">
                        <a href="#projects" className="flex flex-row items-center justify-center w-[150px] p-5 bg-white/10 border border-white text-white text-sm transition duration-300 hover:bg-white/20 hover:scale-105 hover:text-black rounded-full font-bold">
                            Ver Projetos
                        </a>

                    </div> */}

                    <Splide
                        options={{
                            type: 'loop',
                            perPage: 1,
                            gap: '1rem',
                            loop: true,
                            arrows: false,
                            autoplay: true
                        
                        }}
                        aria-label="My Favorite Images"
                    >

                        {banners.map((banner) => (
                        <SplideSlide  key={banner.id}>
                            
                            <div className="relative w-full h-[400px] bg-zinc-900 flex flex-col text-zinc-200 items-center justify-center">
                                <Image 
                                    src={banner.image} 
                                    alt={banner.name}
                                    width={1200} 
                                    height={300}
                                    className="w-full h-[400px] absolute inset-0 object-cover"
                                    unoptimized
                                    />
                                <div className={`absolute flex flex-col items-center gap-4 justify-end mb-10 p-6 inset-0 z-50`}>
                                    <Link href={banner.link}>
                                        <button className="bg-transparent border-1 border-white text-white p-2 w-[150px] rounded-2xl hover:opacity-80 cursor-pointer transition duration-500">{banner.cta}</button>
                                    </Link>
                                </div>
                            </div>
                        </SplideSlide>
                        ))}

                    </Splide>
                </div>
            </div>
        
        </>
    )
}