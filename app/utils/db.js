import { sql } from "@vercel/postgres";

const getCoinData = async () => {
    const result = await sql`SELECT * FROM table_name`;
    return result;
};

export { getCoinData };