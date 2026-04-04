require("dotenv").config();
const mongoose = require("mongoose");
const User = require("./src/models/User");

async function migrate() {
  try {
    console.log("Connecting to DB:", process.env.MONGO_URI);
    await mongoose.connect(process.env.MONGO_URI);

    
    const faculties = await User.find({ role: "faculty", facultyId: { $exists: false } });
    console.log(`Found ${faculties.length} faculty users without IDs. Migrating...`);
    
    for (let fac of faculties) {
       let isUnique = false;
       let facultyId;
       while (!isUnique) {
         facultyId = `FAC-${Math.floor(1000 + Math.random() * 9000)}`;
         const existing = await User.findOne({ facultyId });
         if (!existing) isUnique = true;
       }
       fac.facultyId = facultyId;
       await fac.save();
       console.log(`Assigned ${facultyId} to ${fac.email}`);
    }
    
    console.log("Migration complete!");
  } catch (err) {
    console.error("Migration failed:", err);
  } finally {
    process.exit(0);
  }
}

migrate();
