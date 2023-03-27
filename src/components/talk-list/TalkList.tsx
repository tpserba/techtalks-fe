import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Link, Route, useLocation, useNavigate } from "react-router-dom";
import './TalkList.scss'
import '../../images/img_avatar.png';
import HamburgerMenu from '../hamburger-menu/HamburgerMenu';
import Header from '../header/Header';
import TalkCard from '../talk-card/TalkCard';
import { ITalk } from '../../interface/ITalk';
import Talk from '../talk/Talk';
import { hasContent } from '../../utils/utils';
import { IAuthor } from '../../interface/IAuthor';
import AuthorCard from '../author-card/AuthorCard';
import { searchByTitle, searchByAuthor, getTalks, searchTalksByAuthor, getFullTalk, getTalksPageable } from '../../Apis';

type Props = {
    talks: ITalk[],
    isSearchPerformed: boolean,
};
interface Params {
    "data"?: string
}

interface PaginationInfo {
    content?: ITalk[],
    empty?: boolean,
    first?: boolean,
    last?: boolean,
    number?: number,
    numberOfElements?: number,
    pageable?: {

    },
    size?: number,
    sort?: {
        empty?: boolean,
        unsorted?: boolean,
        sorted?: boolean
    },
    totalElements?: number,
    totalPages?: number
}

function TalkList(props: Props) {
    const [talks, setTalks] = useState<ITalk[]>([]);
    const [authors, setAuthors] = useState<IAuthor[]>([]);
    const [author, setAuthor] = useState<IAuthor>({});
    const [talk, setTalk] = useState<ITalk>({});
    const [showTalk, setShowTalk] = useState(false);
    const [currentPage, setCurrentPage] = useState<number>(0);
    const navigate = useNavigate();
    const { state } = useLocation();
    const [isHandleAuthorClicked, setIsHandleAuthorClicked] = useState<boolean>(false);
    const [isHandleTalkClicked, setIsHandleTalkClicked] = useState<boolean>(false);
    const [isSearchDone, setIsSearchDone] = useState<boolean>(false);
    const [paginationInfo, setPaginationinfo] = useState<PaginationInfo>({});

    const search = async (searchParams: string) => {
        if (hasContent(searchParams)) {
            setTalks(await searchByTitle(searchParams));
            if (talks.length === 0) {
                setAuthors(await searchByAuthor(searchParams));
                if (authors.length > 0) {

                }
            }
        } else {
            selectTalks(0, 5);
        }


    }

    const selectTalks = async (page: number, size: number) => {
        //setTalks(await getTalks());
        let response = await getTalksPageable(page, size);
        setTalks(response.content);
        setPaginationinfo(response);
        console.log(response);

    }
    // If user doesn't input anything on search bar
    // its default behaviour is to search all talks

    const handleOnClick = async (event: React.MouseEvent<HTMLDivElement>, talk: ITalk, showTheTalk: boolean) => {
        let target = event.target as HTMLDivElement;
        setTalks(await searchTalksByAuthor(talk.author?.id!));
        setTalk(await getFullTalk(talk.id));
        setAuthor(talk.author!);
        setIsHandleTalkClicked(true);

    }
    const handleAuthorOnClick = async (event: React.MouseEvent<HTMLDivElement>, authorItem: IAuthor, showTheTalk: boolean) => {
        let target = event.target as HTMLDivElement;
        setAuthor(authorItem);
        setTalks(await searchTalksByAuthor(authorItem.id!));

        setIsHandleAuthorClicked(true);
    }


    const handleBackPage = () => {
        if (paginationInfo !== undefined) {
            console.log(paginationInfo.totalPages);
        }
    }

    const handlePageSelect = async (event: React.MouseEvent<HTMLParagraphElement>) => {
        let target = event.target as HTMLParagraphElement;
        console.log(target.innerHTML)
        console.log("current page");
        console.log(currentPage)
        setCurrentPage(parseInt(target.innerHTML));
        selectTalks(parseInt(target.innerHTML), 5);

    }

    const handleMorePages = (event: React.MouseEvent<HTMLParagraphElement>) => {
        let target = event.target as HTMLParagraphElement;
        console.log(target.innerHTML)
        setCurrentPage(currentPage + 5);
        selectTalks(currentPage, 5);

    }
    useEffect(() => {
        if (!isSearchDone) {
            search(state.data);
            setIsSearchDone(true);
        }

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
        if (isHandleAuthorClicked) {
            navigate("/user-profile/" + author.id, {
                state:
                {
                    author: author,
                    talks: talks,
                }
            })
        }
    }, [talks, talk]);

    return (

        <div id="talk-list-window">
            <div id="talk-list-header">
                <Header />
                <div id="ham-menu-header">
                    <HamburgerMenu />
                </div>
            </div>
            <hr />
            <div id="talk-list-main">
                <p className="talk-list-page-btn-main" onClick={() => handleBackPage()}>&lt; Previous Talks</p>
                <div id="card-list">
                    {authors.length > 0 ?
                        authors.map((item) => {
                            return (
                                <div id="talk-card" key={item.id} onClick={(event) => handleAuthorOnClick(event, item, false)}>
                                    <AuthorCard authorItem={item} talks={talks} />
                                    <br />
                                </div>
                            )
                        })
                        :
                        talks.map((item) => {
                            return (
                                <div id="talk-card" key={item.id} onClick={(event) => handleOnClick(event, item, true)}>
                                    <TalkCard talk={item} type="talk" />
                                    <br />
                                </div>
                            )
                        })
                    }
                </div>
                <p className="talk-list-page-btn-main">Next talks &gt;</p>
            </div>

            <div id="talk-list-main-bottom">
                <p className="talk-list-page-number-btn-bottom">&lt;</p>
                {Array.from(Array(paginationInfo.totalPages).keys()).map((item, index) => {
                    let pageNumber = index;
                    if (paginationInfo.totalPages! > 5) {
                        pageNumber = currentPage;
                        if (index <  5 && (index + currentPage <= paginationInfo.totalPages!)) {
                            return (
                                <p className="talk-list-page-number-btn-bottom"
                                    onClick={(event) => handlePageSelect(event)}>
                                    {
                                        currentPage < 1 ?
                                            (index)
                                            :
                                            (index + currentPage) - 1
                                    }
                                </p>
                            )
                        }
                    } else if (paginationInfo.totalPages !== undefined) {
                        console.log("test")
                        return (
                            <p className="talk-list-page-number-btn-bottom" onClick={(event) => handlePageSelect(event)}>{index - 1}{index}</p>
                        )
                    }
                })}
                <p className="talk-list-page-number-btn-bottom">&gt;</p>
            </div>
            <hr />
            <footer id="talk-list-footer">
            </footer>
        </div>

    );

}

export default TalkList;

