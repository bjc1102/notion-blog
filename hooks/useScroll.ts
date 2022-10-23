import React from 'react';

const useScroll = () => {
  const [scroll, setScroll] = React.useState(0);
  React.useEffect(() => {
    window.addEventListener('scroll', handleScrollEvent);
    return () => {
      window.removeEventListener('scroll', handleScrollEvent);
    };
  }, []);

  const handleScrollEvent = () => {
    setScroll(window.scrollY);
  };

  return { scroll };
};

export default useScroll;
