"use client";

import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import Switch from "@mui/material/Switch";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormGroup from "@mui/material/FormGroup";
import { useSession, signOut } from "next-auth/react";
import Link from "next/link";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import HomeIcon from "@mui/icons-material/Home";
import SchoolIcon from "@mui/icons-material/School";
import AssignmentIcon from "@mui/icons-material/Assignment";
import FolderIcon from "@mui/icons-material/Folder";
import BarChartIcon from "@mui/icons-material/BarChart";
import ChatIcon from "@mui/icons-material/Chat";
import PersonIcon from "@mui/icons-material/Person";
import { usePathname } from "next/navigation";

interface Props {
  toggleTheme: () => void;
  darkMode: boolean;
}

const navigationItems = [
  { title: "Domů", path: "/", icon: HomeIcon },
  { title: "Moduly", path: "/modules", icon: SchoolIcon },
  { title: "Testy a certifikace", path: "/tests", icon: AssignmentIcon },
  { title: "Dokumenty", path: "/documents", icon: FolderIcon },
  { title: "Statistiky", path: "/statistics", icon: BarChartIcon },
  { title: "Chatbot", path: "/chatbot", icon: ChatIcon },
];

export default function Navbar({ toggleTheme, darkMode }: Props) {
  const { data: session, status } = useSession();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const pathname = usePathname();

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = async () => {
    handleMenuClose();
    await signOut({ redirect: true, callbackUrl: "/login" });
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar 
        position="static" 
        elevation={0}
        sx={{
          backgroundColor: 'background.paper',
          borderBottom: 1,
          borderColor: 'divider'
        }}
      >
        <Toolbar sx={{ justifyContent: 'space-between' }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Typography 
              variant="h6" 
              component={Link} 
              href="/"
              sx={{ 
                textDecoration: 'none', 
                color: 'primary.main',
                fontWeight: 'bold',
                mr: 4
              }}
            >
              ACH Univerzita - BD
            </Typography>

            <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
              {navigationItems.map((item) => {
                const Icon = item.icon;
                return (
                  <Button
                    key={item.path}
                    component={Link}
                    href={item.path}
                    startIcon={<Icon />}
                    sx={{
                      mx: 1,
                      color: pathname === item.path ? 'primary.main' : 'text.primary',
                      '&:hover': {
                        backgroundColor: 'action.hover',
                      },
                    }}
                  >
                    {item.title}
                  </Button>
                );
              })}
            </Box>
          </Box>

          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <FormGroup sx={{ mr: 2 }}>
              <FormControlLabel
                control={
                  <Switch
                    checked={darkMode}
                    onChange={toggleTheme}
                    aria-label="přepnout téma"
                    color="primary"
                  />
                }
                label="Tmavý režim"
              />
            </FormGroup>

            {status === "authenticated" && session?.user ? (
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Typography 
                  variant="body2" 
                  sx={{ 
                    mr: 2,
                    display: { xs: 'none', sm: 'block' }
                  }}
                >
                  {session.user.name}
                  {session.user.role && ` (${session.user.role})`}
                </Typography>
                <IconButton
                  aria-label="uživatelský profil"
                  aria-controls="menu-appbar"
                  aria-haspopup="true"
                  onClick={handleMenuOpen}
                  color="inherit"
                  sx={{ 
                    border: 1,
                    borderColor: 'divider',
                    '&:hover': {
                      backgroundColor: 'action.hover',
                    },
                  }}
                >
                  <PersonIcon />
                </IconButton>
                <Menu
                  id="menu-appbar"
                  anchorEl={anchorEl}
                  anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "right",
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  open={Boolean(anchorEl)}
                  onClose={handleMenuClose}
                >
                  <MenuItem 
                    component={Link} 
                    href="/profile"
                    onClick={handleMenuClose}
                  >
                    Můj profil
                  </MenuItem>
                  <MenuItem onClick={handleLogout}>
                    Odhlásit se
                  </MenuItem>
                </Menu>
              </Box>
            ) : (
              <Button 
                color="primary" 
                variant="contained"
                component={Link} 
                href="/login"
              >
                Přihlásit se
              </Button>
            )}
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
