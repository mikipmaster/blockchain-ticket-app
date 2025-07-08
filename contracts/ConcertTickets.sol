// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/access/Ownable.sol";

contract ConcertTickets is Ownable {
    string public concertName;
    uint256 public totalTickets;
    uint256 public ticketPrice;
    bool    public saleActive;

    mapping(address => uint256) private ticketsOwned;
    uint256 public ticketsSold;

    event TicketsPurchased(address indexed buyer, uint256 amount);
    event TicketsResold(address indexed from, address indexed to, uint256 amount, uint256 price);
    event SaleStateChanged(bool active);
    event FundsWithdrawn(address indexed owner, uint256 amount);

    constructor(
        string memory _concertName,
        uint256 _totalTickets,
        uint256 _ticketPriceWei
    )
        Ownable(msg.sender)
    {
        concertName  = _concertName;
        totalTickets = _totalTickets;
        ticketPrice  = _ticketPriceWei;
        saleActive   = true;
        ticketsOwned[msg.sender] = _totalTickets;
    }

    modifier whenSaleActive() {
        require(saleActive, "Sprzedaz wylaczona");
        _;
    }

    function getRemainingTickets() public view returns (uint256) {
        return ticketsOwned[owner()];
    }

    function getMyTickets(address _user) public view returns (uint256) {
        return ticketsOwned[_user];
    }

    function buyTicket(uint256 _amount) external payable whenSaleActive {
        require(_amount > 0, "Zero biletow");
        uint256 cost = ticketPrice * _amount;
        require(msg.value == cost, "Zla wartosc ETH");
        uint256 available = ticketsOwned[owner()];
        require(available >= _amount, "Za malo biletow");

        ticketsOwned[owner()] -= _amount;
        ticketsOwned[msg.sender] += _amount;
        ticketsSold += _amount;

        emit TicketsPurchased(msg.sender, _amount);
    }

    function resellTicket(address _to, uint256 _amount) external payable whenSaleActive {
        require(_to != address(0), "Niepoprawny adres odbiorcy");
        require(_amount > 0, "Zero biletow");
        uint256 cost = ticketPrice * _amount;
        require(msg.value == cost, "Zle ETH przy odsprzedazy");
        require(ticketsOwned[msg.sender] >= _amount, "Nie masz tylu biletow");

        ticketsOwned[msg.sender] -= _amount;
        ticketsOwned[_to] += _amount;

        (bool sent, ) = msg.sender.call{value: msg.value}("");
        require(sent, "Przelew ETH nieudany");

        emit TicketsResold(msg.sender, _to, _amount, msg.value);
    }

    function stopSale() external onlyOwner {
        saleActive = false;
        emit SaleStateChanged(false);
    }

    function startSale() external onlyOwner {
        saleActive = true;
        emit SaleStateChanged(true);
    }

    function withdrawFunds() external onlyOwner {
        uint256 balance = address(this).balance;
        require(balance > 0, "Brak srodkow");
        (bool sent, ) = owner().call{value: balance}("");
        require(sent, "Przelew nieudany");
        emit FundsWithdrawn(owner(), balance);
    }
}
