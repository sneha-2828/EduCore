const authRoutes = require("./src/routes/authRoutes");
const protectedRoutes = require("./src/routes/protectedRoutes");
const departmentRoutes = require("./src/routes/departmentRoutes");
const yearRoutes = require("./src/routes/yearRoutes");
const semesterRoutes = require("./src/routes/semesterRoutes");
const subjectRoutes = require("./src/routes/subjectRoutes");
const unitRoutes = require("./src/routes/unitRoutes");

console.log(
  "authRoutes type:",
  typeof authRoutes,
  authRoutes && authRoutes.constructor && authRoutes.constructor.name,
);
console.log(
  "protectedRoutes type:",
  typeof protectedRoutes,
  protectedRoutes &&
    protectedRoutes.constructor &&
    protectedRoutes.constructor.name,
);
console.log(
  "departmentRoutes type:",
  typeof departmentRoutes,
  departmentRoutes &&
    departmentRoutes.constructor &&
    departmentRoutes.constructor.name,
);
console.log("departmentRoutes keys:", Object.keys(departmentRoutes || {}));
console.log("departmentRoutes raw:", departmentRoutes);
try {
  console.log(
    "departmentRoutes resolved path:",
    require.resolve("./src/routes/departmentRoutes"),
  );
} catch (e) {
  console.error("resolve error", e);
}
console.log(
  "yearRoutes type:",
  typeof yearRoutes,
  yearRoutes && yearRoutes.constructor && yearRoutes.constructor.name,
);
console.log(
  "semesterRoutes type:",
  typeof semesterRoutes,
  semesterRoutes &&
    semesterRoutes.constructor &&
    semesterRoutes.constructor.name,
);
console.log(
  "subjectRoutes type:",
  typeof subjectRoutes,
  subjectRoutes && subjectRoutes.constructor && subjectRoutes.constructor.name,
);
console.log(
  "unitRoutes type:",
  typeof unitRoutes,
  unitRoutes && unitRoutes.constructor && unitRoutes.constructor.name,
);

try {
  const deptCtrl = require("./src/controllers/departmentController");
  console.log("departmentController keys:", Object.keys(deptCtrl || {}));
} catch (e) {
  console.error("departmentController require error:", e);
}
