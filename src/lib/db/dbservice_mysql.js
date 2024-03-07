// Import necessary modules
import { createPool } from 'mysql2'

// MySQL database configuration
const pool = createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    port:3306
})

pool.getConnection((err, conn) => {
    if (err) console.log('Error connecting to db...')
    else console.log('Connected to db...!')
    conn.release()
})

// COMMON
export const executeQuery = (query, arrParams) => {
    return new Promise((resolve, reject) => {
        try {
            pool.query(query, arrParams, (err, data) => {
                if (err) {
                    console.log('Error in executing the query')
                    reject(err)
                }
                console.log('------db.jsx------')
                //console.log(data)
                resolve(data)
            })
        } catch (err) {
            reject(err)
        }
    })
}


// GET
export async function getQuery(){
    try {
        const sql = 'select * from globalcount'
        const data = await executeQuery(sql, '')
        const getdata = JSON.parse(JSON.stringify(data))
        return getdata
        // console.log(getdata)
    }catch(error){
        console.error('Error updating global count:', error);
    }
}


// UPDATE
// 실행될때마다 해당 국가 1씩 증가
export async function updateQuery(countryIsoCode) {
    try {
        const sql = `
            INSERT INTO globalcount (country_name)
            VALUES (?)
            ON DUPLICATE KEY UPDATE count = count + 1;
        `;
        const data = await executeQuery(sql, [countryIsoCode]);
        const getdata = JSON.parse(JSON.stringify(data))
        return getdata
        // console.log(`Updated count for country: ${countryIsoCode}`);
    } catch (error) {
        console.error('Error updating global count:', error);
    }
}