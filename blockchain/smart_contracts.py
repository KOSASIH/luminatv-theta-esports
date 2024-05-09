# smart_contracts.py
from brownie import accounts, contract, network
from web3 import Web3

class PlayerContract:
    def __init__(self, player_address, contract_address):
        self.player_address = player_address
        self.contract_address = contract_address
        self.contract = self.get_contract()

    def get_contract(self):
        contract_abi = [{"inputs": [], "name": "getPlayerName", "outputs": [{"internalType": "string", "name": "", "type": "string"}], "stateMutability": "view", "type": "function"}, {"inputs": [{"internalType": "string", "name": "newName", "type": "string"}], "name": "setPlayerName", "outputs": [], "stateMutability": "nonpayable", "type": "function"}]
        contract = contract.from_abi("PlayerContract", self.contract_address, contract_abi)
        return contract

    def get_player_name(self):
        return self.contract.getPlayerName()

    def set_player_name(self, new_name):
        self.contract.setPlayerName(new_name)

class TournamentPrizePool:
    def __init__(self, contract_address):
        self.contract_address = contract_address
        self.contract = self.get_contract()

    def get_contract(self):
        contract_abi = [{"inputs": [], "name": "getPrizePool", "outputs": [{"internalType": "uint256", "name": "", "type": "uint256"}], "stateMutability": "view", "type": "function"}, {"inputs": [{"internalType": "uint256", "name": "amount", "type": "uint256"}], "name": "addToPrizePool", "outputs": [], "stateMutability": "payable", "type": "function"}]
        contract = contract.from_abi("TournamentPrizePool", self.contract_address, contract_abi)
        return contract

    def get_prize_pool(self):
        return self.contract.getPrizePool()

    def add_to_prize_pool(self, amount):
        self.contract.addToPrizePool({"value": amount})
