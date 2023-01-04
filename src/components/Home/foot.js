import React from "react";
import tw from "twin.macro";
import styled from "styled-components";
import {Container as ContainerBase } from "src/components/BaseUtils/tre/Layouts";
import logo from "src/assets/svg/logo.svg";


const Container = tw(ContainerBase)` text-gray-100 -mx-8 -mb-8 mt-20`
const Content = tw.div`max-w-screen-xl mx-auto py-10 lg:py-10`;

const Row = tw.div`flex items-center justify-center flex-col px-8`

const LogoContainer = tw.div`flex items-center justify-center md:justify-start`;
const LogoImg = tw.img`w-8`;
const LogoText = tw.h5`ml-2 text-2xl font-black tracking-wider text-blue-600`;

const LinksContainer = tw.div`mt-8 font-medium flex flex-wrap justify-center items-center flex-col sm:flex-row`
const Link = tw.a`border-b-2 border-transparent hocus:text-gray-300 hocus:border-gray-300 pb-1 transition duration-300 mt-2 mx-4`;

const SocialLinksContainer = tw.div`mt-10`;
const SocialLink = styled.a`
  ${tw`cursor-pointer inline-block text-gray-100 hover:text-gray-500 transition duration-300 mx-4`}
  svg {
    ${tw`w-5 h-5`}
  }
`;
const ss = `<div style="width:300px;margin:0 auto; padding:20px 0;"><a target="_blank" href=" " style="display:inline-block;text-decoration:none;height:20px;line-height:20px;">< img src="" style="float:left;"/><p style="float:left;height:20px;line-height:20px;margin: 0px 0px 0px 5px; color:#939393;">皖公网安备 34019202002006号</p ></ a></div>`
const CopyrightText = tw.p`text-center mt-10 font-medium tracking-wide text-sm text-gray-600`
export default () => {
  return (
    <Container>
      <Content>
        <Row>
          <LogoContainer>
            {/* <LogoImg src={logo} />
            <LogoText>趣代码世界</LogoText> */}
            <img src="/assets/logo.png" className="w-40"></img>
          </LogoContainer>
          <LinksContainer style={{height:"4rem"}}>
            <Link href="#" style={{display:"none"}}>作品</Link>
            <Link href="#" style={{display:"none"}}>论坛</Link>
            <Link href="#" style={{display:"none"}}>关于</Link>
            <Link href="#" style={{display:"none"}}>联系我们</Link>
          </LinksContainer>
          {/* <SocialLinksContainer>
            <SocialLink href="https://facebook.com">
              <FacebookIcon />
            </SocialLink>
            <SocialLink href="https://twitter.com">
              <TwitterIcon />
            </SocialLink>
            <SocialLink href="https://youtube.com">
              <YoutubeIcon />
            </SocialLink>
          </SocialLinksContainer> */}
          <CopyrightText style={{marginTop:"-4rem"}}>
            &copy; Copyright 2022, 趣代码世界. All Rights Reserved.<br/>
            皖ICP备2022015871号<br/>
            皖公网安备 34019202002006号
    {/* <div dangerouslySetInnerHTML={{__html:ss}}></div> */}
            
          </CopyrightText>
        </Row>
      </Content>
    </Container>
  );
};
