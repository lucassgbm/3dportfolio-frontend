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
    <div className="flex flex-col w-full max-w-6xl mx-auto text-white pt-4">
      <h2 className="text-2xl font-bold mb-6" id="projects">
          Portfólio
      </h2>

      <div className="flex flex-row w-full mb-6 font-semibold text-sm gap-2">
        <button className="bg-zinc-950 rounded-full px-6 py-3 hover:opacity-80 cursor-pointer transition duration-600 ease-in-out border border-zinc-800">
          Todos
        </button>
        <button className="bg-zinc-800 rounded-full px-6 py-3 hover:opacity-80 cursor-pointer transition duration-600 ease-in-out border border-zinc-800">
          Modelagem 3D
        </button>
        <button className="bg-zinc-800 rounded-full px-6 py-3 hover:opacity-80 cursor-pointer transition duration-600 ease-in-out border border-zinc-800">
          Pixel Art
        </button>
      </div>

      <div className="relative w-full flex flex-row gap-4">
        {portfolios.map((portfolio: Portfolio) => (
          <button 
            onClick={() => {setModal({...modal, open: true, portfolio_id: portfolio.id}); getImages(portfolio.id)}} key={portfolio.id}
            className="group overflow-hidden rounded-2xl cursor-pointer"
          >

              <Image
                src={`${process.env.NEXT_PUBLIC_API_STORAGE+portfolio?.image_path }`}
                alt={portfolio?.title}
                width={600}
                height={600}
                className="w-[200px] aspect-[1/1] object-cover transition-transform duration-300 ease-in-out group-hover:scale-105 "
                unoptimized
                />

          </button>
        ))}
      </div>
    </div>
    <VerticalSpace />
    <div className="flex w-full max-w-6xl mx-auto items-center">
      <AboutMe /> 
    </div>
    <VerticalSpace />
    

    {modal.open && (
      
      <div className="absolute w-full h-auto bg-black/50 inset-0 flex justify-center z-50" 
        onClick={() => {
          setModal({...modal, open: false, portfolio_id: null}); 
          setImages(null); 
          setPortfolio(null);
        }}
      >
          
        <div className="flex flex-col w-[90%] max-w-6xl mt-10 h-[1000px] bg-linear-to-r from-zinc-950 via-zinc-900 to-zinc-800 border border-zinc-900 p-4">
          <div className="flex flex-col h-full">
            <div className="absolute top-2 right-2 flex mb-4 text-white">
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
                <div className="w-full flex flex-col h-full gap-4">
                  <div className="w-full">
                    <Image
                      src={`${process.env.NEXT_PUBLIC_API_STORAGE+images[0]?.image_path }`}
                      alt={images[0]?.name}
                      className="w-full h-[400px] object-cover rounded-md"
                      width={1000}
                      height={1000}
                      unoptimized
                    />
                    
                  </div>
                  <div className="w-full flex flex-row gap-2 items-center justify-center mt-4">
                    {images.map((image) => (
                      <div key={image.id}>
                        <Image
                          src={`${process.env.NEXT_PUBLIC_API_STORAGE+image?.image_path }`}
                          alt={image?.name}
                          className="w-[100px] h-[100px] aspect-[1/1] object-cover rounded-full"
                          width={200}
                          height={200}
                          unoptimized
                        />
                      </div>
                    ))}
                  </div>
                </div>
                <div className="flex flex-col items-center w-full h-[400px] mt-4 p-4 text-white">
                  <h2 className="text-5xl font-semibold">{`${portfolio?.title}`}</h2>
                  <VerticalSpace />
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
