import { useStore } from "./utils";

export function useInfo() {
  const {
    styles: {
      appStyles,
      inputsStyles: {
        containerStyles: inputsStyles,
        inputStyles: { containerStyles: inputStyles, placeholderColor },
      },
    },
    title,
    info,
    getCapitalised,
    onChangeText,
    TextInput,
    SafeAreaView,
    FlatList,
    KeyboardAvoidingView,
  } = useStore();

  return (
    <SafeAreaView style={appStyles}>
      {title && (
        <KeyboardAvoidingView behavior="padding" style={appStyles}>
          <FlatList
            contentOffset={{ y: -1 }}
            contentContainerStyle={inputsStyles}
            data={info}
            renderItem={({
              item: { id, data, textContentType, keyboardType },
            }) =>
              (data || id === "password") && (
                <TextInput
                  style={inputStyles}
                  defaultValue={data}
                  placeholder={getCapitalised(id)}
                  textContentType={textContentType}
                  placeholderTextColor={placeholderColor}
                  secureTextEntry={id === "password"}
                  autoCapitalize={
                    id === "password" || id === "email" ? "none" : "words"
                  }
                  keyboardType={!keyboardType ? "default" : keyboardType}
                  onChangeText={onChangeText.bind(this, id)}
                />
              )
            }
          />
        </KeyboardAvoidingView>
      )}
    </SafeAreaView>
  );
}
