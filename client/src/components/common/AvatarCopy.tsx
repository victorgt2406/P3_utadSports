/** @description Generates random avatar image URL
 * @param seed Optional, specify a seed for rng.
 * @returns Random avatar image URL
 */
export function generateRandomAvatar(seed?: string): string {
  return "https://avataaars.io/?" + generateOptionsString(seed);
}

export function generateOptionsString(seed?: string): string {
  let topTypeOptions = new Array<string>();
  topTypeOptions.push(
    "NoHair",
    "Eyepatch",
    "Hat",
    "Hijab",
    "Turban",
    "WinterHat1",
    "WinterHat2",
    "WinterHat3",
    "WinterHat4",
    "LongHairBigHair",
    "LongHairBob",
    "LongHairBun",
    "LongHairCurly",
    "LongHairCurvy",
    "LongHairDreads",
    "LongHairFrida",
    "LongHairFro",
    "LongHairFroBand",
    "LongHairNotTooLong",
    "LongHairShavedSides",
    "LongHairMiaWallace",
    "LongHairStraight",
    "LongHairStraight2",
    "LongHairStraightStrand",
    "ShortHairDreads01",
    "ShortHairDreads02",
    "ShortHairFrizzle",
    "ShortHairShaggyMullet",
    "ShortHairShortCurly",
    "ShortHairShortFlat",
    "ShortHairShortRound",
    "ShortHairShortWaved",
    "ShortHairSides",
    "ShortHairTheCaesar",
    "ShortHairTheCaesarSidePart"
  );

  let accessoriesTypeOptions = new Array<string>();
  accessoriesTypeOptions.push(
    "Blank",
    "Kurt",
    "Prescription01",
    "Prescription02",
    "Round",
    "Sunglasses",
    "Wayfarers"
  );

  let facialHairTypeOptions = new Array<string>();
  facialHairTypeOptions.push(
    "Blank",
    "BeardMedium",
    "BeardLight",
    "BeardMagestic",
    "MoustacheFancy",
    "MoustacheMagnum"
  );

  let facialHairColorOptions = new Array<string>();
  facialHairColorOptions.push(
    "Auburn",
    "Black",
    "Blonde",
    "BlondeGolden",
    "Brown",
    "BrownDark",
    "Platinum",
    "Red"
  );

  let clotheTypeOptions = new Array<string>();
  clotheTypeOptions.push(
    "BlazerShirt",
    "BlazerSweater",
    "CollarSweater",
    "GraphicShirt",
    "Hoodie",
    "Overall",
    "ShirtCrewNeck",
    "ShirtScoopNeck",
    "ShirtVNeck"
  );

  let eyeTypeOptions = new Array<string>();
  eyeTypeOptions.push(
    "Close",
    "Cry",
    "Default",
    "Dizzy",
    "EyeRoll",
    "Happy",
    "Hearts",
    "Side",
    "Squint",
    "Surprised",
    "Wink",
    "WinkWacky"
  );

  let eyebrowTypeOptions = new Array<string>();
  eyebrowTypeOptions.push(
    "Angry",
    "AngryNatural",
    "Default",
    "DefaultNatural",
    "FlatNatural",
    "RaisedExcited",
    "RaisedExcitedNatural",
    "SadConcerned",
    "SadConcernedNatural",
    "UnibrowNatural",
    "UpDown",
    "UpDownNatural"
  );

  let mouthTypeOptions = new Array<string>();
  mouthTypeOptions.push(
    "Concerned",
    "Default",
    "Disbelief",
    "Eating",
    "Grimace",
    "Sad",
    "ScreamOpen",
    "Serious",
    "Smile",
    "Tongue",
    "Twinkle",
    "Vomit"
  );

  let skinColorOptions = new Array<string>();
  skinColorOptions.push(
    "Tanned",
    "Yellow",
    "Pale",
    "Light",
    "Brown",
    "DarkBrown",
    "Black"
  );

  let hairColorTypes = new Array<string>();
  hairColorTypes.push(
    "Auburn",
    "Black",
    "Blonde",
    "BlondeGolden",
    "Brown",
    "BrownDark",
    "PastelPink",
    "Platinum",
    "Red",
    "SilverGray"
  );

  let hatColorOptions = new Array<string>();
  hatColorOptions.push(
    "Black",
    "Blue01",
    "Blue02",
    "Blue03",
    "Gray01",
    "Gray02",
    "Heather",
    "PastelBlue",
    "PastelGreen",
    "PastelOrange",
    "PastelRed",
    "PastelYellow",
    "Pink",
    "Red",
    "White"
  );

  let clotheColorOptions = new Array<string>();
  clotheColorOptions.push(
    "Black",
    "Blue01",
    "Blue02",
    "Blue03",
    "Gray01",
    "Gray02",
    "Heather",
    "PastelBlue",
    "PastelGreen",
    "PastelOrange",
    "PastelRed",
    "PastelYellow",
    "Pink",
    "Red",
    "White"
  );

  const rng = createRandom(seed);
  function createRandom(seed?: string): () => number {
    const randomFunc = seed ? () => hashString(seed) : Math.random;
    return () => randomFunc();
  }
  
  function hashString(str: string): number {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      hash = ((hash << 5) - hash) + str.charCodeAt(i);
      hash |= 0;
    }
    return hash / 0xFFFFFFFF + 0.5;
  }

  return `accessoriesType=${
    accessoriesTypeOptions[
    Math.floor(rng() * accessoriesTypeOptions.length)
    ]
    }&avatarStyle=Circle&clotheColor=${
    clotheColorOptions[Math.floor(rng() * clotheColorOptions.length)]
    }&clotheType=${
    clotheTypeOptions[Math.floor(rng() * clotheTypeOptions.length)]
    }&eyeType=${
    eyeTypeOptions[Math.floor(rng() * eyeTypeOptions.length)]
    }&eyebrowType=${
    eyebrowTypeOptions[Math.floor(rng() * eyebrowTypeOptions.length)]
    }&facialHairColor=${
    facialHairColorOptions[
    Math.floor(rng() * facialHairColorOptions.length)
    ]
    }&facialHairType=${
    facialHairTypeOptions[
    Math.floor(rng() * facialHairTypeOptions.length)
    ]
    }&hairColor=${
    hairColorTypes[Math.floor(rng() * hairColorTypes.length)]
    }&hatColor=${
    hatColorOptions[Math.floor(rng() * hatColorOptions.length)]
    }&mouthType=${
    mouthTypeOptions[Math.floor(rng() * mouthTypeOptions.length)]
    }&skinColor=${
    skinColorOptions[Math.floor(rng() * skinColorOptions.length)]
    }&topType=${
    topTypeOptions[Math.floor(rng() * topTypeOptions.length)]
    }`;
}

/** @description Class to generate avatars 
 * 
 * @deprecated Use function generateRandomAvatar instead
 */
export class AvatarGenerator {
  constructor() {}

  /** @description Generates random avatar image URL
   * @returns Random avatar image URL
   * 
   * @deprecated Use function generateRandomAvatar instead
   */
  generateRandomAvatar(seed?: string) {
    generateRandomAvatar(seed);
  }
}