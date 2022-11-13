import Estabelecimento from '../models/Estabelecimento.js';

class EstabelecimentoController {
  async store(req, res) {
    const {
      nome,
      tipo,
      cep,
      logradouro,
      numero,
      bairro,
      cidade,
      estado,
      latitude,
      longitude,
    } = req.body;

    if (
      !nome ||
      !tipo ||
      !cep ||
      !logradouro ||
      !numero ||
      !bairro ||
      !cidade ||
      !estado ||
      !latitude ||
      !longitude
    ) {
      return res.status(400).json({
        msg: 'Os campos nome, tipo, cep, logradouro, numero, bairro, cidade, estado, latitude e longitude devem ser preenchidos!',
      });
    }

    Estabelecimento.create({
      nome,
      tipo,
      cep,
      logradouro,
      numero,
      bairro,
      cidade,
      estado,
      latitude,
      longitude,
      usuarioId: req.usuarioId,
    })
      .then(() => res.status(201).send())
      .catch(() => res.status(400).send());
  }

  async index(req, res) {
    const estabelecimentos = await Estabelecimento.findAll({
      raw: true,
      order: [['id', 'DESC']],
      where: {
        usuarioId: req.usuarioId,
      },
    });

    return res.status(200).json(estabelecimentos);
  }

  async show(req, res) {
    const { id } = req.params;
    const estabelecimento = await Estabelecimento.findByPk(id, { raw: true });

    if (!estabelecimento)
      return res
        .status(400)
        .json({ msg: 'Não existe estabelecimento com esse ID!' });

    if (estabelecimento.usuarioId === req.usuarioId)
      return res.status(200).json(estabelecimento);
    else
      return res
        .status(401)
        .json({ msg: 'Estabelecimento não pertence a esse usuário!' });
  }

  async update(req, res) {
    const {
      nome,
      tipo,
      cep,
      logradouro,
      numero,
      bairro,
      cidade,
      estado,
      latitude,
      longitude,
    } = req.body;
    const { id } = req.params;
    const estabelecimento = await Estabelecimento.findByPk(id, { raw: true });

    if (
      !nome ||
      !tipo ||
      !cep ||
      !logradouro ||
      !numero ||
      !bairro ||
      !cidade ||
      !estado ||
      !latitude ||
      !longitude
    ) {
      return res.status(400).json({
        msg: 'Os campos nome, tipo, cep, logradouro, numero, bairro, cidade, estado, latitude e longitude devem ser preenchidos!',
      });
    }

    if (!estabelecimento)
      return res
        .status(400)
        .json({ msg: 'Não existe estabelecimento com esse ID!' });

    if (estabelecimento.usuarioId === req.usuarioId) {
      Estabelecimento.update(
        {
          nome,
          tipo,
          cep,
          logradouro,
          numero,
          bairro,
          cidade,
          estado,
          latitude,
          longitude,
        },
        { where: { id } }
      )
        .then(() => res.status(200).send())
        .catch(() => res.status(400).send());
    } else
      return res
        .status(401)
        .json({ msg: 'Estabelecimento não pertence a esse usuário!' });
  }

  async delete(req, res) {
    const { id } = req.params;
    const estabelecimento = await Estabelecimento.findByPk(id, { raw: true });

    if (!estabelecimento)
      return res
        .status(400)
        .json({ msg: 'Não existe estabelecimento com esse ID!' });

    if (estabelecimento.usuarioId === req.usuarioId)
      Estabelecimento.destroy({
        where: {
          id,
        },
      })
        .then(() => res.status(200).send())
        .catch(() => res.status(400).send());
    else
      return res
        .status(401)
        .json({ msg: 'Estabelecimento não pertence a esse usuário!' });
  }
}

export default new EstabelecimentoController();
