import { Text } from "react-native"

type Props = {
  message?: string
}

const defaultMessages = 'An error occured, please try again later...'

export const ErrorItem = ({ message = defaultMessages }: Props) => {
  return (
    <Text>
      { message }
    </Text>
  )
}