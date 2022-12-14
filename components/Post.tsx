import { Box, Button, Stack, Typography } from "@mui/material";
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import CommentIcon from '@mui/icons-material/Comment';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import Link from "next/link";
import { useRouter } from "next/router";

export default function Post(props: {post: any, comments: any}) {
    const post = props.post;
    const router = useRouter();
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
                    <Box display="flex">
                        <Typography variant="body2">{"Posted by: "} 
                        <Link href={`/user/${post.author}`}>{"u/" + post.author}</Link>
                        {`${5} hours ago.`} 
                        </Typography>
                    </Box>
                    <Typography variant="h6" component="h2">{`${post.title}`}</Typography>
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