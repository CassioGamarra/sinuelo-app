import React from 'react';

import { 
  Text, 
  AlertDialog,
  Button
} from 'native-base';

export default function Alerta(props) {
  return (
    <AlertDialog
      leastDestructiveRef={props.cancelRef}
      isOpen={props.alertOpen}
      onClose={props.onAlertClose}
    >
      <AlertDialog.Content>
        <AlertDialog.Header><Text fontSize="lg" bold>Alerta </Text></AlertDialog.Header>
        <AlertDialog.Body>
          <Text fontSize="lg">
            O animal <Text bold fontSize="lg">{props.animal}</Text> cadastrado com o brinco <Text bold fontSize="lg">{props.codigoBrinco}</Text>,
            possui o seguinte alerta: <Text bold fontSize="lg">{props.descricaoAlerta}</Text>
          </Text>
        </AlertDialog.Body>
        <AlertDialog.Footer>
          <Button.Group space={3}>
            <Button colorScheme="success" onPress={props.onAlertClose}>
              Continuar
            </Button>
          </Button.Group>
        </AlertDialog.Footer>
      </AlertDialog.Content>
    </AlertDialog>
  )
}