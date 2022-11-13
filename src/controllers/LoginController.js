import Usuario from '../models/Usuario.js';
import generateToken from '../functions/generateToken.js';
import verifyPassword from '../functions/verifyPassword.js';

class LoginController {
  async store(req, res) {
    const { email, senha } = req.body;
    let hashSenha;
    let usuarioId;

    if (!email || !senha)
      return res
        .status(400)
        .json({ msg: 'Os campos email e senha devem ser preenchidos' });
    else if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email))
      return res.status(400).json({ msg: 'E-mail inválido' });

    await Usuario.findOne({
      raw: true,
      where: { email },
    }).then((usuario) => {
      if (usuario && usuario.confirmado) {
        hashSenha = usuario.senha;
        usuarioId = usuario.id;
      } else if (usuario && !usuario.confirmado) {
        return res.status(400).json({
          msg: 'Conta não ativada. Acesse seu e-mail e realize a ativação!',
        });
      } else return res.status(400).json({ msg: 'E-mail não cadastrado!' });
    });

    try {
      if (await verifyPassword(senha, hashSenha)) {
        return res.status(200).json(generateToken(usuarioId));
      } else {
        return res.status(401).json({ msg: 'Senha incorreta!' });
      }
    } catch {}
  }
}

export default new LoginController();
