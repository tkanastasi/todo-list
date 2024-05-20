import React, { useState, useEffect } from 'react'

function factorial(n: bigint){
  let acc = BigInt(1);
  for (let i = BigInt(1); i <= n; i++) {
    acc *= i;
  }

  return acc;
}

function partialSums(numbers: number[]): number[] {
  let arr = [];

  for (let acc = 0, i = 0; i < numbers.length; i++){
    acc += numbers[i];
    arr.push(acc);
  }

  return arr;
}

const frustrationEmojis: string[] = ["😊", "😐", "😣", "😫", "😱"];

type FrustrationLevelProps = {
  temp: number
}

export const FrustrationLevel: React.FC<FrustrationLevelProps> = ({ temp }) => {
  const [frustrationBounds, setFrustrationBounds] = useState<number[]|null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
          const response = await fetch(`http://www.filltext.com/?rows=${frustrationEmojis.length}&x={decimalRange|4,10}`);
          const json = await response.json();

          const rNumbers: number[] = json.map((item: { x: string }) => parseFloat(item.x));
          const array = partialSums(rNumbers.sort((a, b) => a - b));
          console.log(`rNumbers: ${rNumbers}`)
          console.log(`array: ${array}`)
          setFrustrationBounds(array);
      } catch (error) {
          console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const frustrationLevel = factorial(BigInt(temp));
  const emojiIdx = frustrationBounds?.reduce((idx, v) => (temp > v ? idx + 1 : idx), 0);

  return (
    <span className="h5">Frustration Level: {frustrationLevel.toString()} {emojiIdx !== undefined ? frustrationEmojis[emojiIdx] : ''}</span>
  );
}
