'use server'

import connectDB from './connectDB';
import countriesModel from './models/countriesModel'
// import fs from 'fs';

/****************************************
 * @name CREATE
 ****************************************/
/**
 * @name createDB
 * @description 모델을 사용하여 새로운 데이터를 생성합니다.
 *  */
export async function createDB(){
    const countries = new countriesModel({
        country_code: 'KR',
        country_count: 1,
    });

    countries.save()
        .then(() => console.log('countriesModel created successfully'))
        .catch(err => console.error('Error creating countriesModel:', err));
}

/**
 * @name createAllDB
 * @description 로컬 JSON 데이터를 전체 삽입합니다.
 *  */
export async function createAllDB(){
    // JSON 파일 경로
    const jsonFilePath = './data/countries.json';

    // JSON 파일 읽기
    fs.readFile(jsonFilePath, 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading JSON file:', err);
            return;
        }

        try {
            const countries = JSON.parse(data); // JSON 데이터 파싱

            // MongoDB에 데이터 삽입
            countriesModel.insertMany(countries)
                .then(() => console.log('Data inserted successfully'))
                .catch((error) => console.error('Error inserting data:', error))
        } catch (error) {
            console.error('Error parsing JSON data:', error);
        }
    });
}

/****************************************
 * @name READ
 ****************************************/
/**
 * @name readDB
 * @description 모델을 사용하여 데이터를 조회합니다.
 *  */
export async function readDB(){
    return countriesModel.find()
    /* .then(countriesModel => console.log('countriesModel:', countriesModel))
    .catch(err => console.error('Error fetching countriesModel:', err)); */
}

/**
 * @name readoneDB
 * @description 모델을 사용하여 데이터를 한가지만 조회합니다.
 *  */
export async function readoneDB(){
    const findData = {
        country_code:"AM"
    }
    countriesModel.findOne(findData)
        .then(countriesModel => console.log('countriesModel:', countriesModel))
        .catch(err => console.error('Error fetching countriesModel:', err));
}

/****************************************
 * @name UPDATE
 ****************************************/
/**
 * @name updateDB
 * @description 모델을 사용하여 데이터를 업데이트합니다.
 *  */
export async function updateDB(){
    const updateData = {
        country_code:"IE",
        country_count:101
    }

    countriesModel.updateOne(updateData)
        .then(() => console.log('country updated successfully'))
        .catch(err => console.error('Error updating country:', err));
}
/**
 * @name updateoneDB
 * @description 모델을 사용하여 데이터를 업데이트합니다.
 *  */
export async function updateoneDB(isocode){
    const updateData = {
        // country_code:"KR",
        country_code:isocode,
    }

    countriesModel.findOne(updateData)
        .then((contry) => {
            if(!contry){
                console.log('contry not found')
                return
            }

            // 데이터 수정
            contry.country_count = contry.country_count+1

            // 수정된 데이터 저장
            contry.save()
                .then(() => console.log('contry updated successfully'))
                .catch(err => console.error('Error updating contry:', err));
        })
        .catch(err => console.error('Error updating country:', err));
}


/****************************************
 * @name DELETE
 ****************************************/
/**
 * @name deleteDB
 * @description 모델을 사용하여 데이터를 삭제합니다.
 *  */
export async function deleteDB(){
    const deleteData = {
        country_code:"IE",
    }

    countriesModel.deleteOne(deleteData)
    .then(() => console.log('country deleted successfully'))
    .catch(err => console.error('Error deleting country:', err));
}
/**
 * @name deleteAllDB
 * @description 전체 데이터를 삭제합니다.
 *  */
export async function deleteAllDB(){
    countriesModel.deleteMany({})
    .then(() => console.log('All data deleted successfully'))
    .catch(err => console.error('Error deleting data:', err));
}



/****************************************
 * @name ETC
 ****************************************/
/**
 * @name connectTestMongodb
 * @description 연결테스트
 *  */
const uri = process.env.MONGODB_URI;
export async function connectTestMongodb() {
    const mongooseDB = await connectDB()
    try {
        // MongoDB 연결 설정
        await mongooseDB.connect(uri, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            serverSelectionTimeoutMS: 5000 // 선택 사항: 서버 선택 시간 초과 설정
        });

        // 몽구스 연결 객체를 통해 데이터베이스에 연결된지 확인
        await mongooseDB.connection.db.admin().ping();
        console.log("You successfully connected to MongoDB!");
        // console.log("Pinged your deployment. You successfully connected to MongoDB!");
    } catch (error) {
        console.error("Failed to connect to MongoDB:", error);
    } finally {
        // 연결 종료
        // mongooseDB.connection.close();
    }
}

/**
 * @name theFirstCreate
 * @description 최초 한번 JSON 파일의 isocode 삽입하기 + 스키마 집어넣기
 *  */
export async function theFirstCreate(){
    /* const mongooseDB = await connectDB()
    db.connect(process.env.MONGODB_URI, {
        useNewUrlParser: true,
    })
    .then(() => {
        console.log("Connected to MongoDB")
    })
    .catch((err) => {
        console.log(err)
    })

    const db = mongooseDB.connection;
    db.on('error', console.error.bind(console, 'MongoDB connection error:'));
    db.once('open', () => {
        console.log('Connected to MongoDB');
    });

    const { countries } = await require('../../../public/data/countries.json');

    // countries.json 파일에서 각각의 요소를 Country 모델에 삽입
    countries.forEach(async (country) => {
        try {
            const newCountry = new schemaContries({
                country_code: country.country_code,
                country_count: 0,
            });
            await newCountry.save(); // MongoDB에 저장
            console.log(`Inserted ${country.country_code}`);
        } catch (error) {
            console.error(`Error inserting ${country.country_code}: ${error}`);
        }
    }); */
}

// import Country from './models/country'; // 데이터 모델 임포트
/**
 * @name insertAllDB
 * @description 최초 한번 JSON 파일의 isocode 삽입하기 + 스키마 집어넣기
 *  */
export async function insertAllDB() {
    let jsonFilePath = './public/data/countries.json'

    // JSON 파일 읽기
    fs.readFile(jsonFilePath, 'utf8', async (err, data) => {
        if (err) {
            console.error('Error reading JSON file:', err);
            return;
        }

        try {
            const countries = JSON.parse(data).countries; // JSON 데이터 파싱

            // "country_count"와 "index"를 추가
            const countriesWithCountAndIndex = countries.map((country, i) => ({
                country_index: country.country_index,
                country_code:country.country_code,
                country_name:country.country_name,
                country_count: country.country_count,
            }));

            // 수정된 데이터를 JSON 형식으로 변환
            const newData = JSON.stringify({ countries: countriesWithCountAndIndex }, null, 2);

            // JSON 파일에 쓰기
            fs.writeFile(jsonFilePath, newData, 'utf8', async (err) => {
                if (err) {
                    console.error('Error writing to JSON file:', err);
                    return;
                }
                console.log('country_count and index added to countries.json successfully');

                // DB에 쓰기
                for (const country of countriesWithCountAndIndex) {
                    try {
                        // MongoDB에 삽입할 객체 생성
                        const newCountry = new countriesModel({
                            country_index: country.country_index,
                            country_code: country.country_code,
                            country_name: country.country_name,
                            country_count: country.country_count,
                        });
                        await newCountry.save(); // MongoDB에 저장
                        console.log(`Inserted ${country.country_code}`);
                    } catch (error) {
                        console.error(`Error inserting ${country.country_code}: ${error}`);
                    }
                }
            });
        } catch (error) {
            console.error('Error parsing JSON data:', error);
        }
    })
}