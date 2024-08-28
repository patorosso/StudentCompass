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
        width: 500,
        height: 500,
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
        indicatorColor="primary"
        textColor="primary"
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
            fontWeight: "thin",
            color:
              activeTab === "login"
                ? theme.palette.background.default
                : theme.palette.background.paper,
            borderColor: activeTab === "login" ? "primary.main" : "divider",
            borderBottom: activeTab === "login" ? 2 : 1,
            borderStyle: "solid",
          })}
        />
        <Tab
          label="Register"
          value="register"
          sx={{
            textTransform: "none",
            fontSize: "1rem",
            fontWeight: "thin",
            color: activeTab === "register" ? "primary.main" : "text.secondary",
            borderColor: activeTab === "register" ? "primary.main" : "divider",
            borderBottom: activeTab === "register" ? 2 : 1,
            borderStyle: "solid",
          }}
        />
      </Tabs>
      <Box p={2}>{activeTab === "login" ? <Login /> : <Register />}</Box>
    </Paper>
  );
};

export default Auth;
