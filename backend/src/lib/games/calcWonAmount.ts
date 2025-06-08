export default function calcWonAmount(amount: number, multiplier: number) {
  const feeInPercent = 0.01;

  return amount * multiplier * (1 - feeInPercent);
}
