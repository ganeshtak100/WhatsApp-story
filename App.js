import CameraRoll from '@react-native-community/cameraroll';
import {SketchCanvas} from '@terrylinla/react-native-sketch-canvas';
import {
  Body,
  Container,
  Left,
  List,
  ListItem,
  Right,
  Text,
  Thumbnail,
} from 'native-base';
import React, {
  createRef,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import {
  Alert,
  Dimensions,
  FlatList,
  Image,
  ImageBackground,
  Modal,
  PermissionsAndroid,
  Platform,
  Pressable,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import AmazingCropper from 'react-native-amazing-cropper';
import {RNCamera} from 'react-native-camera';
import {useCamera} from 'react-native-camera-hooks';
import {HueSlider} from 'react-native-color';
import RNFS from 'react-native-fs';
import ImagePicker from 'react-native-image-crop-picker';
import ViewShot from 'react-native-view-shot';
import tinycolor from 'tinycolor2';
import {BottomText} from './Components/BottomText';
import imagesArray from './Components/data';
import jsonData, {default as localData} from './Components/StoriesData';
import styles from './Components/style';
import storageImage from './data';
import imageShow from './dataImage';

const {width, height} = Dimensions.get('screen');
const sliderWidth = Dimensions.get('window').width;
const itemHeight = Dimensions.get('window').height;
const WhatsAppChatConatiner = props => {
  let flatListRef = useRef(null);
  let hsl = require('hsl-to-hex');
  let [modalVisible, setModalVisible] = React.useState(false);
  let [currentIndex, setCurrentIndex] = useState(0);
  let [statusImages, setStatuImages] = useState([]);
  let [checkStatus, setCheckStatus] = useState(false);
  let [modalForMyStatus, setModalForMyStatus] = useState(false);
  let [showDoneButton, setShowDoneButton] = useState(false);
  let [imageEditModal, setImageEditModal] = useState(false);
  let [changeHue, setChangeHue] = useState(133);
  let [imageToEdit, setImageToEdit] = useState('');
  const [{cameraRef}, {takePicture}] = useCamera(null);

  let [changeFlashIcon, setChangeFlashIcon] = useState(false);
  let [data, setData] = useState(
    jsonData.ENTRIES1.map((item, index) => item.illustration),
  );
  let [showStatusImage, setShowStatusImage] = useState(false);
  let [dataForMystatus, setDataForMyStatus] = useState([]);
  let [statusOnPressActivity, setStatusOnPressActivity] = useState(false);
  let [cameraOpenModal, setCameraOpenModal] = useState(false);
  let [flashMode, setFlashMode] = useState();
  let [frontCamera, setFrontCamera] = useState();
  let [colorChange, setChangeColor] = useState('#000000');
  let [showpencil, setShowPencil] = useState(false);
  let [imageArray, setImageArray] = useState([]);
  let [uri, setUri] = useState();
  let [url, setUrl] = useState();
  let [showUndo, setShowUndo] = useState(false);
  let [noPhotos, setNoPhotos] = useState(1);
  let [showSelectedPhotos, setShowSelectedPhotos] = useState(false);
  const [isModalVisible, setIsModalVisible] = React.useState(false);
  let [captureFromGallery, setCaptureFromGallery] = useState(true);
  const handleModal = () => setIsModalVisible(() => !isModalVisible);
  const signatureRef = createRef();
  const ref = useRef();
  const [value, setValue] = useState(tinycolor('#70c1b3').toHsl());
  const [h, setH] = useState(169);
  let [image, setImage] = useState();
  // const reff = useRef<SketchCanvasRef>(null!);
  const [strokeWidth, setStrokeWidth] = useState(1);
  const [colorr, setColorr] = useState('black');
  let [color, setColor] = useState(hsl(169, 80, 60));
  let [arrayImage, setArrayImage] = useState(imageShow);
  let [imagecrop, setImageCrop] = useState(false);
  let strokeRef = useRef();

  useEffect(() => {
    setColor(hsl(h, 80, 60));
    setValue(tinycolor(color).toHsl());
  }, [h]);

  // on mount
  const onCapture = useCallback(() => {
    // console.log('VIEWSHOE IMAGES url', uri);
    ref.current.capture().then(uri => {
      console.log('VIEWSHOE IMAGES url---', uri);

      storageImage.push({
        id: storageImage.length + 1,
        name: 'Ganesh',
        statusPic: uri,
      });
      imagesArray.push({
        id: imagesArray.length + 1,
        name: 'ganesh',
        statusPic: uri,
      });
    });
    setTimeout(() => {
      setImageEditModal(false);
      setCameraOpenModal(false);
    }, 1000);
  }, []);

  let chatUser = localData.whatsAppchatUser;

  let closeModal = () => {
    setModalVisible(false);
  };

  // useEffect(() => {
  //   console.log('images--', currentIndex);
  // }, [currentIndex]);
  // const scrollX = useRef(new Animated.Value(0)).current;
  // const gotoNextPage = () => {
  //   if (currentIndex + 1 < data.length) {
  //     // @ts-ignore
  //     flatListRef.current.scrollToIndex({
  //       index: setCurrentIndex(currentIndex + 1),
  //       animated: true,
  //     });
  //   }
  // };
  // const gotoPrevPage = () => {
  //   if (currentIndex !== 0) {
  //     flatListRef.current.scrollToIndex({
  //       index: setCurrentIndex(currentIndex - 1),
  //       animated: true,
  //     });
  //   }
  // };
  // Flatlist props that calculates current item index
  // const onViewRef = useRef(viewableItems => {
  //   setCurrentIndex(viewableItems[0].index);
  // });

  // const viewConfigRef = React.useRef({viewAreaCoveragePercentThreshold: 50});
  const sliderRef = React.createRef();

  const [index, setIndex] = React.useState(0);

  React.useEffect(() => {}, [index]);

  const onScroll = _index => {
    sliderRef && sliderRef?.current?.scrollToIndex({index: _index});
    setIndex(_index);
  };

  const slideOnPress = (isLeftPress, mystatus = false) => {
    if (isLeftPress) {
      if (index > 0) {
        onScroll(index - 1);
      }
    } else {
      if (index < data.length - 1) {
        onScroll(index + 1);
      } else if (mystatus == true && index < imagesArray.length - 1) {
        onScroll(index + 1);
      }
    }
  };

  const imageType = {
    width: 200,
    height: 200,
  };
  const getBlob_data = ({uri}) => {
    const obj = {
      uri: uri, // Replace this to path in real build sourceURL
      name: 'photo.jpg',
      type: 'image/jpg',
    };
    console.log('images path==', obj);
    return obj;
  };
  const openGallery = (isMultiple = true, callback) => {
    ImagePicker.openPicker({
      // multiple: true,
      width: imageType.width,
      height: imageType.height,
      cropping: true,
    })
      .then(images => {
        if (images) {
          console.log('images----,,,,,,,', images);
          // setImageToEdit(images?.path);
          setImageEditModal(true);
          // await PhotoEditor.open(images?.path);
          // const img = images.map(item => {
          //   return getBlob_data({uri: item?.path});
          // });
          // const images = [...img];
          // imagesArray.push(images?.path);
          imagesArray.push({
            id: imagesArray.length + 1,
            name: 'ganesh',
            statusPic: images.path,
          });
          console.log('=======', imagesArray);
          setStatuImages(images);
          setShowStatusImage(true);
          setCheckStatus(true);
          setIsModalVisible(false);
          // console.log(
          //   'images in openpicker--1111111',
          //   img,
          //   'pppppppppp\n\n\n\n',
          //   // images,
          // );
          // callback && callback(img);
          // return img;
        }
      })
      .catch(e => {
        callback && callback(undefined);
        console.log(e);
      });
  };

  // const openCamera = () => {
  //   ImagePicker.openCamera({
  //     width: imageType.width,
  //     height: imageType.height,
  //     cropping: true,
  //   })
  //     .then(images => {
  //       // const img = getBlob_data({uri: images?.path});
  //       imagesArray.push({
  //         id: imagesArray.length + 1,
  //         name: 'ganesh' + imagesArray.length + 1,
  //         statusPic: images.path,
  //       });
  //       console.log('opencamera images url==', images);
  //       setShowStatusImage(true);
  //       setCheckStatus(true);
  //       setIsModalVisible(false);
  //     })
  //     .catch(e => {
  //       console.log(e);
  //     });
  // };

  const captureHandle = async () => {
    try {
      const data = await takePicture();
      console.log(data.uri);
      // imageShow.length = 0;
      const filePath = data.uri;
      const newFilePath =
        RNFS.ExternalDirectoryPath + `/MyTebhmmommt${imageShow.length + 1}.jpg`;
      setImageToEdit(newFilePath);
      imageShow.unshift(`file://${newFilePath}`);
      // setArrayImage(image);
      console.log('file path new===---', newFilePath, imageShow);
      RNFS.moveFile(filePath, newFilePath)
        .then(() => {
          // setImageToEdit(newFilePath);
          console.log('IMAGE MOVED', filePath, '-- to --', newFilePath);
          setUri(`file://${newFilePath}`);
          setImage(`file://${newFilePath}`);
        })
        .catch(error => {
          console.log(error);
        });
      {
        captureFromGallery == true && setImageEditModal(true);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const statusonPress = () => {
    if (statusImages) {
      setShowStatusImage(true);

      setModalVisible(true);
    } else {
      openGallery();
    }
  };

  const friendStatusOnPress = () => {
    setShowStatusImage(false);
    setModalVisible(true);
  };

  const ViewStatus = () => {
    if (imagesArray) {
      // console.log('status image --', statusImages?.path);
      // setDataForMyStatus(`"${statusImages}"`);
      console.log('status imaghes again==', dataForMystatus);
      setModalForMyStatus(true);
    }
    setIsModalVisible(false);
    return;
  };
  // const onDone = croppedImageUri => {
  //   console.log('croppedImageUri = ', croppedImageUri);
  //   // send image to server for example
  // };

  // const onError = err => {
  //   console.log(err);
  // };

  // const onCancel = () => {
  //   console.log('Cancel button was pressed');
  //   // navigate back
  // };
  const cropImage = (imag = image) => {
    console.log('image url', imag, imageShow);
    ref.current.capture().then(uri => {
      console.log('VIEWSHOE IMAGES url---', uri);

      ImagePicker.openCropper({
        path: uri,
        width: 300,
        height: 400,
      }).then(image => {
        console.log('-----', image, imageShow);
        strokeRef.current.clear();
        setImage(image?.path);
        const index = imageShow.indexOf(imag);
        arrayImage.splice(arrayImage.indexOf(imag), 1, image?.path);

        console.log('index', index, imageShow);
        // if (index > -1) {
        //   imageShow.splice(index, 1); // 2nd parameter means remove one item only
        // }
        // // imageShow.includes()

        // setTimeout(() => {}, 1500);
      });
    });
  };

  const onMyStatusPress = () =>
    Alert.alert('Update status', 'Choose From below Optios', [
      {
        text: 'View Status',
        onPress: () => {
          if (imageShow.length > 0) {
            setModalForMyStatus(true);
          } else {
            alert('First, add a new status');
          }
        },
        style: 'cancel',
      },
      {
        text: 'Add New Status',
        // onPress: () => openCamera(),
        onPress: () => {
          fetchGalleryImage();
          setCameraOpenModal(true);
        },
      },
    ]);
  async function hasAndroidPermission() {
    const permission = PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE;

    const hasPermission = await PermissionsAndroid.check(permission);
    if (hasPermission) {
      return true;
    }

    const status = await PermissionsAndroid.request(permission);
    return status === 'granted';
  }

  async function fetchGalleryImage() {
    if (Platform.OS === 'android') {
      // alert();
      CameraRoll.getPhotos({
        first: 10,
        assetType: 'Photos',
      })
        .then(r => {
          try {
            r.edges.forEach(c => {
              console.log('---', c);
              storageImage.push({
                id: storageImage.length + 1,
                name: 'Ganesh',
                statusPic: c.node.image.uri,
              });
            });
          } catch (ee) {
            console.log('error', ee);
          }
        })
        .catch(error => {
          console.log('eror in gallery', error);
        });
    }
  }
  useEffect(() => {}, [arrayImage]);

  // console.log('=======', imagesArray);

  console.log('image to display in background==', image);
  // console.log('save signature data--', signatureSaved);
  const onFrontcamera = () => {
    setFrontCamera(RNCamera.Constants.Type.back);
  };
  const onFlashOnOff = () => {
    setFlashMode(RNCamera.Constants.FlashMode.on);
    //  setFrontCamera(RNCamera.Constants.Type.back);
  };
  const [selectedItems, setSelectedItems] = useState([]);
  const getSelected = item => selectedItems.includes(item);
  const selectItems = item => {
    console.log('yayyyyayyayayayyayayayayayayyayayay==================', item);
    setNoPhotos(selectItems.length + 1);

    if (selectedItems.includes(item)) {
      const newListItems = selectedItems.filter(listItem => listItem !== item);
      return setSelectedItems([...newListItems]);
    }
    setSelectedItems([...selectedItems, item]);
  };
  const deSelectItems = () => setSelectedItems([]);
  const handleOnPress = item => {
    console.log(
      'selected items length--',
      selectedItems.length,
      selectItems(item),
    );
    if (selectedItems.length) {
      return selectItems(item);
    }
    setNoPhotos(selectItems.length + 1);

    setImage(item);
    setImageEditModal(true);
  };

  return (
    <Container>
      <ListItem avatar onPress={() => onMyStatusPress()}>
        <Left>
          <Thumbnail source={require('./assests/chat1.jpeg')} />
        </Left>
        <Body style={[styles.bodySection]}>
          <Text style={styles.userName}>My Status</Text>
          <Text style={styles.userDesc} numberOfLines={1}>
            Tap To Add Status Update
          </Text>
        </Body>
        <Right style={[styles.rightSection]}>
          {/* <Image
            style={{width: 25, height: 25}}
            source={require('./assests/undo.png')}
          /> */}
        </Right>
      </ListItem>
      <View style={{paddingVertical: 10}}>
        <Text style={{paddingLeft: 25}}>Recent updates</Text>
      </View>
      <List
        dataArray={chatUser}
        renderRow={(user, index) => (
          <ListItem avatar key={index} onPress={() => friendStatusOnPress()}>
            <Left>
              <Thumbnail source={user.image} />
            </Left>
            <Body style={[styles.bodySection]}>
              <Text style={styles.userName}>{user.name}</Text>
              <Text style={styles.userDesc} numberOfLines={1}>
                {user.time}
              </Text>
            </Body>
            <Right style={[styles.rightSection]}></Right>
          </ListItem>
        )}
      />
      {modalVisible === true && (
        <Modal
          animationType="slide"
          transparent={false}
          visible={modalVisible}
          onRequestClose={() => {
            closeModal();
          }}>
          <View style={{flex: 1}}>
            <FlatList
              // ref={flatListRef}
              ref={sliderRef}
              keyExtractor={(I, i) => String(i)}
              scrollEnabled={false}
              pagingEnabled
              decelerationRate={'normal'}
              scrollEventThrottle={16}
              onEndReachedThreshold={0}
              horizontal
              data={data}
              renderItem={({item, index}) => {
                console.log('images data--', item, 'index', index);
                // setCurrentIndex(index);
                return (
                  <View style={{flex: 1}}>
                    <Image
                      resizeMode="cover"
                      style={{width: sliderWidth, height: itemHeight}}
                      source={{uri: item}}
                    />
                  </View>
                );
              }}
            />
          </View>
          <View style={[styless.buttonContainer]}>
            <TouchableOpacity
              style={[styless.button1, styles.button]}
              onPress={() => {
                slideOnPress(true);
              }}>
              <Text style={[styless.buttonText]}></Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styless.button, styless.button2]}
              onPress={() => {
                slideOnPress(false);
              }}>
              <Text style={[styless.buttonText]}></Text>
            </TouchableOpacity>
          </View>
        </Modal>
      )}
      {modalForMyStatus === true && imageShow.length >= 0 && (
        <Modal
          animationType="slide"
          transparent={false}
          visible={modalForMyStatus}
          onRequestClose={() => {
            setModalForMyStatus(false);
          }}>
          <View style={{flex: 1}}>
            <FlatList
              // ref={flatListRef}
              ref={sliderRef}
              keyExtractor={(I, i) => String(i)}
              scrollEnabled={false}
              pagingEnabled
              decelerationRate={'normal'}
              scrollEventThrottle={16}
              showsHorizontalScrollIndicator={false}
              onEndReachedThreshold={0}
              horizontal
              data={imageShow}
              renderItem={({item, index}) => {
                console.log('images data--', item, 'index', index);
                // setCurrentIndex(index);
                return (
                  <View
                    style={{
                      flex: 1,
                      width: width,
                      height: height,
                      marginTop: -100,
                      backgroundColor: '#000',
                    }}>
                    <Image
                      style={{
                        width: sliderWidth,
                        height: height,
                        resizeMode: 'contain',
                      }}
                      source={{uri: item}}
                    />
                  </View>
                );
              }}
            />
          </View>
          <View style={[styless.buttonContainer]}>
            <TouchableOpacity
              style={[styless.button1, styles.button]}
              onPress={() => {
                slideOnPress(true);
              }}>
              <Text style={[styless.buttonText]}></Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styless.button, styless.button2]}
              onPress={() => {
                slideOnPress(false, true);
              }}>
              <Text style={[styless.buttonText]}></Text>
            </TouchableOpacity>
          </View>
        </Modal>
      )}

      {isModalVisible === true && (
        <Modal
          transparent
          animationType="slide"
          style={{alignItems: 'center', justifyContent: 'center'}}
          visible={isModalVisible}
          onRequestClose={() => setIsModalVisible(false)}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
              // flex: 1,
              backgroundColor: '#fff',
              borderColor: 'black',
              borderWidth: 1,
              borderRadius: 10,
              height: 200,
              // width: 300,
              top: 180,
            }}>
            <TouchableOpacity
              onPress={() => ViewStatus()}
              style={{width: '30%', borderWidth: 1, borderColor: 'gray'}}>
              <Text style={{color: 'black', textAlign: 'center', padding: 10}}>
                View status
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => UploadNewstatus()}
              style={{
                width: '40%',
                marginLeft: 10,
                borderWidth: 1,
                borderColor: 'gray',
              }}>
              <Text style={{color: 'black', textAlign: 'center', padding: 10}}>
                Upload New status
              </Text>
            </TouchableOpacity>
          </View>
        </Modal>
      )}
      {imageEditModal === true && (
        <Modal
          style={{flex: 1, backgroundColor: '#000', width: width}}
          // transparent={true}
          visible={imageEditModal}
          onRequestClose={() => setImageEditModal(false)}>
          <View
            style={{
              backgroundColor: '#000',
              flex: 1,
              width: width,
              height: height,
              flexDirection: 'column',
            }}>
            <View
              style={{
                // flex: 1,
                // backgroundColor: 'black',
                // marginTop:20,
                // height: 20,
                flexDirection: 'row',
                position: 'absolute',
                justifyContent: 'flex-start',
                // justifyContent: '',
                // position: 'absolute',
                top: 10,
                // marginHorizontal: 20,
                zIndex: 10,
              }}>
              <TouchableOpacity
                style={{
                  flex: 1,
                  left: 20,
                  // justifyContent: 'center',
                  // alignItems: 'center',
                  // height: 50,
                  // zIndex: 100,
                  // width: 80,
                  // margin: 10,
                  // left: 12,
                }}
                onPress={() => {
                  setImageEditModal(false);
                }}>
                <Text
                  style={{
                    fontWeight: '600',
                    fontSize: 22,
                    color: 'white',
                    // paddingLeft: 10,
                  }}>
                  X
                </Text>
              </TouchableOpacity>
              <View
                style={{
                  flex: 1,
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                }}>
                {showUndo == true && (
                  <TouchableOpacity
                    onPress={() => strokeRef.current.undo()}
                    style={{
                      right: 26,
                    }}>
                    <Image
                      style={{width: 25, height: 25}}
                      source={require('./assests/undo.png')}
                    />
                  </TouchableOpacity>
                )}
                <TouchableOpacity
                  onPress={() => {
                    console.log('filter array=,', imageShow, image);
                    if (arrayImage.length == 0) {
                      setImageEditModal(false);
                    }
                    let a = arrayImage;

                    const index = a.indexOf(image);
                    console.log('index', index);
                    if (index > -1) {
                      a.splice(index, 1); // 2nd parameter means remove one item only
                    }
                    setArrayImage(a);
                    console.log('new array--', imageShow);
                    // imageShow.filter(item => item != image);
                  }}
                  style={
                    {
                      // flex: 1,
                      // alignItems: 'flex-end',
                      // right: 20,
                      //  top: 10
                    }
                  }>
                  {/* <Undo color="black" /> */}
                  <Image
                    style={{width: 25, height: 25}}
                    source={require('./assests/delete.png')}
                  />
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    cropImage();
                    // setImageCrop(true)
                  }}
                  style={
                    {
                      // flex: 1,
                      // alignItems: 'flex-end',
                      // right: 20,
                      //  top: 10
                    }
                  }>
                  <Image
                    style={{width: 25, height: 25}}
                    source={require('./assests/crop.png')}
                  />
                </TouchableOpacity>
                <TouchableOpacity>
                  <Image
                    style={{
                      width: 30,
                      top: -3,
                      height: 33,
                      resizeMode: 'contain',
                    }}
                    source={require('./assests/smile.png')}
                  />
                </TouchableOpacity>
                <TouchableOpacity
                  style={
                    {
                      // flex: 1,
                      // alignItems: 'flex-end',
                      // right: 20,
                      //  top: 10
                    }
                  }>
                  {/* <Undo color="black" /> */}
                  <Image
                    style={{width: 25, height: 25}}
                    source={require('./assests/t.png')}
                  />
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() => {
                    setShowPencil(!showpencil);
                    // if (showpencil !== false) {
                    //   // alert();
                    //   ref.current.capture().then(uri => {
                    //     console.log(
                    //       'pencil edited screenshot image url---',
                    //       uri,
                    //     );
                    //     // console.log('-----', image, imageShow);
                    //     // strokeRef.current.clear();
                    //     // strokeRef.current.clear();
                    //     const index = arrayImage.indexOf(image);
                    //     arrayImage.splice(imageShow.indexOf(image), 1, uri);

                    //     // console.log('index', index, imageShow);
                    //     // if (index > -1) {
                    //     //   imageShow.splice(index, 1); // 2nd parameter means remove one item only
                    //     // }
                    //     // // imageShow.includes()
                    //     // setImage(arrayImage[index]);

                    //     // setTimeout(() => {}, 1500);
                    //   });
                    // }
                  }}
                  style={{
                    backgroundColor: showpencil == true ? color : '#000',
                    borderRadius: 50,
                    marginTop: -9,
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: 40,
                    height: 40,
                    borderWidth: 1,

                    // alignItems: 'flex-end',
                    // right: 20,
                    //  top: 10
                  }}>
                  <Image source={require('./assests/pencil.png')} />
                </TouchableOpacity>
              </View>
            </View>

            {showpencil === true && (
              <View
                style={{
                  height: 50,
                  width: 400,
                  top: 35,
                  zIndex: 30,
                  position: 'absolute',
                  // transform: [{rotate: '90deg'}],
                  // right: -160,
                  // right: 500 ,
                }}>
                <HueSlider
                  style={styless.sliderRow}
                  gradientSteps={40}
                  value={value.h}
                  onValueChange={h => setH(h)}
                />
              </View>
            )}
            {imagecrop == true && (
              <Modal
                style={{flex: 1, backgroundColor: '#000', width: width}}
                // transparent={true}
              >
                <AmazingCropper
                  onDone={() => onDone()}
                  onError={() => onError()}
                  onCancel={() => onCancel()}
                  imageUri={image}
                  imageWidth={1600}
                  imageHeight={2396}
                  NOT_SELECTED_AREA_OPACITY={0.3}
                  BORDER_WIDTH={20}
                />
              </Modal>
            )}

            <ViewShot
              style={{
                flex: 1,
                backgroundColor: 'black',
                alignItems: 'center',
                justifyContent: 'center',
                marginTop: 110,
              }}
              ref={ref}
              // onCapture={onCapture}
            >
              <ImageBackground
                fadeDuration={0}
                source={{
                  // uri: uri === false ? `file://${imageToEdit}` : `${imageToEdit}`,
                  uri: image,
                }}
                resizeMode="contain"
                style={{
                  // flex: 1,
                  width: sliderWidth,
                  height: itemHeight,
                  backgroundColor: 'black',
                }}>
                <SketchCanvas
                  ref={strokeRef}
                  style={{
                    flex: 1,
                    width: sliderWidth,
                    height: itemHeight,
                    borderColor: '#000033',
                    borderWidth: 1,
                  }}
                  strokeColor={showpencil == true ? color : null}
                  strokeWidth={7}
                  onStrokeStart={(x, y) => {
                    setShowUndo(true);
                  }}
                />
                {/* <SignatureCapture
                  ref={signatureRef}
                  showNativeButtons={false}
                  showTitleLabel={false}
                  viewMode={'portrait'}
                  backgroundColor={'transparent'}
                  saveImageFileInExtStorage={true}
                  style={{
                    flex: 1,
                    width: width,
                    borderColor: '#000033',
                    borderWidth: 1,
                    // position: 'absolute',
                    // height: height,
                  }}
                  onDragEvent={item => {
                    setShowDoneButton(true);
                    onDragEvent();
                  }}
                  onSaveEvent={() => console.log('item of signatiure')}
                  // backgroundColor="#ff00ff"
                  strokeColor={color}
                  minStrokeWidth={4}
                  maxStrokeWidth={4}
                /> */}
              </ImageBackground>
            </ViewShot>
            <BottomText
              galleryImageonPress={() => {
                setImageEditModal(false);
                setCaptureFromGallery(false);
                setShowSelectedPhotos(true);
              }}
              sendButtOnPress={() => {
                // alert();
                onCapture();
              }}
            />
            <View
              style={{
                // flex: 1,
                width: '100%',
                marginBottom: 25,
                // height: '20%',
                // position: 'absolute',
                // bottom: 170,
                // zIndex: 100,
                // backgroundColor: 'black',
              }}>
              <FlatList
                // ref={flatListRef}
                keyExtractor={(I, i) => String(i)}
                pagingEnabled
                decelerationRate={'normal'}
                horizontal
                ItemSeparatorComponent={() => {
                  return <View style={{marginHorizontal: 2}}></View>;
                }}
                data={imageShow && imageShow}
                renderItem={({item, index}) => {
                  return (
                    <TouchableOpacity
                      onPress={() => {
                        const strokeLength = strokeRef.current.getPaths();
                        if (strokeLength != 0) {
                          ref.current.capture().then(uri => {
                            console.log(
                              'pencil edited screenshot image url---',
                              uri,
                            );
                            strokeRef.current.clear();
                            // console.log('-----', image, imageShow);
                            // strokeRef.current.clear();
                            // strokeRef.current.clear();
                            const index = arrayImage.indexOf(image);
                            arrayImage.splice(imageShow.indexOf(image), 1, uri);
                            setImage(item);

                            console.log('index', index, imageShow);
                            // if (index > -1) {
                            //   imageShow.splice(index, 1); // 2nd parameter means remove one item only
                            // }
                            // // imageShow.includes()
                            // setImage(arrayImage[index]);

                            // setTimeout(() => {}, 1500);
                          });
                        } else setImage(item);
                        if (showpencil != false) {
                          setShowPencil(false);
                        }
                      }}
                      style={{
                        backgroundColor: 'black',
                        // top: 70,
                        width: 60,
                        // height: 100,
                        // position: 'absolute',
                      }}>
                      <Image
                        style={{width: 60, height: 60}}
                        source={{uri: item}}
                      />
                    </TouchableOpacity>
                  );
                }}
              />
            </View>
          </View>
        </Modal>
      )}
      {cameraOpenModal === true && (
        <Modal
          transparent
          animationType="slide"
          visible={cameraOpenModal}
          onRequestClose={() => setCameraOpenModal(false)}>
          <View style={styless.container1}>
            <RNCamera
              ref={cameraRef}
              style={styless.preview}
              type={RNCamera.Constants.Type.back}
              flashMode={RNCamera.Constants.FlashMode.on}
              androidCameraPermissionOptions={{
                title: 'Permission to use camera',
                message: 'We need your permission to use your camera',
                buttonPositive: 'Ok',
                buttonNegative: 'Cancel',
              }}
            />
            {showSelectedPhotos == true && (
              <Pressable
                onPress={() => deSelectItems()}
                style={{
                  flex: 1,
                  position: 'absolute',
                  bottom: 100,

                  backgroundColor: '#000',
                }}>
                <FlatList
                  // ref={flatListRef}
                  keyExtractor={(I, i) => String(i)}
                  scrollEnabled
                  horizontal
                  ItemSeparatorComponent={() => {
                    return <View style={{marginHorizontal: 4}}></View>;
                  }}
                  style={{width: '100%', height: 100}}
                  data={imageShow && imageShow}
                  renderItem={({item, index}) => {
                    console.log('storage images', item);
                    return (
                      <TouchableOpacity
                        onPress={() => {
                          handleOnPress(item);
                          // setImage(item), setImageEditModal(true);
                        }}
                        onLongPress={() => {
                          selectItems(item);
                        }}
                        style={{flex: 1, marginBottom: 110}}>
                        <Image
                          style={{width: 100, height: 100}}
                          source={{uri: item}}
                        />
                        {/* {index === 0 && (
                          <View
                            style={{
                              position: 'absolute',
                              width: 100,
                              zIndex: 100,
                              height: 100,
                              alignItems: 'center',
                              justifyContent: 'center',
                              // width: '100%',
                              // height: '100%',
                              backgroundColor: 'transparent',
                            }}>
                            <Image source={require('./assests/check.png')} />
                          </View>
                        )} */}
                        {getSelected(item) && (
                          <View
                            style={{
                              position: 'absolute',
                              width: 100,
                              zIndex: 100,
                              height: 100,
                              alignItems: 'center',
                              justifyContent: 'center',
                              // width: '100%',
                              // height: '100%',
                              backgroundColor: 'transparent',
                            }}>
                            <Image source={require('./assests/check.png')} />
                          </View>
                        )}
                      </TouchableOpacity>
                    );
                  }}
                />
              </Pressable>
            )}

            {showSelectedPhotos == true && (
              <TouchableOpacity
                onPress={() => {
                  imageShow.length = 0;
                  console.log('----', selectedItems, imageShow.length);
                  selectedItems.map(item => imageShow.push(item));
                  console.log('----', selectedItems, imageShow.length);

                  // imageShow.push(selectItems);
                  // console.log(
                  //   'imagesHOW ARRAY DATA===',
                  //   ...imageShow,
                  //   imageShow.length,
                  // );
                  setImageEditModal(true);
                }}
                style={{
                  width: 50,
                  height: 50,
                  position: 'absolute',
                  borderRadius: 50,
                  alignItems: 'center',
                  justifyContent: 'center',
                  backgroundColor: '#21998b',
                  flexDirection: 'row',
                  right: 10,
                  bottom: 180,

                  // left: 70,
                }}>
                <Image
                  style={{
                    resizeMode: 'contain',
                  }}
                  source={require('./assests/check.png')}
                />
                <Text style={{color: '#fff', marginLeft: 3}}>
                  {/* {noPhotos} */}
                  {''}
                </Text>
              </TouchableOpacity>
            )}

            <TouchableOpacity
              style={{
                flex: 1,
                position: 'absolute',
                justifyContent: 'center',
                alignItems: 'center',
                right: 20,
                bottom: 34,
                // height: 50,
                // zIndex: 100,
                // width: 80,
                margin: 10,
              }}
              onPress={() => {
                onFrontcamera();
              }}>
              <Image
                style={{width: 25, height: 25}}
                source={require('./assests/frontcamera.png')}
              />
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                flex: 1,
                position: 'absolute',
                justifyContent: 'center',
                alignItems: 'center',
                left: 15,
                bottom: 35,
                // height: 50,
                zIndex: 100,
                // width: 80,
                margin: 10,
              }}
              onPress={() => {
                setChangeFlashIcon(!changeFlashIcon);
                onFlashOnOff();
              }}>
              {changeFlashIcon == true ? (
                <Image
                  style={{width: 25, height: 25}}
                  source={require('./assests/flash-off.png')}
                />
              ) : (
                <Image
                  style={{width: 25, height: 25}}
                  source={require('./assests/flash.png')}
                />
              )}
            </TouchableOpacity>
            <View
              style={{
                flex: 0,
                flexDirection: 'row',
                alignSelf: 'center',
                position: 'absolute',
                zIndex: 10,
                bottom: 10,
              }}>
              <TouchableOpacity
                // onPress={takePicture.bind(this)}
                onPress={() => captureHandle()}
                style={styless.capture}></TouchableOpacity>
            </View>
          </View>
        </Modal>
      )}
    </Container>
  );
};
const styless = StyleSheet.create({
  container1: {
    flex: 1,
    flexDirection: 'column',
    height: height,
    width: width,
    backgroundColor: 'transparent',
  },
  preview: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  capture: {
    flex: 0,
    backgroundColor: 'black',
    borderRadius: 510,
    padding: 15,
    width: 70,
    height: 70,
    borderWidth: 2,
    borderColor: '#fff',
    paddingHorizontal: 20,
    alignSelf: 'center',
    margin: 20,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  itemContainer: {
    flex: 1,
    sliderWidth,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonContainer: {
    flex: 1,
    width: '100%',
    height: '100%',
    // backgroundColor: 'red',
    position: 'absolute',
    // zIndex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  button: {
    margin: 20,
    fontWeight: '700',
  },
  buttonText: {
    color: '#000',
  },
  button1: {
    // backgroundColor: 'yellow',
    alignItems: 'flex-start',
    width: '20%',
    height: '100%',
  },
  button2: {
    width: '20%',
    height: '100%',
    // backgroundColor: 'yellow',
    alignItems: 'flex-end',
  },
  sliderRow: {
    // position: 'absolute',
    // zIndex: 30,
    alignSelf: 'stretch',
    marginLeft: 12,
    marginTop: 12,
  },
});
export default WhatsAppChatConatiner;

/* <TouchableOpacity
              style={{
                flex: 1,
                position: 'absolute',
                justifyContent: 'center',
                alignItems: 'center',
                // height: 50,
                zIndex: 100,
                // width: 80,
                margin: 10,
              }}
              onPress={() => {
                setCameraOpenModal(false);
              }}>
              <Text
                style={{
                  fontWeight: '900',
                  fontSize: 22,
                  color: 'white',
                  paddingLeft: 10,
                }}>
                X
              </Text>
            </TouchableOpacity>
            {/* <TouchableOpacity
              style={{
                // flex: 1,
                position: 'absolute',
                bottom: 100,

                backgroundColor: 'red',
              }}>
              <FlatList
                // ref={flatListRef}
                keyExtractor={(I, i) => String(i)}
                pagingEnabled
                decelerationRate={'normal'}
                horizontal
                ItemSeparatorComponent={() => {
                  return <View style={{marginHorizontal: 4}}></View>;
                }}
                style={{width: 100, height: 100}}
                data={storageImage && storageImage}
                renderItem={({item, index}) => {
                  console.log('storage images', item);
                  return (
                    <TouchableOpacity
                      onPress={() => {
                        setImage(item?.statusPic), setImageEditModal(true);
                      }}
                      style={{flex: 1, marginBottom: 110}}>
                      <Image
                        style={{width: 60, height: 80}}
                        source={{uri: item?.statusPic}}
                      />
                    </TouchableOpacity>
                  );
                }}
              />
            </TouchableOpacity>

            <TouchableOpacity
              style={{
                width: 50,
                height: 50,
                position: 'absolute',
                borderRadius: 50,
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: '#21998b',
                flexDirection: 'row',
                bottom: 180,

                left: 70,
              }}>
              <Image
                style={{
                  resizeMode: 'contain',
                }}
                source={require('./assests/check.png')}
              />
              <Text style={{color: '#fff', marginLeft: 3}}>{noPhotos}</Text>
            </TouchableOpacity> */

/* <TouchableOpacity
              style={{
                flex: 1,
                position: 'absolute',
                justifyContent: 'center',
                alignItems: 'center',
                // height: 50,
                zIndex: 100,
                // width: 80,
                margin: 10,
              }}
              onPress={() => {
                setCameraOpenModal(false);
              }}>
              <Text
                style={{
                  fontWeight: '900',
                  fontSize: 22,
                  color: 'white',
                  paddingLeft: 10,
                }}>
                X
              </Text>
            </TouchableOpacity>
            {/* <TouchableOpacity
              style={{
                // flex: 1,
                position: 'absolute',
                bottom: 100,

                backgroundColor: 'red',
              }}>
              <FlatList
                // ref={flatListRef}
                keyExtractor={(I, i) => String(i)}
                pagingEnabled
                decelerationRate={'normal'}
                horizontal
                ItemSeparatorComponent={() => {
                  return <View style={{marginHorizontal: 4}}></View>;
                }}
                style={{width: 100, height: 100}}
                data={storageImage && storageImage}
                renderItem={({item, index}) => {
                  console.log('storage images', item);
                  return (
                    <TouchableOpacity
                      onPress={() => {
                        setImage(item?.statusPic), setImageEditModal(true);
                      }}
                      style={{flex: 1, marginBottom: 110}}>
                      <Image
                        style={{width: 60, height: 80}}
                        source={{uri: item?.statusPic}}
                      />
                    </TouchableOpacity>
                  );
                }}
              />
            </TouchableOpacity>

            <TouchableOpacity
              style={{
                width: 50,
                height: 50,
                position: 'absolute',
                borderRadius: 50,
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: '#21998b',
                flexDirection: 'row',
                bottom: 180,

                left: 70,
              }}>
              <Image
                style={{
                  resizeMode: 'contain',
                }}
                source={require('./assests/check.png')}
              />
              <Text style={{color: '#fff', marginLeft: 3}}>{noPhotos}</Text>
            </TouchableOpacity> */

/* <TouchableOpacity
              style={{
                flex: 1,
                position: 'absolute',
                justifyContent: 'center',
                alignItems: 'center',
                // height: 50,
                zIndex: 100,
                // width: 80,
                margin: 10,
              }}
              onPress={() => {
                setCameraOpenModal(false);
              }}>
              <Text
                style={{
                  fontWeight: '900',
                  fontSize: 22,
                  color: 'white',
                  paddingLeft: 10,
                }}>
                X
              </Text>
            </TouchableOpacity>
            {/* <TouchableOpacity
              style={{
                // flex: 1,
                position: 'absolute',
                bottom: 100,

                backgroundColor: 'red',
              }}>
              <FlatList
                // ref={flatListRef}
                keyExtractor={(I, i) => String(i)}
                pagingEnabled
                decelerationRate={'normal'}
                horizontal
                ItemSeparatorComponent={() => {
                  return <View style={{marginHorizontal: 4}}></View>;
                }}
                style={{width: 100, height: 100}}
                data={storageImage && storageImage}
                renderItem={({item, index}) => {
                  console.log('storage images', item);
                  return (
                    <TouchableOpacity
                      onPress={() => {
                        setImage(item?.statusPic), setImageEditModal(true);
                      }}
                      style={{flex: 1, marginBottom: 110}}>
                      <Image
                        style={{width: 60, height: 80}}
                        source={{uri: item?.statusPic}}
                      />
                    </TouchableOpacity>
                  );
                }}
              />
            </TouchableOpacity>

            <TouchableOpacity
              style={{
                width: 50,
                height: 50,
                position: 'absolute',
                borderRadius: 50,
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: '#21998b',
                flexDirection: 'row',
                bottom: 180,

                left: 70,
              }}>
              <Image
                style={{
                  resizeMode: 'contain',
                }}
                source={require('./assests/check.png')}
              />
              <Text style={{color: '#fff', marginLeft: 3}}>{noPhotos}</Text>
            </TouchableOpacity> */

/* <TouchableOpacity
              style={{
                flex: 1,
                position: 'absolute',
                justifyContent: 'center',
                alignItems: 'center',
                // height: 50,
                zIndex: 100,
                // width: 80,
                margin: 10,
              }}
              onPress={() => {
                setCameraOpenModal(false);
              }}>
              <Text
                style={{
                  fontWeight: '900',
                  fontSize: 22,
                  color: 'white',
                  paddingLeft: 10,
                }}>
                X
              </Text>
            </TouchableOpacity>
            {/* <TouchableOpacity
              style={{
                // flex: 1,
                position: 'absolute',
                bottom: 100,

                backgroundColor: 'red',
              }}>
              <FlatList
                // ref={flatListRef}
                keyExtractor={(I, i) => String(i)}
                pagingEnabled
                decelerationRate={'normal'}
                horizontal
                ItemSeparatorComponent={() => {
                  return <View style={{marginHorizontal: 4}}></View>;
                }}
                style={{width: 100, height: 100}}
                data={storageImage && storageImage}
                renderItem={({item, index}) => {
                  console.log('storage images', item);
                  return (
                    <TouchableOpacity
                      onPress={() => {
                        setImage(item?.statusPic), setImageEditModal(true);
                      }}
                      style={{flex: 1, marginBottom: 110}}>
                      <Image
                        style={{width: 60, height: 80}}
                        source={{uri: item?.statusPic}}
                      />
                    </TouchableOpacity>
                  );
                }}
              />
            </TouchableOpacity>

            <TouchableOpacity
              style={{
                width: 50,
                height: 50,
                position: 'absolute',
                borderRadius: 50,
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: '#21998b',
                flexDirection: 'row',
                bottom: 180,

                left: 70,
              }}>
              <Image
                style={{
                  resizeMode: 'contain',
                }}
                source={require('./assests/check.png')}
              />
              <Text style={{color: '#fff', marginLeft: 3}}>{noPhotos}</Text>
            </TouchableOpacity> */

/* <TouchableOpacity
              style={{
                flex: 1,
                position: 'absolute',
                justifyContent: 'center',
                alignItems: 'center',
                // height: 50,
                zIndex: 100,
                // width: 80,
                margin: 10,
              }}
              onPress={() => {
                setCameraOpenModal(false);
              }}>
              <Text
                style={{
                  fontWeight: '900',
                  fontSize: 22,
                  color: 'white',
                  paddingLeft: 10,
                }}>
                X
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={{
                flex: 1,
                position: 'absolute',
                justifyContent: 'center',
                alignItems: 'center',
                // height: 50,
                zIndex: 100,
                // width: 80,
                left: 180,
                margin: 10,
              }}
              onPress={() => {
                setImageEditModal(true);
              }}>
              <Text
                style={{
                  fontWeight: '600',
                  fontSize: 16,
                  color: 'white',
                  paddingLeft: 10,
                }}>
                Done
              </Text>
            </TouchableOpacity> */
