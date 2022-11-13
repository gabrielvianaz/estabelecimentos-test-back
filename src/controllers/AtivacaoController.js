import decodeActivationToken from '../functions/decodeActivationToken.js';
import sendEmail from '../functions/sendEmail.js';
import Usuario from '../models/Usuario.js';

class AtivacaoController {
  async store(req, res) {
    const { token } = req.params;
    const usuarioToken = decodeActivationToken(token);
    const timeStamp = new Date().getTime() / 1000;

    if (usuarioToken) {
      const usuario = await Usuario.findByPk(usuarioToken.id, { raw: true });

      if (usuario.confirmado) {
        return res.status(400).json({ msg: 'Conta já confirmada!' });
      } else if (timeStamp > usuarioToken.exp) {
        sendEmail({ id: usuario.id, nome: usuario.nome, email: usuario.email });
        return res.status(400).json({
          msg: 'Token expirado. Você receberá um novo link para ativação em seu e-mail!',
        });
      } else {
        Usuario.update({ confirmado: 1 }, { where: { id: usuario.id } })
          .then(() => res.status(200).send())
          .catch(() => res.status(400).send());
      }
    } else {
      return res.status(400).json({ msg: 'Token inválido!' });
    }
  }
}

export default new AtivacaoController();
