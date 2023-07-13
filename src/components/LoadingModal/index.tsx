import { useTransition, animated } from '@react-spring/web';
import { modalAnimation } from '../../animations';

export function LoadingModal({ display, progress }: any) {
  const transition: any = useTransition(display, modalAnimation as any);

  return (
    <div>
      {transition((style, display) => (
        <div>
          {display && (
            <div className="absolute w-full h-full bg-black bg-opacity-30 left-0 top-0 z-50 flex items-center justify-center">
              <animated.div
                style={style}
                className="shadow-lg mx-8 w-full max-w-[240px] text-center lg:text-center font-bold bg-white rounded-lg box-shadow-md p-7 flex flex-col justify-center"
              >
                <div className="spinner-border block mx-auto" />
                {progress && (
                  <div className="border border-slate-300 bg-slate-200 h-[25px] mt-6 relative">
                    <div className="absolute blend z-10 right-[5px] top-0.5 font-black text-sm">{(Number(progress) * 100).toFixed(0)}%</div>
                    <div className="bg-black absolute w-full h-[25px] transition-all origin-left" style={{ transform: `scaleX(${progress})`, left: '-1px', top: '-1px', width: 'calc(100% + 1px)' }}></div>
                  </div>
                )}
              </animated.div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

export default LoadingModal;
