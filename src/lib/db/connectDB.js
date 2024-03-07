import mongoose from "mongoose";

/*
몽구스 연결시 db 캐시. 이미 연결되어 있으면 요청안한다
*/
const DB_URI = process.env.MONGODB_URI || "";

let cached = global.mongoose;

if (!cached) {
    cached = global.mongoose = {
        conn: null,
        promise: null
    };
}

async function connectDB() {
    if (cached.conn)
        return cached.conn;

    if (!cached.promise) {
        cached.promise = mongoose
            .set({debug: true, strictQuery: false})
            .connect(`${DB_URI}`)
            .then((mongoose) => mongoose);
    }

    cached.conn = await cached.promise;
    return cached.conn;
}

export default connectDB;