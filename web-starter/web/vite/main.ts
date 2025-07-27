import { UltraHonkBackend } from "@aztec/bb.js";
import circuit from "../../circuits/target/noir_uh_starter.json" with { type: "json" };
import { Noir } from "@noir-lang/noir_js";
import { initSync as initNoirC } from "@noir-lang/noirc_abi";
import { initSync as initAcvm } from "@noir-lang/acvm_js";

const acvmUrl = new URL("./node_modules/@noir-lang/acvm_js/web/acvm_js_bg.wasm", import.meta.url).href;
const noircUrl = new URL("./node_modules/@noir-lang/noirc_abi/web/noirc_abi_wasm_bg.wasm", import.meta.url)
  .href;

await Promise.all([
    initAcvm({ module_or_path: acvmUrl }),
    initNoirC({ module_or_path: noircUrl }),
]);

function log(message: string) {
    console.log(message);
    const resultDiv = document.getElementById('result');
    if (resultDiv) {
        resultDiv.textContent += message + '\n\n';
    }
}

async function generateProof(): Promise<void> {
    try {
        log('Generating proof...');

        const noir = new Noir(circuit as any);
        const honk = new UltraHonkBackend(circuit.bytecode, { threads: 8 });

        const inputs = { x: 3, y: 3 };
        const { witness } = await noir.execute(inputs);
        const { proof, publicInputs } = await honk.generateProof(witness);

        log("Proof: " + proof);
        log("Public inputs: " + publicInputs);

        const verified = await honk.verifyProof({ proof, publicInputs });
        log("Verified: " + verified);

    } catch (error) {
        log("Error: " + error);
    }
}

// Add click event listener when the DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    const button = document.getElementById('generateProofBtn');
    if (button) {
        button.addEventListener('click', generateProof);
    }
}); 