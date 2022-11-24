import tw from "twin.macro";
import { ReactComponent as SvgDecoratorBlob1 } from "src/assets/svg/svg-decorator-blob-9.svg";
import { ContentWithPaddingXl, Container } from "./Layouts";
import { Avatar, Stack, Badge } from "@mui/material";

import { LightTooltip } from "src/components/BaseUtils/ToolTips";
import { useSelector } from "react-redux";
import { getLocalStorage } from "src/utils";
import { Icon } from 'semantic-ui-react'
import {updateCreppyDefaultImage} from "src/utils";
import { Progress } from 'semantic-ui-react'

const PrimaryBackgroundContainer = tw.div`py-16 lg:py-20 bg-purple-200 rounded-lg relative`
const Row = tw.div`px-4 sm:px-16 mx-auto flex justify-center items-center relative z-10 flex-col lg:flex-row text-center lg:text-left`;

const ColumnContainer = tw.div`lg:w-1/2 max-w-lg`
const TextContainer = tw(ColumnContainer)`text-2xl sm:text-4xl font-bold`;
const Subheading = tw.h6`text-primary-500 opacity-75`;
const Heading = tw.h5`text-primary-500`;

const LinksContainer = tw(ColumnContainer)`flex justify-center lg:justify-end mt-6 lg:mt-0 flex-col sm:flex-row`;

const Link = tw.a`w-full sm:w-auto text-sm sm:text-base px-6 py-3 sm:px-8 sm:py-4 lg:px-10 lg:py-5 mt-4 first:mt-0 sm:mt-0 sm:mr-8 sm:last:mr-0 rounded font-bold border border-transparent tracking-wide transition duration-300 focus:outline-none focus:shadow-outline`;
const PrimaryLink = tw(Link)`shadow text-gray-100 hocus:text-gray-300 bg-primary-500 hocus:bg-primary-700`;

const SecondaryLink = tw(Link)`text-primary-500 hover:text-primary-600 bg-gray-100 hover:bg-gray-200`;

const DecoratorBlobContainer = tw.div`absolute inset-0 overflow-hidden rounded-lg`
const DecoratorBlob1 = tw(SvgDecoratorBlob1)`absolute bottom-0 left-0 w-80 h-80 transform -translate-x-20 translate-y-32 text-primary-500 opacity-5`
const DecoratorBlob2 = tw(SvgDecoratorBlob1)`absolute top-0 right-0 w-80 h-80 transform  translate-x-20 -translate-y-64 text-primary-500 opacity-5`
export default ({
  subheading = "个人中心",
  heading = "",
  primaryLinkText = "代币",
  primaryLinkUrl = "",
  secondaryLinkText = "关于我们",
  secondaryLinkUrl = "",
  pushDownFooter = true
}) => {
  const username = "aaaaaa";
  const { user } = useSelector(
    (state) => state.auth
  );
  const userInfo = getLocalStorage("userInfo");
  return (
    <Container css={pushDownFooter && tw`mb-20 lg:mb-24`}>
      <ContentWithPaddingXl>
        <PrimaryBackgroundContainer>
          <Row>
            <TextContainer>
              {subheading && <Subheading>{subheading}</Subheading>}
              <Heading>{heading}</Heading>
              <div className="py-4">
                <Stack direction="row" spacing={2}>
                  <LightTooltip title={user}>
                    <Badge badgeContent={`Lv${userInfo.level}`} color="primary">
                      <Avatar
                        alt={user}
                        src={updateCreppyDefaultImage(userInfo.avatar)}
                        sx={{ width: 60, height: 60 }}
                      />
                    </Badge>
                  </LightTooltip>

                  <div>
                    <Stack spacing={1.2}>
                      <span className="text-2xl font-semibold text-white">
                        {userInfo.nickname}
                      </span>
                      {/* <Progress props={userInfo.growthValue}></Progress> */}
                    </Stack>
                    <Progress percent={userInfo.growthValue} indicating />

                  </div>
                </Stack>
              </div>
            </TextContainer>
            <LinksContainer>
              <PrimaryLink href={primaryLinkUrl}><Icon name="won"></Icon>{`${userInfo.money}金币`}</PrimaryLink>
              <SecondaryLink href={secondaryLinkUrl}>{secondaryLinkText}</SecondaryLink>
            </LinksContainer>
          </Row>
          <DecoratorBlobContainer>
            <DecoratorBlob1 />
            <DecoratorBlob2 />
          </DecoratorBlobContainer>
        </PrimaryBackgroundContainer>
      </ContentWithPaddingXl>
    </Container>
  );
};
