import mongoose from 'mongoose';

const NoteSchema = new mongoose.Schema({
    name: { type: String, required: true },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
})

NoteSchema.virtual('id').get(function(){
    return this._id.toHexString();
});

NoteSchema.set('toJSON', {
    virtuals: true
});

export default mongoose.model('MyNote', NoteSchema);