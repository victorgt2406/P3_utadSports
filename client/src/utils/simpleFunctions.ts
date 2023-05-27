const capitalizeFirstLetter = (text:string) => text.charAt(0).toUpperCase() + text.slice(1);

const aspectRatio16_9 = (height:number, width:number) => height / width === 9 / 16;

export {capitalizeFirstLetter};