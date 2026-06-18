const senaInput = document.getElementById('sena-input');
const result = document.getElementById("result");

function showResult(message, type) {
    result.textContent = message;
    result.className = `result ${type}`;
}

async function createSena() {
    const raw = senaInput.value.trim();
    const parts = raw.split(/[,\s]+/).map(s => s.trim()).filter(s => s !== "");
    const nros = parts.map(Number).filter(n => !isNaN(n) && n > 0);

if (nros.length !== 6) {
        showResult("Digite exatamente 6 números.", "error");
        return;
    }

    if (nros.some(n => n < 1 || n > 60)) {
        showResult("Todos os números devem estar entre 1 e 60.", "error");
        return;
    }

    if (new Set(nros).size !== 6) {
        showResult("Os números não podem se repetir.", "error");
        return;
    }

    try {
        const response = await fetch("/senas", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ nros }),
        });

        if (response.ok) {
            showResult("Jogo cadastrado com sucesso!", "success");
            senaInput.value = "";
        } else {
            const data = await response.json();
            showResult(data.message || "Erro ao cadastrar.", "error");
        }
    } catch {
        showResult("Erro de conexão com o servidor.", "error");
    }
}

senaInput.addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
        createSena();
    }
});
