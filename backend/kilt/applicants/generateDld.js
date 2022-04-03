const Kilt = require("@kiltprotocol/sdk-js");
const { generateKeypairs } = require("./generateKeyPairs");
const { mnemonicGenerate } = require("@polkadot/util-crypto");

async function generateLightDid() {
  // init
  await Kilt.init({ address: process.env.WSS_ADDRESS });

  // create secret and DID public keys
  const keystore = new Kilt.Did.DemoKeystore();
  const mnemonic = mnemonicGenerate();
  const keys = await generateKeypairs(keystore, mnemonic);

  // create the DID
  const lightDid = Kilt.Did.LightDidDetails.fromDetails({
    ...keys,
    authenticationKey: {
      publicKey: keys.authenticationKey.publicKey,
      type: Kilt.VerificationKeyType.Sr25519,
    },
  });

  return {
    lightDid,
    mnemonic,
  };
}

module.exports = { generateLightDid };
