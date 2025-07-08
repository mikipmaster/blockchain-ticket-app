# Instrukcja odpalania mojego projektu
## Michał Połujański, 10956


## 1. Konfiguracja Backendu 

1. \`npm install --save-dev hardhat @nomiclabs/hardhat-waffle ethereum-waffle chai ethers\`
2. Skonfiguruj \`hardhat.config.js\` do Ganache na przyklad (http://127.0.0.1:7545).
3. \`npx hardhat run scripts/deploy.js --network ganache\`
4. Skopiuj adres kontraktu i wklej w \`frontend/src/App.jsx\` jako \`CONTRACT_ADDRESS\`.

## Konfiguracja Frontendu

1. \`cd frontend\`
2. \`npm install\`
3. \`npm run dev\`
4. Otwórz http://localhost:3000 (lub inny port jeśli coś zmienia użytkownik) i podłącz MetaMask do sieci Ganache.


