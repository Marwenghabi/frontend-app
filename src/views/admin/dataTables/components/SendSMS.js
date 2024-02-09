import React, { useState } from 'react';
import axios from 'axios';
import {
  Box,
  Button,
  Input,
  Textarea,
  VStack,
  Heading,
  Alert,
  AlertIcon,
  HStack,
  Radio,
  RadioGroup,
} from '@chakra-ui/react';

function SMSSender() {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [message, setMessage] = useState('');
  const [response, setResponse] = useState('');
  const [error, setError] = useState('');
  const [operator, setOperator] = useState(''); // Pour stocker l'opérateur sélectionné

  const handlePhoneNumberChange = (e) => {
    setPhoneNumber(e.target.value);
  };

  const handleMessageChange = (e) => {
    setMessage(e.target.value);
  };

  const handleOperatorChange = (e) => {
    setOperator(e);
  };

  const handleSendSMS = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('URL_DE_VOTRE_API_SMS', {
        phoneNumber: phoneNumber,
        message: message,
        operator: operator, // Envoyez l'opérateur sélectionné à votre API
      });

      // Traitez la réponse, par exemple, affichez un message de succès.
      setResponse('SMS envoyé avec succès');
      setError('');
    } catch (err) {
      // Gérez les erreurs, par exemple, affichez un message d'erreur.
      setResponse('');
      setError('Erreur lors de l\'envoi du SMS');
    }
  };

  return (
    <Box p={4} borderWidth="1px" borderRadius="md">
      <Heading size="lg">Envoyer un SMS</Heading>
      {response && (
        <Alert status="success" mt={4}>
          <AlertIcon />
          {response}
        </Alert>
      )}
      {error && (
        <Alert status="error" mt={4}>
          <AlertIcon />
          {error}
        </Alert>
      )}
      <form onSubmit={handleSendSMS}>
        <VStack spacing={4} mt={4}>
        {/* <Input
            type="tel"
            placeholder="Numéro de téléphone"
            value={phoneNumber}
            onChange={handlePhoneNumberChange}
          /> */}
          {/* <label>Numéro de téléphone</label> */}
          
          <Textarea
            placeholder="Message"
            value={message}
            onChange={handleMessageChange}
          />
         <RadioGroup onChange={handleOperatorChange} value={operator}>
            <HStack spacing={4}>
              <Radio value="Orange">Orange</Radio>
              <Radio value="Ooredoo">Ooredoo</Radio>
              <Radio value="Telecom">Telecom</Radio>
            </HStack>
          </RadioGroup>
          <Button type="submit" colorScheme="teal">
            Envoyer SMS
          </Button>
        </VStack>
      </form>
    </Box>
  );
}

export default SMSSender;
    