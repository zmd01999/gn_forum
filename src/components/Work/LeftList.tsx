import React from "react";
import { Divider, Icon, Image, Item } from "semantic-ui-react";

const paragraph = <Image src="/images/wireframe/short-paragraph.png" />;

export const LeftList = () => {
  return (
    <Item.Group>
      <Item>
        <Item.Image size="tiny" src="/assets/forum.webp" />

        <Item.Content>
          <Item.Header as="a">比比谁画的月亮圆</Item.Header>
          <Item.Meta></Item.Meta>
          <Item.Description>这款游戏很不错</Item.Description>

          <Item.Extra>
            <div className="flex space-x-4">
              <Icon color="green" name="eye" /> 121
              <Icon color="yellow" name="star" /> 10
            </div>
          </Item.Extra>
        </Item.Content>
      </Item>
      <Divider></Divider>
      <Item>
        <Item.Image size="tiny" src="/assets/forum_1.webp" />

        <Item.Content>
          <Item.Header as="a">丧坤危机</Item.Header>
          <Item.Description>这款游戏很不错</Item.Description>
          <Item.Extra>
            <div className="flex space-x-4">
              <Icon color="green" name="eye" /> 111
              <Icon color="yellow" name="star" /> 32
            </div>
          </Item.Extra>
        </Item.Content>
      </Item>
      <Divider></Divider>

      <Item>
        <Item.Image size="tiny" src="/assets/forum.webp" />

        <Item.Content>
          <Item.Header as="a">比比谁画的月亮圆</Item.Header>
          <Item.Meta></Item.Meta>
          <Item.Description>这款游戏很不错</Item.Description>

          <Item.Extra>
            <div className="flex space-x-4">
              <Icon color="green" name="eye" /> 121
              <Icon color="yellow" name="star" /> 10
            </div>
          </Item.Extra>
        </Item.Content>
      </Item>
      <Divider></Divider>
      <Item>
        <Item.Image size="tiny" src="/assets/forum_1.webp" />

        <Item.Content>
          <Item.Header as="a">丧坤危机</Item.Header>
          <Item.Description>这款游戏很不错</Item.Description>
          <Item.Extra>
            <div className="flex space-x-4">
              <Icon color="green" name="eye" /> 111
              <Icon color="yellow" name="star" /> 32
            </div>
          </Item.Extra>
        </Item.Content>
      </Item>
      <Divider></Divider>

      <Item>
        <Item.Image size="tiny" src="/assets/forum.webp" />

        <Item.Content>
          <Item.Header as="a">比比谁画的月亮圆</Item.Header>
          <Item.Meta></Item.Meta>
          <Item.Description>这款游戏很不错</Item.Description>

          <Item.Extra>
            <div className="flex space-x-4">
              <Icon color="green" name="eye" /> 121
              <Icon color="yellow" name="star" /> 10
            </div>
          </Item.Extra>
        </Item.Content>
      </Item>
      <Divider></Divider>
      <Item>
        <Item.Image size="tiny" src="/assets/forum_1.webp" />

        <Item.Content>
          <Item.Header as="a">丧坤危机</Item.Header>
          <Item.Description>这款游戏很不错</Item.Description>
          <Item.Extra>
            <div className="flex space-x-4">
              <Icon color="green" name="eye" /> 111
              <Icon color="yellow" name="star" /> 32
            </div>
          </Item.Extra>
        </Item.Content>
      </Item>
    </Item.Group>
  );
};
