import React, { useState } from "react";
import { Container, ContentWithPaddingXl } from "./Layouts";
import tw from "twin.macro";
import styled from "styled-components";
import { css } from "styled-components/macro";
import { SectionHeading } from "./Headings";
import { PrimaryButton } from "./Buttons";
import {Button} from "semantic-ui-react";
import "./style.css";
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import CommentIcon from '@mui/icons-material/Comment';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { updateCreppyDefaultImage } from "src/utils";
import { Avatar } from "@mui/material";
import {cyan,deepOrange} from "@mui/material/colors";

const HeadingRow = tw.div`flex`;
const Heading = tw(SectionHeading)`text-gray-900`;
const Posts = tw.div`sm:-mr-8 flex flex-wrap`;
const PostContainer = styled.div`
  ${tw`mt-10 w-full sm:w-1/2 lg:w-1/3 sm:pr-8`}
  ${props =>
    props.featured &&
    css`
      ${tw`w-full!`}
      ${Post} {
        ${tw`sm:flex-row! lg:flex-row! h-full sm:pr-4`}
      }
      ${Image} {
        ${tw`sm:h-96 sm:min-h-full sm:w-1/2 lg:w-full sm:rounded-t-none sm:rounded-l-lg mx-auto`}
      }
      ${Info} {
        ${tw`sm:-mr-4 sm:pl-8 sm:flex-1 sm:rounded-none sm:rounded-r-lg sm:border-t-2 sm:border-l-0`}
      }
      ${Description} {
        ${tw`text-sm mt-3 leading-loose text-gray-600 font-medium`}
      }
    `}
`;
const Post = tw.div`cursor-pointer flex flex-col bg-gray-100 rounded-lg`;
const Image = styled.div`
  ${props => css`background-image: url("${props.imageSrc}");`}
  ${tw`h-56 w-full bg-cover bg-center rounded-3xl` }
`;
const Info = tw.div`p-8 border-2 border-t-0 rounded-3xl rounded-t-none border-blue-800`;
const Category = tw.div`uppercase text-primary-500 text-xs font-bold tracking-widest leading-loose after:content after:block after:border-b-2 after:border-primary-500 after:w-8`;
const CreationDate = tw.div`mt-4 uppercase text-gray-600 italic font-semibold text-xs`;
const Title = tw.div`mt-1 font-black text-2xl text-gray-900 group-hover:text-primary-500 transition duration-300`;
const Description = tw.div`mt-2`;

const ButtonContainer = tw.div`flex justify-center`;
const LoadMoreButton = tw(PrimaryButton)`mt-16 mx-auto`;

export default ({
  headingText = "",
  posts = [
    // {
    //   imageSrc:
    //     "https://images.unsplash.com/photo-1499678329028-101435549a4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1024&q=80",
    //   category: "创作",
    //   date: "April 21, 2020",
    //   title: "我们的Scratch",
    //   description:
    //     "我们开放自由，给大家交流环境，请遵守社区规则",
    //   url: "",
    //   featured: true
    // },
    getPlaceholderPost(),
    getPlaceholderPost(),
    getPlaceholderPost(),
    getPlaceholderPost(),
    getPlaceholderPost(),
    getPlaceholderPost(),
    getPlaceholderPost(),
    getPlaceholderPost(),
    getPlaceholderPost(),
    getPlaceholderPost(),
    getPlaceholderPost(),
    getPlaceholderPost(),
    getPlaceholderPost(),
    getPlaceholderPost(),
    getPlaceholderPost(),
    getPlaceholderPost(),
    getPlaceholderPost(),
    getPlaceholderPost()
  ]
}) => {
  const [visible, setVisible] = useState(8);
  const onLoadMoreClick = () => {
    setVisible(v => v + 8);
  };
  return (

      <Container>
        <ContentWithPaddingXl>
          {/* <HeadingRow>
            <Heading>{headingText}</Heading>
          </HeadingRow> */}
          <div className="text-2xl font-bold mb-6 text-black">
            本周精选
          </div>
          <Posts>
  
          {posts.slice(0, 6).map((post, index) => (
              <PostContainer key={index} featured={post.featured}>
                <Post className="group" as="a" href={post.url}>
                  <div className="h-64 w-full border-card border-blue-800  rounded-t-3xl">
                    <div className="m-6 border-2 border-blue-800 rounded-3xl" style={{}}>
                    <Image imageSrc={post.imageSrc} />

                    </div>


                  </div>
                  <Info>
                    <div className="flex flex-row space-x-2">
                    <Button
                        size="tiny"
                        // attached="left"
                        color="blue"
                        // style={{ marginTop: "10px", marginLeft: "25%" }}
                      
                      >原创</Button>
                    <Title>{post.title}</Title>
                    </div>

                    
                    {/* <Category>{post.category}</Category> */}
                    <CreationDate> <div  className="flex space-x-12 mr-4 mb-2"><VisibilityIcon/>{1}k<CommentIcon sx={{ color: cyan[200] }}/>{5.5}k<ThumbUpIcon sx={{ color: deepOrange[50] }}/>{3}k</div></CreationDate>

                    <div className="flex flex-row space-x-6">
                      <Avatar
                        src={updateCreppyDefaultImage(post.author.avatar ?? null)}
                        sx={{ width: 40, height: 40 ,border:1}}
                      />
                        <div className="text-xl font-black text-gray-900 my-auto">
                          {post.author.nickname}
                        </div>
                    </div>

                    {post.featured && post.description && <Description>{post.description}</Description>}
                  </Info>
                </Post>
              </PostContainer>
            ))}
          
          </Posts>
        </ContentWithPaddingXl>
      </Container>
  );
};

const getPlaceholderPost = () => ({
  imageSrc:
    // "https://images.unsplash.com/photo-1418854982207-12f710b74003?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1024&q=80",
    "/assets/example.png",
  category: "创作",
  date: "April 19, 2020",
  title: "羊了个羊",
  description:
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.  Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
  url: "/work/1",
  author:{
    nickname:"James",
    avatar:"",
  }
});
