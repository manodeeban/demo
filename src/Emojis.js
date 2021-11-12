import React,{ useState } from "react";
import "./Emojis.css";
import InsertEmoticonIcon from "@material-ui/icons/InsertEmoticon";
import Picker from 'emoji-picker-react';


function Emojis(){

  const EmojiData = ({ chosenEmoji }) => (
    <div>
       {chosenEmoji.emoji}
    </div>
  );   
 const [showEmojis, setShowEmojis] = useState(false);

 const [chosenEmoji, setChosenEmoji] = useState(null);

  const onEmojiClick = (event, emojiObject) => {
    setChosenEmoji(emojiObject);
  };

 

    return(
        <div className="dropdownEmoji">
           <div className="dropdown-Emoji" onClick={(e)=> setShowEmojis(!showEmojis)}><InsertEmoticonIcon /></div>
            {showEmojis && (
            <div className="EmojisContainer">
                <Picker  onEmojiClick={onEmojiClick}/>
                {chosenEmoji && <EmojiData chosenEmoji={chosenEmoji} />}
            </div>
            )}
        </div>

    );
};


export default Emojis;