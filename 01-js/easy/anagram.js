/*
  Write a function `isAnagram` which takes 2 parameters and returns true/false if those are anagrams or not.
  What's Anagram?
  - A word, phrase, or name formed by rearranging the letters of another, such as spar, formed from rasp.
*/
function isAnagram(str1, str2) {
  const formatStr = (str) => str.replace(/\s/g, '').toLowerCase();

  const formattedStr1 = formatStr(str1);
  const formattedStr2 = formatStr(str2);

  if (formattedStr1.length !== formattedStr2.length) {
    return false;
  }

  const charMap = {};

  for (let char of formattedStr1) {
    charMap[char] = charMap[char] + 1 || 1;
  }

  for (let char of formattedStr2) {
    if (!charMap[char]) {
      return false;
    }
    charMap[char]--;
  }

  return true;
}

module.exports = isAnagram;
