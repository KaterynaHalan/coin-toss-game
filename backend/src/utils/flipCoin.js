export const COIN_TYPE = Object.freeze({
    heads: 0,
    tails: 1
});

const flipCoin = () => {
    const randomNumber = Math.random();
    return randomNumber < 0.5 ? COIN_TYPE.heads : COIN_TYPE.tails;
}

export default flipCoin;