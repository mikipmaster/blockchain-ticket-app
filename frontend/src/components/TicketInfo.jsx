// frontend/src/components/TicketInfo.jsx

import React, { useState } from "react";

export default function TicketInfo({ userAddr, setUserAddr, myTickets, onCheck, onResell }) {
  // lokalne stany do odsprzedaży:
  const [resellTo, setResellTo] = useState("");
  const [resellAmount, setResellAmount] = useState(1);

  return (
    <div className="bg-white bg-opacity-20 rounded-lg p-4 space-y-4">
      <h2 className="text-xl font-semibold">Twoje bilety: {myTickets}</h2>

      {/* Sekcja: sprawdź stan biletów */}
      <input
        type="text"
        className="w-full px-3 py-2 rounded-lg"
        placeholder="Twój adres"
        value={userAddr}
        onChange={(e) => setUserAddr(e.target.value)}
      />
      <button
        onClick={() => onCheck()}
        className="w-full bg-yellow-500 hover:bg-yellow-600 text-white py-2 rounded-lg font-medium"
      >
        Sprawdź
      </button>

      {/* Sekcja: odsprzedaż biletu */}
      <input
        type="text"
        className="w-full px-3 py-2 rounded-lg"
        placeholder="Adres kupującego"
        value={resellTo}
        onChange={(e) => setResellTo(e.target.value)}
      />
      <input
        type="number"
        min="1"
        className="w-full px-3 py-2 rounded-lg"
        placeholder="Ile biletów"
        value={resellAmount}
        onChange={(e) => setResellAmount(e.target.value)}
      />
      <button
        onClick={() => onResell(resellTo, Number(resellAmount))}
        className="w-full bg-red-500 hover:bg-red-600 text-white py-2 rounded-lg font-medium"
      >
        Odsprzedaj
      </button>
    </div>
  );
}
