import pool from '../config/db.js';

export const getFactions = async (req, res, next) => {
  try {
    const result = await pool.query(
      'SELECT id, name, color, analysis, icon, created_at, updated_at FROM factions ORDER BY created_at DESC'
    );

    res.status(200).json({
      success: true,
      data: result.rows.map(row => ({
        ...row,
        icon: typeof row.icon === 'string' ? JSON.parse(row.icon) : row.icon,
      })),
      message: 'Factions retrieved successfully',
    });
  } catch (error) {
    next(error);
  }
};

export const getFactionById = async (req, res, next) => {
  try {
    const { id } = req.params;

    const result = await pool.query(
      'SELECT id, name, color, analysis, icon, created_at, updated_at FROM factions WHERE id = $1',
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Faction not found',
      });
    }

    const faction = result.rows[0];
    res.status(200).json({
      success: true,
      data: {
        ...faction,
        icon: typeof faction.icon === 'string' ? JSON.parse(faction.icon) : faction.icon,
      },
      message: 'Faction retrieved successfully',
    });
  } catch (error) {
    next(error);
  }
};

export const createFaction = async (req, res, next) => {
  try {
    const { name, color, analysis, icon } = req.body;

    const result = await pool.query(
      'INSERT INTO factions (name, color, analysis, icon) VALUES ($1, $2, $3, $4) RETURNING id, name, color, analysis, icon, created_at, updated_at',
      [name, color, analysis, JSON.stringify(icon)]
    );

    const faction = result.rows[0];
    res.status(201).json({
      success: true,
      data: {
        ...faction,
        icon: typeof faction.icon === 'string' ? JSON.parse(faction.icon) : faction.icon,
      },
      message: 'Faction created successfully',
    });
  } catch (error) {
    next(error);
  }
};

export const updateFaction = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name, color, analysis, icon } = req.body;

    // Check if faction exists
    const checkResult = await pool.query('SELECT id FROM factions WHERE id = $1', [id]);
    if (checkResult.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Faction not found',
      });
    }

    const result = await pool.query(
      'UPDATE factions SET name = $1, color = $2, analysis = $3, icon = $4, updated_at = CURRENT_TIMESTAMP WHERE id = $5 RETURNING id, name, color, analysis, icon, created_at, updated_at',
      [name, color, analysis, JSON.stringify(icon), id]
    );

    const faction = result.rows[0];
    res.status(200).json({
      success: true,
      data: {
        ...faction,
        icon: typeof faction.icon === 'string' ? JSON.parse(faction.icon) : faction.icon,
      },
      message: 'Faction updated successfully',
    });
  } catch (error) {
    next(error);
  }
};

export const deleteFaction = async (req, res, next) => {
  try {
    const { id } = req.params;

    // Check if faction exists
    const checkResult = await pool.query('SELECT id FROM factions WHERE id = $1', [id]);
    if (checkResult.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Faction not found',
      });
    }

    await pool.query('DELETE FROM factions WHERE id = $1', [id]);

    res.status(200).json({
      success: true,
      message: 'Faction deleted successfully',
    });
  } catch (error) {
    next(error);
  }
};
