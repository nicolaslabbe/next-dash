import React from "react";
import Router from "next/router";
import { connect } from "react-redux";
import Utils from "../../Utils";

import { Card, DataList, TextIcon, Text, Video } from "../../components/ui";

import dbActions from "../../Redux/DbRedux";

class List extends React.Component {
  goToDetail = item => {
    const { detail } = this.props;

    if (!detail) {
      if (item.id) {
        Router.push(
          `/db/detail?type=${this.props.type}&display=${this.props
            .display}&id=${item.id}`
        );
      } else if (item.url) {
        if (typeof window !== "undefined") {
          window.open(item.url);
        }
      }
    }
  };

  getItems(item) {
    return item.items && Array.isArray(item.items)
      ? item.items
      : item && Array.isArray(item) ? item : [item];
  }

  render() {
    const { items, type, detail, display } = this.props;
    return (
      <div>
        {display === "list" ? (
          <DataList
            onClick={item => this.goToDetail(item)}
            data={this.getItems(items)}
          />
        ) : (
          items &&
          this.getItems(items).map((item, i) =>
            this.getItems(item).map((it, j) => (
              <Card data={item} key={j} onClick={item => this.goToDetail(item)}>
                {detail && (
                  <Text className="description">
                    {item.description &&
                      item.description.replace(/<\/?[^>]+(>|$)/g, "")}
                  </Text>
                )}
                {it.details &&
                  it.details.map((itemDetail, key) => (
                    <DataList
                      key={key}
                      head={itemDetail.left}
                      data={itemDetail.right}
                    />
                  ))}
                {it.overview &&
                  it.overview.map((overview, key) => (
                    <TextIcon
                      key={key}
                      icon={overview.icon ? overview.icon : null}
                    >
                      {overview.left}
                    </TextIcon>
                  ))}
                {it.videos &&
                  it.videos.map((video, key) => (
                    <Video key={key} id={video.key} type={video.site} />
                  ))}
              </Card>
            ))
          )
        )}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {};
};

const mapDispatchToProps = dispatch => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(List);
