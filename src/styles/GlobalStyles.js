import React from 'react';
import { createGlobalStyle } from 'styled-components';


const GlobalStyles = createGlobalStyle`

*{
  box-sizing: border-box;
}  
body {
    background:  ${({theme})=>theme.background};
    color: ${({theme})=>theme.textColor};
    margin:0;
    padding:0;
    transition: all 0.25s linear;
  }
  .canvas{
    display: grid;
    min-height: 100vh;
    grid-auto-flow: row;
    grid-template-row: auto 1fr auto;
    align-items: center;
    text-align: center;
    width: 100vw;
    gap: 0.5rem;
    padding: 2rem;

}
.type-box{
  display: block;
  max-width: 1000px;
  height: 220px;
  margin-left: auto;
  margin-right: auto;
  overflow: hidden;
}
.words{
  font-size: 2rem;
  display: flex;
  flex-wrap: wrap;
  color: ${({theme})=>theme.typeBoxText};
}
.word{
  margin: 5px;
  padding-right: 2px;
}
.hidden-input{
  opacity: 0;
}
.current{
  border-left: 1px solid;
  animation: blinking 2s infinite;
  animation-timing-function: ease;
  @keyframes blinking {
                        0%{
                            border-left-color: ${({ theme }) => theme.textColor};
                        }
                        25%{
                            border-left-color: ${({ theme }) => theme.background};
                        }
                        50%{
                            border-left-color: ${({ theme }) => theme.textColor};
                        }
                        75%{
                            border-left-color: ${({ theme }) => theme.background};
                        }
                        100%{
                            border-left-color: ${({ theme }) => theme.textColor};
                        }
                      }
}
.current-right{
  border-right: 1px solid;
  animation: blinking-right 2s infinite;
  animation-timing-function: ease;
        @keyframes blinkingRight {
                              0%{
                                  border-right-color: ${({ theme }) => theme.textColor};
                              }
                              25%{
                                  border-right-color: ${({ theme }) => theme.background};
                              }
                              50%{
                                  border-right-color: ${({ theme }) => theme.textColor};
                              }
                              75%{
                                  border-right-color: ${({ theme }) => theme.background};
                              }
                              100%{
                                  border-left-color: ${({ theme }) => theme.textColor};
                              }
      }
}
.correct{
  color: green;
}
.incorrect{
  color : red;
}
.upper-menu{
  display: flex;
  width: 1000px;
  margin-left: auto;
  margin-right: auto;
  justify-content: space-between;
  font-size: 1.35rem;
  padding: 0.5rem;

}
.modes{
  display: flex;
  gap: 0.4rem;
}
.time-mode:hover{
  cursor: pointer;
  color: green;

}
.footer{
  display: flex;
  width: 1000px;
  justify-content: space-between;
  margin-left: auto;
  margin-right: auto;
}
.themeButton{
  width: 10rem;
  background: white;
  color: black;
}
.stats-box{
  display: flex;
  width: 1000px;
  height: auto;
  margin-left: auto;
  margin-right: auto;
}
.left-stats{
  width: 30%;
  padding: 30px;
}
.right-stats{
  width:70%;
}
.title{
  font-size: 20px;
  color: ${({theme})=>theme.typeBoxText};
}
.subtitle{
  font-size: 30px;
  color: ${({theme})=>theme.textColor};
}
`;

export default GlobalStyles;