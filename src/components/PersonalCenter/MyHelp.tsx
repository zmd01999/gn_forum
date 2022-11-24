import { Accordion } from "semantic-ui-react";
const panels = [
  {
    key: "金币和成长值如何获取？",
    title: "金币和成长值如何获取？",
    content: [
      "每日登陆可以获取2成长值和2金币，成长值越高可以提升等级，解锁更多特权。金币同时可以通过发布文章和作品来获得，如果你的作品成为热门精华将会获得更多金币。金币可以用来在本站下载各种资源。如果你想充值金币，请联系管理员获取。",
    ].join(" "),
  },
  // {
  //   key: 'kinds-of-dogs',
  //   title: 'What kinds of dogs are there?',
  //   content: [
  //     'There are many breeds of dogs. Each breed varies in size and temperament. Owners often select a breed of dog',
  //     'that they find to be compatible with their own lifestyle and desires from a companion.',
  //   ].join(' '),
  // },
];
export const MyHelp = () => {
  return <Accordion defaultActiveIndex={0} panels={panels} />;
};
