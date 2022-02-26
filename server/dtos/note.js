export default class NoteDto {
    constructor(model) {
        this.name = model.name;
        this.id = model._id;
        this.user_id = model.userId;
    }

}