import { useStore } from "./utils";

export function useAuth() {
  const {
    styles: {
      authStyles,
      inputStyles: { containerStyles: inputStyles, placeholderColor },
      inputsStyles,
      buttonStyles: { containerStyles: buttonStyles, labelStyles },
      disclaimerStyles: { primary: disclaimerStyles, secondary },
    },
    inputs,
    state: { isNew, user } = {},
    getCapitalised,
    setState,
    onChangeText,
    onLogin,
    onSignUp,
    Text,
    TextInput,
    TouchableOpacity,
    SafeAreaView,
    ScrollView,
    KeyboardAvoidingView,
  } = useStore();

  return (
    <SafeAreaView style={authStyles}>
      <KeyboardAvoidingView behavior="padding" style={authStyles}>
        <ScrollView contentContainerStyle={inputsStyles}>
          {inputs.map(
            ({ id, textContentType, keyboardType }) =>
              (id === "password" ||
                id === "email" ||
                (isNew && (id !== "password" || id === "email"))) && (
                <TextInput
                  key={id}
                  style={inputStyles}
                  placeholder={getCapitalised(id)}
                  textContentType={textContentType}
                  keyboardType={!keyboardType ? "default" : keyboardType}
                  value={user?.[id]}
                  secureTextEntry={id === "password"}
                  placeholderTextColor={placeholderColor}
                  autoCapitalize={
                    id === "email" || id === "password" ? "none" : "words"
                  }
                  onChangeText={onChangeText.bind(this, id)}
                  onSubmitEditing={!isNew ? onLogin : onSignUp}
                />
              )
          )}

          <TouchableOpacity
            style={buttonStyles}
            activeOpacity={0.5}
            onPress={!isNew ? onLogin : onSignUp}
          >
            <Text style={labelStyles}>{!isNew ? "Log in" : "Sign up"}</Text>
          </TouchableOpacity>

          <TouchableOpacity
            activeOpacity={0.5}
            onPress={setState.bind(null, (old) => ({
              ...old,
              isNew: !old?.isNew,
            }))}
          >
            <Text style={disclaimerStyles}>
              {!isNew ? "Not a member" : "Already a member"}?
              <Text style={secondary}>{!isNew ? " Sign up" : " Log in"}</Text>
            </Text>
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
