const resultText = document.getElementById("resultText");
const inputText = document.getElementById("inputText");
const repairButton = document.getElementById("repair-button");
const customAlert = document.getElementById("customAlert");
const modalMessage = document.getElementById("modalMessage");
const backgroundContainer = document.getElementById("backgroundContainer");

// Dictionary

const llaves = {
    'e': 'enter',
    'i': 'imes',
    'a': 'ai',
    'o': 'ober',
    'u': 'ufat'
}

// Repair text

const removeAccents = (str) => {
    return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}

function repair() {
    let textRepair = removeAccents(inputText.value);
    textRepair = textRepair.toLowerCase();
    inputText.value = textRepair;
    inputText.focus();
    repairButton.style.display = "none";
}
// Validate text

function validateTexto() {
    let textwrite = inputText.value;
    let validador = textwrite.match(/^[a-z\s]*$/);

    if (!validador || validador == 0) {
        showModal('Solo son permitidas letras minúsculas y sin acentos');

        repairButton.style.display = "block";
        return false;
    }
    return true;
}

// Encrypt text
function encrypt() {
    if (validateTexto()) {
        let texto = inputText.value;
        for (let key in llaves) {
            texto = texto.replaceAll(key, llaves[key]);
        }
        resultText.value = texto;
        repairButton.style.display = "none";
        backgroundContainer.classList.add("hidden");
    }
}

// Desencrypt text

function decrypt() {
    if (validateTexto()) {
        let texto = inputText.value;
        for (let key in llaves) {
            texto = texto.replaceAll(llaves[key], key);
        }
        resultText.value = texto;
        repairButton.style.display = "none";
        backgroundContainer.classList.add("hidden");
    }
}


// Copy text

function copy() {

    resultText.select();
    navigator.clipboard.writeText(resultText.value)
    showModal("Texto Copiado");
}

// Clear text
function clean() {
    inputText.value = "";
    resultText.value = "";
    inputText.focus();
    backgroundContainer.classList.remove("hidden");
}

// Mostrar modal personalizado
function showModal(message) {
    modalMessage.textContent = message;
    customAlert.style.display = "block";
}

// Cerrar modal personalizado
function closeModal() {
    customAlert.style.display = "none";
}