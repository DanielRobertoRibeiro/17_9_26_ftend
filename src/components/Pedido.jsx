import { useState } from "react"

//array de objetos contendo o etado inicial do cardapio
const cardapio =[
    {id:1,nome:'Combo-01',preco:25.00,disponivel:true, quantidade:0},
    { id: 2, nome: 'Combo-02', preco: 30.00, disponivel: true, quantidade: 0 },
    { id: 3, nome: 'Combo-03', preco: 35.00, disponivel: false, quantidade: 0 },
    { id: 4, nome: 'Combo-04', preco: 40.00, disponivel: true, quantidade: 0 },
]
const Pedido = () => {

    //HOOK- useState-Manipula o estado da variavel
    //exemplos vai gerenciar a lista de itens do cardapio
    const [items,setItems]=useState(cardapio);
    const[status,setStatus]=useState("");
    const [enviar, setEnviar]=useState(false);

    //valor fixo adicionando ao total quando tivermos items no carrinho
    const taxaEntrega =5.00;
    
    //função que altera a quantidade do pedido
    const AlterarQuantidade=(id, valor)=>{
        setItems(prev=>
            //Map: percorre a lista para criar um novo array sem modificiar o original
            prev.map(item=>
                //ternario: verifica se o item da iterção é o que deve ser alterado
                //spread(..item) : adiciona o item para a lista atual ou modifica
                //Math.max -objeto que garante que a quantidade nunca seja maior que 0
                //item: retorna  item intacto caso o id não dê match
                item.id===id ? {...item,quantidade:Math.max(0, item.quantidade + valor)}:item
            )
        )
    }

    //Filter: seleciona apenas os produtos disponiveis e do carrinho
    const produtosDisponiveis = items.filter(item=>item.disponivel);
    const carrinho=item.filter(item.quantidade >0);

    //REDUCE: Calcula a soma dos items (preco * quantidade) e adiciona a taxa de entrega

    const subTotal=carrinho.reduce((ac,item)=>ac.item.preco * item.quantidade,0)
    const total= subTotal > 0 ? subTotal + taxaEntrega: 0;
  return (
    <>
      
    </>
  )
}

export default Pedido
