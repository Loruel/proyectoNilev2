import pool from "../db.js";

//Mostrar todos los posts
const show = async (q, r) => {// #swagger.tags = ['Posts']
    try {
        const sql =
            `SELECT 
        p.id_post, 
        p.user_id AS post_user_id, 
        p.category_id,
        p.pos_title, 
        p.post_content,
        c.id_coments,
        c.user_id AS coment_user_id,
        c.coment_content 
        FROM post p 
        LEFT JOIN coments c 
        ON p.id_post = c.post_id`;
        const [rs] = await pool.execute(sql);
        r.status(200).json(rs);
    } catch (error) {
        r.status(error.status || 400).json({ error: error.massage });
    }
};

//Crear un post
const create = async (q, r) => {// #swagger.tags = ['Posts']
    try {
        const { body: { user_id, category_id, pos_title, post_content } } = q;
        const sql = "INSERT INTO post (user_id, category_id, pos_title, post_content) VALUES (?,?,?,?)";
        await pool.execute(sql, [user_id, category_id, pos_title, post_content]);
        r.status(200).json({ message: 'Post creado satisfactoriamente' });
    } catch (error) {
        r.status(error.status || 400).json({ error: error.message });
    }
};

//Editar un post
const update = async (q, r) => {// #swagger.tags = ['Posts']
    try {
        const { body: { user_id, category_id, pos_title, post_content }, params: { id } } = q;
        const sql = "UPDATE post SET user_id = ?, category_id = ?, pos_title = ? ,post_content = ? WHERE id_post = ?";
        await pool.execute(sql, [user_id, category_id, pos_title, post_content, id]);
        r.status(200).json({ message: 'Post editado satisfactoriamente' });
    } catch (error) {
        r.status(error.status || 400).json({ error: error.message });
    }
};

//Eliminar un post
const destroy = async (q, r) => {// #swagger.tags = ['Posts']
    try {
        const { params: { id } } = q;
        const sql = "DELETE FROM post WHERE id_post = ?";
        await pool.execute(sql, [id]);
        r.status(200).json({ message: 'Post eliminado satisfactoriamente' });
    } catch (error) {
        r.status(error.status || 400).json({ error: error.message });
    }
};

//Filtra por categoria
const showCategory = async (q, r) => {// #swagger.tags = ['Posts']
    try {
        const { params: { id } } = q
        const sql =
            `SELECT 
        p.id_post, 
        p.user_id AS post_user_id, 
        p.category_id, 
        p.pos_title,
        p.post_content,
        c.id_coments,
        c.user_id AS coment_user_id,
        c.coment_content 
        FROM post p 
        LEFT JOIN coments c 
        ON p.id_post = c.post_id
        WHERE p.category_id = ?`;
        const [rs] = await pool.execute(sql, [id]);
        r.status(200).json(rs);
    } catch (error) {
        r.status(error.status || 400).json({ error: error.massage });
    }
};

//Filtra por titulo
const showTitle = async (q, r) => {// #swagger.tags = ['Posts']
    try {
        const { params: { title } } = q
        const sql =
            `SELECT 
        p.id_post, 
        p.user_id AS post_user_id, 
        p.category_id, 
        p.pos_title,
        p.post_content,
        c.id_coments,
        c.user_id AS coment_user_id,
        c.coment_content 
        FROM post p 
        LEFT JOIN coments c 
        ON p.id_post = c.post_id
        WHERE p.pos_title LIKE ?`;
        const [rs] = await pool.execute(sql, [`%${title}%`]);
        r.status(200).json(rs);
    } catch (error) {
        r.status(error.status || 400).json({ error: error.massage });
    }
};

export { show, create, update, destroy, showCategory, showTitle }