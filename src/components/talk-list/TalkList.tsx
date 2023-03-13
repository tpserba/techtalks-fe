import React, { useEffect, useState } from 'react';
import './TalkList.css'
import '../../images/img_avatar.png';
import { getTalk, getTalks } from './TalkListApi';
import HamburgerMenu from '../hamburger-menu/HamburgerMenu';
import Header from '../header/Header';
import TalkCard from '../talk-card/TalkCard';
import { ITalk } from '../../interface/ITalk';
import Talk from '../talk/Talk';
import { getFullTalk } from '../talk/TalkApi';
type Props = {
    talks: ITalk[],
    isSearchPerformed: boolean
};
type State = {

};
function TalkList(props: Props) {
    const [talks, setTalks] = useState<ITalk[]>([]);
    const [talk, setTalk] = useState<ITalk>({});
    const [showTalk, setShowTalk] = useState(false)
    const [isSearchPerformed, setIsSearchPerformed] = React.useState<boolean>(false);

    const selectTalks = async () => {
        setTalks(await getTalks());
        setIsSearchPerformed(false);
    }
    // If user doesn't input anything on search bar
    // its default behaviour is to search all talks
    useEffect(() => {
        selectTalks()
        setIsSearchPerformed(props.isSearchPerformed);
    }, []);


    const selectTalk = async (event: React.MouseEvent<HTMLButtonElement>) => {
        const target = event.target as HTMLButtonElement;
        setIsSearchPerformed(true);
        //setTalk(await getTalk((parseFloat(target.innerHTML)))); 
        // Passing id, hardcoded,  have to resolve how we'll retrieve it (possibly when getting all talks, bring also Id)
        setTalk(await getTalk(1));
    }

    const handleOnClick = async (event: React.MouseEvent<HTMLDivElement>, itemId: number |undefined |null,  showTheTalk: boolean) => {
        let target = event.target as HTMLDivElement;
        console.log(target)
        setTalk(await getFullTalk(itemId));        
        setShowTalk(true);
    }
    

    return (
        <>
            <div id="talk-list-header">
                <Header />
                <div id="ham-menu-header">
                    <HamburgerMenu />
                </div>
            </div>
            <hr />       
            {showTalk ?
                <Talk talk={talk} />
                :
                talks.map((item) => {
                    return (
                        <div id="talk-card" key={item.id} onClick={(event) => handleOnClick(event, item.id, true)}>
                            <TalkCard talkCard={item} />
                            <br />
                        </div>
                    )
                })}
        </>
    );

}

export default TalkList;

