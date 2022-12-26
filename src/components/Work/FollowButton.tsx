import React, { Dispatch, Fragment, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Icon } from "semantic-ui-react";
import { useProfileService } from "../../hooks";
import { IProfile, IUserInfo } from "../../models/types";
import { AppState } from "../../redux/store";
import { NotificationAction } from "../../redux/reducers/NotifyReducer";
import { setWarning } from "../../redux/actions";
import { useHistory } from "react-router-dom";

interface IProps {
  profile: IUserInfo;
  isF?: boolean;
  setIsF?: React.Dispatch<React.SetStateAction<boolean | undefined>>;
}

export const FollowButton = ({ profile, isF, setIsF }: IProps) => {
  const profileService = useProfileService();
  const { nickname, id } = profile;
  const history = useHistory();
  const [following, setFollowing] = useState<Boolean>(true);
  const notifyDispatch = useDispatch<Dispatch<NotificationAction>>();
  const { isAuthenticated, user } = useSelector(
    (state: AppState) => state.auth
  );
  const handleFollowUser = async () => {
    if (!isAuthenticated) {
      notifyDispatch(setWarning("你需要先登录"));
      history.push("/login");
      return;
    }
    let res;
    try {
      if (isF) {
        res = await profileService.unfollowUser(id);
      } else {
        res = await profileService.followUser(id);
      }
      if (res.data.success && setIsF !== undefined) {
        setIsF(!isF);
      }
      const profile = res.data.profile as IProfile;
      setFollowing(profile.following);
    } catch (error) {
      // TODO add error dispatcher to handle error
    }
  };

  if (isAuthenticated && user === nickname) {
    // no need to follow userself
    return <Fragment></Fragment>;
  }

  return (
    <Fragment>
      {/* <Button size="tiny" icon onClick={handleFollowUser} >
        <Icon name={isF ? "minus" : "plus"} />
        {isF ? "取消关注" : "关注"}&nbsp; {nickname}
      </Button> */}

      <Button
        // basic={isF}
        content={isF ? "已关注" : `关注`}
        icon={isF ? false : "plus"}
        size="tiny"
        onClick={handleFollowUser}
        className="bccc"
      />
    </Fragment>
  );
};
