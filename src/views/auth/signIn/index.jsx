

import React, { useState } from "react";
import { NavLink } from "react-router-dom";

import {
  Box,
  Button,
  Checkbox,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Icon,
  Input,
  InputGroup,
  InputRightElement,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
// Custom components
import { HSeparator } from "components/separator/Separator";
import DefaultAuth from "layouts/auth/Default";
// Assets
// import illustration from "assets/img/auth/auth.png";
import { FcGoogle } from "react-icons/fc";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import { RiEyeCloseLine } from "react-icons/ri";
import { useHistory } from "react-router-dom";
import axios from "axios";

function SignIn() {
  // Chakra color mode
  const textColor = useColorModeValue("navy.700", "white");
  const textColorSecondary = "gray.400";
  const textColorDetails = useColorModeValue("navy.700", "secondaryGray.600");
  const textColorBrand = useColorModeValue("brand.500", "white");
  const brandStars = useColorModeValue("brand.500", "brand.400");
  const googleBg = useColorModeValue("secondaryGray.300", "whiteAlpha.200");
  const googleText = useColorModeValue("navy.700", "white");
  const googleHover = useColorModeValue(
    { bg: "gray.200" },
    { bg: "whiteAlpha.300" }
  );
  const googleActive = useColorModeValue(
    { bg: "secondaryGray.300" },
    { bg: "whiteAlpha.200" }
  );
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [ResponseApiError, SetResponseApiError] =useState("");
  const [show, setShow] = React.useState(false);
  const handleClick = () => setShow(!show);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const history = useHistory();
  const apiUrl = process.env.REACT_APP_API_KEY;
  console.log(apiUrl);
  const loginUrl = `${apiUrl}/api/auth/login`;

  const validateEmail = () => {
    if (!email) {
      setEmailError("Email is required");
    }
    // else if (!/\S+@\S+\.\S+/.test(email)) {
    //   setEmailError("Invalid email format");
    // }
    else {
      setEmailError("");
    }
  };

  const validatePassword = () => {
    if (!password) {
      setPasswordError("Password is required");
    } else if (password.length < 2) {
      setPasswordError("Password must be at least 8 characters long");
    } else {
      setPasswordError("");
    }
  };

  const handleSignIn = async () => {
    validateEmail();
    validatePassword();
  
    if (!emailError && !passwordError) {
      SetResponseApiError(""); // Réinitialisez le message d'erreur
  
      try {
        const response = await axios.post(
          loginUrl,
         // `${process.env.REACT_APP_API_KEY}/api/auth/login`,
         // "http://localhost:8080/api/auth/login", 
        
        {
          username: email,
          password: password,
        });
       console.log("data login",response.data);
        const token = response.data;
        if (token) {
          localStorage.setItem("token", token.token);
          history.push("/admin/default");
        } else {
          console.error("Email ou mot de passe incorrect");
          SetResponseApiError("Email ou mot de passe incorrect");
        }
      } catch (error) {
        SetResponseApiError("Erreur lors de la connexion. Veuillez réessayer.");
        console.error("Erreur lors de la connexion :", error);
      }
    }
  };
  


  return (
    <DefaultAuth
      // illustrationBackground={illustration}
      // image={illustration}
    >
      <Flex
        maxW={{ base: "100%", md: "max-content" }}
        w='100%'
        mx={{ base: "auto", lg: "0px" }}
        me='auto'
        h='100%'
        alignItems='start'
        justifyContent='center'
        mb={{ base: "30px", md: "60px" }}
        px={{ base: "25px", md: "0px" }}
        mt={{ base: "40px", md: "14vh" }}
        flexDirection='column'>
        <Box me='auto'>
          <Heading color={textColor} fontSize='36px' mb='10px'>
            {/* Sign In */}
            S'identifier
          </Heading>

        </Box>
        <Flex
          zIndex='2'
          direction='column'
          w={{ base: "100%", md: "420px" }}
          maxW='100%'
          background='transparent'
          borderRadius='15px'
          mx={{ base: "auto", lg: "unset" }}
          me='auto'
          mb={{ base: "20px", md: "auto" }}>

          <Flex align='center' mb='25px'>

          </Flex>
          <FormControl isInvalid={emailError}>
            <FormLabel
              display='flex'
              ms='4px'
              fontSize='sm'
              fontWeight='500'
              color={textColor}
              mb='8px'>
              {/* Email */}
              Mail
              <Text color={brandStars}>*</Text>
            </FormLabel>
            <Input
              isRequired={true}
              variant='auth'
              fontSize='sm'
              ms={{ base: "0px", md: "0px" }}
              type='email'
              placeholder='mail@simmmple.com'
              mb='24px'
              fontWeight='500'
              size='lg'
              onChange={(e) => setEmail(e.target.value)}
              onBlur={validateEmail}
            />
            <Text color='red' fontSize='sm' mb='8px'>
              {emailError}
            </Text>
            <FormLabel
              ms='4px'
              fontSize='sm'
              fontWeight='500'
              color={textColor}
              display='flex' isInvalid={passwordError}>
              {/* Password */}
              Mot de passe
              <Text color={brandStars}>*</Text>
            </FormLabel>
            <InputGroup size='md'>
              <Input
                isRequired={true}
                fontSize='sm'
                placeholder='Min. 8 characters'
                mb='24px'
                size='lg'
                type={show ? "text" : "password"}
                variant='auth'
                onChange={(e) => setPassword(e.target.value)}
                onBlur={validatePassword}
              />



              <InputRightElement display='flex' alignItems='center' mt='4px'>
                <Icon
                  color={textColorSecondary}
                  _hover={{ cursor: "pointer" }}
                  as={show ? RiEyeCloseLine : MdOutlineRemoveRedEye}
                  onClick={handleClick}
                />
              </InputRightElement>
            </InputGroup>

            <Text color='red' fontSize='sm' mb='8px'>
              {passwordError}
            </Text>
            <Flex justifyContent='space-between' align='center' mb='24px'>
              <FormControl display='flex' alignItems='center'>
                <Checkbox
                  id='remember-login'
                  colorScheme='brandScheme'
                  me='10px'
                />
                <FormLabel
                  htmlFor='remember-login'
                  mb='0'
                  fontWeight='normal'
                  color={textColor}
                  fontSize='sm'>
                  {/* Keep me logged in */}
                  Rester connecté
                </FormLabel>
              </FormControl>
              <NavLink to='/auth/forgot-password'>

              </NavLink>
            </Flex>
            <Button
              fontSize='sm'
              variant='brand'
              fontWeight='500'
              w='100%'
              h='50'
              mb='24px'
              onClick={() => {
                handleSignIn();
            
               
                if (emailError && passwordError) {
                  SetResponseApiError("");
                }
              }}>
              {/* <a href="/admin/default">  */}
              {/* Sign In  */}
              S'identifier
              {/* </a> */}
            </Button>
            {ResponseApiError && <Text color='red' fontSize='sm'>{ResponseApiError }</Text>}
          </FormControl>
          <Flex
            flexDirection='column'
            justifyContent='center'
            alignItems='start'
            maxW='100%'
            mt='0px'>

          </Flex>
        </Flex>
      </Flex>
    </DefaultAuth>
  );
}

export default SignIn;
