import React, { Dispatch, Fragment, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Icon } from "semantic-ui-react";
import { useProfileService } from "../../hooks";
import { IProfile } from "../../models/types";
import { AppState } from "../../redux/store";
import { NotificationAction } from "../../redux/reducers/NotifyReducer";
import { setWarning } from "../../redux/actions";
import { useHistory } from "react-router-dom";

interface IProps {
  profile: IProfile;
}

export const FollowButton = ({ profile }: IProps) => {
  const profileService = useProfileService();
  const { username } = profile;
  const history = useHistory();
  const [following, setFollowing] = useState<Boolean>(profile.following);
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
        res = await profileService.unfollowUser(username);
      } else {
        res = await profileService.followUser(username);
      }
      const profile = res.data.profile as IProfile;
      setFollowing(profile.following);
    } catch (error) {
      // TODO add error dispatcher to handle error
    }
  };

  if (isAuthenticated && user === username) {
    // no need to follow userself
    return <Fragment></Fragment>;
  }

  return (
    <Fragment>
      <Button size="tiny" icon onClick={handleFollowUser}>
        <Icon name={following ? "minus" : "plus"} />
        {following ? "Unfolloww" : "Follow"}&nbsp; {username}
      </Button>
    </Fragment>
  );
};
