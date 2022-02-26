import { validationResult } from'express-validator';
import ApiError from'../exceptions/api-error.js';
import NoteModal from"../models/note.js";
import NoteDto from"../dtos/note.js";

class NoteController {
    async create(req, res, next) {
        try {
            const user = req.user;
            if (!user) {
                return next(ApiError.NotFound('Пользователь не найден'));
            }

            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return next(ApiError.ValidationError('Ошибка при валидации', errors.array()));
            }
            const { name } = req.body;
            const data = {
                name,
                userId: user.id,
            };
            const note = await NoteModal.create(data);
            const noteDto = new NoteDto(note);

            return res.json({
                status: 'success',
                data: noteDto
            });
        } catch(e) {
            return res.json({
                status: "error",
                data: JSON.stringify(e),
            });
        }
    }

    async delete(req, res, next) {
        try {
            const user = req.user;

            if (!user) {
                return next(ApiError.NotFound('Пользователь не найден'));
            }
            const noteId = req.params.id;
            const note = await NoteModal.findById(noteId);

            if (!note) {
                return next(ApiError.NotFound('Заметка не найдена'));
            }

            // Todo: проверка прав на удаление
            // if (note.user._id !== user._id) {
            //     return next(ApiError.Forbidden('Нет прав на удаление заметки'));
            // }

            note.remove();
            return res.json({status: "success", data: note,
            });
        } catch(e) {
            return next(ApiError.BadRequest(JSON.stringify(e)));
        }
    }

    async show(req, res) {
        try {
            const folders = await NoteModal.findOne().exec();

            return res.json({
                status: "success",
                data: folders,
            });
        } catch(e) {
            return res.json({
                status: "error",
                data: JSON.stringify(e),
            });
        }
    }

    async index(req, res) {
        try {
            NoteModal.find().populate('userId').then(notes => {
                const buildNotes = notes.map(note => {
                    return note.toJSON();
                })

                return res.json({
                    status: "success",
                    data: buildNotes,
                });
            });
        } catch(e) {
            return res.json({
                status: "error",
                data: JSON.stringify(e),
            });
        }
    }
}

export default new NoteController();