export default function OwnerControls({ saleActive, onToggleSale, onWithdraw }) {
  return (
    <div className="mt-6 w-full max-w-md bg-white bg-opacity-20 p-6 rounded-xl shadow-lg">
      <h2 className="text-2xl mb-4">Kontrola właściciela</h2>
      <button onClick={onToggleSale} className="w-full py-2 mb-4 bg-indigo-500 rounded-lg hover:bg-indigo-600 transition">
        {saleActive ? "Zatrzymaj sprzedaż" : "Wznów sprzedaż"}
      </button>
      <button onClick={onWithdraw} className="w-full py-2 bg-pink-500 rounded-lg hover:bg-pink-600 transition">
        Wypłać środki
      </button>
    </div>
  );
}
