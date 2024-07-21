import { useState } from 'react';
import styled from 'styled-components';
import { List, ListItem, ListItemText, ListItemIcon, IconButton } from '@mui/material';
import { Menu as MenuIcon, BarChart as BarChartIcon, AccountCircle as AccountCircleIcon, Settings as SettingsIcon, ChevronLeft as ChevronLeftIcon, ChevronRight as ChevronRightIcon } from '@mui/icons-material';

const SidebarContainer = styled.div<{ $expanded: boolean }>`
  width: ${props => (props.$expanded ? '250px' : '60px')};
  background-color: #071A2B;
  color: white;
  transition: width 0.3s;
  overflow: hidden;
`;

const ToggleButtonContainer = styled.div<{ $expanded: boolean }>`
  display: flex;
  justify-content: ${props => (props.$expanded ? 'flex-end' : 'center')};
  padding: 8px;
`;

const StyledListItem = styled(ListItem) <{ $active: boolean }>`
  background-color: ${props => (props.$active ? '#083da0' : 'inherit')};
  transition: all 0.3s;
  &:hover {
    background-color: #083da0;
    cursor: pointer;
    transform: scale(1.04);
  }
`;

const Sidebar = ({ setSelectedOption }: { setSelectedOption: (option: string) => void }) => {
    const [isExpanded, setIsExpanded] = useState(true);
    const [activeOption, setActiveOption] = useState('');

    const toggleSidebar = () => {
        setIsExpanded(!isExpanded);
    };

    const handleOptionClick = (option: string) => {
        setActiveOption(option);
        setSelectedOption(option);
    };

    return (
        <SidebarContainer $expanded={isExpanded}>
            <ToggleButtonContainer $expanded={isExpanded}>
                <IconButton onClick={toggleSidebar}>
                    {isExpanded ? <ChevronLeftIcon style={{ color: 'white' }} /> : <ChevronRightIcon style={{ color: 'white' }} />}
                </IconButton>
            </ToggleButtonContainer>
            <List>
                {[
                    { text: 'Meny', icon: <MenuIcon /> },
                    { text: 'Analytikk', icon: <BarChartIcon /> },
                    { text: 'Kontoinnstillinger', icon: <AccountCircleIcon /> },
                    { text: 'Innstillinger', icon: <SettingsIcon /> },
                ].map(({ text, icon }) => (
                    <StyledListItem
                        key={text}
                        $active={activeOption === text}
                        onClick={() => handleOptionClick(text)}
                    >
                        <ListItemIcon style={{ color: 'white' }}>{icon}</ListItemIcon>
                        {isExpanded && <ListItemText primary={text} />}
                    </StyledListItem>
                ))}
            </List>
        </SidebarContainer>
    );
};

export default Sidebar;
