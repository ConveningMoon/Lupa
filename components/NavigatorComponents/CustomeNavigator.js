import { 
    View, 
    Text,
    StyleSheet,
    FlatList
} from 'react-native';

import Colors from '../../constants/colors';
import ButtonForNavigator from '../ButtonComponents/ButtonForNavigator';

export default function CustomeNavigators(props) {
    return(
        <View style={styles.generalContainer}>
            <ButtonForNavigator
                name='home-sharp'
                text='Home'
            />
            <ButtonForNavigator
                name='person'
                text='Profile'
            />
        </View>
    );
}

const styles = StyleSheet.create({
    generalContainer: {
      height: 50, 
      borderTopWidth: 0.5,
      borderColor: Colors.color_darkGreen,
      borderTopEndRadius: 20,
      borderTopStartRadius: 20,
      justifyContent: 'center',
      alignItems: 'center',
      flexDirection: 'row'
    }
  });