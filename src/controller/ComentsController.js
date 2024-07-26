import pool from "../db.js";

//Crear un comentario
const create = async (q, r) => {// #swagger.tags = ['Comments']
    try {
        const { body: { post_id, user_id, coment_content } } = q;
        const sql = "INSERT INTO coments (post_id, user_id, coment_content) VALUES (?,?,?)";
        await pool.execute(sql, [post_id, user_id, coment_content]);
        r.status(200).json({ message: 'Comentario creado satisfactoriamente' });
    } catch (error) {
        r.status(error.status || 400).json({ error: error.massage });
    }
};

//Editar un comentario
const update = async (q, r) => {// #swagger.tags = ['Comments']
    try {
        const { body: { post_id, user_id, coment_content }, params: { id } } = q;
        const sql = "UPDATE coments SET post_id = ?, user_id = ?, coment_content = ? WHERE id_coments = ?";
        await pool.execute(sql, [post_id, user_id, coment_content, id]);
        r.status(200).json({ message: 'Comentario editado satisfactoriamente' });
    } catch (error) {
        r.status(error.status || 400).json({ error: error.massage });
    }
}

//Borrar un comentario
const destroy = async (q, r) => {// #swagger.tags = ['Comments']
    try {
        const { params: { id } } = q;
        const sql = "DELETE FROM coments WHERE id_coments = ?";
        await pool.execute(sql, [id]);
        r.status(200).json({ message: 'Comentario eliminado satisfactoriamente' });
    } catch (error) {
        r.status(error.status || 400).json({ error: error.massage });
    }
}

export { create, update, destroy }