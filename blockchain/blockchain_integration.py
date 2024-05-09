# blockchain_integration.py
import os
from brownie import accounts, network, config
from dotenv import load_dotenv
from web3 import Web3

load_dotenv()

def deploy_contracts():
    account = accounts.add(os.getenv("PRIVATE_KEY"))
    network.connect(os.getenv("NETWORK"))
    player_contract = contract.PlayerContract.deploy({"from": account})
    tournament_prize_pool = contract.TournamentPrizePool.deploy({"from": account})
    return player_contract, tournament_prize_pool

def interact_with_contracts():
    account = accounts.add(os.getenv("PRIVATE_KEY"))
    network.connect(os.getenv("NETWORK"))
    player_contract_address = os.getenv("PLAYER_CONTRACT_ADDRESS")
    tournament_prize_pool_address = os.getenv("TOURNAMENT_PRIZE_POOL_ADDRESS")
    player_contract = contract.PlayerContract.at(player_contract_address)
    tournament_prize_pool = contract.TournamentPrizePool.at(tournament_prize_pool_address)
    player_name = player_contract.getPlayerName()
    print("Player Name:", player_name)
    player_contract.setPlayerName("New Player Name")
    print("Updated Player Name:", player_contract.getPlayerName())
    prize_pool = tournament_prize_pool.getPrizePool()
    print("Prize Pool:", prize_pool)
    tournament_prize_pool.addToPrizePool({"value": Web3.toWei(1, "ether")})
    prize_pool = tournament_prize_pool.getPrizePool()
    print("Updated Prize Pool:", prize_pool)

if __name__ == "__main__":
    deploy_contracts()
    interact_with_contracts()
