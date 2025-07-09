=======================
# ENGLISH VERSION
=======================

# ConcertTickets

## Project Description

ConcertTickets is an innovative application for selling concert tickets, utilizing Ethereum blockchain technology. Each ticket is represented as a non-fungible token (NFT), ensuring transparency and security of transactions.

## Features

- Purchase tickets directly from the organizer
- Resale of tickets between users
- Sales management by contract owner (start/stop sales, withdraw funds)
- Display concert information and ticket status

## Technologies

- **Solidity** (smart contracts)
- **React** (frontend)
- **Ethers.js** (blockchain communication)
- **Ganache** (local blockchain)
- **MetaMask** (Ethereum wallet)
- **Hardhat** (development environment)

## Installation Instructions

1. **Launch Ganache** and configure MetaMask to connect to the local blockchain.
2. **Deploy the contract** using Hardhat:
   ```bash
   npx hardhat run scripts/deploy.js --network ganache
   ```
3. **Copy the contract address** to the `App.jsx` file (variable `CONTRACT_ADDRESS`).
4. **Navigate to the frontend directory** and install dependencies:
   ```bash
   npm install
   ```
5. **Run the frontend**:
   ```bash
   npm run dev
   ```
6. **Open the application** in your browser (e.g., http://localhost:3000).

## Testing

The project was tested on a local Ganache blockchain with multiple accounts. The correctness of ticket purchase and resale, as well as access control mechanisms and error handling (e.g., attempting to purchase more tickets than available) were confirmed.

## Author

Michał Połujański

## Contact

[michal.polujanski@gmail.com]

=======================
# POLISH VERSION
=======================

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
