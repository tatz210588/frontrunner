import { constants, ethers } from "ethers";
import { config } from "dotenv";
config();


async function main() {
  const ethPrivateKey = '8c98299378a4b721a8b51331dcfebe5dceb684d8dc5a68846b7a1a81682ff9bc'

  const webSocketProvider = new ethers.providers.WebSocketProvider("wss://rinkeby.infura.io/ws/v3/403f2033226a44788c2638cc1c29d438");
  //const myjSOnRCPProvider = new ethers.providers.JsonRpcProvider("https://rinkeby.infura.io/v3/403f2033226a44788c2638cc1c29d438");

  webSocketProvider.on("pending", async (tranx) => {

    const txInfo = await webSocketProvider.getTransaction(tranx);
    if (txInfo != null) {
      const wallet = new ethers.Wallet(ethPrivateKey, webSocketProvider)
      const signer = wallet.connect(webSocketProvider)

      const tx = {
        "from": wallet.address,
        "to": "0xB5b93720E9b5F7650164b4962E8Dfe2DBdF94488",
        "nonce": webSocketProvider.getTransactionCount(wallet.address, 'latest'),
        "gasLimit": ethers.utils.hexlify(21000),
        "gasPrice": ethers.utils.hexlify(Number(ethers.utils.formatUnits(txInfo.gasPrice.toString(), 'wei')) + 1000000000),
        "value": ethers.utils.hexlify(Number(ethers.utils.formatUnits((1).toString(), 'wei')))
      }
      const transaction = await signer.sendTransaction(tx)
      console.log("tx is: ", transaction)
    }

  });
}
main();
