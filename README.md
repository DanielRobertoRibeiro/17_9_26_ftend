# 🍔 Simulador de Pedidos em React

Um componente interativo desenvolvido em **React** para simular um fluxo de pedidos de cardápio (como um delivery), gerenciando quantidades, carrinho de compras, cálculo de subtotal/total e status de entrega assíncrono.

---

## 🚀 Tecnologias Utilizadas

* **React (Hooks):** Biblioteca principal para construção da interface e gerenciamento de estado (`useState`).
* **JavaScript (ES6+):** Lógica de programação moderna, manipulação de arrays e arrow functions.
* **CSS / Tailwind CSS:** Estilização da interface (opcional/aplicável para layout responsivo).

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
