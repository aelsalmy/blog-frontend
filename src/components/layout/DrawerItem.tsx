import { ListItem, ListItemIcon, ListItemText, type ListItemButtonProps } from "@mui/material";
import type { NavLinkProps } from "react-router-dom";

type DrawerItemProps = ListItemButtonProps &
  Partial<NavLinkProps> & {
    icon: React.ReactNode;
    label: string;
  };

export function DrawerItem({
    icon, 
    label, 
    ...props
}: DrawerItemProps) {
    return (
        <ListItem component={props.component} sx={{width: "35vh" }} {...props}>
            <ListItemIcon>{icon}</ListItemIcon>
            <ListItemText primary={label} />
        </ListItem>
    )
}