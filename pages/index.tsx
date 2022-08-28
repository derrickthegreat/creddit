import { Typography } from "@mui/material";
import PostPreview from "../components/PostPreview";
import { GetServerSideProps } from "next";

export default function SubredditHot(props: { posts: any }): JSX.Element {
    const { posts } = props;
    return (
        <>
            {posts.map((post: { kind: string, data: any }, index: number) => {
            const data = post.data;
                return <PostPreview post={data} key={index} />
            })}
        </>
    )
}


export const getServerSideProps: GetServerSideProps = async (ctx) => {
    const res = await fetch("https://www.reddit.com/.json")
    const data = await res.json();
    const posts = data.data.children;
    return {
        props: {
            posts
        }
    }

}