import { Box, Button, Divider, Drawer, List, ListItem, ListItemButton, ListItemText } from '@mui/material';
import React from 'react';
import { Link } from 'react-router-dom';
import MenuIcon from '@mui/icons-material/Menu';
function Header() {
    const [open, setOpen] = React.useState(false);

    const toggleDrawer = (newOpen) => () => {
        setOpen(newOpen);
    };

    const routes = [
        { path: "/", componentName: "Candidates" },
        { path: "/skills", componentName: "Skills" },
        { path: "/competency", componentName: "Competency" },
        { path: "/jobrole", componentName: "JobRole" },
        { path: "/questionsetter", componentName: "QuestionSetter" },
        { path: "/show_questions", componentName: "show Questions" },
        { path: "/createAsssessment", componentName: "create Assessment" }
    ];

    const DrawerList = (
        <Box sx={{ width: 250 }} role="presentation" onClick={toggleDrawer(false)}>
            <div>
                <h1 className='text-center p-3 text-2xl bold capitalize underline'>TalentMatrix</h1>
            </div>
            <List>
                {routes.map((item, index) => (
                    <ListItem key={index} disablePadding className='hover:bg-slate-100'>
                        <a className='p-2 ml-3 ' href={item.path} >{item.componentName}</a>
                    </ListItem>
                ))}
            </List>
            <Divider />
        </Box >
    );

    return (
        <div className='bg-gray-50'>
            <div className='w-full h-1/6'>
                <h1 className='text-2xl text-center p-2'>TalentMatrix</h1>
            </div>
            <div className='bg-gray-100'>
                <Button onClick={toggleDrawer(true)}><MenuIcon /></Button>
                <Drawer open={open} onClose={toggleDrawer(false)}>
                    {DrawerList}
                </Drawer>
            </div>
        </div>
    );
}

export default Header;
