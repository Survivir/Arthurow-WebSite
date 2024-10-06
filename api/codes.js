import { registerUser, redeemCode } from './Sensitive.js';

export default function handler(req, res) {
    if (req.method === 'POST') {
        const { name, email, code } = req.body;

        // Registra o usuário
        registerUser(name, email);

        // Tenta resgatar o código
        const result = redeemCode(email, code);

        if (result.success) {
            res.status(200).json(result);
        } else {
            res.status(400).json(result);
        }
    } else {
        res.setHeader('Allow', ['POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
