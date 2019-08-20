import React from 'react';
import { View, TouchableWithoutFeedback, Text, Animated } from 'react-native';
import styles, { buttonDimension, selectedBackgroundColor, iconColor, iconSize, dismissBackgroundColor } from './styles';
import Icon from 'react-native-vector-icons/MaterialIcons';

interface Props {
  maxWidth: number,
  children: string,
};

interface State {
  buttonWidthAnimationValue: Animated.Value,
  buttonScaleAnimationValue: Animated.Value,
  labelOpacityAnimationValue: Animated.Value,
  animating: boolean,
  isSelected: boolean,
  toValue: number,
};

const PlusIcon = <Icon name="add" size={iconSize} color={iconColor} />;

class ButtonOne extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.handleAdd = this.handleAdd.bind(this);
    this.handleRemove = this.handleRemove.bind(this);
    this.renderButton = this.renderButton.bind(this);
    this.renderSelectedView = this.renderSelectedView.bind(this);

    this.state = {
      buttonWidthAnimationValue: new Animated.Value(0),
      buttonScaleAnimationValue: new Animated.Value(0),
      labelOpacityAnimationValue: new Animated.Value(1),
      animating: false,
      isSelected: false,
      toValue: 1,
    };
  }

  componentDidUpdate(__: Props, prevState: State) {
    if(this.state === prevState || !this.state.animating)
      return;

    const { labelOpacityAnimationValue, isSelected } = this.state;

    const animatedSequence = [
        Animated.parallel([
          this.animateButtonScale(),
          this.animateFadeOpacityOutIn(labelOpacityAnimationValue)
        ]),
        this.animateButtonWidth(),
        this.animateFadeOpacityInOut(labelOpacityAnimationValue)
    ];
  
    Animated.sequence(isSelected ? animatedSequence : animatedSequence.reverse()).start(() => {
      this.setState({
        animating: false,
      });
    });
  }

  animateFadeOpacityOutIn(value) {
    return Animated.timing(value, {
      toValue: this.state.isSelected ? 0 : 1,
      duration: 200
    });
  }

  animateFadeOpacityInOut(value) {
    return Animated.timing(value, {
      toValue: !this.state.isSelected ? 0 : 1,
      duration: 200
    });
  }

  animateButtonScale() {
    return Animated.timing(this.state.buttonScaleAnimationValue, {
      toValue: this.state.toValue,
      duration: 200,
    });
  }

  animateButtonWidth() {
    return Animated.timing(this.state.buttonWidthAnimationValue, {
      toValue: this.state.toValue,
      duration: 250,
    });
  }

  handleAdd() {
    this.setState({
      animating: true,
      isSelected: true,
      toValue: 1,
    });
  }

  handleRemove() {
    this.setState({
      animating: true,
      isSelected: false,
      toValue: 0,
    });
  }

  renderButton(isSelected: boolean) {
    return (
      <TouchableWithoutFeedback onPress={isSelected ? this.handleRemove : this.handleAdd}>
        <View style={[styles.button, isSelected && {transform: [{rotate: '45deg'}]}]} >
          {PlusIcon}
        </View>
      </TouchableWithoutFeedback>
    );
  }

  renderSelectedView() {
    return (
      <View style={[styles.selectedContainer, { width: this.props.maxWidth }]} >
        <View style={[styles.labelContainer, { marginLeft: buttonDimension }]} >
          <Animated.Text style={[styles.label, { opacity: this.state.labelOpacityAnimationValue }]}>{this.props.children}</Animated.Text>
        </View>
        {this.renderButton(this.state.isSelected)}
      </View>
    );
  }

  renderDefaultView() {
    return (
      <View style={styles.defaultContainer}>
        {this.renderButton(this.state.isSelected)}
        <View style={styles.labelContainer}>
        <Animated.Text style={[styles.label, { opacity: this.state.labelOpacityAnimationValue }]}>{this.props.children}</Animated.Text>
        </View>
      </View>
    );
  }

  render() {
    const { maxWidth } = this.props;
    const {
      buttonWidthAnimationValue,
      isSelected,
      animating,
      buttonScaleAnimationValue,
    } = this.state;

    // Interpolate view from initial max width to max selected button width
    const interpolateButtonWidth = buttonWidthAnimationValue.interpolate({
      inputRange: [0, 1],
      outputRange: [buttonDimension, maxWidth],
    });

    // Interpolate plus icon rotate clockwise to represent a x to close selected button
    const interpolateIconRotation = buttonWidthAnimationValue.interpolate({
      inputRange: [0, 1],
      outputRange: ['0deg', '45deg'],
    });

    // Interpolate plus icon x position from initial button position to max selected button width
    // minus max icon width
    const interpolateIconMovement = buttonWidthAnimationValue.interpolate({
      inputRange: [0, 1],
      outputRange: [0, ( maxWidth - buttonDimension )]
    });

    // Render animated view transition between view state
    if(animating)
      return (
        <View style={styles.container}>
          <Animated.View
            style={[
              styles.defaultButton,
              {
                backgroundColor: (animating && isSelected && selectedBackgroundColor) || (animating && !isSelected && dismissBackgroundColor),
                width: interpolateButtonWidth,
                transform: [{
                  scale: buttonScaleAnimationValue,
                }]
              }
            ]}
          />
          <Animated.View
            style={[
              styles.button,
              {
                transform: [{ rotate: interpolateIconRotation }],
                zIndex: 2,
                position: 'absolute',
                top: 0,
                left: interpolateIconMovement,
              },
            ]}
          >
            {PlusIcon}
          </Animated.View>
          <Animated.Text
            style={[
              styles.label,
              {
                opacity: this.state.labelOpacityAnimationValue,
              },
            ]}
          >{this.props.children}</Animated.Text>
        </View>
      );

    // Render either default or selected view
     if(!animating)
      return (
        <View style={styles.container}>
          {isSelected ? (
            this.renderSelectedView()
          ) : (
            this.renderDefaultView()
          )}
        </View>
    );
  }
}

export default ButtonOne;