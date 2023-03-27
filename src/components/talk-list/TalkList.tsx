import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from "react-router-dom";
import './TalkList.scss'
import '../../images/img_avatar.png';
import HamburgerMenu from '../hamburger-menu/HamburgerMenu';
import Header from '../header/Header';
import TalkCard from '../talk-card/TalkCard';
import { ITalk } from '../../interface/ITalk';
import { hasContent } from '../../utils/utils';
import { IAuthor } from '../../interface/IAuthor';
import AuthorCard from '../author-card/AuthorCard';
import { searchByTitle, searchByAuthor, searchTalksByAuthor, getFullTalk, getTalksPageable } from '../../Apis';
import { IPaginationInfo } from '../../interface/IPaginationInfo';

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
    const [showTalk, setShowTalk] = useState(false);
    const [currentPage, setCurrentPage] = useState<number>(0);
    const navigate = useNavigate();
    const { state } = useLocation();
    const [isHandleAuthorClicked, setIsHandleAuthorClicked] = useState<boolean>(false);
    const [isHandleTalkClicked, setIsHandleTalkClicked] = useState<boolean>(false);
    const [isSearchDone, setIsSearchDone] = useState<boolean>(false);
    const [paginationInfo, setPaginationinfo] = useState<IPaginationInfo>({});

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

    const handleNextPageClick = () => {
        if (currentPage < paginationInfo.totalPages!) {
            setCurrentPage(currentPage + 1);
            selectTalks(currentPage + 1, 5);
        }

    }
    const handleBackPageClick = () => {
        if (currentPage > 0) {
            setCurrentPage(currentPage - 1);
            selectTalks(currentPage - 1, 5);
        }

    }

    const calculatePagesToShow = () => {
        let showSiblings = false;
        let isEndSelected = false;
        let isLastSelected = false;
        let arrToShow = []
        if (currentPage >= 3) {
            showSiblings = true;
        }
        if (currentPage === paginationInfo.totalPages) {
            showSiblings = false;
            isEndSelected = true;
        }

        if (currentPage >= paginationInfo.totalPages! - 2 && currentPage < paginationInfo.totalPages!) {
            showSiblings = false;
            isLastSelected = false;
            isEndSelected = true;
        }

        if (currentPage === paginationInfo.totalPages!-1) {            
            showSiblings = false;
            isEndSelected = false;
            isLastSelected = true;
        }
        if (!showSiblings && !isEndSelected && !isLastSelected) {
            console.log("!show siblings")
            for (let i = 0; i < currentPage + 3; i++) {
                if (currentPage === i) {
                    arrToShow.push(
                        <p onClick={(event) => handlePageSelect(event)}><u>{i}</u></p>
                    );
                } else {
                    arrToShow.push(
                        <p onClick={(event) => handlePageSelect(event)}>{i}</p>
                    );
                }
            }
        } else if (showSiblings && !isEndSelected && !isLastSelected) {
            console.log("!isEnd selected and !isLastSelected")
            for (let i = currentPage - 2; i < currentPage + 3; i++) {
                if (currentPage === i) {
                    arrToShow.push(
                        <p onClick={(event) => handlePageSelect(event)}><u>{i}</u></p>
                    );
                } else {
                    arrToShow.push(
                        <p onClick={(event) => handlePageSelect(event)}>{i}</p>
                    );
                }
            }
        }

        if (isEndSelected && !isLastSelected) {
            console.log(paginationInfo.totalPages)
            console.log(isLastSelected)
            for (let i = currentPage - 2; i < currentPage + 2; i++) {
                if (currentPage === i) {
                    arrToShow.push(
                        <p onClick={(event) => handlePageSelect(event)}><u>{i}</u></p>
                    );
                } else {
                    arrToShow.push(
                        <p onClick={(event) => handlePageSelect(event)}>{i}</p>
                    );
                }

            }
        }

        if (isLastSelected) {
            console.log("test")
            for (let i = currentPage - 2; i < currentPage; i++) {
                if (currentPage === i) {
                    arrToShow.push(
                        <p onClick={(event) => handlePageSelect(event)}><u>{i}</u></p>
                    );
                } else {
                    arrToShow.push(
                        <p onClick={(event) => handlePageSelect(event)}>{i}</p>
                    );
                }

            }
        }

        return arrToShow;
    }

    const onFirstPageClickHandle = () => {
        setCurrentPage(0);
        selectTalks(0, 5);
    }
    const onLastPageClickHandle = () => {
        setCurrentPage(paginationInfo.totalPages!);
        selectTalks(paginationInfo.totalPages!, 5);
    }

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
                <p className="talk-list-page-btn-main" onClick={() => handleBackPageClick()}>&lt; Previous Talks</p>
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
                <p className="talk-list-page-btn-main" onClick={() => handleNextPageClick()}>Next talks &gt;</p>
            </div>

            <div id="talk-list-main-bottom">
                <p className="talk-list-page-number-btn-bottom go-first" onClick={() => { onFirstPageClickHandle() }}>&lt;&lt;</p>
                <p className="talk-list-page-number-btn-bottom" onClick={() => { handleBackPageClick() }}>&lt;</p>
                <div id="pages-nums-and-input">
                    <div className="talk-list-page-number-btn-bottom">
                        {calculatePagesToShow().map((item, index) => {
                            return (
                                item
                            )
                        })}
                    </div>

                    Page<input type="number" />
                </div>
                <p className="talk-list-page-number-btn-bottom" onClick={() => { handleNextPageClick() }}>&gt;</p>
                <p className="talk-list-page-number-btn-bottom go-last" onClick={() => { onLastPageClickHandle() }}>&gt;&gt;</p>

            </div>

            <hr />
            <footer id="talk-list-footer">
            </footer>
        </div>

    );

}

export default TalkList;

