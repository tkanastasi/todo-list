import React, { useState, useEffect, useRef } from 'react'

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

const frustrationEmojis: string[] = [
  "frustration-1.png",
  "frustration-2.png",
  "frustration-3.png",
  "frustration-4.png",
  "frustration-5.png"
];

type FrustrationLevelProps = {
  temp: number
}

export const FrustrationLevel: React.FC<FrustrationLevelProps> = ({ temp }) => {
  const [frustrationBounds, setFrustrationBounds] = useState<number[]|null>(null);

  // We need to prevent a doubled downloading of a random data
  const fetchCounter = useRef<number>(0);

  useEffect(() => {
    const fetchData = async () => {
      if (fetchCounter.current > 0){
        return
      }

      fetchCounter.current++;

      try {
          const response = await fetch(`http://www.filltext.com/?rows=${frustrationEmojis.length - 1}&x={decimalRange|4,10}`);
          const json = await response.json();

          const rNumbers: number[] = json.map((item: { x: string }) => parseFloat(item.x));
          const array = partialSums(rNumbers.sort((a, b) => a - b));
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
    <div className="container-fluid" style={{fontSize: "1.8em"}}>
      <div className="row">
        <div className="col" id="FL">
          Frustration level:
        </div>
      </div>
      <div className="row">
        <div className="col">
        {frustrationLevel.toString().split('').slice(0, 30).map((digit, index) => (
            <span key={index} style={{ fontSize: `${Math.exp(-Math.floor(index / 1) * 0.09)}em` }}>
              {digit}
            </span>
        ))}
        </div>
      </div>
      <div className="row justify-content-center">
        <div className="col">
        {emojiIdx !== undefined ? (
            <img src={frustrationEmojis[emojiIdx]}/>
        ) : (
          <div className="spinner-border" role="status"/>
        )}
        </div>
      </div>
    </div>
  );
}
