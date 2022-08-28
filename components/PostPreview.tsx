import { Box, Button, Stack, Typography } from "@mui/material";
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import CommentIcon from '@mui/icons-material/Comment';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import Link from "next/link";
import { useRouter } from "next/router";
import Image from "next/image";

export default function PostPreview(props: {post: any}) {
    const post = props.post;
    const router = useRouter();
    const thumbnailUrl = post.thumbnail ? post.thumbnail : null;
    return (
        <>
            <Box sx={{
                display: 'flex',
                gap: 1,
                p: "10px",
                backgroundColor: "grey.100",
                m: "5px",
                alignItems: 'center',
            }}>
                <Stack sx={{alignItems: "center", minWidth: 50}}>
                   <ArrowUpwardIcon />
                   <Typography variant="caption">{post.score}</Typography>
                   <ArrowDownwardIcon />  
                </Stack>
                <Stack>
                    <Box display="flex" alignContent={"center"}>
                        <Typography variant="caption"><Link href={`/r/${post.subreddit}`}>{`/r/${post.subreddit}`}</Link></Typography>
                        <Typography variant="body2"> &nbsp; {"• Posted by: "} 
                        <Link href={`/user/${post.author}`}>{"u/" + post.author}</Link>
                        &nbsp; {`${5} hours ago.`} 
                        </Typography>
                    </Box>
                    <Typography variant="h6" component="h2">{`${post.title}`}</Typography>
                    {(thumbnailUrl && thumbnailUrl !== 'self') ? <Image src={thumbnailUrl} alt={post.name} layout="responsive" width="240" height="100%"/> : null}
                    <Box sx={{
                        display: "flex",
                    }}>
                        <Button variant="text" startIcon={<CommentIcon />} onClick={() => router.push(post.permalink) }>{post.num_comments}</Button>
                        <Button variant="text" startIcon={<FavoriteBorderIcon />}>{"Save"}</Button>
                    </Box>
                </Stack>
            </Box>
        </>
    )
}