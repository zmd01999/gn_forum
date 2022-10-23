import React, {
  Dispatch,
  Fragment,
  MouseEventHandler,
  SyntheticEvent,
  useState,
} from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router";
import { Icon, Menu, Segment } from "semantic-ui-react";
import { AppState } from "../../redux/store";
import "./style.css";
import OnlineAvatar from "./OnlineAvatar";
import UserDropdown from "src/@core/layouts/components/shared-components/UserDropdown";

interface IData {
  name: string;
  [key: string]: string;
}

export const Header = () => {
  const [activeItem, setActiveItem] = useState<string>("");
  const history = useHistory();
  const { isAuthenticated, user } = useSelector(
    (state: AppState) => state.auth
  );

  const handleItemClick = (event: SyntheticEvent, data: object) => {
    const tabName = (data as IData).name;
    setActiveItem(tabName);

    switch (tabName) {
      // TODO may use a map to connect tabName and router so no need for
      // many cases
      case "论坛":
      case "Logo":
        history.push("/");
        break;
      case "作品":
        history.push("/work");
        break;
      case "登录":
        history.push("/login");
        break;
      case "注册":
        history.push("/register");
        break;
      case "个人中心":
        history.push(`/pcenter/${user}`);
        break;
      case "Edit":
        history.push("/article/edit");
        break;
      case "Setting":
        history.push("/setting");
        break;
      case "User":
        history.push(`/profile/${user}`);
        break;
    }
  };

  return (
    <Fragment>
      <Segment inverted>
        <Menu inverted pointing secondary>
          <Menu.Item
            name="Logo"
            active={activeItem === "Logo"}
            onClick={handleItemClick}
          />
          <Menu.Menu position="right">
            <Menu.Item
              name="论坛"
              active={activeItem === "论坛"}
              onClick={handleItemClick}
            />
            <Menu.Item
              name="作品"
              active={activeItem === "作品"}
              onClick={handleItemClick}
            />
            {isAuthenticated ? (
              <Fragment>
                {/* <Menu.Item
                  name="Edit"
                  className="item-icon"
                  active={activeItem === "Edit"}
                  onClick={handleItemClick}
                >
                  <Icon name="write square" />
                  New Article
                </Menu.Item> */}

                {/* <Menu.Item
                  name="Setting"
                  className="item-icon"
                  active={activeItem === "Setting"}
                  onClick={handleItemClick}
                >
                  <Icon name="setting" />
                  Settings
                </Menu.Item> */}
                <Menu.Item
                  name="个人中心"
                  className="item-icon"
                  active={activeItem === "个人中心"}
                  onClick={handleItemClick}
                >
                  <OnlineAvatar></OnlineAvatar>
                  &nbsp;个人中心
                </Menu.Item>
                <UserDropdown />
              </Fragment>
            ) : (
              <Fragment>
                <Menu.Item
                  name="登录"
                  active={activeItem === "登录"}
                  onClick={handleItemClick}
                />
                <Menu.Item
                  name="注册"
                  active={activeItem === "注册"}
                  onClick={handleItemClick}
                />
              </Fragment>
            )}
          </Menu.Menu>
        </Menu>
      </Segment>
    </Fragment>
  );
};
