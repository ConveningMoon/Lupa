import { useState } from 'react';

import DropDownPicker from 'react-native-dropdown-picker';

export default function BadgeDropDown(props) {
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState(null);
    const [item, setItem] = useState(props.elements);

    return (
        <DropDownPicker 
            searchable={true}

            multiple={props.multiple}
            max={7}
            open={open}
            value={value}
            items={item}
            setOpen={setOpen}
            setValue={setValue}
            setItems={setItem} 
            
            placeholder={props.placeholder}

            maxHeight={105}
            mode="BADGE"
            badgeDotColors={["#e76f51", "#00b4d8", "#e9c46a", "#e76f51", "#8ac926", "#00b4d8", "#e9c46a"]}
            extendableBadgeContainer={true}
            //style = {styles.dropStudentsContainer}     
            
            onChangeValue={props.onChangeValue}
            //onSelectItem={props.onSelectItem}
        />
    )
}