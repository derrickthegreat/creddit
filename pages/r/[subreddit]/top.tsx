import { Typography } from "@mui/material";
import PostPreview from "../../../components/PostPreview";
import { GetServerSideProps } from "next";

export default function SubredditTop(props: { posts: any }): JSX.Element {
    const { posts } = props;
    return (
        <>
            <Typography variant="h2">{posts[0].data.subreddit}</Typography>
            {posts.map((post: { kind: string, data: any }, index: number) => {
            const data = post.data;
                return <PostPreview post={data} key={index} />
            })}
        </>
    )
}


export const getServerSideProps: GetServerSideProps = async (ctx) => {
    console.log(ctx)
    const { subreddit } = ctx.query;
    const res = await fetch("https://www.reddit.com/r/" + subreddit + "/hot.json")
    const data = await res.json();
    const posts = data.data.children;
    return {
        props: {
            posts
        }
    }

}