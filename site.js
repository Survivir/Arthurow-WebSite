// Verifica se o usuário está logado
function isLoggedIn() {
    return localStorage.getItem("loggedIn") && localStorage.getItem("idToken");
}

if (!isLoggedIn()) {
    alert("Você precisa estar logado para acessar esta página.");
    window.location.href = "login";
}

// Obtendo o token ID do localStorage
const token = localStorage.getItem("idToken");

if (token) {
    // Enviar o token para o servidor para obter dados do usuário
    fetch('/api/userData', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}` // Adiciona o token no cabeçalho
        }
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            // Exibir informações da conta
            document.getElementById("userName").innerText = data.userName || "Nome não encontrado"; // Nome do usuário
            document.getElementById("userEmail").innerText = data.userEmail || "Email não encontrado"; // E-mail do usuário
            document.getElementById("userPoints").innerText = data.userPoints || 0; // Créditos
        } else {
            console.error("Erro ao obter dados do usuário:", data.message);
        }
    })
    .catch(error => {
        console.error("Erro ao se conectar ao servidor:", error);
    });
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

// Função para resgatar código
document.getElementById("redeemBtn").onclick = async function() {
    const code = document.getElementById("codeInput").value;
    const redeemMessage = document.getElementById("redeemMessage");

    const response = await fetch('/api/redeemCode', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ code, userId: 'USER_ID' }) // Substitua 'USER_ID' pelo ID do usuário real
    });

    const data = await response.json();
    if (response.ok) {
        redeemMessage.innerText = data.message;
        // Atualize os pontos na interface aqui se necessário
    } else {
        redeemMessage.innerText = data.error;
    }
};
