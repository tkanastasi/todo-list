import React, { useState, useEffect } from 'react'
import { factorial, partialSums } from './_frustrationLevel';

const frustrationEmojis: string[] = [
  "frustration-1-v2.webp",
  "frustration-2-v2.webp",
  "frustration-3-v2.webp",
  "frustration-4-v2.webp",
  "frustration-5-v2.webp"
];

type FrustrationLevelProps = { temp: number; }
type FetchDataResponse = { x: string }[];

export const FrustrationLevel: React.FC<FrustrationLevelProps> = ({ temp }) => {
  const [frustrationBounds, setFrustrationBounds] = useState<number[]|null>(null);
  useEffect(() => {
    const fetchData = async () => {
      try {
          const response = await fetch(`http://www.filltext.com/?rows=${frustrationEmojis.length - 1}&x={decimalRange|4,10}`);
          const json: FetchDataResponse = await response.json();

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
    <div className="frustration-container bordered rounded">
      <div className="frustration-padding bold">
        Frustration level:
      </div>
      <div className="frustration-devider"/>
      <div className="frustration-padding">
        {frustrationLevel.toString().split('').slice(0, 30).map((digit, index) => (
            <span key={index} style={{ fontSize: `${Math.exp(-index * 0.06)}em` }}>
              {digit}
            </span>
        ))}
      </div>
      <div className="frustration-devider"/>
      <div className="frustration-image">
        {emojiIdx !== undefined ? (
            <img style={{ width: '200px' }} src={frustrationEmojis[emojiIdx]}/>
        ) : (
          <div className="spinner-border" role="status"/>
        )}
      </div>
    </div>
  );
}
