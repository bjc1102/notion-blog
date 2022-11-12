import React from 'react';
import GithubIcon from './GithubIcon';
import TistoryIcon from './TistoryIcon';

const MainText = () => {
  return (
    <div className="w-full px-20 mt-24 py-2 flex flex-col items-center justify-center border-solid border-b">
      <h1 className="text-2xl lg:text-xl py-2">
        노션을 CMS로 활용한 블로그입니다.
      </h1>
      <h2 className="text-lg lg:text-sm py-8 text-gray-200">
        주로 회고 글을 작성하고 있습니다.
      </h2>
      <div className="flex justify-center items-center gap-4">
        <div className="w-6">
          <TistoryIcon />
        </div>
        <div>
          <GithubIcon />
        </div>
      </div>
    </div>
  );
};

export default MainText;
