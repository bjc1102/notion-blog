import React from 'react';
import FilterOptionMenu from '@/components/FilterOptionMenu';
import Landing from '@/components/Landing';

// TODO: 태그 추가, 카테고리 페이지 추가, 데이터를 캐싱으로 받아오기
const Category = () => {
  return (
    <div className="min-h-screen">
      <Landing />
      <div className="max-w-xl mx-auto mt-32">
        <FilterOptionMenu />
      </div>
      <div className="max-w-6xl mx-auto my-12"></div>
    </div>
  );
};

export default Category;
