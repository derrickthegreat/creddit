import { Typography, Box, Stack, Button } from "@mui/material";
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import Link from "next/link";
import { GetServerSideProps } from "next";
import { marked } from 'marked';
import Image from "next/image";
import Comment from "../../../../../components/Comment";

export default function PostComments(props: { post: any, comments: any }): JSX.Element {
    const post = props.post;
    const comments = props.comments.map((comment: any, index: number) => {
        if(index > 100) { return }
        return {
            body: comment.body,
            author: comment.author,
            score: comment.score,
            replies: comment.replies ? comment.replies.data.children.map((reply: any) => reply.data) : null,            
        }
    });
    const subreddit = post.subreddit_name_prefixed;
    const gallery = post.gallery_data ? post.gallery_data.items : null;
    console.log(gallery)
    return (
        <>
            <Typography variant="h2"><Link href={`/${subreddit}`}>{subreddit}</Link></Typography>
            <Box sx={{
                display: "flex",
                flexFlow: "column",
                backgroundColor: "grey.100",
            }}>
            <Box sx={{
                display: 'flex',
                gap: 1,
                p: "10px",
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
                    <Box sx={{
                        p: 2,
                    }}>
                        {post.thumbnail !== "self" ? <Image src={post.thumbnail} width={'100%'} height={"100%"} layout="responsive" alt={post.name}/> : null}
                        {post.selftext && <Typography dangerouslySetInnerHTML={{__html: marked(post.selftext)}} m={2}></Typography>}
                    </Box>
                    <Box sx={{
                        display: "flex",
                    }}>
                        <Typography variant="caption">{`${post.num_comments} comments sorted by Best`}</Typography>
                    </Box>
                </Stack>
                <Button variant="text" sx={{ alignSelf: 'start', justifySelf: 'flex-end'}} startIcon={<FavoriteBorderIcon />}></Button>
            </Box>
                <Stack sx={{
                    m: 3,
                    gap: 2,
                }}>
                    {comments.map((comment: any, index: number) => {
                        if(!comment.body) { return };
                        return comment.replies ? <Comment comment={comment} replies={comment.replies} key={index} /> : <Comment comment={comment} key={index}/>})}
                </Stack>
            </Box>
        </>
    )
}


export const getServerSideProps: GetServerSideProps = async (ctx) => {
    const { subreddit, cid } = ctx.query;
    const res = await fetch("https://www.reddit.com/r/" + subreddit + `/${cid}.json`)
    const data = await res.json();
    const post = data[0].data.children[0].data
    const comments = data[1].data.children.map((comment: any) => comment.data);
    return {
        props: {
            post,
            comments,
        }
    }

}