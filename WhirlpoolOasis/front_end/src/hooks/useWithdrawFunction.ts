import { useEffect, useState } from "react"
import { useEthers, useContractFunction, useSendTransaction } from "@usedapp/core"
import { constants, utils } from "ethers"
import { abi, contractAddress } from "../constants.js"
import { Contract } from "@ethersproject/contracts"
import * as sapphire from '@oasisprotocol/sapphire-paratime';
import { ethers } from 'ethers';

export const useWithdrawFunction = (address: string, amount: number) => {

    //to find a contract on the chain, we need its address
    //to communicate with the contract, we need its abi (interface)
    const ContractInterface = new utils.Interface(abi)
    const contract = new Contract(contractAddress, ContractInterface)

    //function called from the Withdraw button when clicked.
    const approveAndWithdraw = () => {
        return withdrawSend(address, ethers.utils.parseEther(String(amount)))
    }

    const Sapphiresigner = new ethers.providers.Web3Provider(sapphire.wrap(window.ethereum)).getSigner()
    //function to call the withdraw function from the contract.
    const { send: withdrawSend, state: withdrawState } =
        useContractFunction(contract, "withdraw", {
            transactionName: "withdraw",
            signer: Sapphiresigner
        })

    const [state, setState] = useState(withdrawState)

    return { approveAndWithdraw, state }
}