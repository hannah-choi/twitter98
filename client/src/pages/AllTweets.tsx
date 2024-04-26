import React from "react";
import { ITweetService } from "../services/tweet";
import Tweets from "../components/Tweets/Tweets";

type Props = {
    tweetService: ITweetService;
};

const AllTweets = ({ tweetService }: Props) => {
    return <Tweets tweetService={tweetService} writable={true} />;
};

export default AllTweets;
