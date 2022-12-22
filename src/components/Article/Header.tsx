import { Dispatch, SyntheticEvent, useState } from "react";
import { useDispatch } from "react-redux";
import {
  Button,
  Divider,
  Form,
  Grid,
  Icon,
  Modal,
  TextArea,
} from "semantic-ui-react";
import { useProfileService } from "src/hooks";
import { IUserInfo } from "src/models/types";
import { setError, setSuccess } from "src/redux/actions";
import { updateCreppyDefaultImage } from "src/utils";
import { NotificationAction } from "src/redux/reducers/NotifyReducer";

interface IProps {
  author: IUserInfo | null | any;
}

export const Header = ({ author }: IProps) => {
  const [open, setOpen] = useState(false);
  const profileService = useProfileService();
  const [content, setContent] = useState<string>();
  const handleContent = (data: any) => {
    setContent(data.value);
  };
  const notifyDispatch = useDispatch<Dispatch<NotificationAction>>();

  return (
    <div className="ui card cardlenth" style={{ flexGrow: "1" }}>
      <div
        className="header text-xl font-semibold"
        style={{ paddingBottom: "0.4rem" }}
      >
        {(author && author.nickname) || "游客"}
      </div>

      <div className="image">
        <img
          src={updateCreppyDefaultImage((author && author.avatar) || null)}
        />
      </div>
      <div className="content">
        {/* <div className="meta">Joined in 2016</div> */}
        <div className="description">
          <Grid columns={3} divided>
            <Grid.Column>
              <div className="text-center">
                {(author && author.articleNum) || "0"}
                <br />
                帖子
              </div>
            </Grid.Column>

            <Grid.Column verticalAlign="middle">
              <div className=" text-center">
                {`Lv${(author && author.level) || "0"}`}
                <br />
                等级
              </div>
            </Grid.Column>
            <Grid.Column verticalAlign="middle">
              <div className="text-center">
                {(author && author.money) || "0"}
                <br />
                金币
              </div>
            </Grid.Column>
          </Grid>
        </div>
        <div style={{ marginTop: "3rem" }}>
          <Modal
            closeIcon
            open={open}
            trigger={<Button className="header-button">发消息</Button>}
            onClose={() => setOpen(false)}
            onOpen={() => setOpen(true)}
          >
            <Modal.Header>私信</Modal.Header>
            <Modal.Content>
              <Form>
                <TextArea
                  placeholder="填写您的内容"
                  value={content}
                  onChange={(event: SyntheticEvent, data: object) => {
                    handleContent(data);
                  }}
                />
              </Form>
            </Modal.Content>
            <Modal.Actions>
              <Button
                color="green"
                onClick={() => {
                  profileService
                    .sendMsg({
                      toUserId: author.id,
                      content: content ?? "默认消息",
                    })
                    .then((res) => {
                      console.log(res);
                      if (res.data.success) {
                        notifyDispatch(setSuccess("发送成功."));
                      } else {
                        notifyDispatch(setError(res.data.msg));
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
        </div>
      </div>
      {/* <div className="extra content">

        <Button className="header-button">发消息</Button>
      </div> */}
    </div>
  );
};
