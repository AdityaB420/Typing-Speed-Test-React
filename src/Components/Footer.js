import Select from "react-select";
import React, { useState} from "react"
import { themeOptions } from './../Utils/themeOptions';
import { useTheme } from "../Context/ThemeContext";
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import { IconButton } from '@mui/material';



const Footer = ()=>{
    const { setTheme, theme } = useTheme();
    const handleChange=(e)=>{
            setTheme(e.value);
            localStorage.setItem("theme",JSON.stringify(e.value));
        
    }
    const handleLinkedInClick = () => {
        window.open('https://www.linkedin.com/in/aditya-butola-372398172/', '_blank');
      };

    const handleGithubClick = () =>{
        window.open('https://github.com/AdityaB420', '_blank');
    };
    return(
        <div className="footer">
            <div className="footerLinks" style={{ display: 'flex', gap: '10px' }}>
                    <IconButton color="primary" onClick={handleLinkedInClick} style={{color:theme.textColor}}>
                            <LinkedInIcon />
                    </IconButton>
                    <IconButton color="primary" onClick={handleGithubClick} style={{color:theme.textColor}}>
                            <GitHubIcon />
                    </IconButton>
            </div>
            <div className="themeButton">
                <Select
                    onChange={handleChange}
                    options={themeOptions}
                    menuPlacement="top"
                    defaultValue={{ label: theme.label, value: theme }}
                    styles={{
                        control: styles => ({ ...styles, backgroundColor: theme.background }),
                        menu: styles => ({ ...styles,  backgroundColor: theme.background }),
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