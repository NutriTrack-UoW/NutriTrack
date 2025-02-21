"use client";

import { useState, useRef, useEffect } from "react";

import {
  Button,
  Input,
  Stack,
  Box,
  Text,
  Divider,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  Progress,
} from "@chakra-ui/react";
import axios, { AxiosError } from "axios";
import zxcvbn from "zxcvbn";

import { logo, google } from "../../../Assets/index.ts";

interface SignUpDialogProps {
  open: boolean;
  onClose: () => void;
  openSignIn: () => void; // Function to switch to Sign In Dialog
}

const SignUpDialog = ({ open, onClose, openSignIn }: SignUpDialogProps) => {
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const confirmPasswordRef = useRef<HTMLInputElement>(null);

  const [emailError, setEmailError] = useState(false);
  const [emailErrorMessage, setEmailErrorMessage] = useState("");
  const [passwordError, setPasswordError] = useState(false);
  const [passwordErrorMessage, setPasswordErrorMessage] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState(false);
  const [confirmPasswordErrorMessage, setConfirmPasswordErrorMessage] = useState("");
  const [passwordStrength, setPasswordStrength] = useState(0);

  // ✅ Validate Inputs
  const validateInputs = () => {
    const email = emailRef.current?.value || "";
    const password = passwordRef.current?.value || "";
    const confirmPassword = confirmPasswordRef.current?.value || "";
    let isValid = true;

    // Email Validation
    if (!email || !/\S+@\S+\.\S+/.test(email)) {
      setEmailError(true);
      setEmailErrorMessage("Please enter a valid email address.");
      isValid = false;
    } else {
      setEmailError(false);
      setEmailErrorMessage("");
    }

    // Password Strength Validation (NEW ADDITION ✅)
    if (passwordStrength < 3) { // Only allow "Good" (3) and "Strong" (4) passwords
      setPasswordError(true);
      setPasswordErrorMessage("Password is too weak. Try adding more unique characters.");
      isValid = false;
    }

    // Password Validation
    const passwordRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*()_+])[A-Za-z\d!@#$%^&*()_+]{8,}$/;
    if (!password || !passwordRegex.test(password)) {
      setPasswordError(true);
      setPasswordErrorMessage("Password must be 8+ chars, include an uppercase letter, a number & a symbol.");
      isValid = false;
    } else {
      setPasswordError(false);
      setPasswordErrorMessage("");
    }

    // Confirm Password Validation
    if (confirmPassword !== password) {
      setConfirmPasswordError(true);
      setConfirmPasswordErrorMessage("Passwords do not match.");
      isValid = false;
    } else {
      setConfirmPasswordError(false);
      setConfirmPasswordErrorMessage("");
    }

    return isValid;
  };

  // ✅ Handle Form Submission
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!validateInputs()) return;
  
    try {
      const response = await axios.post("/api/auth/register", {
        email: emailRef.current?.value,
        password: passwordRef.current?.value,
      });
  
      console.log("User registered successfully!", response.data);
  
      // ✅ Show success message
      alert("User registered successfully!");
  
      // ✅ Close the modal
      onClose();
    } catch (err) {
      // ✅ Type the error properly
      const error = err as AxiosError<{ message: string }>;
  
      console.error("Registration Error:", error.response?.data?.message);
      alert(error.response?.data?.message || "Registration failed.");
    }
  };
  // ✅ Handle Password Strength
  const checkPasswordStrength = (password: string) => {
    const result = zxcvbn(password);
    setPasswordStrength(result.score); // Score is from 0 (weak) to 4 (strong)
  
    if (result.score < 3) { // Only allow "Good" (3) and "Strong" (4) passwords
      setPasswordError(true);
      setPasswordErrorMessage("Password is too weak. Try adding more unique characters.");
      return false;  // ❌ REMOVE THIS RETURN
    } else {
      setPasswordError(false);
      setPasswordErrorMessage("");
    }
  }; 

  useEffect(() => {
    if (open) {
      // Reset validation errors
      setEmailError(false);
      setEmailErrorMessage("");
      setPasswordError(false);
      setPasswordErrorMessage("");
      setConfirmPasswordError(false);
      setConfirmPasswordErrorMessage("");
      setPasswordStrength(0); // Reset password strength bar
  
      // Clear input fields
      if (emailRef.current) emailRef.current.value = "";
      if (passwordRef.current) passwordRef.current.value = "";
      if (confirmPasswordRef.current) confirmPasswordRef.current.value = "";
    }
  }, [open]);

  if (!open) return null; // Prevents unnecessary renders

  return (
    <Modal isOpen={open} onClose={onClose} closeOnOverlayClick={false} isCentered>
      <ModalOverlay />
      <ModalContent borderRadius="16px">
        {/* Header with Logo and Dark Green Background */}
        <ModalHeader 
          bg="var(--dark-green)" 
          display="flex" 
          justifyContent="center" 
          alignItems="center" 
          py={4} 
          position="relative"
          borderTopLeftRadius="12px" 
          borderTopRightRadius="12px"
          borderBottomLeftRadius="0"
          borderBottomRightRadius="0"
        >
          <a 
            href="/" 
            style={{ display: 'flex', alignItems: 'center', textDecoration: 'none' }}
            aria-label="Go to NutriTrack homepage"
          >
            <img src={logo} alt="NutriTrack" width={124} height={32} />
          </a>
        </ModalHeader>
        <ModalCloseButton 
          color="white" 
          right={4}
          transform="translateY(25%)"
          aria-label="Close modal"
          tabIndex={0}
          borderRadius="6px"
          _hover={{
            bg: 'rgba(255, 255, 255, 0.1)',
          }}
          _focus={{
            outline: "2px solid var(--bright-green)",
            outlineOffset: "2px",
          }}
        />

        {/* Sign Up Form */}
        <ModalBody pb={6} pt={6} fontFamily="Rubik, sans-serif">
          <form onSubmit={handleSubmit}>
            <Stack spacing={4}>
              {/* Email Input */}
              <Box>
                <Text fontSize="15px" fontWeight={600} mb={1}>Email</Text>
                <Input ref={emailRef} placeholder="your@email.com" isInvalid={emailError} errorBorderColor="red.300" 
                 aria-label="Email address"
                 aria-describedby={emailError ? "email-error" : undefined}
                 _focus={{
                   outline: "2px solid var(--bright-green)",
                   outlineOffset: "2px",
                 }}               
                
                />
                {emailError && <Text fontSize="xs" color="red.500">{emailErrorMessage}</Text>}
              </Box>

              {/* Password Input */}
              <Box>
                <Text fontSize="15px" fontWeight={600} mb={1}>Password</Text>
                <Input 
                  ref={passwordRef} 
                  type="password" 
                  placeholder="••••••••" 
                  isInvalid={passwordError} 
                  errorBorderColor="red.300"
                  onChange={(e) => checkPasswordStrength(e.target.value)}
                  aria-label="Password"
                  aria-describedby={passwordError ? "password-error" : undefined}
                  _focus={{
                    outline: "2px solid var(--bright-green)",
                    outlineOffset: "2px",
                  }}
                />

               {/* Password Stregth Checker */}

                {passwordRef.current?.value && (
                  <Box mt={3}> {/* Adds padding above the progress bar */}
                    <Progress 
                      value={(passwordStrength + 1) * 20} // Convert score (0-4) to percentage (0-100)
                      size="sm" 
                      colorScheme={["red", "orange", "yellow", "green", "green"][passwordStrength]} 
                    />
                    <Text fontSize="xs" color={["red", "orange", "yellow", "green", "green"][passwordStrength]}>
                      {["Very Weak", "Weak", "Fair", "Good", "Strong"][passwordStrength]}
                    </Text>
                  </Box>
                )}



                {passwordError && <Text fontSize="xs" color="red.500">{passwordErrorMessage}</Text>}
              </Box>

              {/* Confirm Password Input */}
              <Box>
                <Text fontSize="15px" fontWeight={600} mb={1}>Confirm Password</Text>
                <Input ref={confirmPasswordRef} type="password" placeholder="••••••••" isInvalid={confirmPasswordError} errorBorderColor="red.300" 
                aria-label="Password"
                aria-describedby={passwordError ? "password-error" : undefined}
                _focus={{
                  outline: "2px solid var(--bright-green)",
                  outlineOffset: "2px",
                }}
                />
                {confirmPasswordError && <Text fontSize="xs" color="red.500">{confirmPasswordErrorMessage}</Text>}
              </Box>

              {/* Sign Up Button */}
              <Button 
                type="submit" 
                colorScheme="blue" 
                width="full"
                fontSize="15px"
                fontWeight={600}
                aria-label="Sign in with email"
                _focus={{
                  outline: "2px solid var(--bright-green)",
                  outlineOffset: "2px",
                }}
              >
                Sign up
              </Button>
              <Divider aria-hidden="true" />
              <Text textAlign="center" fontSize="15px" fontWeight={600} color="gray.600">or</Text>

              {/* Sign In with Google */}
              <Button 
                variant="outline" 
                width="full"
                fontSize="15px"
                fontWeight={500}
                leftIcon={<Box as="img" src={google} alt="Google logo" boxSize="16px" />}
                aria-label="Sign in with Google"
                _focus={{
                  outline: "2px solid var(--bright-green)",
                  outlineOffset: "2px",
                }}
                _hover={{
                  bg: 'rgba(0, 0, 0, 0.05)',
                }}
              >
                Sign up with Google
              </Button>

              {/* Already Have an Account? */}
              <Text textAlign="center" fontSize="15px">
                Already have an account?{" "}
                <Button 
                  variant="link" 
                  colorScheme="blue" 
                  onClick={() => {
                    onClose();    // Close SignUp Dialog
                    openSignIn(); // Open SignIn Dialog
                  }}
                  fontSize="15px"
                  fontWeight={600}
                  aria-label="Sign up for a new account"
                  _focus={{
                    outline: "2px solid var(--bright-green)",
                    outlineOffset: "2px",
                  }}
                  _hover={{
                    textDecoration: "underline",
                    boxShadow: "none",
                    bg: "transparent"
                  }}
                >
                  Sign in
                </Button>
              </Text>
            </Stack>
            
          </form>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default SignUpDialog;
