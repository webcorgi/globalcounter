import mongoose from 'mongoose'
import Countries from '@/lib/models/contries'

/**
 * @name connectTestMongodb
 * @description 연결테스트
 *  */
const uri = process.env.MONGO_DB;
export async function connectTestMongodb() {
    try {
        // MongoDB 연결 설정
        await mongoose.connect(uri, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            serverSelectionTimeoutMS: 5000 // 선택 사항: 서버 선택 시간 초과 설정
        });

        // 몽구스 연결 객체를 통해 데이터베이스에 연결된지 확인
        await mongoose.connecticontron.db.admin().ping();
        console.log("Pinged your deployment. You successfully connected to MongoDB!");
    } catch (error) {
        console.error("Failed to connect to MongoDB:", error);
    } finally {
        // 연결 종료
        mongoose.connection.close();
    }
}


/**
 * @name theFirstCreate
 * @description 최초 한번 JSON 파일의 isocode 삽입하기 + 스키마 집어넣기
 *  */
export async function theFirstCreate(){
    mongoose.connect(process.env.MONGO_DB, {
        useNewUrlParser: true,
    })
    .then(() => {
        console.log("Connected to MongoDB")
    })
    .catch((err) => {
        console.log(err)
    })

    const db = mongoose.connection;
    db.on('error', console.error.bind(console, 'MongoDB connection error:'));
    db.once('open', () => {
        console.log('Connected to MongoDB');
    });

    const { countries } = await require('../../public/data/countries.json');

    // countries.json 파일에서 각각의 요소를 Country 모델에 삽입
    countries.forEach(async (country) => {
        try {
            const newCountry = new Countries({
                country_code: country.country_code,
                country_count: 0,
            });
            await newCountry.save(); // MongoDB에 저장
            console.log(`Inserted ${country.country_code}`);
        } catch (error) {
            console.error(`Error inserting ${country.country_code}: ${error}`);
        }
    });
}