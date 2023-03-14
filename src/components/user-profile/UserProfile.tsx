import React, { useEffect, useState } from 'react';
import { useLocation } from "react-router-dom";
import './UserProfile.css'
import '../../images/img_avatar.png';
import { getTalk, getTalks} from './UserProfileApi';
import HamburgerMenu from '../hamburger-menu/HamburgerMenu';
import Header from '../header/Header';
import TalkCard from '../talk-card/TalkCard';
import { ITalk } from '../../interface/ITalk';

import { IAuthor } from '../../interface/IAuthor';
import { getFullTalk } from '../talk/TalkApi';
type Props = {
    talks: ITalk[],
    isSearchPerformed: boolean,

};
interface Params {
    author: IAuthor
}
function UserProfile(props: Props) {
    const [talks, setTalks] = useState<ITalk[]>([]);
    const [author, setAuthor] = useState<IAuthor>({});
    const [talk, setTalk] = useState<ITalk>({});
    const [showTalk, setShowTalk] = useState(false)

    const { state } = useLocation();


    const search = async (id: number) => {            
       // setAuthors(await searchTalkByAuthor(id));
    }

    const selectTalks = async () => {
        setTalks(await getTalks());

    }
    // If user doesn't input anything on search bar
    // its default behaviour is to search all talks



    const selectTalk = async (event: React.MouseEvent<HTMLButtonElement>) => {
        const target = event.target as HTMLButtonElement;

        //setTalk(await getTalk((parseFloat(target.innerHTML)))); 
        // Passing id, hardcoded,  have to resolve how we'll retrieve it (possibly when getting all talks, bring also Id)
        setTalk(await getTalk(1));
    }

    const handleOnClick = async (event: React.MouseEvent<HTMLDivElement>, itemId: number | undefined | null, showTheTalk: boolean) => {
        let target = event.target as HTMLDivElement;
        setTalk(await getFullTalk(itemId));
        setShowTalk(true);
    }

    useEffect(() => {
        //search(state.author.id);
        setAuthor(state.author);
        setTalks(state.talks);
    }, []);

    return (
        <>
            <div id="talk-list-header">
                <Header />
                <div id="ham-menu-header">
                    <HamburgerMenu />
                </div>
            </div>
            <hr />            
            {
            talks.map((item) => {
                return (
                    <div id="talk-card" key={item.id} onClick={(event) => handleOnClick(event, item.id, true)}>
                       {author.authorName}
                       <br />
                       {author.email}
                       <br />
                       {author.linkedin}
                       <br />
                       <h1>Talk</h1>

                    </div>
                )
            })
            }
        </>
    );

}

export default UserProfile;

