import jwt from 'jsonwebtoken';

export default function getIdByToken(req, res, next) {
  if (!req.headers.authorization)
    return res.status(400).json({
      msg: 'É obrigatório o envio do token nos headers da requisição!',
    });
  else
    try {
      const token = req.headers.authorization.replace('Bearer ', '');
      const decoded = jwt.verify(token, process.env.SECRET);

      req.usuarioId = decoded.id;
      next();
    } catch {
      return res.status(400).json({ msg: 'Token inválido' });
    }
}
