import { marked } from 'marked';
import { useState, SyntheticEvent } from 'react';
import { styled } from '@mui/material/styles';
import MuiAccordion, { AccordionProps } from '@mui/material/Accordion';
import MuiAccordionSummary, {
  AccordionSummaryProps,
} from '@mui/material/AccordionSummary';
import MuiAccordionDetails from '@mui/material/AccordionDetails';
import AccountCircle from '@mui/icons-material/AccountCircle';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import CommentIcon from '@mui/icons-material/Comment';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { Button } from '@mui/material';
import { ReplayCircleFilledSharp } from '@mui/icons-material';

const Accordion = styled((props: AccordionProps) => (
  <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
  border: `1px solid ${theme.palette.divider}`,
  '&:not(:last-child)': {
  },
  '&:before': {
    display: 'none',
    my: "3px",
  },
}));

const AccordionSummary = styled((props: AccordionSummaryProps) => (
  <MuiAccordionSummary
    expandIcon={<AccountCircle />}
    {...props}
  />
))(({ theme }) => ({
  backgroundColor:
    theme.palette.mode === 'dark'
      ? 'rgba(255, 255, 255, .05)'
      : 'rgba(0, 0, 0, .03)',
  flexDirection: 'row-reverse',
  '& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
    transform: 'rotate(360deg)',
  },
  '& .MuiAccordionSummary-content': {
    marginLeft: theme.spacing(1),
  },
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  padding: theme.spacing(2),
  backgroundColor:
    theme.palette.mode === 'dark'
      ? 'rgba(255, 255, 255, .05)'
      : 'rgba(0, 0, 0, .03)',
}));

export default function Comment(props: { comment: any, replies?: any}) {
    const [expanded, setExpanded] = useState<string | false>('panel1')
    const handleChange = (panel: string) => (event: SyntheticEvent, newExpanded: boolean) => {
        setExpanded(newExpanded ? panel : false);
    }
    const { author, body, score } = props.comment;
    const numberOfReplies = props.replies ? props.replies.length : 0;
    return (
    <>
      <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
        <AccordionSummary aria-controls="panel1d-content" id="panel1d-header">
          <Typography>{author}</Typography>
        </AccordionSummary>
        <AccordionDetails>
        <Typography variant="body1" m={2}><div dangerouslySetInnerHTML={{__html: marked(body)}}></div></Typography>
        <Box display="flex">
            <Typography variant="body2" m={1}><ArrowUpwardIcon />{score}<ArrowDownwardIcon /></Typography>
            <Button variant="text" startIcon={<CommentIcon />} >{`${numberOfReplies} comments`}</Button>
            </Box>
            {props.replies ? props.replies.map((reply:any, index: number) => reply.body ? <Comment comment={reply} sx={{my: 3}}/> : null) : null}
        </AccordionDetails>
      </Accordion>
    </>
    )
    }