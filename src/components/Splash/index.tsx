import * as React from 'react';
import { useEffect, useState } from 'react';
// @ts-ignore, had to use different package due to official package  not supporting react 18
import Lottie from '@amelix/react-lottie';
import animationData from '../../splashAnimation.json';

export const Splash = () => {
  const [display, setDisplay] = useState(true);

  /**
   * Hide the splash screen after 1.5 seconds
   */
  useEffect(() => {
    setTimeout(() => {
      setDisplay(false);
    }, 1500);
  }, [display]);

  const defaultOptions = {
    loop: false,
    autoplay: true,
    animationData: animationData,
  };

  if(!display) {
    return <div />;
  }

  return (
    <div className={`absolute top-0 left-0 bg-black w-full h-screen z-10 splash ${display ? '' : 'splash--hidden'}`}>
      <div className="h-full w-full flex items-center justify-center">
        <div className="mb-16">
          <Lottie options={defaultOptions} height={128} width={128} />
        </div>
      </div>
    </div>
  );
};

export default Splash;
