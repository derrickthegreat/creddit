import Head from "next/head"
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Box, ComponentsPropsList, CssBaseline } from "@mui/material";
import FixedBottomNavigation from "../Navigation";
import ApplicationBar from "../AppBar";
import { ComponentProps } from "react";

const theme = createTheme()

export default function Layout(props: {children: JSX.Element}) {
const children = props.children;
return (
    <ThemeProvider theme={theme}>
        <CssBaseline /> 
        <ApplicationBar />
        <Box sx={{
            mt: "5rem",
        }}>
        {children}
        </Box>
        <FixedBottomNavigation />
    </ThemeProvider>
)
}
