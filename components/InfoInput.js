import { Text, StyleSheet, View, TextInput, Image} from "react-native";

function InfoInput(props){
    return(
        <View style={styles.infoContainer}>           
            <Image
                source={props.source}
                style={styles.logoIco}
            /> 
            <TextInput
                placeholder={props.placeholder}
                placeholderTextColor={props.color}
                style={styles.infoInput}
            />
        </View>
    );
}


export default InfoInput;

const styles = StyleSheet.create({
    infoContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        paddingBottom: 15
    },    
    logoIco: {
        tintColor: '#79AE92',
        height: 20,
        width: 35,
        marginRight: 10
    },
    infoInput: {
        width: '90%',
        borderWidth: 2,
        borderColor: '#79AE92',
        paddingLeft: 10
    }
});