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

    Usuario.create({
      email,
      senha,
      nome,
    })
      .then(() => {
        res.status(201).send();
      })
      .catch((err) => {
        // Código de erro padrão do Sequelize para inserção duplicada de dado único
        if (err.parent.errno === 1062) {
          res.status(400).json({ msg: 'E-mail já cadastrado!' });
        } else res.status(400).send();
      });
  }
}

export default new UsuarioController();
