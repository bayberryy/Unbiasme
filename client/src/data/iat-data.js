const Shuffle = require('./utilsShuffle')

// const categoryGender = ['Female', 'Male']
// const categoryContext = ['Liberal Arts', 'Science']

// import { Shuffle } from "@/core";

const Words = {
  female: ['Woman', 'Mother', 'Daughter', 'Sister', 'Feminine'],
  male: ['Man', 'Father', 'Son', 'Brother', 'Masculine'],
  science: ['Scientist', 'Engineer', 'Biologist', 'Physicist', 'Chemist'],
  'liberal arts': ['Writer', 'Historian', 'Philosopher', 'Psychologist', 'Artist']
};

// console.log(Words['science'], Words['liberal arts']) // to retrieve properties from object

// const staticBase =
//   "https://latina-1253549750.cos.ap-shanghai.myqcloud.com/img/research/iat/";
const cdnBase =
  "https://latina-1253549750.cos.ap-shanghai.myqcloud.com/img/research/iat/versions/2/";

const warmImages = [];
const coldImages = [];

for (let i = 1; i < 9; i++) {
  warmImages.push(cdnBase + "1-" + i + ".jpg");
}
for (let i = 1; i < 9; i++) {
  coldImages.push(cdnBase + "2-" + i + ".jpg");
}
// const coldImageIntro = cdnBase + "cold.png";
// const warmImageIntro = cdnBase + "warm.png";

// const Images = {
//   warmImages,
//   coldImages,
//   coldImageIntro,
//   warmImageIntro
// };

const buildTestCase = (
  wordsOrImages,
  isImage,
  wordCategory
) => {
  const testCases = [];
  for (const imageOrWord of wordsOrImages) {
    testCases.push({
      testDescription: isImage ? "" : imageOrWord,
      wordCategory,
      isImage,
      imageURL: isImage ? imageOrWord : ""
    });
  }
  return testCases;
};

// const baseImageTestCases = [];
// baseImageTestCases.push(...buildTestCase(warmImages, true, "positive"));
// baseImageTestCases.push(...buildTestCase(coldImages, true, "negative"));
const baseWordTestCases = [];
baseWordTestCases.push(...buildTestCase(Words.female, false, "Female"));
baseWordTestCases.push(...buildTestCase(Words.male, false, "Male"));
baseWordTestCases.push(...buildTestCase(Words.science, false, "Science"));
baseWordTestCases.push(...buildTestCase(Words['liberal arts'], false, "Liberal Arts"));  


const title = (cur, all) =>
  `Part ${cur}/${all} of IAT Test`;

// Initial cases
const InitCases = [
  // p1
  {
    instruction: {
      title: "",
      cmds: [
        "当出现的图片是暖色食物图片时，用左手摁下<span style='font-weight:800; padding: 0 10px; font-size:20px;'>E</span>字母键。",
        "当出现的图片是冷色食物图片时，用右手摁下<span style='font-weight:800; padding: 0 10px; font-size:20px;'>I</span>字母键。",
        "一次出现一张图片。",
        "",
        "如果选错了，会出现一个红色的叉。此时选择另一个字母键，叉会自动消失并进入下一张图片（如果本部分还没结束的话）。",
        "<h3><bold>请尽可能快而准确地完成。</bold></h3>",
        ""
      ]
    },
    // congruent
    positiveTitle: ["Female", "Liberal Arts"],
    negativeTitle: ["Male", "Science"],
    testCases: Shuffle([...baseWordTestCases])
    // testCases: Shuffle([...baseWordTestCases, ...baseWordTestCases])
  },
  // p2
  {
    instruction: {
      title: "",
      cmds: [
        "当出现美味类的词语时，用左手摁下<span style='font-weight:800; padding: 0 10px; font-size:20px;'>E</span>字母键。",
        "当出现不美味类的词语时，用右手摁下<span style='font-weight:800; padding: 0 10px; font-size:20px;'>I</span>字母键。",
        "一次出现一个词语。",
        "",
        "如果选错了，会出现一个红色的叉。此时选择另一个字母键，叉会自动消失并进入下一张图片（如果本部分还没结束的话）。",
        "<h3><bold>请尽可能快而准确地完成。</bold></h3>",
        ""
      ]
    },
    // incongruent
    positiveTitle: ["Female", "Science"], // right side
    negativeTitle: ["Male", "Liberal Arts"], // left side
    testCases: Shuffle([...baseWordTestCases])
    // testCases: Shuffle([...baseWordTestCases.slice(0,10), ...baseWordTestCases.slice(0,10)])
  }
];

// Test cases sequence
const sequence = [1,2].map(val => val - 1);

// Final test cases on the page
const iatData = sequence.map(
  (index, thisIndex) => {
    const tempTP = InitCases[index];
    tempTP.instruction.title = title(thisIndex + 1, sequence.length);
    return tempTP;
  }
);

console.log(iatData[1])

const arr = [100,100,100,100]
const average = arr.reduce((total,current) => total + current, 0) / arr.length
console.log(average)
module.exports = iatData
