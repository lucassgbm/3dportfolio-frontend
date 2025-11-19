"use client";
import AboutMe from "@/components/about-me";
import { get } from "../services/api/requests";
import Image from "next/image";
import { useEffect, useState } from "react";
import VerticalSpace from "@/components/vertical-space";
import CloseIcon from "@/components/icons/close";

interface Portfolio {
  id: number;
  title: string;
  description: string;
  image_path: string;
}

type Images = Image[];

interface Image {
  id: number;
  name: string;
  image_path: string;
}

interface Modal {
  open: boolean;
  portfolio_id: number | null;
}

export default function Home() {

  const [portfolios, setPortfolios] = useState([]);
  const [portfolio, setPortfolio] = useState<Portfolio | null>(null);
  const [images, setImages] = useState<Images[] | null>(null);

  const [modal, setModal] = useState<Modal>({
    open: false,
    portfolio_id: null
  });

  const itemsPerPage = 2; // coloque 2, 3, 4...
  const gap = 8; // gap-4 do Tailwind

  const [current, setCurrent] = useState(0);

  const next = () => {
    if (!images) return;
    setCurrent(old => old === images.length - 1 ? 0 : old + 1);
  };

  const prev = () => {
    if (!images) return;
    setCurrent(old => old === 0 ? images.length - 1 : old - 1);
  };

  async function getPortfolios() {
    
    try{

      const res = await get('/portfolio');
      setPortfolios(res.data);
    
    }catch (error){
    
      console.log(error);
    
    }
  }

  async function getImages(id: number) {
    
    try{

      const res = await get('/portfolio/'+id);

      setImages(res.data.images);
      setPortfolio(res.data);
    
    }catch (error){
    
      console.log(error);
    
    }
  }
  
  useEffect(() => {
    getPortfolios();
  }, []);

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
        {portfolios.map((portfolio: Portfolio) => (
          <button 
            onClick={() => {setModal({...modal, open: true, portfolio_id: portfolio.id}); getImages(portfolio.id)}} key={portfolio.id}
            className="transition-transform duration-300 hover:scale-110 cursor-pointer"
          >

              <Image
                src={`${process.env.NEXT_PUBLIC_API_STORAGE+portfolio?.image_path }`}
                alt={portfolio?.title}
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
      
      <div className="fixed w-full h-full bg-black/50 inset-0 flex justify-center items-center z-50" 
        onClick={() => {
          setModal({...modal, open: false, portfolio_id: null}); 
          setImages(null); 
          setPortfolio(null);
        }}
      >
          
        <div className="flex flex-col w-[90%] h-[90%] bg-linear-to-r from-zinc-950 via-zinc-900 to-zinc-800 border border-zinc-900 p-4">
          <div className="flex flex-col sm:flex-row h-[100%]">
            <div className="absolute top-2 right-2 flex justify-end mb-4 text-white">
              <button 
                onClick={() => {
                  setModal({...modal, open: false, portfolio_id: null}); 
                  setImages(null); 
                  setPortfolio(null);
                }}
                className="cursor-pointer">
                <CloseIcon />
              </button>
            </div>
            
            {images === null && (
              
              <div className="w-full h-full flex flex-row items-center justify-center text-white">
                <p>Loading...</p>
              </div>
            )}
            {images !== null && (
              <>
                <div className="w-full sm:w-[60%] flex flex-col h-full gap-4">
                  <div className="w-full h-[60%]">
                    <Image
                      src={`${process.env.NEXT_PUBLIC_API_STORAGE+images[0]?.image_path }`}
                      alt={images[0]?.name}
                      className="w-full h-full object-cover rounded-md"
                      width={500}
                      height={500}
                      unoptimized
                    />
                    
                  </div>
                  <div className="h-[40%] gap-4">
                    <div className="relative w-full overflow-hidden">
                      {/* Container que desliza */}
                      <div
                        className="flex transition-transform duration-500 gap-2"
                        style={{
                          transform: `translateX(-${current * (100 / itemsPerPage)}%)`
                        }}
                      >
                        {images.map((image: any) => (
                          <div
                            key={image.id}
                            className="shrink-0"
                            style={{
                              width: `calc(${100 / itemsPerPage}% - ${gap / itemsPerPage}px)`
                            }}
                          >
                            <Image
                              src={`${process.env.NEXT_PUBLIC_API_STORAGE + image.image_path}`}
                              alt={image.name}
                              className="w-full h-full object-cover rounded-md"
                              width={500}
                              height={500}
                              unoptimized
                            />
                          </div>
                        ))}
                      </div>

                      {/* Botão LEFT */}
                      <button
                        onClick={(e) => {
                          prev();
                          e.stopPropagation();
                        }}
                        className="absolute left-3 top-1/2 -translate-y-1/2 bg-black/40 text-white p-2 rounded-full"
                      >
                        ◀
                      </button>

                      {/* Botão RIGHT */}
                      <button
                        onClick={(e) => {
                          next();
                          e.stopPropagation();
                        }}
                        className="absolute right-3 top-1/2 -translate-y-1/2 bg-black/40 text-white p-2 rounded-full"
                      >
                        ▶
                      </button>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col w-full h-[100%] sm:w-[40%] border border-zinc-600 mt-4 sm:mt-0 sm:ml-4 p-4 text-white overflow-y-auto">
                  <h2 className="text-5xl font-semibold">{`${portfolio?.title}`}</h2>
                  <p className="text-sm mt-auto">{`${portfolio?.description}`}</p>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    )}
    </>
  );
}
