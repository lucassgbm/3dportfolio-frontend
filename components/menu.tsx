export default function Menu(){

    const menuItems = [
        { "nome":"Sobre mim", "link": "#about"},
        { "nome": "Meus projetos", "link": "#projects"},    
        { "nome": "Orçamento", "link": "#orcamento"},
        { "nome": "Contato", "link": "#contact"}
    ];

    return (
        <ul className="flex flex-col sm:flex-row gap-6">
            {menuItems.map((item, index) => (
                
                <li className="cursor-pointer hover:underline text-shadow-sm" key={index}>
                    <a href={item.link}>
                        {item.nome}
                    </a>
                </li>
            ))}
            
        </ul>
    )
}