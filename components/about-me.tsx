import Image from "next/image";

export default function AboutMe(){
    return (
        <div className="text-white p-4">
            <h2 className="text-2xl font-bold mb-6" id="about">
                Sobre mim
            </h2>
            <div className="flex flex-row">


                <div className="w-[50%] p-6">

                    <Image
                        src="/imgs/deadpool.jfif"
                        alt="Foto de perfil"                    
                        className="w-full object-cover aspect-square rounded-full"
                        width={900}
                        height={900}
                    />
                </div>
                <div className="w-[50%]">
                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ipsa fugit asperiores velit eius nihil sed delectus similique totam, quia ratione aliquam nulla quae doloribus, iste quas quod molestiae fuga recusandae.</p>

                </div>
            </div>
        </div>
    )
}