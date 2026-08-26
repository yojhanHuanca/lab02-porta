const { Router } = require('express');
const { pool } = require('./db');

const router = Router();

function isValidEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

router.get('/usuarios', async (_req, res) => {
  try {
    const { rows } = await pool.query('SELECT * FROM usuarios ORDER BY id DESC');
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'No se pudo obtener la lista de usuarios' });
  }
});

router.get('/usuarios/:id', async (req, res) => {
  try {
    const { rows } = await pool.query('SELECT * FROM usuarios WHERE id = $1', [req.params.id]);
    if (rows.length === 0) return res.status(404).json({ error: 'Usuario no encontrado' });
    res.json(rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'No se pudo obtener el usuario' });
  }
});

router.post('/usuarios', async (req, res) => {
  const { nombre, correo, telefono, rol } = req.body ?? {};

  if (!nombre || !nombre.trim()) return res.status(400).json({ error: 'El nombre es obligatorio' });
  if (!correo || !isValidEmail(correo)) return res.status(400).json({ error: 'El correo no es válido' });

  try {
    const { rows } = await pool.query(
      `INSERT INTO usuarios (nombre, correo, telefono, rol) VALUES ($1, $2, $3, COALESCE($4, 'usuario')) RETURNING *`,
      [nombre.trim(), correo.trim().toLowerCase(), telefono?.trim() || null, rol?.trim() || null],
    );
    res.status(201).json(rows[0]);
  } catch (err) {
    if (err.code === '23505') return res.status(409).json({ error: 'Ya existe un usuario con ese correo' });
    console.error(err);
    res.status(500).json({ error: 'No se pudo crear el usuario' });
  }
});

router.put('/usuarios/:id', async (req, res) => {
  const { nombre, correo, telefono, rol } = req.body ?? {};

  if (!nombre || !nombre.trim()) return res.status(400).json({ error: 'El nombre es obligatorio' });
  if (!correo || !isValidEmail(correo)) return res.status(400).json({ error: 'El correo no es válido' });

  try {
    const { rows } = await pool.query(
      `UPDATE usuarios SET nombre = $1, correo = $2, telefono = $3, rol = COALESCE($4, rol)
       WHERE id = $5 RETURNING *`,
      [nombre.trim(), correo.trim().toLowerCase(), telefono?.trim() || null, rol?.trim() || null, req.params.id],
    );
    if (rows.length === 0) return res.status(404).json({ error: 'Usuario no encontrado' });
    res.json(rows[0]);
  } catch (err) {
    if (err.code === '23505') return res.status(409).json({ error: 'Ya existe un usuario con ese correo' });
    console.error(err);
    res.status(500).json({ error: 'No se pudo actualizar el usuario' });
  }
});

router.delete('/usuarios/:id', async (req, res) => {
  try {
    const { rowCount } = await pool.query('DELETE FROM usuarios WHERE id = $1', [req.params.id]);
    if (rowCount === 0) return res.status(404).json({ error: 'Usuario no encontrado' });
    res.status(204).send();
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'No se pudo eliminar el usuario' });
  }
});

module.exports = router;
