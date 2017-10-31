import React from "react";

import { DataList } from "../../components/ui";

class Lists extends React.Component {
  render() {
    const { list, max } = this.props;
    return (
      <div>
        {list
          ? list.map((items, i) => {
              return items.map((item, i) => {
                console.log("item", item);
                return (
                  <DataList
                    key={i}
                    head={item.title}
                    ref="dataList"
                    max={max}
                    multiSelect={false}
                    data={item.items}
                    left="left"
                    right="right"
                    leftIcon="leftIcon"
                    rightIcon="rightIcon"
                  />
                );
              });
            })
          : null}
      </div>
    );
  }
}

export default Lists;
