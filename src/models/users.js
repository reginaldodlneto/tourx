import mongoose from 'mongoose'

const schema = new mongoose.Schema({
  name: {
    type: 'string',
    required: [true, 'O campo "nome" é obrigatório']
  },
  email: {
    type: 'string',
    required: [true, 'O campo "e-mail" é obrigatório']
  },
  password: {
    type: 'string',
    required: [true, 'O campo "senha" é obrigatório']
  }
})

export default mongoose.models.users || mongoose.model('users', schema)
