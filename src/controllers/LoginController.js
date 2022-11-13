import Usuario from '../models/Usuario.js';
import { compare } from 'bcrypt';
import jwt from 'jsonwebtoken';

const SECRET = 'mQXlpwTOeKyR0#U51#^RWWQh!0&0t6j1bw4dt@AFBV32DhS%LX';

class LoginController {
  async store(req, res) {
    const { email, senha } = req.body;
    let senhaHash;
    let senhaCorreta;

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
      if (usuario) senhaHash = usuario.senha;
      else return res.status(400).json({ msg: 'E-mail não cadastrado!' });
    });

    try {
      if (await compare(senha, senhaHash)) {
        const token = jwt.sign({ email }, SECRET, { expiresIn: 86400 });
        return res.status(200).json(token);
      } else {
        return res.status(401).json({ msg: 'Senha incorreta!' });
      }
    } catch {}
  }
}

export default new LoginController();
