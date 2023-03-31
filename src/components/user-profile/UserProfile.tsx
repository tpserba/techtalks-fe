import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from "react-router-dom";
import './UserProfile.scss'
import '../../images/img_avatar.png';
import HamburgerMenu from '../hamburger-menu/HamburgerMenu';
import Header from '../header/Header';
import TalkCard from '../talk-card/TalkCard';
import { ITalk } from '../../interface/ITalk';
import { IAuthor } from '../../interface/IAuthor';
import { getTalks, getTalkCard, searchTalksByAuthor, getFullTalk } from '../../Apis';

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
    const [isHandleTalkClicked, setIsHandleTalkClicked] = useState<boolean>(false);    
    const navigate = useNavigate();
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
        setTalk(await getTalkCard(1));
    }

    const handleOnClick = async (event: React.MouseEvent<HTMLDivElement>, talk: ITalk, showTheTalk: boolean) => {
        let target = event.target as HTMLDivElement;
        setTalks(await searchTalksByAuthor(talk.author?.id!));
        setTalk(await getFullTalk(talk.id));
        setAuthor(talk.author!);

        setIsHandleTalkClicked(true);

    }

    useEffect(() => {
        //search(state.author.id);

        setAuthor(state.author);
        setTalks(state.talks);
        if (isHandleTalkClicked) {

            navigate("/talk/" + talk.id, {
                state:
                {
                    author: author,
                    talks: talks,
                    talk: talk,
                }
            })
        }
    }, [talk]);

    return (
        <>
            <div id="user-profile-list-header">
                <Header />
                <div id="user-profile-ham-menu-header">
                    <HamburgerMenu />
                </div>
            </div>
            <div id="user-profile-component">
            <div>
          <hr />
        </div>
                
                {state.author.authorName}
                <br />
                {state.author.email}
                <br />
                {state.author.linkedin}
                <br />
                <h1>Talks from {state.author.authorName}</h1>
                <div id="user-profile-main">
                    {
                        talks.map((item) => {
                            return (
                                <div id="user-profile-talk-card" key={item.id} onClick={(event) => handleOnClick(event, item, true)}>
                                    <TalkCard talk={item} type="talk" />
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        </>
    );

}

export default UserProfile;

