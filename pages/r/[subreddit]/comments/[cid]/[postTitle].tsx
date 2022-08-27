import { Typography, Box, Stack, Button } from "@mui/material";
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import CommentIcon from '@mui/icons-material/Comment';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import Link from "next/link";
import { GetServerSideProps } from "next";
import Image from "next/image";
import { marked } from 'marked'

export default function PostComments(props: { post: any, comments: any }): JSX.Element {
    const post = props.post;
    const comments = props.comments;

    return (
        <>
            <Typography variant="h2">{post.subreddit}</Typography>
            <Box sx={{
                display: 'flex',
                gap: 1,
                p: "10px",
                backgroundColor: "grey.100",
                m: "5px",
                alignItems: 'center',
            }}>
                <Stack sx={{alignItems: "center", minWidth: 50, alignSelf: "start"}}>
                   <ArrowUpwardIcon />
                   <Typography variant="caption">{post.score}</Typography>
                   <ArrowDownwardIcon />  
                </Stack>
                <Stack>
                    <Typography variant="h6" component="h2">{`${post.title}`}</Typography>
                    <Box display="flex">
                        <Typography variant="body2">{"Posted by: "} 
                        <Link href={`/user/${post.author}`}>{"u/" + post.author}</Link>
                        {` ${5} hours ago.`} 
                        </Typography>
                    </Box>
                    {post.selftext && <Typography dangerouslySetInnerHTML={{__html: marked(post.selftext)}} m={2}></Typography>}
                    <Box sx={{
                        display: "flex",
                    }}>
                        <Typography variant="caption">{`${post.num_comments} comments sorted by Best`}</Typography>
                    </Box>
                </Stack>
                <Button variant="text" sx={{ alignSelf: 'start'}} startIcon={<FavoriteBorderIcon />}></Button>
            </Box>
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