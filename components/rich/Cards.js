import React from "react";
import Router from "next/router";
import { connect } from "react-redux";

// Reduceurs
import dbActions from "../../Redux/DbRedux";
import ListActions from "../../Redux/ListRedux";

import Utils from "../../Utils";
import { Card, TextIcon, DataList, List, Video } from "../../components/ui";

class Cards extends React.Component {
  save = item => {
    this.props.callSave(
      this.props.type,
      item,
      item.id ? { key: "id", value: item.id } : null
    );
  };

  delete = item => {
    this.props.callRemove(this.props.type, [item.apiId]);
  };

  goToDetail = item => {
    if (item.id) {
      this.props.callDetail(this.props.type, item.id);
      Router.push(`/db/detail?type=${this.props.type}&display=${this.props.display}&id=${item.id}`);
    } else if (item.url) {
      if (typeof window !== "undefined") {
        window.open(item.url);
      }
    }
  };

  getDetails = item => {
    return (
      <div>
        {item &&
          item.map((detail, key) => {
            return (
              <DataList
                key={key}
                head={detail.name}
                data={detail.value}
                left="name"
                right="value"
              />
            );
          })}
      </div>
    );
  };

  getVideos = videos => {
    return (
      <div>
        {videos &&
          videos.map((video, i) => (
            <Video key={i} id={video.key} type={video.site} />
          ))}
      </div>
    );
  };

  getOverview(items) {
    return (
      <div>
        {items &&
          Array.isArray(items) &&
          items.map((item, i) => (
            <TextIcon key={i} icon={item.icon ? item.icon : null}>
              {item.value}
            </TextIcon>
          ))}
      </div>
    );
  }

  render() {
    const { items, detail, type, display } = this.props;

    return (
      <div>
        {items && Array.isArray(items)
          ? items.map((item, i) => <Card
              key={i}
              title={item.title}
              date={Utils.date.timestampToHumain(item.date)}
              onClick={e => (!detail ? this.goToDetail(item) : null)}
              image={item.image}
            >
              {item.overview ? this.getOverview(item.overview) : null}
              {item.details ? this.getDetails(item.details) : null}
              {item.videos ? this.getVideos(item.videos) : null}
            </Card>)
          : items
            ? <Card
                title={items.title}
                date={Utils.date.timestampToHumain(items.date)}
                onClick={e => (!detail ? this.goToDetail(items) : null)}
                image={items.image}
              >
                {items.overview ? this.getOverview(items.overview) : null}
                {items.details ? this.getDetails(items.details) : null}
                {items.videos ? this.getVideos(items.videos) : null}
              </Card>
            : null}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {};
};

const mapDispatchToProps = dispatch => {
  return {
    callSave: (name, item, duplicate) =>
      dispatch(ListActions.listAdd(name, item, duplicate)),
    callRemove: (name, id) => dispatch(ListActions.listRemove(name, id)),
    callDetail: (type, id) => dispatch(dbActions.dbDetailRequest(type, id))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Cards);
