import pool from "../db.js"

//Validar administrador
const validateAdmin = async (user_id) => {
    const sql = "SELECT rol_id FROM users WHERE id_user = ?";
    const [rs] = await pool.execute(sql, [user_id]);
    if (rs[0].rol_id !== 1) {
        throw { message: 'Usuario no autorizado', status: 401 };
    }
};

//Mostrar todas las categorias(ADMIN)
const show = async (q, r) => {// #swagger.tags = ['Category']
    try {
        await validateAdmin(q.headers.user_id);
        const sql = "SELECT * FROM category";
        const [rs] = await pool.execute(sql);
        r.status(200).json(rs);
    } catch (error) {
        r.status(error.status || 400).json({ error: error.message });
    }
};

//Crear un categoria(ADMIN)
const create = async (q, r) => {// #swagger.tags = ['Category']
    try {
        await validateAdmin(q.headers.user_id);
        const { body: { category_name } } = q;
        const sql = "INSERT INTO category (category_name) VALUES (?)";
        await pool.execute(sql, [category_name]);
        r.status(200).json({ message: 'Categoria creada satisfactoriamente' });
    } catch (error) {
        r.status(error.status || 400).json({ error: error.message });
    }
};

//Editar una categoria(ADMIN)
const update = async (q, r) => {// #swagger.tags = ['Category']
    try {
        await validateAdmin(q.headers.user_id);
        const { body: { category_name }, params: { id } } = q;
        const sql = "UPDATE category SET category_name = ? WHERE id_category = ?";
        await pool.execute(sql, [category_name, id]);
        r.status(200).json({ message: 'Categorua editada satisfactoriamente' });
    } catch (error) {
        r.status(error.status || 400).json({ error: error.message });
    }
};

//Eliminar una categoria(ADMIN)
const destroy = async (q, r) => {// #swagger.tags = ['Category']
    try {
        await validateAdmin(q.headers.user_id);

        const { params: { id } } = q;
        const sql = "DELETE FROM category WHERE id_category = ?";

        await pool.execute(sql, [id]);
        r.status(200).json({ message: 'Categoria eliminada satisfactoriamente' });
    } catch (error) {
        r.status(error.status || 400).json({ error: error.message });
    }
};

export { create, show, update, destroy };