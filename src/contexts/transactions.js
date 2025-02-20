import * as anchor from '@project-serum/anchor';
import { web3 } from "@project-serum/anchor";
import {
    PublicKey,
    SystemProgram,
    SYSVAR_RENT_PUBKEY,
    ParsedAccountData,
    AccountInfo,
    Connection,
    Transaction,
    sendAndConfirmRawTransaction,
    Keypair,
} from '@solana/web3.js';
import { TOKEN_PROGRAM_ID, ASSOCIATED_TOKEN_PROGRAM_ID} from "@solana/spl-token";
import axios from 'axios';
import { Metadata } from "@metaplex-foundation/mpl-token-metadata";
import { useWallet } from '@solana/wallet-adapter-react';

// const connection = new Connection("devnet");
const solConnection = new web3.Connection(web3.clusterApiUrl("mainnet-beta"), "processed");

export const claimReward = async (wallet,mintId)=>{

    console.log(wallet.publicKey.toBase58())
    console.log(mintId)

    await axios.post("https://dbh-claim-reward.vercel.app/api/claimReward", {
        wallet: wallet.publicKey.toBase58(),
        mintId,
    })
        .then(async (response) => {

            let recoveredTransaction = Transaction.from(Buffer.from(response.data, 'base64'));
            console.log(recoveredTransaction);
            let tx = await wallet.signTransaction(recoveredTransaction);
            console.log(tx);
            console.log("transaction init")
            await sendAndConfirmRawTransaction(solConnection, tx.serialize());
            console.log("transaction confirmed");

            console.log("txHash =", tx);
        })
        .catch(function (error) {
            console.log(error);
        });
}

export const getAssociatedTokenAccount = async (ownerPubkey, mintPk) => {
    let associatedTokenAccountPubkey = (await PublicKey.findProgramAddress(
        [
            ownerPubkey.toBuffer(),
            TOKEN_PROGRAM_ID.toBuffer(),
            mintPk.toBuffer(), // mint address
        ],
        ASSOCIATED_TOKEN_PROGRAM_ID
    ))[0];
    return associatedTokenAccountPubkey;
}

export const createAssociatedTokenAccountInstruction = (
    associatedTokenAddress,
    payer,
    walletAddress,
    splTokenMintAddress
) => {
    const keys = [
        { pubkey: payer, isSigner: true, isWritable: true },
        { pubkey: associatedTokenAddress, isSigner: false, isWritable: true },
        { pubkey: walletAddress, isSigner: false, isWritable: false },
        { pubkey: splTokenMintAddress, isSigner: false, isWritable: false },
        {
            pubkey: anchor.web3.SystemProgram.programId,
            isSigner: false,
            isWritable: false,
        },
        { pubkey: TOKEN_PROGRAM_ID, isSigner: false, isWritable: false },
        {
            pubkey: anchor.web3.SYSVAR_RENT_PUBKEY,
            isSigner: false,
            isWritable: false,
        },
    ];
    return new anchor.web3.TransactionInstruction({
        keys,
        programId: ASSOCIATED_TOKEN_PROGRAM_ID,
        data: Buffer.from([]),
    });
}