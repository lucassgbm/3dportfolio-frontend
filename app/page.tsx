"use client";
import { get } from "../services/api/requests";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function Home() {

  useEffect(() => {
    getData();
  }, []);

  const [portfolio, setPortfolio] = useState([]);

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
    <div className="flex flex-col w-full">

      <div className="relative w-full overflow-hidden py-10">

      {/* Botão Anterior */}
      <button
        onClick={handlePrev}
        className="absolute left-2 top-1/2 -translate-y-1/2 px-4 py-2 rounded-xl bg-black/50 text-white z-20"
      >
        ◀
      </button>

      {/* Wrapper das imagens */}
      <div
        className="flex transition-transform duration-500 ease-in-out"
        style={{
          transform: `translateX(-${index * 300}px)` // 300 = largura do card
        }}
      >
        {images.map((src, i) => (
          <div
            key={i}
            className="w-[280px] h-[280px] mx-3 flex-shrink-0 transition-transform duration-300 hover:scale-110"
          >
            <Image
              src={src}
              alt={`img-${i}`}
              width={600}
              height={600}
              className="w-full h-full object-cover rounded-xl"
            />
          </div>
        ))}
      </div>

      {/* Botão Próximo */}
      <button
        onClick={handleNext}
        className="absolute right-2 top-1/2 -translate-y-1/2 px-4 py-2 rounded-xl bg-black/50 text-white z-20"
      >
        ▶
      </button>

    </div>

      <div className="relative w-full h-[30vh] bg-zinc-900/70 flex flex-row justify-center items-center gap-4">
        {portfolio.map((item) => (
          <div key={item.id}>

            <Image
              src={`${process.env.NEXT_PUBLIC_API_STORAGE+item.image_path }`}
              alt={item.title}
              width={600}
              height={600}
              className="w-[200px] h-[120px] object-cover rounded-xl"
              unoptimized
              />
          </div>
        ))}
      </div>
    </div>

    </>
  );
}
