// mój frontend 
import React, { useEffect, useState } from "react";
import { ethers } from "ethers";
import TicketInfo from "./components/TicketInfo";
import OwnerControls from "./components/OwnerControls";
import Artifact from "./abis/ConcertTickets.json";

// wklej tu adres, który pojawił się w konsoli po deployu
const CONTRACT_ADDRESS = "0x1eEbC47788b18171Eed380742A477A00663beF9a";

export default function App() {
  const [contract, setContract]       = useState(null);
  const [concertName, setConcertName] = useState("");
  const [remain, setRemain]           = useState("0");
  const [priceEth, setPriceEth]       = useState("0");
  const [priceWei, setPriceWei]       = useState("0");
  const [saleActive, setSaleActive]   = useState(false);
  const [ownerAddr, setOwnerAddr]     = useState("");
  const [userAddr, setUserAddr]       = useState("");
  const [myTickets, setMyTickets]     = useState("0");

  // Inicjalizacja
  useEffect(() => {
    async function init() {
      try {
        if (!window.ethereum) {
          alert("Zainstaluj MetaMask!");
          return;
        }
        // DLA ETHERS v6: BrowserProvider
        const provider = new ethers.BrowserProvider(window.ethereum);
        await provider.send("eth_requestAccounts", []);
        const signer = await provider.getSigner();
        


        const ct = new ethers.Contract(
          CONTRACT_ADDRESS,
          Artifact.abi,
          signer
        );
        setContract(ct);

        const [ name, left, p, active, owner ] = await Promise.all([
          ct.concertName(),
          ct.getRemainingTickets(),
          ct.ticketPrice(),
          ct.saleActive(),
          ct.owner()
        ]);

        setConcertName(name);
        setRemain(left.toString());
        setPriceEth(ethers.formatEther(p));
        setPriceWei(p.toString());
        setSaleActive(active);
        setOwnerAddr(owner);
      } catch (e) {
        console.error("Błąd init:", e);
        alert("Błąd inicjalizacji: " + (e.reason || e.message || e));
      }
    }
    init();
  }, []);

  // reloadData
  const reloadData = async () => {
    if (!contract) return;
    try {
      const [ left, p, active ] = await Promise.all([
        contract.getRemainingTickets(),
        contract.ticketPrice(),
        contract.saleActive(),
      ]);
      console.log("🚀 reloadData:", {
        left: left.toString(),
        priceWei: p.toString(),
        saleActive: active
      });
      setRemain(left.toString());
      setPriceEth(ethers.formatEther(p));
      setPriceWei(p.toString());
      setSaleActive(active);
    } catch (e) {
      console.error("Błąd reloadData:", e);
    }
  };

  // buyTicket
  const buyTicket = async () => {
    try {
      if (!contract) throw new Error("Brak kontraktu");
      console.log("Wysyłam value (Wei):", priceWei);
      const tx = await contract.buyTicket(1, { value: priceWei });
      await tx.wait();
      console.log("Transakcja kupna zakończona, odświeżam dane");
      await reloadData();
      alert("Bilet zakupiony!");
    } catch (e) {
      console.error("Błąd kupna:", e);
      alert("Błąd kupna: " + (e.reason || e.message || e));
    }
  };

  // checkTickets
  const checkTickets = async () => {
    try {
      if (!contract) throw new Error("Brak kontraktu");
      const amt = await contract.getMyTickets(userAddr);
      setMyTickets(amt.toString());
    } catch (e) {
      console.error("Błąd check:", e);
      alert("Błąd sprawdzania: " + (e.reason || e.message || e));
    }
  };

   // --- Funkcja odsprzedaży biletów ---
   const resellTicket = async (to, amount) => {
    try {
      if (!contract) throw new Error("Brak kontraktu");

      // Sprawdzamy, czy „to” jest poprawnym adresem Ethereum
      if (!ethers.isAddress(to)) {
        alert("Niepoprawny adres kupującego");
        return;
      }

      //  Pobranie nowego Provider/Signera z MetaMask (Ethers v6)
      const provider2 = new ethers.BrowserProvider(window.ethereum);
      await provider2.send("eth_requestAccounts", []);
      const signer2 = await provider2.getSigner();
      const sellerAddress = await signer2.getAddress();

     
      const userTicketsBN = await contract.getMyTickets(sellerAddress);
      //    Porownianie, czy jajli chce sprzedać za dużo:
      if (userTicketsBN < BigInt(amount)) {
        alert("Nie masz tylu biletów do odsprzedania");
        return;
      }

      const cost = BigInt(priceWei) * BigInt(amount);
      const contractWithSigner = contract.connect(signer2);
      const tx = await contractWithSigner.resellTicket(to, BigInt(amount), {
        value: cost
      });
      await tx.wait();

      // 7) Po pomyślnym wykonaniu odświeżamy dane w UI
      await reloadData();
      alert("Bilet został odsprzedany!");
    } catch (e) {
      console.error("Błąd odsprzedaży:", e);
      alert("Błąd odsprzedaży: " + (e.reason || e.message || e));
    }
  };


  // toggleSale
  const toggleSale = async () => {
    try {
      if (!contract) throw new Error("Brak kontraktu");
      const tx = saleActive
        ? await contract.stopSale()
        : await contract.startSale();
      await tx.wait();
      setSaleActive(!saleActive);
      alert(saleActive ? "Sprzedaż zatrzymana" : "Sprzedaż wznowiona");
    } catch (e) {
      console.error("Błąd toggleSale:", e);
      alert("Błąd zmiany stanu: " + (e.reason || e.message || e));
    }
  };

  // withdrawFunds
  const withdrawFunds = async () => {
    try {
      if (!contract) throw new Error("Brak kontraktu");
      const tx = await contract.withdrawFunds();
      await tx.wait();
      alert("Środki wypłacone!");
    } catch (e) {
      console.error("Błąd withdraw:", e);
      alert("Błąd wypłaty: " + (e.reason || e.message || e));
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 to-blue-400 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white bg-opacity-20 p-8 rounded-xl shadow-lg space-y-6">
        <h1 className="text-3xl font-bold text-center">{concertName}</h1>
        <p className="text-center">
          Pozostało biletów: <strong>{remain}</strong>
        </p>
        <button
          onClick={buyTicket}
          className="w-full py-3 bg-green-500 rounded-lg hover:bg-green-600 font-semibold transition"
        >
          Kup 1 bilet ({priceEth} ETH)
        </button>

        <TicketInfo
          userAddr={userAddr}
          setUserAddr={setUserAddr}
          myTickets={myTickets}
          onCheck={checkTickets}
          onResell={resellTicket}
        />

        {userAddr.toLowerCase() === ownerAddr.toLowerCase() && (
          <OwnerControls
            saleActive={saleActive}
            onToggleSale={toggleSale}
            onWithdraw={withdrawFunds}
          />
        )}
      </div>
    </div>
  );
}
