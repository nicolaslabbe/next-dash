import React from "react";
import Router from "next/router";
import { connect } from "react-redux";

import { Cards } from "./";
import { DataList } from "../../components/ui";

import dbActions from "../../Redux/DbRedux";

class List extends React.Component {
  goToDetail = item => {
    if (item.id) {
      Router.push(
        `/db/detail?type=${this.props.type}&display=list&id=${item.id}`
      );
    } else if (item.url) {
      if (typeof window !== "undefined") {
        window.open(item.url);
      }
    }
  };

  render() {
    const { items, detail, type, display } = this.props;

    return (
      <div>
        {display === "list" ? (
          <DataList
            ref="dataList"
            onClick={(item, i) => (!detail ? this.goToDetail(item) : null)}
            multiSelect={false}
            data={items.items ? items.items : items}
            left="left"
            right="right"
            leftIcon="leftIcon"
            rightIcon="rightIcon"
          />
        ) : (
          <Cards
            detail={detail}
            type={type}
            items={items.items ? items.items : items}
          />
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
