export const COIN_TYPE = Object.freeze({
    heads: 0,
    tails: 1
});

/** The function randomly choose if a coin is Heads or Tails */
const flipCoin = () => {
    const randomNumber = Math.random();
    return randomNumber < 0.5 ? COIN_TYPE.heads : COIN_TYPE.tails;
}

export default flipCoin;