import { Cover } from '@/types/property';

export default function ImgUrlParse({ file, type, external }: Cover) {
  let cover = '';

  switch (type) {
    case 'file':
      cover = file.url;
      break;
    case 'external':
      //@ts-ignore
      cover = external.url;
      break;
    case null:
      cover = 'https://picsum.photos/1920/1080'; // 기본 커버 이미지
      break;
    default:
      cover = 'https://picsum.photos/1920/1080';
  }

  return cover;
}
