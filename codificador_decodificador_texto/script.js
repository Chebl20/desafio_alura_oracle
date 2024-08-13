// Seletores dos elementos
var input1 = document.querySelector('textarea#txt-area1');
var input2 = document.querySelector('textarea#txt-area2');
var message = document.getElementById("msg");
var encryptionMethod = document.getElementById('encryption-method');
var button1 = document.querySelector('button.btn-1');
var button2 = document.querySelector('button.btn-2');

// Função para criptografar e descriptografar conforme o método selecionado
button1.onclick = function () {
    var method = encryptionMethod.value;
    if (method === 'alura') {
        encryptAlura();
    } else if (method === 'binary') {
        encryptB();
    } else if (method === 'sha256') {
        encryptSHA();
    } else if (method === 'base64') {
        encryptBase64();
    }
};

button2.onclick = function () {
    var method = encryptionMethod.value;
    if (method === 'alura') {
        decryptAlura();
    } else if (method === 'binary') {
        decryptB();
    } else if (method === 'sha256') {
        decryptSHA();
    } else if (method === 'base64') {
        decryptBase64();
    }
};
function removeAccents(str) {
    return str.normalize('NFD').replace(/[\u0300-\u036f]/g, ''); // Remove acentos
}

function containsUppercaseOrAccents(str) {
    // Verifica se o texto contém letras maiúsculas ou acentos
    return /[A-ZÀ-ÿ]/.test(str);
}

function encryptAlura() {
    const inputText = input1.value;

    if (inputText.length === 0) {
        document.getElementById('none').innerHTML = '<h2 id="none">Nenhuma mensagem encontrada</h2>';
        input1.focus();
    } else if (containsUppercaseOrAccents(inputText)) {
        // Mostra erro se o texto contém maiúsculas ou acentos
        document.getElementById('none').innerHTML = '<h2 id="none">O texto deve estar em minúsculas e sem acento</h2>';
        document.querySelector('#icone').style.display = 'none';
        input1.focus();
    } else {
        document.getElementById('none').innerHTML = '';
        document.querySelector('#icone').style.display = 'none';

        // Converte o texto para minúsculas e remove acentos, embora isso não seja mais necessário com a verificação acima
        var text = removeAccents(inputText).toLowerCase();
        
        console.log('Texto original:', text);
        
        // Chaves para criptografar
        var txt = text.replace(/e/igm, 'enter')
                      .replace(/i/igm, 'imes')
                      .replace(/a/igm, 'ai')
                      .replace(/o/igm, 'ober')
                      .replace(/u/igm, 'ufat');
        
        console.log('Texto criptografado:', txt);
        document.getElementById('txt-area2').innerHTML = txt;

        document.getElementById('copy').innerHTML = '<button class="button btn-3" onclick="copy()">Copiar</button>';
    }
}


function decryptAlura() {
    if (input1.value.length === 0) {
        document.getElementById('none').innerHTML = '<h2 id="none">Nenhuma mensagem encontrada</h2>';
        input1.focus();
    } else {
        document.getElementById('none').innerHTML = '';
        document.querySelector('#icone').style.display = 'none';

        var text = input1.value;
        console.log('Texto original:', text);
        
        var txt = text.replace(/enter/igm, 'e')
                      .replace(/imes/igm, 'i')
                      .replace(/ai/igm, 'a')
                      .replace(/ober/igm, 'o')
                      .replace(/ufat/igm, 'u');
        
        console.log('Texto descriptografado:', txt);
        document.getElementById('txt-area2').innerHTML = txt;

        document.getElementById('copy').innerHTML = '<button class="button btn-3" onclick="copy()">Copiar</button>';
    }
}

function encryptB() {
    if (input1.value.length === 0) {
        document.getElementById('none').innerHTML = 'Sem mensagem';
        input1.focus();
    } else {
        document.getElementById('none').innerHTML = '';
        document.querySelector('#icone').style.display = 'none';
        var text = input1.value;
        var binaryText = '';
        for (var i = 0; i < text.length; i++) {
            binaryText += text.charCodeAt(i).toString(2).padStart(8, '0') + ' ';
        }
        document.getElementById('txt-area2').innerHTML = binaryText.trim();
        document.getElementById('copy').innerHTML = '<button class="button btn-3" onclick="copy()">Copiar</button>';
    }
}

function decryptB() {
    if (input1.value.length === 0) {
        document.getElementById('none').innerHTML = 'Sem mensagem';
        input1.focus();
    } else {
        document.getElementById('none').innerHTML = '';
        document.querySelector('#icone').style.display = 'none';
        var binaryText = input1.value.split(' ');
        var decodedText = '';
        for (var i = 0; i < binaryText.length; i++) {
            decodedText += String.fromCharCode(parseInt(binaryText[i], 2));
        }
        document.getElementById('txt-area2').innerHTML = decodedText;
        document.getElementById('copy').innerHTML = '<button class="button btn-3" onclick="copy()">Copiar</button>';
    }
}

async function encryptSHA() {
    if (input1.value.length === 0) {
        document.getElementById('none').innerHTML = 'Sem mensagem';
        input1.focus();
    } else {
        document.getElementById('none').innerHTML = '';
        document.querySelector('#icone').style.display = 'none';
        const text = input1.value;
        const encoder = new TextEncoder();
        const data = encoder.encode(text);
        const hashBuffer = await crypto.subtle.digest('SHA-256', data);
        const hashArray = Array.from(new Uint8Array(hashBuffer));
        const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
        document.getElementById('txt-area2').innerHTML = hashHex;
        document.getElementById('copy').innerHTML = '<button class="button btn-3" onclick="copy()">Copiar</button>';
    }
}

async function decryptSHA() {
    document.getElementById('txt-area2').innerHTML = 'A descriptografia de SHA-256 não é possível pois é unidirecional.';
    document.getElementById('copy').innerHTML = ''; // Remove o botão de copiar se não for necessário
}

function encryptBase64() {
    if (input1.value.length === 0) {
        document.getElementById('none').innerHTML = 'Sem mensagem';
        input1.focus();
    } else {
        document.getElementById('none').innerHTML = '';
        document.querySelector('#icone').style.display = 'none';
        var text = input1.value;
        var encodedText = btoa(text); // Codifica para Base64
        document.getElementById('txt-area2').innerHTML = encodedText;
        document.getElementById('copy').innerHTML = '<button class="button btn-3" onclick="copy()">Copiar</button>';
    }
}

function decryptBase64() {
    if (input1.value.length === 0) {
        document.getElementById('none').innerHTML = 'Sem mensagem';
        input1.focus();
    } else {
        document.getElementById('none').innerHTML = '';
        document.querySelector('#icone').style.display = 'none';
        var base64Text = input1.value;
        var decodedText = atob(base64Text); // Decodifica Base64
        document.getElementById('txt-area2').innerHTML = decodedText;
        document.getElementById('copy').innerHTML = '<button class="button btn-3" onclick="copy()">Copiar</button>';
    }
}

async function copy() {
    const textArea = document.querySelector('#txt-area2');
    textArea.select();
    textArea.setSelectionRange(0, 99999); // Para dispositivos móveis
    try {
        await navigator.clipboard.writeText(textArea.value);
        message.innerHTML = "O texto copiado já está na área de transferência!";
    } catch (err) {
        console.error('Falha ao copiar o texto: ', err);
        message.innerHTML = "Falha ao copiar o texto. Tente novamente.";
    }
    document.querySelector("#txt-area1").value = "";
}

document.addEventListener('DOMContentLoaded', () => {
    const selectElement = document.getElementById('encryption-method');
    const infoText = document.getElementById('info-text');

    selectElement.addEventListener('change', () => {
        if (selectElement.value === 'sha256') {
            infoText.style.display = 'block'; // Exibe o texto
        } else {
            infoText.style.display = 'none'; // Oculta o texto
        }
    });
});
