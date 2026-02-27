import Image from "next/image";

export default function AboutMe(){
    return (
        <div className="text-white p-4">
            <div className="flex flex-col sm:flex-row">

                <div className="flex flex-row justify-end w-[100%] sm:w-[50%] p-6">

                    <Image
                        src="/imgs/deadpool.jfif"
                        alt="Foto de perfil"                    
                        className="w-[300px] object-cover aspect-square rounded-full"
                        width={1000}
                        height={1000}
                    />
                </div>
                <div className="w-full sm:w-[50%] p-6">
                    <h1 className="text-5xl font-bold mb-2" id="about">Fulano de tal</h1>
                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ipsa fugit asperiores velit eius nihil sed delectus similique totam, quia ratione aliquam nulla quae doloribus, iste quas quod molestiae fuga recusandae.</p>

                </div>
            </div>
        </div>
    )
}