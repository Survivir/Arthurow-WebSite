// Sensitive.js

let users = {}; // Objeto para armazenar dados dos usuários

// Função para registrar um usuário
export function registerUser(name, email) {
    if (!users[email]) { // Verifica se o usuário já está registrado
        users[email] = {
            name: name,
            email: email,
            points: 0 // Inicializa com 0 pontos
        };
    }
}

// Função para resgatar códigos e atualizar pontos
export function redeemCode(email, code) {
    const validCodes = {
        "PROMO10": 10,
        "FREESHIP": 5,
        "BONUS20": 20
    };

    if (users[email] && validCodes[code]) {
        users[email].points += validCodes[code]; // Adiciona os pontos
        return { success: true, message: `Código resgatado com sucesso! Você ganhou ${validCodes[code]} pontos.`, points: users[email].points };
    } else {
        return { success: false, message: "Código inválido ou usuário não registrado." };
    }
}

// Função para obter os dados do usuário
export function getUserData(email) {
    return users[email] || null; // Retorna os dados do usuário ou null se não existir
}
