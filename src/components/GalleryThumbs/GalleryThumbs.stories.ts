import type { Meta, StoryObj } from '@storybook/react';

import GalleryThumbs from './index';

// const mockGalllery = [
//   {
//     key: 1,
//     src: 'https://bigfoto.name/uploads/posts/2021-10/1635087393_55-bigfoto-name-p-etapi-remonta-vo-vtorichnoi-kvartire-103.jpg',
//   },
//   {
//     key: 2,
//     src: 'https://bigfoto.name/photo/uploads/posts/2023-02/1676908666_bigfoto-name-p-rabota-po-remontu-kvartir-ot-chastnikh-lit-54.jpg',
//   },
//   {
//     key: 3,
//     src: 'https://ремонтный-рейтинг.рф/img/review_photos/62af0ecaf3bd1.jpg',
//   },
//   {
//     key: 4,
//     src: 'https://marremont.ru/wp-content/uploads/2021/10/7a6199b5992cc7d520a3452997047cb2.jpeg',
//   },
//   {
//     key: 6,
//     src: 'https://colodu.club/uploads/posts/2022-10/1666298767_45-colodu-club-p-chastnii-master-po-remontu-kvartir-dizain-48.jpg',
//   },
//   {
//     key: 7,
//     src: 'https://bigfoto.name/uploads/posts/2021-10/1635087393_55-bigfoto-name-p-etapi-remonta-vo-vtorichnoi-kvartire-103.jpg',
//   },
//   {
//     key: 8,
//     src: 'https://siti-remont.ru/img/G1.jpg',
//   },
//   {
//     key: 9,
//     src: 'https://avatars.dzeninfra.ru/get-zen_doc/1775615/pub_6328af017878a6493a63db2e_6328b054f4977d3d189cd930/scale_1200',
//   },
//   {
//     key: 10,
//     src: 'https://colodu.club/uploads/posts/2022-10/1666253725_31-colodu-club-p-remont-kvartir-v-balashikhe-dizain-oboi-32.jpg',
//   },
//   {
//     key: 11,
//     src: 'https://promartstroy.ru/wp-content/uploads/2021/10/WhatsApp-Image-2021-10-13-at-11.54.48.jpeg',
//   },
// ];

const meta = {
  title: 'UI/GalleryThumbs',
  component: GalleryThumbs,
  tags: ['autodocs'],
} satisfies Meta<typeof GalleryThumbs>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    data: ['https://hameleone.ru/wp-content/uploads/2023/08/a317df3423ea1fd94c405c1ce25c991c.jpeg'],
  },
};
