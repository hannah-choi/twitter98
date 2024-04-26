import React from "react";
import { ITweetService } from "../services/tweet";
import Tweets from "../components/Tweets/Tweets";
import { useParams } from "react-router-dom";

type Props = {
    tweetService: ITweetService;
};

const UserTweets = ({ tweetService }: Props) => {
    const { userid } = useParams<{ userid: string }>();
    return <Tweets tweetService={tweetService} userid={userid} />;
};

export default UserTweets;
