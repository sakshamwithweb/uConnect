console.log(typeof new Date().getFullYear())

const compareVals = "2+"
const [min, max] = compareVals.split("-").map((v) => parseInt(v))
console.log(min, max)