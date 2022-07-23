const { skilset, keyRoles, companies, roles } = require("./src/config");
const names = require("american-sounding-names");

var allInfo = {};

var name = names({ gender: "male" });

// Title
var title = "",
  flag = true;
while (flag) {
  var subTitle = skilset[Math.floor(Math.random() * skilset.length)];
  if ((title + subTitle).length < 70) {
    if (title.indexOf(subTitle) === -1) {
      title += subTitle;
    }
  } else {
    flag = false;
  }
}
title = title.slice(0, title.length - 3);

// Work Company & Experience
var allworkedRole = [],
  perRandom = [1, 2, 3],
  roleNum = [3, 4, 5, 6, 7];
for (let j = 0; j < perRandom[Math.floor(Math.random() * 3)]; j++) {
  var workedRole = [];

  while (workedRole.length <= roleNum[Math.floor(Math.random() * 5)]) {
    let workFlag = false;
    var workRole = keyRoles[Math.floor(Math.random() * keyRoles.length)];
    for (let k = 0; k < workedRole.length; k++) {
      if (workedRole[k] === workRole) {
        workFlag = true;
      }
    }
    if (workFlag === false) {
      workedRole.push(workRole);
    }
  }

  var company = companies[Math.floor(Math.random() * companies.length)];
  var role = roles[Math.floor(Math.random() * roles.length)];

  allworkedRole.push({
    company,
    role,
    workedRole,
  });
}

var allSkills = [],
  flag = true;
while (flag) {
  var subSkil = skilset[Math.floor(Math.random() * skilset.length)];
  if (allSkills.length <= 15) {
    if (allSkills.indexOf(subSkil) === -1) {
      allSkills.push(subSkil);
    }
  } else {
    flag = false;
  }
}

console.log(allSkills);

allInfo = {
  name,
  title,
  allworkedRole,
  allSkills,
  
};





// Print
console.log(allInfo.name);
console.log(allInfo.title);
for (let j = 0; j < allInfo.allworkedRole.length; j++) {
  console.log("");
  console.log("========= title ==========");
  console.log(allInfo.allworkedRole[j].role);
  console.log("========= company ==========");
  console.log(allInfo.allworkedRole[j].company);
  console.log("========= experience ==========");
  for (let k = 0; k < allInfo.allworkedRole[j].workedRole.length; k++) {
    console.log(allInfo.allworkedRole[j].workedRole[k]);
  }
}
console.log(allInfo.allSkills);