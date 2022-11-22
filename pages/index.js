import config from "../config.json";
import React from "react";
import styled from "styled-components";
import Menu from "../src/components/Menu/Menu";
import { StyledTimeline } from "../src/components/Timeline";

const HomePage = () => {
    const [filterValue, setFilterValue] = React.useState(" ");

    return (
        <>
            <div>
                <Menu filterValue={filterValue} setFilterValue={setFilterValue} />
                <Header></Header>
                <TimeLine searchValue={filterValue} playlists={config.playlists} />
            </div>
        </>
    );
};
export default HomePage;

const StyledHeader = styled.div`
    background-color: ${({ theme }) => theme.backgroundLevel1 || "#FFFFFF"};
    img {
        width: 80px;
        height: 80px;
        border-radius: 50%;
    }
    .user-info {
        display: flex;
        width: 100%;
        align-items: center;
        padding: 10px 32px;
        gap: 10px;
    }
`;

const StyledBanner = styled.div`
    margin-top: 60px;
    background-image: url(${({ bg }) => bg});
    height: 200px;
`;

const Header = () => {
    return (
        <StyledHeader>
            <StyledBanner bg={config.bannerBg} />
            <section className="user-info">
                <img src={`https://github.com/${config.github}.png`} />
                <div>
                    <h2>{config.name}</h2>
                    <p>{config.job}</p>
                </div>
            </section>
        </StyledHeader>
    );
};
const TimeLine = ({ searchValue, ...props }) => {
    const playlistNames = Object.keys(props.playlists);
    return (
        <StyledTimeline>
            {playlistNames.map((playlistName, index) => {
                const videos = props.playlists[playlistName];
                return (
                    <section key={index}>
                        <h2>{playlistName}</h2>
                        <div>
                            {videos
                                .filter((video) => {
                                    const formattedTitle = video.title.toLowerCase();
                                    const formattedSearchValue = searchValue.toLowerCase();
                                    return formattedTitle.includes(formattedSearchValue);
                                })
                                .map((video, index) => {
                                    return (
                                        <a key={index} href={video.url}>
                                            <img src={video.thumb} />
                                            <span>{video.title}</span>
                                        </a>
                                    );
                                })}
                        </div>
                    </section>
                );
            })}
        </StyledTimeline>
    );
};
