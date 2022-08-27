import PostPreview from "../../../../../components/PostPreview";
import { Typography } from "@mui/material";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import { useEffect } from "react";

export default function SubredditNew(props: { post: any }): JSX.Element {
    const post = props.post;
    const router = useRouter();

    useEffect(() => {
        router.push(post.permalink)
    },[])
    return (
        <>
        <Typography variant="h1">Loading...</Typography>
        </>
    )
}


export const getServerSideProps: GetServerSideProps = async (ctx) => {
    console.log(ctx)
    const { subreddit, cid } = ctx.query;
    const res = await fetch("https://www.reddit.com/r/" + subreddit + `/${cid}.json`)
    const data = await res.json();
    const post = data[0].data.children[0].data
    const comments = data[1].data.children;
    comments.forEach(comment => comment.data);
    return {
        props: {
            post,
            comments,
        }
    }

}