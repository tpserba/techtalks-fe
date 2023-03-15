import React from "react";

interface Props {
  handleClick:(event:React.MouseEvent<HTMLButtonElement>) =>Promise<void>,  
  title: string,
}

function TalkButton(props: Props) {
  
    return (
      <>
        <button className='search-button' onClick={props.handleClick}>{props.title}</button> 
        
      </>
    );
  }
  
  export default TalkButton;
  