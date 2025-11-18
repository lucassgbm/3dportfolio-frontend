"use client";
import AboutMe from "@/components/about-me";
import { get } from "../services/api/requests";
import Image from "next/image";
import { useEffect, useState } from "react";
import VerticalSpace from "@/components/vertical-space";
import CloseIcon from "@/components/icons/close";

export default function Home() {

  useEffect(() => {
    getData();
  }, []);

  const [portfolio, setPortfolio] = useState([]);
  const [modal, setModal] = useState({
    open: false,
    portfolio_id: null
  });

  const images = [
    "/imgs/widen_1220x0.jpg",
    "/imgs/maxresdefault.jpg",
    "/imgs/1234.jpg",
    "/imgs/widen_920x0.jpeg",
  ];

  async function getData() {
    
    try{

      const res = await get('/portfolio');
      setPortfolio(res.data);
    
    }catch (error){
    
      console.log(error);
    
    }
  }
  
    const [index, setIndex] = useState(0);

  const total = images.length;
  const visibleCount = 3; // sempre mostrar 3 imagens

  const handleNext = () => {
    setIndex((prev) => (prev + 1) % total);
  };

  const handlePrev = () => {
    setIndex((prev) => (prev - 1 + total) % total);
  };

  // Gera as 3 imagens baseadas no índice atual
  const getVisibleImages = () => {
    const result = [];
    for (let i = 0; i < visibleCount; i++) {
      result.push(images[(index + i) % total]);
    }
    return result;
  };

  return (
    <>
    <VerticalSpace />
    <div className="flex w-full max-w-5xl mx-auto items-center">
      <AboutMe /> 
    </div>
    <VerticalSpace />
    <div className="flex flex-col w-full max-w-5xl mx-auto text-white">
      <h2 className="text-2xl font-bold mb-6" id="projects">
          Portfólio
      </h2>

      <div className="relative w-full bg-zinc-900/70 flex flex-row justify-center items-center gap-2 p-4">
        {portfolio.map((item) => (
          <button 
            onClick={() => setModal({...modal, open: true, portfolio_id: item.id})} key={item.id}
            className="transition-transform duration-300 hover:scale-110 cursor-pointer"
          >

              <Image
                src={`${process.env.NEXT_PUBLIC_API_STORAGE+item.image_path }`}
                alt={item.title}
                width={600}
                height={600}
                className="w-[200px] aspect-[1/1] object-cover rounded-xl"
                unoptimized
                />

          </button>
        ))}
      </div>
    </div>
    <VerticalSpace />

    {modal.open && (
      
      <div className="fixed w-full h-full bg-black/50 inset-0 flex justify-center items-center z-50" onClick={() => setModal({...modal, open: false, portfolio_id: null})}>
        <div className="flex flex-col w-[90%] h-[90%] bg-linear-to-r from-zinc-950 via-zinc-900 to-zinc-800 border border-zinc-900 p-4">
          <div className="flex flex-col sm:flex-row h-[100%]">
          <div className="absolute top-2 right-2 flex justify-end mb-4 text-white">
            <button onClick={() => setModal({...modal, open: false, portfolio_id: null})} className="cursor-pointer">
              <CloseIcon />
            </button>
          </div>

            <div className="w-full sm:w-[60%] flex flex-col h-full gap-4">
              <div className="w-full h-[60%]">
                <Image
                  src="/imgs/orc.jpg"
                  alt="Foto do portfólio"
                  className="w-full h-full object-cover rounded-md"
                  width={500}
                  height={500}
                />
                
              </div>
              <div className="grid grid-cols-2 h-[40%] gap-4">
                <Image 
                  src="/imgs/orc.jpg"
                  alt="Foto do portfólio"
                  className=" h-full object-cover rounded-md"
                  width={500}
                  height={500}
                />
                <Image 
                  src="/imgs/orc.jpg"
                  alt="Foto do portfólio"
                  className=" h-full object-cover rounded-md"
                  width={500}
                  height={500}
                />
              </div>
            </div>
            <div className="flex flex-col w-full h-[100%] sm:w-[40%] border border-zinc-600 mt-4 sm:mt-0 sm:ml-4 p-4 text-white overflow-y-auto">
              <h2 className="text-5xl font-semibold">Orc</h2>
              <p className="text-sm mt-auto">Lorem ipsum dolor sit amet consectetur adipisicing elit. Incidunt obcaecati fugiat sunt fugit in illo consectetur. Cum labore totam magni velit inventore, nam odio aspernatur minus! Fugiat iusto non debitis.</p>
            </div>
          </div>
        </div>
      </div>
    )}
    </>
  );
}
