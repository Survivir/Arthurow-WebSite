app.post('/api/userData', (req, res) => {
    const token = req.headers.authorization.split(' ')[1];

    // Verifique e decodifique o token aqui
    const userData = verifyToken(token); // Função fictícia para verificar o token

    if (userData) {
        res.json({
            success: true,
            userName: userData.name,
            userEmail: userData.email,
            userPoints: userData.apPoints // Assumindo que você armazena os pontos do usuário
        });
    } else {
        res.json({ success: false, message: 'Token inválido.' });
    }
});
