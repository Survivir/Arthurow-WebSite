//verfica se o usuário está logado
function isLoggedIn() {
    return localStorage.getItem("loggedIn") && localStorage.getItem("idToken");
}

if (!isLoggedIn()) {
    alert("Você precisa estar logado para acessar esta página.");
    window.location.href = "login";
}

// Obtendo o token ID do localStorage
const token = localStorage.getItem("idToken");
console.log("Token ID:", token); // Debug para verificar o token

if (token) {
    const data = parseJwt(token);
    console.log("Dados do JWT:", data); // Debug para verificar o conteúdo do token
    // Exibir informações da conta
    document.getElementById("userName").innerText = data.name || "Nome não encontrado"; // Nome do usuário
    document.getElementById("userEmail").innerText = data.email || "Email não encontrado"; // E-mail do usuário

    // Gerenciar os créditos de Ap
    let userPoints = localStorage.getItem("userPoints") || 100; // Inicia com 100 Ap por padrão
    document.getElementById("userPoints").innerText = userPoints; // Exibe os pontos

} else {
    console.error("Token não encontrado.");
}

// Lógica para mostrar/ocultar informações da conta
document.getElementById("accountBtn").onclick = function() {
    const accountInfo = document.getElementById("accountInfo");
    accountInfo.style.display = accountInfo.style.display === "none" ? "block" : "none";
};

// Lógica de logout
document.getElementById("logoutBtn").onclick = function() {
    localStorage.removeItem("loggedIn");
    localStorage.removeItem("idToken");
    window.location.href = "login"; // Redireciona para a página de login
};

// Função para analisar o JWT
function parseJwt(token) {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));
    return JSON.parse(jsonPayload);
}
document.getElementById("redeemBtn").onclick = function() {
    const code = document.getElementById("codeInput").value;
    const redeemMessage = document.getElementById("redeemMessage");

    // Aqui você pode definir quais códigos são válidos e quantos pontos eles dão
    const validCodes = {
        "PROMO10": 10,
        "FREESHIP": 5,
        "BONUS20": 20
    };

    if (validCodes[code]) {
        let userPoints = localStorage.getItem("userPoints") || 100; // Ponto inicial
        userPoints = parseInt(userPoints) + validCodes[code]; // Adiciona os pontos
        localStorage.setItem("userPoints", userPoints); // Salva os novos pontos
        redeemMessage.innerText = "Código resgatado com sucesso! Você ganhou ${validCodes[code]} pontos."
        document.getElementById("userPoints").innerText = userPoints; // Atualiza os pontos na interface
    } else {
        redeemMessage.innerText = "Código inválido. Tente novamente.";
    }
}