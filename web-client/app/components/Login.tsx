"use client";
import React, { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import {
  Box,
  TextField,
  Button,
  Divider,
  InputAdornment,
  Typography,
} from "@mui/material";
import { AccountCircle, Lock } from "@mui/icons-material";

const Login = () => {
  const router = useRouter();
  const usernameRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (usernameRef.current) {
      usernameRef.current.focus();
    }
  }, []);

  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="center"
      width="100%"
      height="100%"
    >
      <form>
        <Box px={4}>
          <Box my={4}>
            <TextField
              label="Username"
              id="username"
              variant="outlined"
              fullWidth
              inputRef={usernameRef}
              slotProps={{
                input: {
                  startAdornment: (
                    <InputAdornment position="start">
                      <AccountCircle sx={{ color: "primary.light" }} />
                    </InputAdornment>
                  ),
                },
              }}
              sx={(theme) => ({
                "& .MuiOutlinedInput-root": {
                  "& fieldset": {
                    borderColor: "primary.light",
                    backgroundColor: "transparent",
                  },
                  "&:hover fieldset": {
                    borderColor: "primary.main",
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "primary.main",
                    backgroundColor: "rgba(255, 255, 255, 0.03)",
                  },
                },
                "& .MuiInputLabel-root": {
                  color: "primary.light",
                },
                "& .MuiInputLabel-root.Mui-focused": {
                  color: "primary.main",
                },
                minWidth: "370px",
                input: { color: theme.palette.text.primary },
              })}
            />
          </Box>
          <Box mb={4}>
            <TextField
              label="Password"
              id="password"
              variant="outlined"
              type="password"
              fullWidth
              slotProps={{
                input: {
                  startAdornment: (
                    <InputAdornment position="start">
                      <Lock sx={{ color: "primary.light" }} />
                    </InputAdornment>
                  ),
                },
              }}
              sx={(theme) => ({
                "& .MuiOutlinedInput-root": {
                  "& fieldset": {
                    borderColor: "primary.light",
                    backgroundColor: "transparent",
                  },
                  "&:hover fieldset": {
                    borderColor: "primary.main",
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "primary.main",
                    backgroundColor: "rgba(255, 255, 255, 0.03)",
                  },
                },
                "& .MuiInputLabel-root": {
                  color: "primary.light",
                },
                "& .MuiInputLabel-root.Mui-focused": {
                  color: "primary.main",
                },
                minWidth: "370px",
                input: { color: theme.palette.text.primary },
              })}
            />
          </Box>
          <Button
            variant="contained"
            color="primary"
            fullWidth
            component={Link}
            href="/dashboard"
            sx={{
              py: 2,
              minWidth: "370px",
              textTransform: "none",
              fontWeight: "bold",
            }}
          >
            <Typography variant="button">Log in</Typography>
          </Button>
        </Box>
        <Divider
          sx={(theme) => ({
            width: "100%",
            my: 4,
            borderColor: theme.palette.divider,
          })}
        />
        <Box px={4}>
          <Button
            variant="contained"
            color="primary"
            fullWidth
            sx={{
              py: 2,
              mt: 4,
              minWidth: "370px",
              textTransform: "none",
              fontWeight: "bold",
              display: "flex",
              justifyContent: "flex-start",
              alignItems: "center",
            }}
            onClick={(e) => {
              e.preventDefault();
            }}
          >
            <Image
              src="/google.svg"
              alt="continue with google"
              width={24}
              height={24}
              style={{ marginRight: "auto" }}
            />
            <Box flexGrow={1} textAlign="center">
              <Typography variant="button">Continue with Google</Typography>
            </Box>
          </Button>
        </Box>
      </form>
    </Box>
  );
};

export default Login;
