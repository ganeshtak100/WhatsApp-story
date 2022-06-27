let storageImage = [];

export default storageImage;
      {
        /* {showSelectedPhotos == true && (
              <Pressable
                onPress={deSelectItems}
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
                  style={{width: '100%', height: 100}}
                  data={imageShow && imageShow}
                  renderItem={({item, index}) => {
                    console.log('storage images', item);
                    return (
                      <ListItem
                        onPress={() => {
                          setImage(item), setImageEditModal(true);
                        }}
                        onLongPress={selectItems(item)}
                        selected={getSelected(item)}
                        item={item}
                      />
                    );
                  }}
                />
              </Pressable>
            )} */
      }



        // const ListItem = ({item, selected, onPress, onLongPress}) => (
        //   <>
        //     <TouchableOpacity
        //       onPress={onPress}
        //       onLongPress={onLongPress}
        //       style={{flex: 1, marginBottom: 110}}>
        //       <Image style={{width: 100, height: 100}} source={{uri: item}} />
        //       {selected && <View style={styles.overlay} />}
        //       {selected && <View style={styles.overlay} />}
        //     </TouchableOpacity>
        //   </>
        // );
        // const [selectedItems, setSelectedItems] = useState([]);
        // const handleLongPress = contact => {
        //   selectItems(contact);
        // };
        // const getSelected = item => selectedItems.includes(item);
        // const deSelectItems = () => setSelectedItems([]);

        // const selectItems = item => {
        //   if (selectedItems.includes(item)) {
        //     const newListItems = selectedItems.filter(
        //       listItem => listItem !== item,
        //     );
        //     return setSelectedItems([...newListItems]);
        //   }
        //   setSelectedItems([...selectedItems, item]);
        // };