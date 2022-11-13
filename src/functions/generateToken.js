import jwt from 'jsonwebtoken';

export default function generateToken(id) {
  const token = jwt.sign({ id }, process.env.SECRET, { expiresIn: 86400 });

  return token;
}
