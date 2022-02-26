import UserModal from '../models/user.js';
import bcrypt from'bcrypt';
import { v4 } from'uuid';
import mailService from"./mail.js";
import tokenService from"./token.js";
import UserDto from"../dtos/user.js";
import ApiError from'../exceptions/api-error.js';

class UserService {
    async registration(name, email, password) {
        const candidate = await UserModal.findOne({ email });

        if (candidate) {
            throw ApiError.BadRequest('User with this email already exists');
        }
        const hashPassword = await bcrypt.hash(password, 10);
        const activationLink = v4();
        const user = await UserModal.create({ name, email, password: hashPassword, activationLink });
        // TODO: отправить письмо на почту
        // await mailService.sendActivationMail(email, `${process.env.API_URL}/api/v1/activate/${activationLink}`);

        const userDto = new UserDto(user);
        const tokens = tokenService.generateTokens({ ...userDto });
        await tokenService.saveToken(userDto.id, tokens.refreshToken);

        return {
            ...tokens,
            user: userDto,
        }
    }

    async activate(activationLink) {
        const user = await UserModal.findOne({ activationLink });
        if (!user) {
            throw ApiError.BadRequest('Некорректная ссылка активации');
        }
        user.isActivated = true;
        await user.save();
    }

    async login(email, password) {
        const user = await UserModal.findOne({ email });
        if (!user) {
            throw ApiError.BadRequest('Пользователь с таким email не найден');
        }
        const isPassEquals = await bcrypt.compare(password, user.password);
        if (!isPassEquals) {
            throw ApiError.BadRequest('Некорректный пароль');
        }
        const userDto = new UserDto(user);
        const tokens = tokenService.generateTokens({ ...userDto });

        await tokenService.saveToken(userDto.id, tokens.refreshToken);

        return {
            ...tokens,
            user: userDto,
        }
    }

    async logout(refreshToken) {
        return tokenService.removeToken(refreshToken);
    }

    async refresh(refreshToken) {
        if (!refreshToken) {
            throw ApiError.UnauthorizedError();
        }
        const userData = tokenService.validateRefreshToken(refreshToken);
        const tokenFromDb = await tokenService.findToken(refreshToken);
        if (!userData || !tokenFromDb) {
            throw ApiError.UnauthorizedError();
        }
        const user = await UserModal.findById(userData.id);
        const userDto = new UserDto(user);
        const tokens = tokenService.generateTokens({ ...userDto });

        await tokenService.saveToken(userDto.id, tokens.refreshToken);

        return {
            ...tokens,
            user: userDto,
        }
    }
}

export default new UserService();