import { Pool } from 'pg';

const pool = new Pool();

export const query = async (text: string, params: string[]) => {
  const queryResult = await pool.query(text, params);
  return queryResult.rows;
};

export const insertInto = async (tableName: string, payload: Object) => {
  const dataInfo = extractObjectInfo(payload);
  const rows = await query(
    `INSERT INTO ${tableName} (${dataInfo.keys}) VALUES (${dataInfo.valueOrder}) RETURNING *;`,
    dataInfo.values
  );
  return rows[0];
};

export const selectAll = async (tableName: string) => {
  const queryResult = await pool.query(`SELECT * FROM ${tableName}`);
  const rows = queryResult.rows;
  return rows;
};

export const selectById = async (tableName: string, id: string) => {
  const queryResult = await query(`SELECT * FROM ${tableName} WHERE id = $1`, [
    id,
  ]);
  return queryResult[0];
};

export const updateById = async (
  tableName: string,
  id: string,
  payload: Object
) => {
  const payloadInfo = updateStatementKeys(payload);
  await query(
    `UPDATE ${tableName}
    SET ${payloadInfo.keys}
    WHERE id = ${id};`,
    payloadInfo.values
  );

  return await selectById(tableName, id);
};

export const deleteById = async (tableName: string, id: string) => {
  const queryResult = await query(`DELETE FROM ${tableName} WHERE id = $1`, [
    id,
  ]);
  return queryResult[0];
};

// Helper methods

const extractObjectInfo = (data: Object) => {
  const keys: string[] = Object.keys(data);
  const values = Object.values(data);
  const valueOrder: string[] = values.map((v, i) => `$${i + 1}`);
  return {
    keys: keys.join(', '),
    values: values,
    valueOrder: valueOrder.join(', '),
  };
};

const updateStatementKeys = (obj: Object) => {
  const keys: string[] = Object.keys(obj).map((k, i) => {
    return `${k} = $${i + 1}`;
  });
  const values = Object.values(obj);
  return {
    keys: keys.join(', '),
    values: values,
  };
};
