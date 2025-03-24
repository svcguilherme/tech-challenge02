import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

export const authenticateJWT = (req, res, next) => {
  const token = req.header('Authorization');

  if (!token) {
    return res.status(401).json({ error: 'Acesso não permitido, verificar token/acesso!' });
  }

  try {
    const verified = jwt.verify(
      token.replace('Bearer ', ''),
      process.env.JWT_SECRET ||
        'a3f8d2b6c8e1a9f3d5c4b8a7e2f1d6c3a8b7d5e4c9f2a1b3c7d8e9f4b2a6c1d',
    );
    req.user = verified;
    next();
  } catch (error) {
    res.status(403).json({ error: 'Invalid token' });
  }
};

export const authorizeRoles = (...allowedRoles) => {
  return (req, res, next) => {
    if (!req.user || !allowedRoles.includes(req.user.role)) {
      return res
        .status(403)
        .json({ error: 'Acesso não permitido: Permissão insuficiente!!' });
    }
    next();
  };
};

export const generateToken = (user) => {
  return jwt.sign(
    { id: user._id, name: user.nome, role: user.role.papel },
    process.env.JWT_SECRET ||
      'a3f8d2b6c8e1a9f3d5c4b8a7e2f1d6c3a8b7d5e4c9f2a1b3c7d8e9f4b2a6c1d',
    {
      expiresIn: '1h',
    },
  );
};

export default authenticateJWT;
