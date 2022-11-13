import sendEmail from '../functions/sendEmail.js';
import Usuario from '../models/Usuario.js';

class UsuarioController {
  async store(req, res) {
    const { email, senha, nome } = req.body;

    // Regexp para validação do e-mail e verificação do preenchimento dos campos obrigatórios

    if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
      return res.status(400).json({ msg: 'E-mail inválido' });
    } else if (!email || !senha || !nome) {
      return res
        .status(400)
        .json({ msg: 'Os campos email, senha e nome devem ser preenchidos' });
    }

    const emailJaExiste = await Usuario.findOne({
      where: { email },
    });

    if (emailJaExiste) {
      return res.status(400).json({ msg: 'E-mail já cadastrado!' });
    } else {
      Usuario.create({
        email,
        senha,
        nome,
        confirmado: 0,
      })
        .then((usuario) => {
          sendEmail({
            id: usuario.id,
            nome: usuario.nome,
            email: usuario.email,
          });
        })
        .catch(() => {
          return res.status(400).send();
        });
    }

    return res.status(201).send();
  }
}

export default new UsuarioController();
