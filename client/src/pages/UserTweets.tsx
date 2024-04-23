import React from "react";
import { ITweetService } from "../services/tweet";
import Tweets from "../components/Tweets/Tweets";
import { useParams } from "react-router-dom";

type Props = {
    tweetService: ITweetService;
};

const UserTweets = ({ tweetService }: Props) => {
    const { nickname } = useParams<{ nickname: string }>();
    return <Tweets tweetService={tweetService} nickname={nickname} writable={false} />;
};

export default UserTweets;
