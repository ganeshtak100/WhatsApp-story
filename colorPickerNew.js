// import React, {useState} from 'react';
// import {StyleSheet, View} from 'react-native';
// import {HueSlider} from 'react-native-color';
// import tinycolor from 'tinycolor2';
// export default ColorPickerNew = props => {
//   let [changeHue, setChangeHue] = useState(133);
//   let [modalVisible, setModalVisible] = useState(false);
//   let [recents, setRecents] = useState([
//     '#247ba0',
//     '#70c1b3',
//     '#b2dbbf',
//     '#f3ffbd',
//     '#ff1654',
//   ]);
//   let [color, setColor] = useState(tinycolor('#70c1b3').toHsl());

//   // state = {
//   //   changeHue:133,
//   //   modalVisible: false,
//   //   recents: ['#247ba0', '#70c1b3', '#b2dbbf', '#f3ffbd', '#ff1654'],
//   //   color: tinycolor('#70c1b3').toHsl(),
//   // };
//   let updateHue = h => {
//     setChangeHue(h);
//     props.onChangeColor(h);
//     setColor(color, h);
//     console.log('setcolor==', color);
//     // this.setState({changeHue:h})
//     // this.setState({color: {...this.state.color, h}});
//   };

//   let hsl = require('hsl-to-hex');
//   let hue = 133;
//   let saturation = changeHue;
//   let luminosity = 60;
//   let hex = hsl(saturation, 80, luminosity);
//   // props.onChangeColor(hex);
//   // onChangeColor();
//   // let onChangeColor = () => {
//   //   // props.onChangeColor(hex);
//   // };
//   console.log(' coloron change', hex); // #70c282
//   // render() {
//   return (
//     <View style={styles.container}>
//       <HueSlider
//         style={styles.sliderRow}
//         gradientSteps={40}
//         value={color.h}
//         onValueChange={() => updateHue()}
//       />
//       {/* <HueSlider
//           style={styles.sliderRow}
//           gradientSteps={40}
//           value={this.state.color.h}
//           onValueChange={this.updateHue}
//         /> */}
//     </View>
//   );
// };
// // }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//   },
//   header: {
//     alignItems: 'center',
//     justifyContent: 'center',
//     paddingTop: Platform.OS === 'ios' ? 20 : 0,
//     paddingBottom: 16,
//   },
//   content: {
//     alignItems: 'flex-start',
//     justifyContent: 'flex-start',
//     paddingHorizontal: 32,
//     paddingBottom: 32,
//   },
//   headerText: {
//     marginTop: 24,
//     fontSize: 34,
//     lineHeight: 41,
//     ...Platform.select({
//       android: {
//         fontFamily: 'sans-serif-bold',
//       },
//       ios: {
//         fontWeight: '700',
//         letterSpacing: 0.41,
//       },
//     }),
//   },
//   sectionText: {
//     marginTop: 32,
//     color: '#222',
//     fontSize: 22,
//     lineHeight: 28,
//     ...Platform.select({
//       android: {
//         fontFamily: 'sans-serif-medium',
//       },
//       ios: {
//         fontWeight: '600',
//         letterSpacing: 0.75,
//       },
//     }),
//   },
//   componentText: {
//     marginTop: 16,
//     color: '#222',
//     fontSize: 16,
//     lineHeight: 21,
//     ...Platform.select({
//       android: {
//         fontFamily: 'sans-serif-medium',
//       },
//       ios: {
//         fontWeight: '600',
//         letterSpacing: -0.408,
//       },
//     }),
//   },
//   colorPreview: {
//     marginLeft: 12,
//     marginTop: 12,
//     flexDirection: 'column',
//     alignItems: 'flex-end',
//     justifyContent: 'flex-end',
//     paddingVertical: 16,
//     paddingHorizontal: 32,
//     borderRadius: 3,
//     shadowColor: 'black',
//     shadowOffset: {width: 0, height: 2},
//     shadowRadius: 4,
//     shadowOpacity: 0.25,
//   },
//   gradient: {
//     alignSelf: 'stretch',
//     marginLeft: 12,
//     marginTop: 12,
//     marginBottom: 16,
//     height: 4,
//   },
//   sliderRow: {
//     alignSelf: 'stretch',
//     marginLeft: 12,
//     marginTop: 12,
//   },
//   colorString: {
//     fontSize: 34,
//     lineHeight: 41,
//     ...Platform.select({
//       android: {
//         fontFamily: 'monospace',
//       },
//       ios: {
//         fontFamily: 'Courier New',
//         fontWeight: '600',
//         letterSpacing: 0.75,
//       },
//     }),
//   },
// });
