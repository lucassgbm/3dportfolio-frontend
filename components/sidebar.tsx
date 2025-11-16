import Image from "next/image";

export default function Sidebar(){
    return (
        <>
            <div className="flex flex-col w-[250px] h-screen bg-zinc-900">
                <div className="flex flex-col gap-2 p-2 text-zinc-200 text-xl mt-auto">
                    <ul className="flex flex-col items-center mb-5">
                        <li>Sobre mim</li>
                        <li>Meus projetos</li>
                        <li>Contato</li>
                    </ul>
                    <Image 
                        src="/imgs/widen_920x0.jpeg"
                        alt="Foto de perfil"
                        className="w-[100px] object-cover aspect-square rounded-full"
                        width={300}
                        height={300}
                    />
                </div>

            </div>
        </>
    )
}