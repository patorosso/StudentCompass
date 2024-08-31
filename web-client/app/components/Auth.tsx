"use client";
import React, { useState } from "react";
import Login from "./Login";
import Register from "./Register";
import { Box, Paper, Tabs, Tab } from "@mui/material";

const Auth = () => {
  const [activeTab, setActiveTab] = useState("login");

  const handleChange = (event: any, newValue: string) => {
    setActiveTab(newValue);
  };

  return (
    <Paper
      elevation={3}
      sx={(theme) => ({
        p: 4,
        minHeight: 550,
        bgcolor: theme.palette.background.default,
        boxShadow: 6,
        borderRadius: 2,
        margin: "auto",
        lg: { marginRight: "60px" },
      })}
    >
      <Tabs
        value={activeTab}
        onChange={handleChange}
        variant="fullWidth"
        textColor="inherit"
        indicatorColor="primary"
        sx={{
          borderBottom: 1,
          borderColor: "divider",
          marginBottom: 2,
        }}
      >
        <Tab
          label="Log in"
          value="login"
          sx={(theme) => ({
            textTransform: "none",
            fontSize: "1rem",
            fontWeight: "bold",
            color:
              activeTab === "login"
                ? theme.palette.text.primary
                : theme.palette.text.disabled,
            borderBottom:
              activeTab === "login"
                ? `2px solid ${theme.palette.primary.main}`
                : "none",
            transition: "all 0.3s ease-in-out",
          })}
        />
        <Tab
          label="Register"
          value="register"
          sx={(theme) => ({
            textTransform: "none",
            fontSize: "1rem",
            fontWeight: "bold",
            color:
              activeTab === "register"
                ? theme.palette.text.primary
                : theme.palette.text.disabled,
            borderBottom:
              activeTab === "register"
                ? `2px solid ${theme.palette.primary.main}`
                : "none",
            transition: "all 0.3s ease-in-out",
          })}
        />
      </Tabs>
      <Box p={2}>{activeTab === "login" ? <Login /> : <Register />}</Box>
    </Paper>
  );
};

export default Auth;
