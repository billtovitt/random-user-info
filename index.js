const {
  countryCode,
  universities,
  languages,
  skilset,
  keyRoles,
  companies,
  roles,
} = require("./src/config");
const Fakerator = require("fakerator");
const generator = require("generate-password");

function randomData(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function getTitle() {
  var title = "",
    flag = true;
  while (flag) {
    var subTitle = randomData(skilset);
    if ((title + subTitle).length < 70) {
      if (title.indexOf(subTitle) === -1) {
        title += subTitle;
      }
    } else {
      flag = false;
    }
  }
  return title.slice(0, title.length - 3);
}

function getUserInfo() {
  var countryFlag = true;
  var userInfo;
  var ranCountryAlphaTwoCode = randomData(countryCode);

  while (countryFlag) {
    var fakerator = Fakerator();
    userInfo = fakerator.entity.user();

    if (userInfo.address.countryCode === ranCountryAlphaTwoCode) {
      countryFlag = false;
    }
  }

  return userInfo;
}

function genUniversity(countryCode) {
  var uniNum = randomData([2, 3]);
  var bachelor = ["Master of Computer Science", "Master of Computer Science (MSCS)"];
  var area = ["Computer science", "Business", "Computer engineering"];
  var universityInfo = [];
  var flag = true;

  var durationArr = [3, 4, 5];
  var dateArr = [2000, 2001, 2002, 2003, 2004, 2005];
  var monthArr = [
    "January",
    "Febrary",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  var startYear, startMonth;
  var lastYear, lastMonth;

  while (flag) {
    if (lastYear || lastMonth) {
      startYear = lastYear;
      startMonth = lastMonth;
    } else {
      startYear = randomData(dateArr);
      startMonth = randomData(monthArr);
    }

    var endYear = startYear + randomData(durationArr),
      endMonth = randomData(monthArr);

    var randomUnivers = randomData(universities[countryCode]);

    if (
      universityInfo.findIndex((item) => item.name === randomUnivers) === -1
    ) {
      universityInfo.push({
        name: randomUnivers,
        bachelor: randomData(bachelor),
        area: randomData(area),
        from: startYear,
        to: endYear,
      });
    }

    lastYear = endYear;
    lastMonth = endMonth;

    if (universityInfo.length === uniNum) {
      flag = false;
    }
  }

  return {
    universityInfo,
    lastMonth,
    lastYear,
  };
}

function getAllWorkedRole(userInfo, univers) {
  var allworkedRole = [],
    perRandom = [2, 3, 4],
    roleNum = [2, 3, 4],
    lastComYear = "",
    lastComMonth = "";

  var univers = genUniversity(userInfo.address.countryCode);

  for (let j = 0; j < randomData(perRandom); j++) {
    var workedRole = [];

    while (workedRole.length <= randomData(roleNum)) {
      let workFlag = false;
      var workRole = randomData(keyRoles);
      for (let k = 0; k < workedRole.length; k++) {
        if (workedRole[k] === workRole) {
          workFlag = true;
        }
      }
      if (workFlag === false) {
        workedRole.push(workRole);
      }
    }

    var company = randomData(companies);
    var role = randomData(roles);

    var durationArr = [1, 2, 3, 4];
    var monthArr = [
      "January",
      "Febrary",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    var startComYear = univers.lastYear;
    var startComMonth = univers.lastMonth;

    if (lastComYear || lastComMonth) {
      startComYear = lastComYear;
      startComMonth = lastComMonth;
    }

    lastComYear = startComYear + randomData(durationArr);
    lastComMonth = randomData(monthArr);

    allworkedRole.push({
      startedDate: `${startComMonth}-${startComYear}`,
      endDate: `${lastComMonth}-${lastComYear}`,
      company,
      role,
      workedRole,
    });
  }
  return allworkedRole;
}

function getAllSkills() {
  var allSkills = [],
    flag = true;
  while (flag) {
    var subSkill = randomData(skilset);
    if (allSkills.length <= 15) {
      if (allSkills.indexOf(subSkill) === -1) {
        allSkills.push(subSkill);
      }
    } else {
      flag = false;
    }
  }
  return allSkills;
}

function getBio() {
  var bioNum = 45;
  var bioArr = [];
  for (let i = 1; i <= bioNum; i++) {
    bioArr.push(`${i}.txt`);
  }
  return randomData(bioArr);
}

function getPassword() {
  var pLength = [5, 6, 7, 8, 9];
  var password = generator.generate({
    length: 10 + randomData(pLength),
    numbers: true,
    uppercase: true,
    symbols: true,
    lowercase: true,
  });
  return password;
}

function getHourlyRate() {
  var arr = [35, 40, 45, 50, 55, 60, 65, 70];
  return randomData(arr);
}

async function main() {
  // get title
  var title = getTitle();

  // get all user info
  var userInfo = getUserInfo();

  // get university
  var univers = genUniversity(userInfo.address.countryCode);

  // get worked company & experience
  var allworkedRole = getAllWorkedRole(userInfo, univers);

  var allSkills = getAllSkills();

  var bio = getBio();

  var password = getPassword();
  
  var hrRate = getHourlyRate();

  // console.log(userInfo);

  // Print
  console.log("==============  New Member is joining  ================");
  console.log(userInfo.firstName, userInfo.lastName);

  console.log("==============  country  ================");
  console.log(userInfo.email.split("@")[0]);

  console.log("==============  country  ================");
  console.log(userInfo.address.country);

  console.log("==============  password  ================");
  console.log(password);

  console.log("========== title ==========");
  console.log(title);

  for (let j = 0; j < allworkedRole.length; j++) {
    console.log("");
    console.log("========= title ==========");
    console.log(allworkedRole[j].role);
    console.log("========= company ==========");
    console.log(allworkedRole[j].company);
    console.log("========= Date ==========");
    console.log(allworkedRole[j].startedDate, allworkedRole[j].endDate);
    console.log("========= experience ==========");
    for (let k = 0; k < allworkedRole[j].workedRole.length; k++) {
      console.log(allworkedRole[j].workedRole[k]);
    }
  }
  
  console.log("================= Universities ====================");
  for(let i = 0 ; i < univers.universityInfo.length ; i++) {
    var oneUniversity = univers.universityInfo[i];
    console.log(oneUniversity);
  }

  console.log("============= Native Language  ==============");
  console.log(languages[userInfo.address.countryCode]);
  
  console.log("============= hourly rate  ============");
  console.log(hrRate);
  
  console.log("============= all skills  ============");
  console.log(allSkills);
  
  console.log("=========   Bio  =========");
  console.log(bio);

  console.log("==========  user address  =========");

  console.log("==========  street address  =========");
  console.log(userInfo.address.street);

  console.log("==========  city  =========");
  console.log(userInfo.address.city);

  console.log("==========  zip code  =========");
  console.log(userInfo.address.zip);

  console.log("==========  phone  =========");
  console.log(userInfo.phone);
}

main();
