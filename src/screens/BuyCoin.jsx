import React,{useState} from 'react'
import LottieView from 'lottie-react-native';
import { List } from 'react-native-paper';
import { ScrollView, StyleSheet, View ,Alert} from 'react-native'
import { useNavigation, useTheme } from '@react-navigation/native';
import Text from '../components/Text';
import colors from '../constants/color';
import AwesomeAlert from 'react-native-awesome-alerts';


// const coin_v1 = require('../anims/coin-v1.json');
const coin_v3 = require('../anims/coin-v3.json');
const coin_v4 = require('../anims/coin-v4.json');
const coin_v5 = require('../anims/coin-v5.json');

const listMenu = [
  {lottie: coin_v3, titleCoin: '176 coin', price: '22.000 đ', intPrice:22000, coin:176},
  {lottie: coin_v3, titleCoin: '552 coin', price: '69.000 đ', intPrice:69000, coin:552},
  {lottie: coin_v3, titleCoin: '1.032 Coin', price: '129.000 đ', intPrice:129000, coin: 1032},
  {lottie: coin_v4, titleCoin: '4.232 Coin', price: '529.000 đ',intPrice:529000, coin: 4232},
  {lottie: coin_v5, titleCoin: '9.592 Coin', price: '1.199.000 đ',intPrice:1199000, coin: 9592},
]

const BuyCoin = () => {
  const { margin, normalize } = useTheme();
  const navigation = useNavigation();
  const [showAlert,setShowAlert] = useState(false)
  const [objCoin, setObjCoin] =useState({coinPrice:0,titleCoin:"", strPrice:"", coin:0})

  const styles = StyleSheet.create({
    screen: {

      backgroundColor: '#ffffff'
    },
    scroll: {
      paddingVertical: margin * 2,
      paddingHorizontal: margin / 2,
    },
    lottie: {     
      marginRight: margin / 10,
      width: normalize(40, 40),
    },
    subTitle: {
      fontSize: 14,
      fontWeight: '500',
      marginTop: margin,
      color: colors.tertiary[500], 
    },
    price: {
      backgroundColor: colors.secondary[50], 
      color: colors.tertiary[500], 
      paddingHorizontal: margin/1.5, 
      paddingVertical: margin/5,
      borderRadius: margin, 
      fontWeight: '500',
    },
    itemMenu: {
      backgroundColor: '#FFFFFF',
      marginBottom: margin/2,
      borderRadius: margin/3,
      shadowColor: "#000",
      shadowOpacity: 0.20,
      shadowRadius: 1.41,
      elevation: 2,
      shadowOffset: {
        width: 0,
        height: 1,
      },
    }
  });
const buyCoin = (coinPrice,titleCoin,strPrice,coin)=> {
  // console.log("mua coin");
  setShowAlert(true)
  setObjCoin({coinPrice,titleCoin,strPrice,coin})
  
}
  return (
    <View style={styles.screen}>
      <ScrollView centerContent contentContainerStyle={styles.scroll}>
        {listMenu.map((item, index) => (
          <List.Item
            testID='buyCoin_onClick'
            key={index}
            title={item.titleCoin}
            style={styles.itemMenu}
            onPress={() => buyCoin(item.intPrice, item.titleCoin, item.price, item.coin)}
            left={() => <LottieView autoPlay loop style={styles.lottie} source={item.lottie} />}
            right={() => <View style={{justifyContent: 'center'}}><Text size={14} style={styles.price}>{item.price}</Text></View>}
          />
        ))}      
        <Text style={styles.subTitle}>Coin dùng để làm gì?</Text>
        <Text style={{marginVertical: margin/4}}>*  Dùng coin để mở khoá các nội dung hấp dẫn và quản quyền của Flook</Text>
        <Text style={{marginVertical: margin/4}}>*  Dùng Coin để mua quà tặng gửi đến các người đăng yêu thích</Text>
        <Text style={styles.subTitle}>Làm sao để có Coin?</Text>
        <Text style={{marginVertical: margin/4}}>*  Mua Coin trên app Flook và thực hiện thanh toán qua PayPal</Text>
        <Text style={styles.subTitle}>Tài khoản chưa nhận được Coin sau khi nạp?</Text>
        <Text style={{marginVertical: margin/4}}>*  Nếu bạn chưa nhận được Coin sau khi thanh toán, vui lòng liên hệ ngay đến kênh hỗ trợ chính thức của Flook qua</Text>
        <Text>Email: flook.service@gmail.com</Text>
      </ScrollView>
      {
    <AwesomeAlert
    // alertContainerStyle={{width:"100%", height:"100%"}}
    overlayStyle={{width:"100%", height:"100%"}}
    show={showAlert}
    showProgress={false}
    title="Thông báo"
    confirmButtonTestID="buyCoin_Confirm"
    cancelButtonTestID="buyCoin_Cancel"
    cancelButtonStyle={{color:'red'}}
    message= {`Thanh toán ${objCoin.titleCoin} giá ${objCoin.strPrice}` }
    closeOnTouchOutside={true}
    closeOnHardwareBackPress={false}
    showCancelButton={true}
    showConfirmButton={true}
    cancelText="Cancel"
    confirmText="Buy"
    confirmButtonColor="#32a7f0" 
    onCancelPressed={() => setShowAlert(false)}
    onConfirmPressed={() => 
      navigation.navigate("Payment",{coinPrice:objCoin.coinPrice,coin:objCoin.coin })
    }
  />
}
    </View>
  )
}


export default BuyCoin