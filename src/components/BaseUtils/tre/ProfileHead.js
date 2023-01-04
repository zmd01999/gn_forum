import tw from "twin.macro";
import { ReactComponent as SvgDecoratorBlob1 } from "src/assets/svg/svg-decorator-blob-9.svg";
import { ContentWithPaddingXl, Container } from "./Layouts";
import { Avatar, Stack, Badge } from "@mui/material";
import React ,{useState,useEffect}from "react"
import { LightTooltip } from "src/components/BaseUtils/ToolTips";
import { useSelector } from "react-redux";
import { getLocalStorage } from "src/utils";
import { Icon ,Modal,Form,TextArea,Button} from 'semantic-ui-react'
import {updateCreppyDefaultImage} from "src/utils";
import { Progress } from 'semantic-ui-react'
import copy from "copy-to-clipboard";
import {
  setSuccess,
  setError
} from "src/redux/actions";
import { useDispatch } from "react-redux";
import { useProfileService } from "src/hooks";

const PrimaryBackgroundContainer = tw.div`py-16 lg:py-6 bg-gray-200 rounded-lg relative`
const Row = tw.div`px-4 sm:px-8 mx-auto flex justify-center items-center relative z-10 flex-col lg:flex-row text-center lg:text-left`;

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
  subheading = "",
  heading = "",
  primaryLinkText = "",
  primaryLinkUrl = "",
  secondaryLinkText = "",
  secondaryLinkUrl = "",
  pushDownFooter = true,
  profile,
  isMsg
}) => {
  const username = "aaaaaa";
  const { user } = useSelector(
    (state) => state.auth
  );
  const [open, setOpen] = React.useState(false);
  const [content, setContent] = useState("");
  const handleContent = (data) => {
    setContent(data.value);
  };
  const notifyDiapatch = useDispatch();
  const profileService = useProfileService();
  const [isF,setIsF] = useState(true);
  const userInfo = getLocalStorage("userInfo");


  useEffect(() => {
    const retrieve = async () => {
      await profileService.isFollow(profile.id).then((res) => {
        setIsF(res.data.data);
      });
    };
    retrieve();
  }, []);
  return (
    <Container css={pushDownFooter && tw`mb-20 lg:mb-24 `}>
      <ContentWithPaddingXl>
        <PrimaryBackgroundContainer>
          <Row>
            <TextContainer>
              {subheading && <Subheading>{subheading}</Subheading>}
              <Heading>{heading}</Heading>
              <div className="flex flex-row py-4 space-x-4">
                <div>
                <LightTooltip title={user}>
                      <Avatar
                        alt={user}
                        src={updateCreppyDefaultImage(profile&&profile.avatar)}
                        sx={{ width: 80, height: 80 }}
                        variant="square"
                      />
                  </LightTooltip>

                </div>
                <div className="">
                  <div className="flex flex-col  space-y-4">
                  <span className="text-2xl font-semibold text-black">
                          {profile&&profile.nickname}
                          {isMsg ? <></>:(<><Modal
            closeIcon
            open={open}
            trigger={<Icon name="comment" style={{marginLeft:"2rem",cursor:"pointer"}} ></Icon>
          }
            onClose={() => setOpen(false)}
            onOpen={() => setOpen(true)}
          >
            <Modal.Header>私信</Modal.Header>
            <Modal.Content>
              <Form>
                <TextArea
                  placeholder="填写您的内容"
                  value={content}
                  onChange={(event, data) => {
                    handleContent(data);
                  }}
                />
              </Form>
            </Modal.Content>
            <Modal.Actions>
              <Button
                color="green"
                onClick={() => {
                  if(content.length == 0) return ;
                  if(!userInfo) {
                    notifyDiapatch(
                      setSuccess(`请先登录`)
                    );
                    return ;
                  }
                  profileService
                    .sendMsg({
                      toUserId: profile.id,
                      content: content ?? "默认消息",
                    })
                    .then((res) => {
                      console.log(res);
                      if (res.data.success) {
                        notifyDiapatch(setSuccess("发送成功."));
                      } else {
                        notifyDiapatch(setError(res.data.msg));
                      }
                    });
                  setOpen(false);
                }}
              >
                <Icon name="checkmark" /> 发送
              </Button>
              <Button color="red" onClick={() => setOpen(false)}>
                <Icon name="remove" /> 取消
              </Button>
            </Modal.Actions>
          </Modal>
               <Icon name={isF?"minus":"plus"} style={{marginLeft:"0.5rem",cursor:"pointer"}} onClick={async()=>{
                let res;
                if(!userInfo) {
                  notifyDiapatch(
                    setSuccess(`请先登录`)
                  );
                  return ;
                }
                        if (isF) {
                          res = await profileService.unfollowUser(profile&&profile.id);
                        } else {
                          res = await profileService.followUser(profile&&profile.id);
                        }
                        if (res.data.success) {
                          setIsF(!isF);
                        }

               }}></Icon></>)}
                        </span>
                  <span className="text-sm text-gray-700" 
                  onClick={()=>{
                                              copy(`https://www.funcodeworld.com/profile/${profile&&profile.id}`);
                                              notifyDiapatch(
                                                setSuccess(`该链接已复制到粘贴板`)
                                              );
                  }} style={{cursor:"pointer",fontWeight:"500"}}>{`https://www.funcodeworld.com/profile/${profile&&profile.id}`}</span>
                  <div className="flex flex-row text-sm text-gray-700" style={{fontWeight:"500"}}>
                    <div>{`发帖:${profile&&profile.articleNum} |`}</div>
                    <div>{`作品:${profile&&profile.projectNum} |`}</div>
                    <div>{`粉丝:${profile&&profile.fans} `}</div>
                  </div>
                </div>

                </div>
                {/* <Stack direction="row" spacing={2}>
                  <LightTooltip title={user}>
                    <Badge badgeContent={`Lv${userInfo.level}`} color="primary">
                      <Avatar
                        alt={user}
                        src={updateCreppyDefaultImage(userInfo.avatar)}
                        sx={{ width: 60, height: 60 }}
                        variant="square"
                      />
                    </Badge>
                  </LightTooltip>

                  <div>
                    <Stack spacing={1.2}>
                      <span className="text-2xl font-semibold text-white">
                        {userInfo.nickname}
                      </span>
                    </Stack>
                    <Progress percent={userInfo.growthValue} indicating />

                  </div>
                </Stack> */}
              </div>
            </TextContainer>
            {/* <LinksContainer>
               <PrimaryLink href={primaryLinkUrl}><Icon name="won"></Icon>{`${userInfo.money}金币`}</PrimaryLink>
              <SecondaryLink href={secondaryLinkUrl}>{secondaryLinkText}</SecondaryLink> 
            </LinksContainer> */}
            <div className="w-1/4"></div>
            <div className="w-1/3">
              <div className=" flex flex-row space-x-2">
                <div className="w-4/5 ">            
                <Progress progress='value'  size='small' color="yellow" value={profile&&profile.money}  total={100} active style={{marginTop:"0.6rem"}}/>
                </div>
                <div className="w-1/5 mb-4">
                  {/* <Icon name="money" size="large"></Icon> */}
                  <img src="/assets/money.png"></img>
                </div>
              </div>

              <div className=" flex flex-row space-x-2">
                <div className="w-4/5 mt-1">            
                <Progress percent={profile&&profile.growthValue}  size='small' color="olive" progress active /> 
                </div>
                <div className="w-1/5 font-semibold">
                  {`Lv${profile&&profile.level}`}
                </div>
              </div>
            </div>
            

          </Row>
          {/* <DecoratorBlobContainer>
            <DecoratorBlob1 />
            <DecoratorBlob2 />
          </DecoratorBlobContainer> */}
        </PrimaryBackgroundContainer>
      </ContentWithPaddingXl>
    </Container>
  );
};
