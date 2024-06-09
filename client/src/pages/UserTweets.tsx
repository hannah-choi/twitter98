import React from "react";
import { ITweetService } from "../services/tweet";
import Tweets from "../components/Tweets/Tweets";
import { useParams } from "react-router-dom";

type Props = {
    tweetService: ITweetService;
};

const UserTweets = ({ tweetService }: Props) => {
    const { username } = useParams<{ username: string }>();
    return <Tweets tweetService={tweetService} username={username} />;
};

export default UserTweets;
