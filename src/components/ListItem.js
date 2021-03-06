import React, { Component } from 'react';
import { Text, TouchableWithoutFeedback, View, LayoutAnimation, Platform, UIManager } from 'react-native';
import { connect } from 'react-redux';
import { CardSection } from './common';
import * as actions from '../actions';
const { UIManager } = NativeModules;
UIManager.setLayoutAnimationEnabledExperimental(true);
componentWillMount() {
    if (Platform.OS === 'android'){
        UIManager.setLayoutAnimationEnabledExperimental(true);
    }
}
class ListItem extends Component{
  componentDidUpdate(){
    LayoutAnimation.spring();
  }
  renderDescription() {
    const { library, expanded } = this.props;
      if (expanded){
        return (
          <CardSection>
            <Text style={{ flex: 1}}>
              Description :{library.item.description}
            </Text>
          </CardSection>
        );
     }
  }

  render(){
    const { titleStyle } = styles;
    const { id, title } = this.props.library.item;



    return(
      <TouchableWithoutFeedback
        onPress={() => this.props.selectLibrary(id)}
      >
       <View>
        <CardSection>
          <Text style={titleStyle}>
            { title }
           </Text>
        </CardSection>
        {this.renderDescription()}
       </View>
      </TouchableWithoutFeedback>
    );
}


const styles = {
  titleStyle: {
    fontSize: 18,
    paddingLeft: 15
  }
};

const mapStateToProps = (state, ownProps) => {
  const expanded = state.selectedLibraryId === ownProps.library.item.id;
  return { expanded };
};

export default connect(mapStateToProps, actions)(ListItem);
