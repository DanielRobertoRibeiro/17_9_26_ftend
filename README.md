# 🍔 Simulador de Pedidos em React

Um componente interativo desenvolvido em **React** para simular um fluxo de pedidos de cardápio (como um delivery), gerenciando quantidades, carrinho de compras, cálculo de subtotal/total e status de entrega assíncrono.

---

## 🚀 Tecnologias Utilizadas

* **React (Hooks):** Biblioteca principal para construção da interface e gerenciamento de estado (`useState`).
* **JavaScript (ES6+):** Lógica de programação moderna, manipulação de arrays e arrow functions.
* **HTML / JSX:** Estruturação dos componentes visuais.

---

## 🧠 Conceitos-Chave: Manipulação de Arrays

O projeto faz uso intenso de métodos modernos do JavaScript para processar os dados do cardápio e do carrinho de forma imutável e eficiente.

### 1. `filter()` (Filtragem)
O método `filter` percorre um array e retorna um **novo array** apenas com os elementos que atendem a uma condição booleana (`true`).

* **No código:**
  * **Cardápio Disponível:** `items.filter(item => item.disponivel)` seleciona apenas os produtos que o restaurante tem ativos no momento.
  * **Carrinho:** `items.filter(item => item.quantidade > 0)` isola dinamicamente apenas os produtos que o usuário escolheu (quantidade maior que zero).

### 2. `map()` (Transformação e Renderização)
O `map` percorre cada elemento de um array, executa uma lógica sobre ele e **retorna um novo array** do mesmo tamanho. É muito usado no React para renderizar listas de componentes na tela.

* **No código:**
  * **Renderização Dinâmica:** Usado tanto em `produtosDisponiveis.map()` quanto em `carrinho.map()` para transformar dados brutos em elementos HTML/JSX visualizáveis.
  * **Atualização de Estado (`AlterarQuantidade`):** `prev.map(item => ...)` percorre o cardápio procurando o item alterado para atualizar sua quantidade sem modificar diretamente o array original (imutabilidade).

### 3. `reduce()` (Acumulação)
O `reduce` serve para **reduzir um array a um único valor** (que pode ser um número, uma string ou um objeto), acumulando os resultados de cada iteração.

* **No código:**
  * **Cálculo do Subtotal:** `carrinho.reduce((ac, item) => ac + item.preco * item.quantidade, 0)` soma o preço multiplicado pela quantidade de cada item do carrinho, começando o acumulador (`ac`) em `0`.

---

## ⚙️ Atalhos e Operadores Lógicos

Para manter o código limpo e conciso, foram aplicados alguns recursos essenciais da linguagem:

* **Operador Ternário (`condição ? true : false`):** 
  Usado como um if/else de uma linha. 
  * *Exemplo:* `{carrinho.length === 0 ? (<p>Carrinho Vazio</p>) : (<>...</>)}` (verifica se o carrinho está vazio para alternar a exibição). Também usado no botão para alternar entre `"enviando ..."` e `"Confirmar pedido"`.
* **Operador Lógico `&&` (Short-Circuit):**
  Funciona como um "se isso existe, faça aquilo". 
  * *Exemplo:* `{status && ( <div>{status}</div> )}` só exibe a caixa de alerta na tela se a variável `status` tiver algum texto guardado (ou seja, se for diferente de vazio/falsa).
* **Operador Spread (`...item`):**
  Copia todas as propriedades de um objeto existente para dentro de um novo objeto, permitindo alterar apenas a propriedade desejada (ex: `{ ...item, quantidade: novaQuantidade }`).

---

## ⏱️ Ciclo de Pedido Assíncrono (`setTimeout`)
A função `confirmarPedido` simula o tempo real de entrega utilizando temporizadores em JavaScript (`setTimeout`), alterando o status do pedido de forma encadeada (Preparando ➔ Saiu para entrega ➔ Chegou).

---

<details>
<summary><b>📂 Visualizar Código Original (Sem Estilização)</b></summary>

```jsx
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
    const [status,setStatus]=useState("");
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
    const carrinho=items.filter(item=>item.quantidade >0);

    //REDUCE: Calcula a soma dos items (preco * quantidade) e adiciona a taxa de entrega

    const subTotal=carrinho.reduce((ac,item)=>ac + item.preco * item.quantidade,0)
    const total= subTotal > 0 ? subTotal + taxaEntrega: 0;

    //SIMULAÇÃO DO CICLO DE VIDA DA ENTREGA USANDO TEMPORIZADPS ASSINCRONOS

    const confirmarPedido=()=>{
        setEnviar(true);
        setStatus("Restaurante Preparando seu Pedido")
        setTimeout(()=>{
            setStatus("Seu Pedido saiu para entrega!")
            setEnviar(false);
            
        },5000)
        setTimeout(()=>{
            setStatus("Seu pedido chegou!")
            setEnviar(false);
        },10000)
    }
  return (
    <div>
        <h1>Cardapio do Restaurante</h1>
    {produtosDisponiveis.map(produto=>(
        <div>
            <span>{produto.nome}(R${produto.preco.toFixed(2)})</span>
            <div>
                <button onClick={()=>AlterarQuantidade(produto.id, -1)}>-</button>
                <span>{produto.quantidade}</span>
                <button onClick={()=>AlterarQuantidade(produto.id, +1)}>+</button>
            </div>
        </div>
    ))}

    <hr></hr>
    <h3> Resumo da Entrega</h3>
    {carrinho.length ===0 ?(
        <p>Seu Carrinho está Vazio</p>
    ):(
        <>
        <ul>
            {carrinho.map(item =>(
                <li key={item.id}>
                    {item.quantidade} X {item.nome} -R$ {(item.preco * item.quantidade).toFixed(2)}
                </li>
            ))}
        </ul>
        <p>Subtotal R${subTotal.toFixed(2)}</p>
        <p>Taxa de Entrega: R$ {taxaEntrega.toFixed(2)}</p>
        <button onClick={confirmarPedido} disabled={enviar}>
            {enviar? "enviando ...": "Confirmar pedido"}
        </button>
        </>
    )}
    {status && (
        <div>
            <strong>Alerta:</strong>{status}
        </div>
    )}
    </div>
  )
}

export default Pedido
