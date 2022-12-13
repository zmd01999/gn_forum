import { Button, Divider, Grid } from "semantic-ui-react";
import { IUserInfo } from "src/models/types";
import { updateCreppyDefaultImage } from "src/utils";
interface IProps {
  author: IUserInfo;
}

export const Header = ({ author }: IProps) => {
  return (
    <div className="ui card cardlenth">
      <div className="header text-xl font-semibold">{author.nickname}</div>

      <div className="image">
        <img src={updateCreppyDefaultImage(author.avatar ?? null)} />
      </div>
      <div className="content">
        {/* <div className="meta">Joined in 2016</div> */}
        <div className="description">
          <Grid columns={3} divided>
            <Grid.Column>
              <div className="text-center">
                777
                <br />
                帖子
              </div>
            </Grid.Column>

            <Grid.Column verticalAlign="middle">
              <div className=" text-center">
                {`Lv${author.level}`}
                <br />
                等级
              </div>
            </Grid.Column>
            <Grid.Column verticalAlign="middle">
              <div className="text-center">
                {author.money}
                <br />
                金币
              </div>
            </Grid.Column>
          </Grid>
        </div>
      </div>
      <div className="extra content">
        {/* <a>
          <i aria-hidden="true" className="user icon"></i>10 Friends
        </a> */}
        <Button color="blue">发消息</Button>
      </div>
    </div>
  );
};
