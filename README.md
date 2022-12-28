# Using Notion as a CMS

<h2 style="color:orange">Trouble shooting</h2>

[SSG, SSR의 차이점을 문제를 통해 정리](https://choiblog.tistory.com/2).

[SSG를 업데이트하기 위한 증분 정적 재생(ISR)](https://choiblog.tistory.com/28).

[NextJS SSG ISR은 왜 동작하지 않았나](https://choiblog.tistory.com/68)

## Description

노션을 CMS로 활용한 블로그입니다.
Notion API를 활용하여 개발하던 중 데이터를 불러오는 속도가 많이 느리고 블로그 목적상 자신의 생각을 표현하여 글을 공유하기 위해 NextJS의 SSG를 활용하여 구현하였습니다.

이를 통해 기존 CSR, SSR 방식보다 속도를 약 90% 개선하였습니다

<image src=public/images/perform.png />

## Tech Stack

[![TypeScript Badge](https://img.shields.io/badge/Typescript-235A97?style=flat-square&logo=Typescript&logoColor=white)](https://www.typescriptlang.org/) [![Next.js Badge](https://img.shields.io/badge/Next.js-000000?style=flat-square&logo=next.js&logoColor=white)](https://nextjs.org/) [![TailwindCSS Badge](https://img.shields.io/badge/Tailwind_CSS-06B6D4?style=flat-square&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/) [![Notion Badge](https://img.shields.io/badge/Notion_API-000000?style=flat-square&logo=notion&logoColor=white)](https://www.notion.so/)

[Notion database URL](https://choisdev.notion.site/5531dde37ce34dc5a28b3f5b49497563?v=16000545c24c43e2ad046f1022678903)

## Summary

- NextJS를 활용하여 전체 페이지를 정적으로 생성
- 노션 db를 활용한 메인 페이지 제작
- 카테고리, 태그를 통한 페이지 필터, 검색 기능 구현
- 상세 포스트 페이지 정적 생성

## Image

<image src=public/images/notion_db.png />
<image src=public/images/blog_main.png />
<image src=public/images/posts_main.png />
<image src=public/images/search_main.png />
<image src=public/images/post_detail.png />
