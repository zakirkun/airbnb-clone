import { View, StyleSheet, Text } from 'react-native'
import React, { useMemo, useRef, useState } from 'react'
import BottomSheet, { TouchableOpacity } from '@gorhom/bottom-sheet';
import Listings from './Listings';
import Colors from '@/constants/Colors';
import { Ionicons } from '@expo/vector-icons';


interface Props {
    listings: any[];
    category: string;
}

const ListingBottomSheet = ({listings, category} : Props) => {
    const bottomSheetRef = useRef<BottomSheet>(null);
    const snapPoints = useMemo(() => ['10%', '100%'], []);
    const [refresh, setRefresh] = useState<number>(0);
    const showMap = () => {
        bottomSheetRef.current?.collapse();
        setRefresh(refresh + 1);
    }

    return (
        <BottomSheet
        ref={bottomSheetRef}
        snapPoints={snapPoints}
        handleIndicatorStyle={{ backgroundColor: Colors.grey }}
        enablePanDownToClose={false}
        style={styles.sheetContainer}
        index={1}
        >
            <View style={{flex: 1}}>
                <Listings listings={listings} category={category} refresh={refresh} />
                <View style={styles.absoluteView}>
                    <TouchableOpacity style={styles.btn} onPress={showMap}>
                        <Text style={{ fontFamily: 'mon-sb', color: '#fff' }} >MAP</Text>
                        <Ionicons name="map" size={24} color={'#fff'} />
                    </TouchableOpacity>
                </View>
            </View>
        </BottomSheet>
    )
}

const styles = StyleSheet.create({
    contentContainer: {
      flex: 1,
    },
    absoluteView: {
      position: 'absolute',
      bottom: 30,
      width: '100%',
      alignItems: 'center',
    },
    btn: {
      backgroundColor: Colors.dark,
      padding: 14,
      height: 50,
      borderRadius: 30,
      flexDirection: 'row',
      marginHorizontal: 'auto',
      alignItems: 'center',
    },
    sheetContainer: {
      backgroundColor: '#fff',
      elevation: 4,
      shadowColor: '#000',
      shadowOpacity: 0.3,
      shadowRadius: 4,
      shadowOffset: {
        width: 1,
        height: 1,
      },
    },
  });
  

export default ListingBottomSheet