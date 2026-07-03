export const WjdrUtil = {
  stoveLv2StoveName(stoveLv: number) {
    if (stoveLv <= 30) {
      return `${stoveLv}级`;
    }
    const fireDifference = stoveLv - 30;
    const fireLv = Math.floor(fireDifference / 5) + 1;
    const fireLvEnd = fireDifference % 5;
    return `火晶${fireLv}${fireLvEnd === 0 ? "" : `·${fireLvEnd}段`}`;
  },
};
