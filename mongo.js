import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const url = process.env.MONGODB_URI;

if(!url) {
  console.log('MONGODB_URI missing');
  process.exit(1);
}

mongoose.set('strictQuery', false);
mongoose.connect(url)
 .then(() => {
    console.log('Connected to MongoDB');
 })
 .catch(error => {
    console.error('Error connecting to MongoDB', error.message);
    process.exit(1);
  });

    const noteSchema = new mongoose.Schema({
      content: String,
      important: Boolean,
    });
  
    const Note = mongoose.model('Note', noteSchema);

    if (process.argv.length === 2) {
      Note.find({}).then(result => {
        console.log('Notes:');
        result.forEach(note => {
        console.log(note)
      })
      mongoose.connection.close()
    })
  } else if (process.argv.length === 4) {
      const content = process.argv[2];
      const important = process.argv[3] === 'true';
    
    const note = new Note({
      content,
      important,
    });

    note.save().then(() => {
      console.log(`Added new note: ${content} , important: ${important}`);
      mongoose.connection.close();
    });
    } else {
      console.log('Invalid number of arguments. provide either 2 or 4 arguments');
      mongoose.connection.close();
      process.exit(1);
    }
