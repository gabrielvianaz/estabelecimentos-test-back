import jwt from 'jsonwebtoken';

export default function decodeActivationToken(token) {
  try {
    const decoded = jwt.verify(token, process.env.SECRET, {
      ignoreExpiration: true,
    });
    return { id: decoded.id, exp: decoded.exp };
  } catch {
    return false;
  }
}
