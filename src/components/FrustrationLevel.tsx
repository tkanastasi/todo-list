import React, { useState, useEffect, useRef } from 'react'
import { factorial, partialSums } from './_frustrationLevel';

const frustrationEmojis: string[] = [
  "frustration-1-v2.webp",
  "frustration-2-v2.webp",
  "frustration-3-v2.webp",
  "frustration-4-v2.webp",
  "frustration-5-v2.webp"
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
            <span key={index} style={{ fontSize: `${Math.exp(-index * 0.09)}em` }}>
              {digit}
            </span>
        ))}
        </div>
      </div>
      <div className="row">
        <div className="col">
        {emojiIdx !== undefined ? (
            <img style={{ width: '200px' }} src={frustrationEmojis[emojiIdx]}/>
        ) : (
          <div className="spinner-border" role="status"/>
        )}
        </div>
      </div>
    </div>
  );
}
