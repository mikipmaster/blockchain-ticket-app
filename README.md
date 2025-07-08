# ConcertTickets

## Opis projektu
ConcertTickets to innowacyjna aplikacja do sprzedaży biletów na koncerty, wykorzystująca technologię blockchain Ethereum. Każdy bilet jest reprezentowany jako niewymienny token (NFT), co zapewnia transparentność i bezpieczeństwo transakcji.

## Funkcjonalności
- Zakup biletów bezpośrednio od organizatora
- Odsprzedaż biletów między użytkownikami
- Zarządzanie sprzedażą przez właściciela kontraktu (start/stop sprzedaży, wypłata środków)
- Wyświetlanie informacji o koncercie i stanie biletów

## Technologie
- Solidity (inteligentne kontrakty)
- React (frontend)
- Ethers.js (komunikacja z blockchainem)
- Ganache (lokalny blockchain)
- MetaMask (portfel Ethereum)
- Hardhat (środowisko deweloperskie)

## Instrukcja uruchomienia

1. **Uruchom Ganache** i skonfiguruj MetaMask do połączenia z lokalnym blockchainem.
2. **Wdroż kontrakt** za pomocą Hardhat (`npx hardhat run scripts/deploy.js --network ganache`).
3. **Skopiuj adres kontraktu** do pliku `App.jsx` (zmienna `CONTRACT_ADDRESS`).
4. **Przejdź do katalogu frontend** i zainstaluj zależności:
npm install

text
5. **Uruchom frontend**:
npm run dev

text
6. **Otwórz aplikację** w przeglądarce (np. [http://localhost:3000](http://localhost:3000)).

## Testowanie

Projekt był testowany na lokalnym blockchainie Ganache z kilkoma kontami. Potwierdzono poprawność zakupu i odsprzedaży biletów oraz mechanizmów kontroli dostępu i obsługi błędów (np. próba zakupu większej liczby biletów niż dostępna).

## Autor
Michał Połujański

## Kontakt
[michal.polujanski@gmail.com]
