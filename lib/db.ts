import mysql from "serverless-mysql";

export const db = mysql({
  config: {
    host: "104.198.181.76",
    database: "acquire_db",
    user: "root",
    password: "jibr",
  }
});

export const query = async <T = any>(
  q: string,
  values: (string | number)[] | string | number = []
): Promise<T> => {
  try {
    const results = await db.query<T>(q, values);
    await db.end();
    return results;
  } catch (e) {
    throw Error((e as Error).message);
  }
};
