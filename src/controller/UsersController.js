import pool from "../db.js";

//Validar administrador
const validateAdmin = async (user_id) => {
    const sql = "SELECT rol_id FROM users WHERE id_user = ?";
    const [rs] = await pool.execute(sql, [user_id]);
    if (rs[0].rol_id !== 1) {
        throw { message: 'Usuario no autorizado', status: 401 };
    }
};

//Mostrar todos los usuarios (ADMIN)
const show = async (q, r) => {// #swagger.tags = ['Users']
    try {
        await validateAdmin(q.headers.user_id);
        const sql = "SELECT * FROM users";
        const [rs] = await pool.execute(sql);
        r.status(200).json(rs);
    } catch (error) {
        r.status(error.status || 400).json({ error: error.message });
    }
};

//Crear un usuario
const create = async (q, r) => {// #swagger.tags = ['Users']
    try {
        const { body: { rol_id, user_name, user_email, user_password } } = q;
        const sql = "INSERT INTO users (rol_id, user_name, user_email, user_password) VALUES (?,?,?,?)";
        await pool.execute(sql, [rol_id, user_name, user_email, user_password]);
        r.status(200).json({ message: 'Usuario creado satisfactoriamente' });
    } catch (error) {
        r.status(error.status || 400).json({ error: error.massage });
    }
};

//Editar usuario
const update = async (q, r) => {// #swagger.tags = ['Users']
    try {
        const { body: { rol_id, user_name, user_email, user_password }, params: { id } } = q;
        const sql = "UPDATE users SET rol_id = ?, user_name = ?, user_email = ?, user_password = ? WHERE id_user = ?";
        await pool.execute(sql, [rol_id, user_name, user_email, user_password, id]);
        r.status(200).json({ message: 'Usuario editado satisfactoriamente' });
    } catch (error) {
        r.status(error.status || 400).json({ error: error.message });
    }
};

//Eliminar usuario
const destroy = async (q, r) => {// #swagger.tags = ['Users']
    try {
        const { headers: { user_id }, params: { id } } = q;
        if (user_id !== id) {
            throw { message: 'No puedes eliminar el perfil de otra persona', status: 401 };
        };
        const sql = "DELETE FROM users WHERE id_user = ?";
        await pool.execute(sql, [id]);
        r.status(200).json({ message: 'Te vamos a extrañar, Usuario eliminado satisfactoriamente' });
    } catch (error) {
        r.status(error.status || 400).json({ error: error.message });
    }
};

export { show, create, update, destroy };