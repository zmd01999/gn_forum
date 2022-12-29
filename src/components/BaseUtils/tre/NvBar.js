import { motion } from "framer-motion";
import tw from "twin.macro";
import styled from "styled-components";
import {Fragment} from "react";
import useAnimatedNavToggler from "./useAnimatedNavToggler.js";
import { useSelector } from "react-redux";

import logo from "src/assets/svg/logo.svg";
import { ReactComponent as MenuIcon } from "feather-icons/dist/icons/menu.svg";
import { ReactComponent as CloseIcon } from "feather-icons/dist/icons/x.svg";
import UserDropdown from "src/@core/layouts/components/shared-components/UserDropdown";
import { getLocalStorage } from "src/utils.ts";
import { Dropdown } from 'semantic-ui-react'
import { useHistory } from "react-router-dom";
import { SearchInp } from "../../Home/Search";
const Header = tw.header`
  flex justify-between items-center
  max-w-screen-xl mx-auto lg:mb-8
`;

export const NavLinks = tw.div` space-x-24 text-center flex flex-row`;

/* hocus: stands for "on hover or focus"
 * hocus:bg-primary-700 will apply the bg-primary-700 class on hover or focus
 */
export const NavLink = tw.a`
  text-lg my-2 lg:text-xl lg:my-auto!
  font-semibold tracking-wide transition duration-300
  pb-1 border-b-2 border-transparent hover:border-yellow-400 hocus:text-yellow-400 text-center text-black
`;

export const PrimaryLink = tw(NavLink)`
  lg:mx-0 lg:ml-8
  px-8 py-3 rounded bg-primary-500 text-gray-100
  hocus:bg-primary-700 hocus:text-gray-200 focus:shadow-outline
  border-b-0
`;

export const LogoLink = styled(NavLink)`
  ${tw`flex items-center font-black border-b-0 text-2xl! ml-0!`};

  img {
    ${tw`w-40 mr-3`}
  }
`;

export const MobileNavLinksContainer = tw.nav`flex flex-1 items-center justify-between`;
export const NavToggle = tw.button`
  lg:hidden z-20 focus:outline-none hocus:text-primary-500 transition duration-300
`;
export const MobileNavLinks = motion(styled.div`
  ${tw`lg:hidden z-10 fixed top-0 inset-x-0 mx-4 my-6 p-8 border text-center rounded-lg text-gray-900 bg-white`}
  ${NavLinks} {
    ${tw`flex flex-col items-center`}
  }
`);

export const DesktopNavLinks = tw.nav`
  hidden lg:flex flex-1 space-x-40 justify-between items-center
`;

export default () => {
  /*
   * This header component accepts an optionals "links" prop that specifies the links to render in the navbar.
   * This links props should be an array of "NavLinks" components which is exported from this file.
   * Each "NavLinks" component can contain any amount of "NavLink" component, also exported from this file.
   * This allows this Header to be multi column.
   * So If you pass only a single item in the array with only one NavLinks component as root, you will get 2 column header.
   * Left part will be LogoLink, and the right part will be the the NavLinks component you
   * supplied.
   * Similarly if you pass 2 items in the links array, then you will get 3 columns, the left will be "LogoLink", the center will be the first "NavLinks" component in the array and the right will be the second "NavLinks" component in the links array.
   * You can also choose to directly modify the links here by not passing any links from the parent component and
   * changing the defaultLinks variable below below.
   * If you manipulate links here, all the styling on the links is already done for you. If you pass links yourself though, you are responsible for styling the links or use the helper styled components that are defined here (NavLink)
   */

  const { isAuthenticated, user } = useSelector(
    (state) => state.auth
  );
  const userInfo = getLocalStorage("userInfo");
  const roundedHeaderButton = false;
  const collapseBreakpointClass = "lg" ;
  const history = useHistory();
  const options = [
    { key: 1, text: '作品', value: 1 },
    { key: 2, text: '更多作品', value: 2},
    { key: 3, text: '创作', value: 3 },
  ]

  const centerLink =[
    <div className="flex min-w-max">
    <NavLinks key={2} >
      <NavLink href="/">首页</NavLink>
      <NavLink ><Dropdown text='作品' options={options} selectOnBlur={false}  onChange={(event, data)=>{
        console.log(data.value);
        if(data.value == 1) {
          history.push("/work");
        } else if(data.value ==2) {

        } else {
          const a = document.createElement('a');
          a.style.display = 'none';
          a.href = "/scratch/index.html?scene=create";
          document.body.appendChild(a);
          a.click();
        }
      }}/></NavLink>
            <NavLink href="/forum" >论坛</NavLink>

      <NavLink href="/scratch/index.html?scene=create" target = "_blank">创作</NavLink> 
      <SearchInp setArticleList={1}></SearchInp>
    </NavLinks>
    </div>

  ]
  const defaultLinks = [
    <NavLinks key={1} style={{marginLeft:"3rem"}} className="my-auto ">
      {/* <NavLink href="/">首页</NavLink>
      <NavLink href="/forum">论坛</NavLink>
      <NavLink ><Dropdown text='作品' options={options} selectOnBlur={false}  onChange={(event, data)=>{
        console.log(data.value);
        if(data.value == 1) {
          history.push("/work");
        } else if(data.value ==2) {

        } else {
          const a = document.createElement('a');
          a.style.display = 'none';
          a.href = "/scratch/index.html?scene=create";
          document.body.appendChild(a);
          a.click();
        }
      }}/></NavLink>
      <NavLink href="/scratch/index.html?scene=create">创作</NavLink>  */}
      {/* <NavLink href="/#">Pricing</NavLink>
      <NavLink href="/#">Contact Us</NavLink>*/}
      {isAuthenticated ? (
        <Fragment>
          {/* <PrimaryLink css={roundedHeaderButton && tw`rounded-full`}href={`/pcenter/${userInfo.nickname}`}>个人中心</PrimaryLink> */}
          <UserDropdown name={user}/>
          </Fragment>
        
        
        )
      :(
        <Fragment >
        <NavLink href="/login">
                登录
              </NavLink>
              {/* <PrimaryLink css={roundedHeaderButton && tw`rounded-full`}href="/register">注册</PrimaryLink> */}
              <NavLink href="/register" style={{marginLeft:"0.5rem"}}>
              | 注册
              </NavLink>
                </Fragment>

//         <Fragment>
// <NavLink href="/login" tw="lg:ml-12!">
//         登录
//       </NavLink>
//       <PrimaryLink css={roundedHeaderButton && tw`rounded-full`}href="/register">注册</PrimaryLink>
//         </Fragment>

      )}
    </NavLinks>


  ];

  const { showNavLinks, animation, toggleNavbar } = useAnimatedNavToggler();
  const collapseBreakpointCss = collapseBreakPointCssMap[collapseBreakpointClass];

  const defaultLogoLink = (
    <LogoLink href="/">
      {/* <img src={logo} alt="logo" />
      趣代码世界 */}
                    <div >
                <img src="/assets/logo.png" alt="logo"/>
              </div>
    </LogoLink>
  );

  const logoLink = defaultLogoLink;
  const links = defaultLinks;
  const cl = centerLink;
  return (
    <Header className={ "header-light"}>
      <DesktopNavLinks css={collapseBreakpointCss.desktopNavLinks}>
        {logoLink}
        <NavLinks key={2} style={{marginLeft:"3rem"}}>
          <div className="my-auto flex space-x-24">
          <NavLink href="/">首页</NavLink>
          <NavLink href="/work">作品</NavLink>

      <NavLink href="/forum">论坛</NavLink>
      <NavLink href="/scratch/index.html?scene=create" target = "_blank">创作</NavLink>

      {true ? (<></>
        )
      :(
        <Fragment>
<NavLink href="/login" tw="lg:ml-12!">
        登录
      </NavLink>
        </Fragment>
      )}
          </div>

        {/* <Dropdown text='作品' options={options} selectOnBlur={false}  onChange={(event, data)=>{
        console.log(data.value);
        if(data.value == 1) {
          history.push("/work");
        } else if(data.value ==2) {

        } else {
          const a = document.createElement('a');
          a.style.display = 'none';
          a.href = "/scratch/index.html?scene=create";
          document.body.appendChild(a);
          a.click();
        }
      }}/> */}
      
      
      {true ? (<div className="ml-36" style={{marginTop:"-0.4rem"}}><SearchInp setArticleList={1}></SearchInp></div>
        )
      :(<></>
      )}
        </NavLinks>
       
        {links}
      </DesktopNavLinks>

      {/* <MobileNavLinksContainer css={collapseBreakpointCss.mobileNavLinksContainer}>
        {logoLink}
        <MobileNavLinks initial={{ x: "150%", display: "none" }} animate={animation} css={collapseBreakpointCss.mobileNavLinks}>
          {links}
        </MobileNavLinks>
        <NavToggle onClick={toggleNavbar} className={showNavLinks ? "open" : "closed"}>
          {showNavLinks ? <CloseIcon tw="w-6 h-6" /> : <MenuIcon tw="w-6 h-6" />}
        </NavToggle>
      </MobileNavLinksContainer> */}
    </Header>
  );
};

/* The below code is for generating dynamic break points for navbar.
 * Using this you can specify if you want to switch
 * to the toggleable mobile navbar at "sm", "md" or "lg" or "xl" above using the collapseBreakpointClass prop
 * Its written like this because we are using macros and we can not insert dynamic variables in macros
 */

const collapseBreakPointCssMap = {
  sm: {
    mobileNavLinks: tw`sm:hidden`,
    desktopNavLinks: tw`sm:flex`,
    mobileNavLinksContainer: tw`sm:hidden`
  },
  md: {
    mobileNavLinks: tw`md:hidden`,
    desktopNavLinks: tw`md:flex`,
    mobileNavLinksContainer: tw`md:hidden`
  },
  lg: {
    mobileNavLinks: tw`lg:hidden`,
    desktopNavLinks: tw`lg:flex`,
    mobileNavLinksContainer: tw`lg:hidden`
  },
  xl: {
    mobileNavLinks: tw`lg:hidden`,
    desktopNavLinks: tw`lg:flex`,
    mobileNavLinksContainer: tw`lg:hidden`
  }
};
