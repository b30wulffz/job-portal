const Kilt = require("@kiltprotocol/sdk-js");

async function generateKeypairs(keystore, mnemonic) {
  // signing keypair
  const signing = await keystore.generateKeypair({
    alg: Kilt.Did.SigningAlgorithms.Sr25519,
    seed: mnemonic,
  });

  // encryption keypair
  const encryption = await keystore.generateKeypair({
    alg: Kilt.Did.EncryptionAlgorithms.NaclBox,
    seed: mnemonic,
  });

  // build the keys object
  return {
    authenticationKey: {
      publicKey: signing.publicKey,
      type: Kilt.VerificationKeyType.Sr25519,
    },
    encryptionKey: {
      publicKey: encryption.publicKey,
      type: Kilt.EncryptionKeyType.X25519,
    },
  };
}

module.exports = { generateKeypairs };
