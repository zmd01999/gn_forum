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
}

export const FollowButton = ({ profile }: IProps) => {
  const profileService = useProfileService();
  const { nickname } = profile;
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
      if (following) {
        res = await profileService.unfollowUser(nickname);
      } else {
        res = await profileService.followUser(nickname);
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
      <Button size="tiny" icon onClick={handleFollowUser}>
        <Icon name={following ? "minus" : "plus"} />
        {following ? "取消关注" : "关注"}&nbsp; {nickname}
      </Button>
    </Fragment>
  );
};
