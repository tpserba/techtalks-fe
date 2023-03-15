import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Link, Route, useLocation, useNavigate } from "react-router-dom";
import './TalkList.css'
import '../../images/img_avatar.png';
import HamburgerMenu from '../hamburger-menu/HamburgerMenu';
import Header from '../header/Header';
import TalkCard from '../talk-card/TalkCard';
import { ITalk } from '../../interface/ITalk';
import Talk from '../talk/Talk';
import { hasContent } from '../../utils/utils';
import { IAuthor } from '../../interface/IAuthor';
import AuthorCard from '../author-card/AuthorCard';
import { searchByTitle, searchByAuthor, getTalks, searchTalksByAuthor, getFullTalk } from '../../Apis';

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
    const [isHandleTalkClicked, setIsHandleTalkClicked] = useState<boolean>(false);
    const [isSearchDone, setIsSearchDone] = useState<boolean>(false);


    const search = async (searchParams: string) => {        
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

    const handleOnClick = async (event: React.MouseEvent<HTMLDivElement>, talk: ITalk, showTheTalk: boolean) => {
        let target = event.target as HTMLDivElement;
        setTalks(await searchTalksByAuthor(talk.author?.id!));  
        setTalk(await getFullTalk(talk.id));
        setAuthor(talk.author!);
        console.log(talk.id);
        setIsHandleTalkClicked(true);
       
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
         
        if(isHandleTalkClicked) {
            console.log(talk);
            console.log(talks);
            console.log(author);
            navigate("/talk/"+talk.id, {
                state:
                {
                    author:author,
                    talks:talks,
                    talk: talk,
                }
            })
        }
        if(isHandleAuthorClicked) {
            navigate("/user-profile/"+author.id, {
                state:
                {
                    author:author,
                    talks:talks,
                }
            })
        }
    }, [talks, talk]);

    return (
        <>
            <div id="talk-list-header">
                <Header />
                <div id="ham-menu-header">
                    <HamburgerMenu />
                </div>
            </div>
            <hr />            
            {authors.length === 0 ?
                talks.map((item) => {
                    return (
                        <div id="talk-card" key={item.id} onClick={(event) => handleOnClick(event,item ,true)}>
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

