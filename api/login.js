app.post('/api/login', (req, res) => {
    const { idToken } = req.body;
    console.log("Token recebido:", idToken); // Log do token recebido
    // Lógica para verificar o ID token e retornar a quantidade de AP
    if (validToken(idToken)) {
        res.json({ success: true, ap: 10 }); // Retorna a quantidade de AP
    } else {
        res.status(400).json({ success: false, message: "Token inválido." });
    }
});
