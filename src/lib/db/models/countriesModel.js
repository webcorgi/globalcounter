import mongoose from 'mongoose';

const countrySchema = new mongoose.Schema({
    country_index:{
        type: Number,
        required: true,
        unique: true,
    },
    country_code: {
        type: String,
        required: true,
        unique: true,
    },
    country_name: {
        type: String,
        required: true,
    },
    country_count: {
        type: Number,
        required: true
    },
})

let countriesModel;

try {
    // 이미 정의된 모델을 사용하거나, 새로운 모델을 정의합니다.
    countriesModel = mongoose.models.countries || mongoose.model('countries', countrySchema);
} catch (error) {
    // 모델이 정의되지 않은 경우, 새로운 모델을 정의합니다.
    countriesModel = mongoose.model('countries', countrySchema);
}

export default countriesModel;