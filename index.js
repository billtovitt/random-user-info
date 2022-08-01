const { skilset, keyRoles, companies, roles } = require("./src/config");
const names = require("american-sounding-names");

async function main() {
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
    roleNum = [2, 3, 4];
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
    
    var durationArr = [1,2,3,4,5];
    var dateArr = [2008, 2009, 2010, 2011, 2012, 2013, 2014, 2015];
    var monthArr = ["January", "Febrary", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    var started = dateArr[Math.floor(Math.random() * dateArr.length)];
    
    allworkedRole.push({
      startedDate: `${monthArr[Math.floor(Math.random() * monthArr.length)]}-${started}`,
      endDate: `${monthArr[Math.floor(Math.random() * monthArr.length)]}-${started+durationArr[Math.floor(Math.random() * durationArr.length)]}`,
      company,
      role,
      workedRole,
    });
  }

  var allSkills = [],
    flag = true;
  while (flag) {
    var subSkill = skilset[Math.floor(Math.random() * skilset.length)];
    if (allSkills.length <= 15) {
      if (allSkills.indexOf(subSkill) === -1) {
        allSkills.push(subSkill);
      }
    } else {
      flag = false;
    }
  }
  
  var bioNum = 16;
  var bioArr = [];
  for(let i = 1 ; i <= bioNum ; i++) {
    bioArr.push(`${i}.txt`);
  }

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
    console.log("========= Date ==========");
    console.log(allInfo.allworkedRole[j].startedDate, allInfo.allworkedRole[j].endDate);
    console.log("========= experience ==========");
    for (let k = 0; k < allInfo.allworkedRole[j].workedRole.length; k++) {
      console.log(allInfo.allworkedRole[j].workedRole[k]);
    }
  }
  console.log(allInfo.allSkills);
  console.log("=========   Bio  =========");
  console.log(bioArr[Math.floor(Math.random() * bioArr.length)]);
}

main()