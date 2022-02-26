import jwt from 'jsonwebtoken';
import tokenModel from '../models/token.js';

class TokenService {
    generateTokens(payload) {
        const accessToken = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {
            expiresIn: '15m'
        });
        const refreshToken = jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET, {
            expiresIn: '15d'
        });

        return {
            accessToken,
            refreshToken
        };
    }

    validateAccessToken(token) {
        try {
            const userData = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
            return userData;
        } catch(e) {
            return null;
        }
    }

    validateRefreshToken(token) {
        try {
            const userData = jwt.verify(token, process.env.REFRESH_TOKEN_SECRET);
            return userData;
        } catch(e) {
            return null;
        }
    }

    async saveToken(userId, refreshToken) {
        const tokenData = await tokenModel.findOne({ user: userId });
        if (tokenData) {
            tokenData.refreshToken = refreshToken;
            return tokenData.save();
        }
        return await tokenModel.create({
            user: userId,
            refreshToken,
        });
    }

    async removeToken(refreshToken) {
        const tokenData = await tokenModel.deleteOne({ refreshToken });
        return tokenData;
    }

    async findToken(refreshToken) {
        const tokenData = await tokenModel.findOne({ refreshToken });
        return tokenData;
    }
}

export default new TokenService();