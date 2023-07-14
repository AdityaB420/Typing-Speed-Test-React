import Select from "react-select";
import React, { useState} from "react"
import { themeOptions } from './../Utils/themeOptions';
import { useTheme } from "../Context/ThemeContext";



const Footer = ()=>{
    const { setTheme, theme } = useTheme();
    const handleChange=(e)=>{
            setTheme(e.value);
            localStorage.setItem("theme",JSON.stringify(e.value));
        
    }
    return(
        <div className="footer">
            <div className="links">
                Links
            </div>
            <div className="themeButton">
                <Select
                    onChange={handleChange}
                    options={themeOptions}
                    menuPlacement="top"
                    defaultValue={{ label: theme.label, value: theme }}
                    styles={{
                        control: styles => ({ ...styles, backgroundColor: theme.textColor }),
                        menu: styles => ({ ...styles, backgroundColor: theme.background }),
                        option: (styles, { isFocused }) => {
                            return {
                                ...styles,
                                backgroundColor: (!isFocused) ? theme.background : theme.textColor,
                                color: (!isFocused) ? theme.textColor : theme.background,
                                cursor: 'pointer'
                            }
                        }
                    }}
                />
            </div>
            
            
        </div>
    );
}
export default Footer;