import config from "../config.json";
import styled from "styled-components";
import { CSSReset } from "../src/components/CssReset";
import Menu from "../src/components/Menu";
import { StyledTimeline } from "../src/components/TimeLine";

const HomePage = () => {
    return (
        <>
            <CSSReset />
            <div>
                <Menu />
                <Header></Header>
                <TimeLine playlists={config.playlists} />
            </div>
        </>
    );
};
export default HomePage;

const StyledHeader = styled.div`
    margin-top: 60px;
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
const Header = () => {
    return (
        <StyledHeader>
            {/* <img src="Banner" /> */}
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
const TimeLine = (props) => {
    const playlistNames = Object.keys(props.playlists);
    return (
        <StyledTimeline>
            {playlistNames.map((playlistName, index) => {
                const videos = props.playlists[playlistName];
                return (
                    <section key={index}>
                        <h2>{playlistName}</h2>
                        <div>
                            {videos.map((video, index) => {
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
