import dotenv from "dotenv";
dotenv.config();

import {testGemini} from"./aiTest";
import app from './app';

const PORT = process.env.PORT || 3000;

testGemini();

app.listen(PORT, () => {
  console.log(`✅ GrindGrid server running on port ${PORT}`);
});
