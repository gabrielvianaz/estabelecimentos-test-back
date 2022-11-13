import { compare } from 'bcrypt';

export default async function verifyPassword(senha, hashSenha) {
  return await compare(senha, hashSenha);
}
