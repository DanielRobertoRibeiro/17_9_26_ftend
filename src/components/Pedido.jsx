import { useState } from "react"

const cardapio = [
    { id: 1, nome: 'Combo-01', preco: 25.00, disponivel: true, quantidade: 0 },
    { id: 2, nome: 'Combo-02', preco: 30.00, disponivel: true, quantidade: 0 },
    { id: 3, nome: 'Combo-03', preco: 35.00, disponivel: false, quantidade: 0 },
    { id: 4, nome: 'Combo-04', preco: 40.00, disponivel: true, quantidade: 0 },
]

const Pedido = () => {
    const [items, setItems] = useState(cardapio);
    const [status, setStatus] = useState("");
    const [enviar, setEnviar] = useState(false);

    const taxaEntrega = 5.00;

    const AlterarQuantidade = (id, valor) => {
        setItems(prev =>
            prev.map(item =>
                item.id === id ? { ...item, quantidade: Math.max(0, item.quantidade + valor) } : item
            )
        )
    }

    const produtosDisponiveis = items.filter(item => item.disponivel);
    const carrinho = items.filter(item => item.quantidade > 0);

    const subTotal = carrinho.reduce((ac, item) => ac + item.preco * item.quantidade, 0);
    const total = subTotal > 0 ? subTotal + taxaEntrega : 0;

    const confirmarPedido = () => {
        setEnviar(true);
        setStatus("Restaurante Preparando seu Pedido");
        setTimeout(() => {
            setStatus("Seu Pedido saiu para entrega!");
            setEnviar(false);
        }, 5000);
        setTimeout(() => {
            setStatus("Seu pedido chegou!");
            setEnviar(false);
        }, 10000);
    }

    return (
        <div className="max-w-md mx-auto my-10 p-6 bg-white rounded-2xl shadow-xl border border-gray-100 font-sans text-gray-800">
            <h1 className="text-2xl font-bold text-center text-gray-900 mb-6">Cardápio do Restaurante</h1>

            <div className="space-y-3">
                {produtosDisponiveis.map(produto => (
                    <div key={produto.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-xl border border-gray-200">
                        <span className="font-medium text-gray-700">
                            {produto.nome} <span className="text-sm text-gray-500">(R$ {produto.preco.toFixed(2)})</span>
                        </span>
                        <div className="flex items-center space-x-3">
                            <button
                                onClick={() => AlterarQuantidade(produto.id, -1)}
                                className="w-8 h-8 flex items-center justify-center bg-gray-200 text-gray-700 font-bold rounded-lg hover:bg-gray-300 transition-colors"
                            >
                                -
                            </button>
                            <span className="font-semibold text-gray-800 w-4 text-center">{produto.quantidade}</span>
                            <button
                                onClick={() => AlterarQuantidade(produto.id, +1)}
                                className="w-8 h-8 flex items-center justify-center bg-indigo-600 text-white font-bold rounded-lg hover:bg-indigo-700 transition-colors"
                            >
                                +
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            <hr className="border-t border-gray-200 my-6" />

            <h3 className="text-xl font-semibold text-gray-800 mb-3">Resumo da Entrega</h3>

            {carrinho.length === 0 ? (
                <p className="text-gray-400 italic text-sm">Seu Carrinho está Vazio</p>
            ) : (
                <div className="space-y-4">
                    <ul className="divide-y divide-gray-100">
                        {carrinho.map(item => (
                            <li key={item.id} className="py-2 flex justify-between text-sm text-gray-600">
                                <span>{item.quantidade}x {item.nome}</span>
                                <span className="font-medium">R$ {(item.preco * item.quantidade).toFixed(2)}</span>
                            </li>
                        ))}
                    </ul>

                    <div className="border-t border-gray-200 pt-3 space-y-1 text-sm text-gray-700">
                        <div className="flex justify-between">
                            <span>Subtotal:</span>
                            <span className="font-medium">R$ {subTotal.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between">
                            <span>Taxa de Entrega:</span>
                            <span className="font-medium">R$ {taxaEntrega.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between text-base font-bold text-gray-900 pt-2 border-t border-gray-100">
                            <span>Total:</span>
                            <span>R$ {total.toFixed(2)}</span>
                        </div>
                    </div>

                    <button
                        onClick={confirmarPedido}
                        disabled={enviar}
                        className="w-full mt-2 py-3 px-4 bg-emerald-600 text-white font-semibold rounded-xl shadow-md hover:bg-emerald-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
                    >
                        {enviar ? "Enviando..." : "Confirmar pedido"}
                    </button>
                </div>
            )}

            {status && (
                <div className="mt-4 p-3 bg-blue-50 border-l-4 border-blue-500 text-blue-700 rounded-r-xl text-sm flex items-center space-x-2">
                    <strong>Alerta:</strong> <span>{status}</span>
                </div>
            )}
        </div>
    )
}

export default Pedido