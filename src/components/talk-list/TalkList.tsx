import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Link, Route, useLocation, useNavigate } from "react-router-dom";
import './TalkList.css'
import '../../images/img_avatar.png';
import { getTalk, getTalks, searchByAuthor, searchByTitle } from './TalkListApi';
import HamburgerMenu from '../hamburger-menu/HamburgerMenu';
import Header from '../header/Header';
import TalkCard from '../talk-card/TalkCard';
import { ITalk } from '../../interface/ITalk';
import Talk from '../talk/Talk';
import { getFullTalk } from '../talk/TalkApi';
import { hasContent } from '../../utils/utils';
import { IAuthor } from '../../interface/IAuthor';
import AuthorCard from '../author-card/AuthorCard';
import { searchTalksByAuthor } from './TalkListApi';
type Props = {
    talks: ITalk[],
    isSearchPerformed: boolean,    
};
interface Params {
    "data"?: string
}
function TalkList(props: Props) {
    const [talks, setTalks] = useState<ITalk[]>([]);
    const [authors, setAuthors] = useState<IAuthor[]>([]);
    const [author, setAuthor] = useState<IAuthor>({});
    const [talk, setTalk] = useState<ITalk>({});
    const [showTalk, setShowTalk] = useState(false)
    const navigate = useNavigate();
    const { state } = useLocation();
    const [isHandleAuthorClicked, setIsHandleAuthorClicked] = useState<boolean>(false);
    const [isSearchDone, setIsSearchDone] = useState<boolean>(false);


    const search = async (searchParams: string) => {
        console.log("this is search params:" + searchParams);
        if (hasContent(searchParams)) {
            setTalks(await searchByTitle(searchParams));
            if (talks.length === 0) {
                setAuthors(await searchByAuthor(searchParams));
                if (authors.length > 0) {

                }
            }
        } else {
            selectTalks();
        }


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
    const handleAuthorOnClick = async (event: React.MouseEvent<HTMLDivElement>, authorItem: IAuthor, showTheTalk: boolean) => {
        let target = event.target as HTMLDivElement;
        setAuthor(authorItem);
        setTalks(await searchTalksByAuthor(authorItem.id!));        
      
        setIsHandleAuthorClicked(true);             
    }
    useEffect(() => {
        if(!isSearchDone){
            search(state.data);
            setIsSearchDone(true);
        }
        
        if(isHandleAuthorClicked) {
            navigate("/user-profile", {
                state:
                {
                    author:author,
                    talks:talks,
                    something: 2
                }
            })
        }
    }, [talks]);

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
                <Talk talk={talk} /> : null
            }

            {!showTalk && authors.length === 0 ?
                talks.map((item) => {
                    return (
                        <div id="talk-card" key={item.id} onClick={(event) => handleOnClick(event, item.id, true)}>
                            <TalkCard talkCard={item} />
                            <br />
                        </div>
                    )
                })
                :
                authors.map((item) => {
                    return (
                        <div id="talk-card" key={item.id} onClick={(event) => handleAuthorOnClick(event, item, false)}>
                            <AuthorCard authorItem={item} talks={talks} />
                            <br />
                        </div>
                    )
                })
            }
        </>
    );

}

export default TalkList;

