import React from 'react';

export default function withStore(Component) {
  return class WithStore extends React.Component {
    state = {
      activePostIndex: undefined
    };
    setActivePost = index => {
      console.log(index);
      this.setState({ activePostIndex: index });
    };
    back = () => {
      this.setState({ activePostIndex: undefined });
    };
    render() {
      return (
        <Component
          activePostIndex={this.state.activePostIndex}
          setActivePost={this.setActivePost}
          back={this.back}
        />
      );
    }
  };
}
