type FrustrationLevelProps = {
  temp: number
}

function factorial(n: bigint){
  let acc = BigInt(1);
  for (let i = BigInt(1); i <= n; i++) {
    acc *= i;
  }

  return acc;
}

export const FrustrationLevel: React.FC<FrustrationLevelProps> = ({ temp }) => {
  const level = factorial(BigInt(temp));
  return (
    <span className="h5">Frustration Level: {level.toString()} 😟</span>
  );
}
